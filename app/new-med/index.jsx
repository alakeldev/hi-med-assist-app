import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AddNewMedHeader from '../../components/AddNewMedHeader'
import Colors from '../../Constants/Colors';

export default function NewMed() {
  return (
    <View style={styles.mainContainer}>
      <AddNewMedHeader />
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 30,  
    backgroundColor: Colors.LOGIN,
    height: "100%",
  }
})