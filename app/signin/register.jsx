import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors'
import { useRouter } from 'expo-router'

export default function register() {

    const router = useRouter();

  return (
    <View style={styles?.mainContainer}>
        <Text style={styles?.loginMainHeader}>Create New Account</Text>
        <View style={styles?.viewInputs}>
            <Text style={styles?.emailPasswordLabels}>Username</Text>
            <TextInput placeholder='Username' style={styles?.emailPasswordInputs}></TextInput>
        </View>
        <View style={styles?.viewInputs}>
            <Text style={styles?.emailPasswordLabels}>Email</Text>
            <TextInput placeholder='Email' style={styles?.emailPasswordInputs}></TextInput>
        </View>

        <View style={styles?.viewInputs}>
            <Text style={styles?.emailPasswordLabels}>Password</Text>
            <TextInput placeholder='Password' style={styles?.emailPasswordInputs} secureTextEntry={true}></TextInput>
        </View>
    
        <TouchableOpacity style={[styles?.button,  { backgroundColor: Colors.ORANGE }]}>
            <Text style={styles?.buttonText}>Register</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles?.button} onPress={() => {router.push("signin/login")}}>
            <Text style={styles?.buttonText}>Have You Account ? Login</Text>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    mainContainer: {
        display:"flex",
        alignItems: "center",
        height: "100%",
        backgroundColor: Colors.LOGIN,

    },

    loginMainHeader: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 70,
        color: Colors.ORANGE,
    },

    loginSecondHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 12,
        color: Colors.MAIN,
    },
    viewInputs: {
      marginTop: 30,
    },
    emailPasswordLabels: {
      color: Colors.MAIN,
      textAlign: "center",
    },
    emailPasswordInputs: {
      borderWidth: 1,
      padding: 8,
      borderRadius: 5,
      marginTop: 5,
      minWidth: "80%",
      backgroundColor:Colors.MAIN,
    },
    button: {
      padding: 20,
      backgroundColor: Colors.MAIN,
      borderRadius: 20,
      marginTop: 40,
      minWidth: "80%",
    },
    buttonText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold"
    },
})