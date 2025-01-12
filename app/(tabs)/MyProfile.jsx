import { View, Text, Button } from 'react-native';
import React from 'react'
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import Toast from 'react-native-toast-message'

export default function MyProfile() {

  const router = useRouter()
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
      router.replace("signin")
      showToast("Logged out. Stay healthy!")
    } catch (error){
      showToast(`Error: ${error.message}`, 'error');
    }
  }

  return (
    <View>
      <Text>MyProfile</Text>
      <Button title='Logout' onPress={handleLogout}></Button>
    </View>
  )
}