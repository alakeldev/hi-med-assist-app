import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useRouter, useLocalSearchParams } from "expo-router";
import Colors from '../../Constants/Colors';
import MedCard from '../../components/MedCard';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { db } from "./../../FirebaseConfig";
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import moment from 'moment';


export default function MedStatusModal() {
  const med = useLocalSearchParams();
  const router = useRouter()

  const UpdateMedStatus = async(status) => {
    try {
      const docRef = doc(db, "Medicine", med?.docId)
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time:moment().format("LT"),
          date: med?.selDate
        })
      })

      Alert.alert(status, "Status Saved!")
      router.replace("(tabs)")
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <View style={styles.container}>
      <Image 
      style={styles.imageStyle}
      source={require("./../../assets/images/modalicon.png")} 
      />
      <Text style={styles?.medDate}>{med.selDate}</Text>
      <Text style={styles?.medReminder}>{med.timeReminder}</Text>
      <Text style={styles?.medText}>It is time to take your medication</Text>

      <MedCard med={med}/>

      <View style={styles.btnsContainer}>
        <TouchableOpacity 
        style={styles.closeBtn}
        onPress={() => {UpdateMedStatus("Missed")}}
        >
          <Feather name="x" size={24} color="black" />
          <Text >Missed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.takenBtn}
        onPress={() => {UpdateMedStatus("Taken")}}
        >
          <MaterialIcons name="gpp-good" size={24} color="black" />
          <Text >Taken</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
      style={styles.closeModalBtn}
      onPress={() => router.back()}
      >
        <FontAwesome name="window-close-o" size={44} color="gray" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: Colors.LOGIN
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  medDate: {
    fontSize: 18,
    marginTop: 15,
    color: Colors.ORANGE
  },
  medReminder: {
    fontWeight: "bold",
    fontSize: 32,
    marginTop: 10,
    color: Colors.ORANGE
  },
  medText: {
    fontSize: 18,
    color: Colors.ORANGE,
    marginTop:5
  },
  btnsContainer: {
    flexDirection: "row",
    gap: 15,
    marginTop: 30
  },
  closeBtn: {
    padding: 12,
    flexDirection: "row",
    gap: 5,
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 10,
  },
  takenBtn: {
    padding: 12,
    flexDirection: "row",
    gap: 5,
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: Colors.ORANGE,
    borderRadius: 10,
  },
  closeModalBtn: {
    position: "absolute",
    bottom: 40
  }
})