import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false
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