import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../Constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function MedCard({ med, selDate = "" }) {
  const [medStatus, setMedStatus] = useState(null);

  useEffect(() => {
    checkMedStatus();
  }, [med, selDate]);

  const checkMedStatus = () => {
    const data = Array.isArray(med?.action) ? med.action.find((item) => item.date == selDate) : null;
    setMedStatus(data);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <View style={styles.textBox}>
            <Text style={styles.textCardMed}>Name: {med?.name}</Text>
          </View>
          <View style={[styles.textBox, styles.textWhenBox]}>
            <Text style={[styles.textCardMed, {color: "blue"}]}>Time: {med?.when}</Text>
          </View>
          <View style={[styles.textBox, styles.textDosageBox]}>
            <Text style={[styles.textCardMed, {color: "green"}]}>Dosage: {med?.dosage}</Text>
          </View>
          <View style={[styles.textBox, styles.reminderContainer]}>
            <Ionicons name="alarm-outline" size={24} style={styles.iconAlarm} />
            <Text style={styles.reminderText}>{med?.timeReminder}</Text>
          </View>
        </View>
        {medStatus?.date && (
          <View style={styles.statusIconContainer}>
            {medStatus?.status == "Taken" ? (
              <AntDesign name="checkcircle" size={24} color="green" />
            ) : (
              medStatus?.status == "Missed" && <Entypo name="circle-with-cross" size={24} color="red" />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.ORANGE,
    marginTop: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.MAIN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
  },
  textContainer: {
    alignItems: 'center',
  },
  textBox: {
    borderWidth: 2,
    borderColor: '#cecece',
    padding: 10,
    marginBottom: 8,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  textCardMed: {
    fontWeight: '700',
    fontSize: 16,
    color: '#333',
  },
  textWhenBox: {
    borderColor: 'blue',
  },
  textDosageBox: {
    borderColor: 'green',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'red',
  },
  reminderText: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
  },
  iconAlarm: {
    marginRight: 5,
    color: 'red',
  },
  statusIconContainer: {
    marginTop: 15,
  },
});
