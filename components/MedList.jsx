import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from './../FirebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './../Constants/Colors';
import moment from 'moment';

export default function MedList() {

  const [medList, setMedList] = useState();
  const [dateRange, setDateRange] = useState([]);
  const [selDate, setSelDate] = useState(moment().format("DD.MM.YYYY"));

  useEffect(() => {
    GetDateRangeList();
  }, [])

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
          style={[styles.dateContainer, { backgroundColor: item === selDate ? Colors.ORANGE : Colors.MAIN }]} 
          onPress={() => setSelDate(item)}
          >
            <Text style={styles.eachDay}>{item}</Text>
          </TouchableOpacity>
        )}
      />
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
    backgroundColor: Colors.MAIN,
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
