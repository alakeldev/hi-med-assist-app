import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../Constants/Colors';
import { useRouter } from 'expo-router';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';

export default function Register() {
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

  const OnCreateAccount = async () => {
    if (!email || !password) {
      showToast('Please fill in both email and password.', 'error');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      showToast('Account created successfully!');
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        showToast('Email already in use.', 'error');
      } else if (errorCode === 'auth/network-request-failed') {
        showToast('Network error. Please check your connection.', 'error');
      } else {
        showToast(`Error: ${errorMessage}`, 'error');
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.loginMainHeader}>Create New Account</Text>
      <View style={styles.viewInputs}>
        <Text style={styles.emailPasswordLabels}>Username</Text>
        <TextInput placeholder="Username" style={styles.emailPasswordInputs} />
      </View>
      <View style={styles.viewInputs}>
        <Text style={styles.emailPasswordLabels}>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.emailPasswordInputs}
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={styles.viewInputs}>
        <Text style={styles.emailPasswordLabels}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.emailPasswordInputs}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.ORANGE }]}
        onPress={OnCreateAccount}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('signin/login')}>
        <Text style={styles.buttonText}>Have an Account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.LOGIN,
  },
  loginMainHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 70,
    color: Colors.ORANGE,
  },
  viewInputs: {
    marginTop: 30,
  },
  emailPasswordLabels: {
    color: Colors.MAIN,
    textAlign: 'center',
  },
  emailPasswordInputs: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    minWidth: '80%',
    backgroundColor: Colors.MAIN,
  },
  button: {
    padding: 20,
    backgroundColor: Colors.MAIN,
    borderRadius: 20,
    marginTop: 40,
    minWidth: '80%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
