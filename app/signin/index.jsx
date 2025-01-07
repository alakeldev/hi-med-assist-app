import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../Constants/Colors';
import { useRouter } from 'expo-router';

export default function index() {
  
  const router = useRouter()
  
  return (
    <View style = {{
      backgroundColor: Colors.MAIN,
    }}>
      <View style={styles?.imageContainer}>
        <Image source={require('./../../assets/images/intro.png')} 
          style={styles?.image}
        />
      </View>

      <View style={styles?.headerTextContainer}>
        <Text style={styles?.headerText}>Organise Your Medications Efficiently!</Text>
        <Text style={styles?.subHeaderText}>Stay on track with your health by effortlessly scheduling and monitoring your medication regimen</Text>
        <TouchableOpacity style={styles?.button} onPress={() => {router.push("signin/login")}}>
          <Text style={styles?.buttonText}>Login / Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    display:"flex",
    marginTop: 50,
    alignItems: "center",
    marginBottom: 10,
    
  },
  image: {
    width: 240,
    height: 400,
    borderRadius: 25,
  },
  headerTextContainer: {
    height: "100%",
    padding: 30,
    backgroundColor: Colors.LOGIN,
    
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.ORANGE,
  },
  subHeaderText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 15,
    color: "white",
  },
  button: {
    padding: 20,
    backgroundColor: Colors.MAIN,
    borderRadius: 20,
    marginTop: 20,

  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  }
})