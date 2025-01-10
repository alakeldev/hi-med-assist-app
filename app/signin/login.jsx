import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../Constants/Colors';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { auth } from '../../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showToast = (message, type = 'success') => {
    Toast.show({
      type: type,
      position: 'bottom',
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const OnLoginClick = async () => {
    if (!email || !password) {
      showToast('Please Enter your email and password.', 'error');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const username = user.displayName;
      if (username) {
        await AsyncStorage.setItem('username', username);
      }

      router.replace('/(tabs)');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-credential') {
        showToast('Invalid Email or Password', 'error');
      } else if (errorCode === 'auth/network-request-failed') {
        showToast('Network error. Please check your connection.', 'error');
      } else {
        showToast(`Error: ${errorMessage}`, 'error');
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.loginMainHeader}>Welcome Back to Your Account</Text>
      <Text style={styles.loginSecondHeader}>Please login to continue</Text>

      <View style={styles.viewInputs}>
        <Text style={styles.emailPasswordLabels}>Email</Text>
        <TextInput 
          style={styles.emailPasswordInputs}
          placeholder="Enter your registered email" 
          placeholderTextColor="#7e7e7e"
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={styles.viewInputs}>
        <Text style={styles.emailPasswordLabels}>Password</Text>
        <TextInput 
          style={styles.emailPasswordInputs} 
          secureTextEntry={true}
          placeholder="Enter your password" 
          placeholderTextColor="#7e7e7e"
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: Colors.ORANGE }]}
        onPress={OnLoginClick}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {router.push("signin/register")}}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.LOGIN,
  },
  loginMainHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.ORANGE,
    marginTop: 70,
  },
  loginSecondHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    color: Colors.ORANGE,
  },
  viewInputs: {
    marginTop: 30,
  },
  emailPasswordLabels: {
    color: Colors.MAIN,
  },
  emailPasswordInputs: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    minWidth: "80%",
    backgroundColor: Colors.MAIN,
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
});
