import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function AddNewMedHeader() {

    const router = useRouter()

  return (
    <View style={styles.mainContainer}>
      <Image source={require("../assets/images/addnewmed.png")} style={styles.imageHeader}/>
      <TouchableOpacity style={styles.arrowBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" style={{fontSize: 30, color:Colors.LOGIN}}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

    mainContainer: {
        
    },
    imageHeader: {
        width: "100%",
        height: 250,
    },
    arrowBtn: {
        position: "absolute",
        padding: 15,
    }
})