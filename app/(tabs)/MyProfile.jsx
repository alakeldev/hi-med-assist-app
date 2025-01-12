import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Constants/Colors';

export default function MyProfile() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        setUserEmail(email);
      } catch (error) {
        showToast(`Error fetching email: ${error.message}`, 'error');
      }
    };
    fetchUserEmail();
  }, []);

  const showToast = (message, type = 'success') => {
    Toast.show({
      type: type,
      position: 'top',
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('signin');
      showToast('Logged out. Stay healthy!');
    } catch (error) {
      showToast(`Error: ${error.message}`, 'error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>😊 {userEmail || 'Fetching email...'} 😊</Text>
      <Button title="Add New Medication" onPress={() => router.push("AddMed")} />
      <Button title="My Medication" onPress={() => router.push("(tabs)")} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.LOGIN
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.ORANGE
  },
});
