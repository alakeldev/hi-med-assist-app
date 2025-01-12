import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import Colors from '../../Constants/Colors';


export default function TabLayout() {

    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    });

    useEffect(()=> {
        if(isAuthenticated === false) {
            router.push('/signin')
        }
    }, [isAuthenticated])

  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.ORANGE,
        tabBarInactiveTintColor: Colors.LOGIN,
    }}>
        <Tabs.Screen name='index' 
        options={{
            tabBarLabel: "Home",
            tabBarIcon:({color, size}) => (
                <MaterialIcons name="medical-information" size={size} color={color} />
            )
        }}
        />
        <Tabs.Screen name='AddMed' 
        options={{
            tabBarLabel: "Add Med",
            tabBarIcon:({color, size}) => (
                <MaterialIcons name="notification-add" size={size} color={color} />
            )
        }}
        
        />
        <Tabs.Screen name='MyProfile' 
        options={{
            tabBarLabel: "Account",
            tabBarIcon:({color, size}) => (
                <MaterialIcons name="tag-faces" size={size} color={color} />
            )
        }}
        />
    </Tabs>
  )
}