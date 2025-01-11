import { View, Text, Button, StyleSheet, ScrollView, FlatList } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors'
import Header from '../../components/Header'
import MedList from '../../components/MedList'

export default function index() {
  return (
    <FlatList 
    style={{backgroundColor: Colors.LOGIN}}
    data={[]}
    ListHeaderComponent={
      <View style={styles.mainContainer}>
        <Header />
        <MedList />
      </View>
    }>
      
    </FlatList>
  )
}


const styles = StyleSheet.create({

  mainContainer: {
    padding: 20,
    backgroundColor: Colors.LOGIN,
    height: "100%",
  }
})