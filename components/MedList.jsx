import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from './../FirebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './../Constants/Colors';
import moment from 'moment';
import MedCard from './MedCard';
import EmptyMedState from './EmptyMedState'
import { useRouter } from 'expo-router';

export default function MedList() {

  const router = useRouter()
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selDate, setSelDate] = useState(moment().format("DD.MM.YYYY"));
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    GetUserEmail();
    GetDateRangeList();
  }, [])

  useEffect(() => {
    if (userEmail) {
      GetMedList(selDate);
    }
  }, [selDate, userEmail]);

  const GetUserEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (email !== null) {
        setUserEmail(email);
      }
    } catch (error) {
      console.log('Error retrieving user email:', error);
    }
  }

  const GetDateRangeToDisplay = () => {
    const dateList = [];
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + i);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      dateList.push(`${day}.${month}.${year}`);
    }
    return dateList;
  };

  const GetDateRangeList = () => {
    const dateRange = GetDateRangeToDisplay();
    setDateRange(dateRange);
  }

  const GetMedList = async (selDate) => {
    try {
      const q = query(collection(db, "Medicine"), 
      where("userEmail", "==", userEmail),
      where("dateRange", "array-contains", selDate))

      const querySnapshot = await getDocs(q);
      setMedList([]);
      querySnapshot.forEach((doc) => {
        setMedList(prev => [...prev, doc.data()])
      })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Image style={styles.imageHeader} source={require("../assets/images/meds.png")} />
      <FlatList
        style={{ marginTop: 20 }}
        data={dateRange}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.dateContainer, { backgroundColor: item === selDate ? Colors.MAIN : Colors.ORANGE }]} 
            onPress={() => setSelDate(item)}
          >
            <Text style={styles.eachDay}>{item}</Text>
          </TouchableOpacity>
        )}
      />

    {medList?.length > 0 ? <FlatList 
        data={medList}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => router.push({
            pathname: "/action-modal",
            params: {
              ...item,
              selDate: selDate
            }
          })}>
            <MedCard med={item} selDate={selDate} />
          </TouchableOpacity>
        )}
      /> : <EmptyMedState />}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 30,
    padding: 20,
  },
  imageHeader: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateContainer: {
    padding: 15,
    backgroundColor: Colors.ORANGE,
    display: "flex",
    alignItems: "center",
    marginRight: 20,
    borderRadius: 10,
  },
  eachDay: {
    fontSize: 18,
    fontWeight: "bold",
  }
});
