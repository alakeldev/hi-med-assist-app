import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Constants/Colors';

export default function Header() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <View>
      <View style={styles.mainContainer}>
        <Image 
          source={require("../assets/images/hello.png")} 
          style={styles.helloImage}
        />
        <Text style={styles.usernameText}>Hello, {username}!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  helloImage: {
    width: 50,
    height: 50,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.ORANGE,
    fontSize:30,
    fontWeight: "bold",
  },
});
