import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AddNewMedHeader from '../../components/AddNewMedHeader'
import Colors from '../../Constants/Colors';
import AddNewMedForm from '../../components/AddNewMedForm';

export default function NewMed() {
  return (
    <View style={styles.mainContainer}>
      <AddNewMedHeader />
      <AddNewMedForm />
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