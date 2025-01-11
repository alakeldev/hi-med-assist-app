import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MedCard({med}) {
  return (
    <View style={styles.mainContainer}>
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.imageMed} source={require("./../assets/images/gpills.png")} />
            </View>
            <View style={{width: "80%"}}>
                <Text style={styles.textCardMed}>1} {med?.name}</Text>
                <Text style={[styles.textCardMed, {color:"blue"}]}>2} {med?.when}</Text>
                <Text style={[styles.textCardMed, {color: "green"}]}>3} {med?.dosage} (Capsules or mL)</Text>
                <View style={styles.textCardMed, styles.reminderContainer}>
                    <Text style={styles.reminderText}>4} {med?.timeReminder}</Text>
                    <Ionicons name="alarm-outline" size={24} color="black" style={styles.iconAlarm}/>
                </View>
            </View>
        </View>
        
    </View>
  )
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.MAIN,
        marginTop: 20,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    imageContainer: {
        padding: 8,
        borderRadius: 10,
        marginRight: 12
    },
    imageMed: {
        width: 45,
        height: 45,
    },
    textCardMed: {
        fontWeight: "bold",
        padding: 5,
        fontSize: 15,
    },
    reminderContainer: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        marginLeft: 6,
        fontWeight: "bold",
    },
    reminderText: { 
        fontWeight: "bold",
        fontSize: 15,
        color: "red"
    },
    iconAlarm: {
        marginRight: 5,
        marginLeft: 5, 
        color: "red"
    }
})