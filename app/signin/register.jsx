import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../Constants/Colors';
import { useRouter } from 'expo-router';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { Checkbox } from 'react-native-paper';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

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
    if (!email || !password || !username) {
      showToast('Please fill username, email and password.', 'error');
      return;
    }

    if (!isChecked) {
      showToast('Please agree to the terms and conditions.', 'error');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      showToast('Account created successfully!');

      await updateProfile(user, {
        displayName: username
      })

      router.push("(tabs)");
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
        <TextInput 
          placeholder="Please enter your username" 
          placeholderTextColor="#7e7e7e" 
          style={styles.emailPasswordInputs} 
          onChangeText={(value) => {setUsername(value)}}
        />
      </View>
      <View style={styles.viewInputs}>
        <Text style={styles.emailPasswordLabels}>Email</Text>
        <TextInput
          placeholder="Please enter your email address"
          placeholderTextColor="#7e7e7e"
          style={styles.emailPasswordInputs}
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={styles.viewInputs}>
        <Text style={styles.emailPasswordLabels}>Password</Text>
        <TextInput
          placeholder="Please enter your password"
          placeholderTextColor="#7e7e7e"
          style={styles.emailPasswordInputs}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxBackground}>
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
            color="white"
            uncheckedColor="white"
          />
        </View>
        <Text style={styles.checkboxLabel}>I agree to the terms and conditions</Text>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  checkboxBackground: {
    backgroundColor: Colors.ORANGE,
    padding: 2,
    borderRadius: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: Colors.MAIN,
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
