import { View, Text, Button } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../FirebaseConfig'

export default function index() {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={() => signOut(auth)}></Button>
    </View>
  )
}