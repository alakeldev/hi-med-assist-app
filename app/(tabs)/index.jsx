import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors'
import Header from '../../components/Header'

export default function index() {
  return (
    <View style={styles.mainContainer}>
      <Header />
    </View>
  )
}


const styles = StyleSheet.create({

  mainContainer: {
    padding: 20,
    backgroundColor: Colors.LOGIN,
    height: "100%",
  }
})