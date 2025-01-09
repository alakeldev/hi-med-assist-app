import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors';
import { useRouter } from 'expo-router';

export default function EmptyMedState() {
    const router = useRouter()

  return (
    <View style={styles.mainContainer}>
        <Image 
        source={require("../assets/images/medicine.png")}
        style= {styles.emptyImage}
        />
        <Text style={styles.emptyText}>No Medications Found</Text>
        <Text style={styles.emptySubText}>Please add your medications to stay on track with your health</Text>

        <TouchableOpacity style={styles.addNewMedBtn} onPress={() => router.push("/new-med")}>
            <Text style={styles.btnText}>+ Add New Medication</Text>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 75,
        display: "flex",
        alignItems: "center"
    },
    emptyImage: {
        width: 150,
        height: 150,
    },
    emptyText: {
        fontSize: 30,
        color: Colors.ORANGE,
        fontWeight: "bold",
        marginTop: 20
    },
    emptySubText: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        marginTop: 15,
        fontWeight: "bold",
    },
    addNewMedBtn: {
        backgroundColor: Colors.ORANGE,
        padding: 20,
        borderRadius: 10,
        width: "100%",
        marginTop: 40
    },
    btnText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    }
})