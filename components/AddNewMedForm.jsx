import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../Constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { db } from "../FirebaseConfig";
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function AddNewMedForm() {

  const router = useRouter();
  const [data, setData] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTimingModal, setShowTimingModal] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email);
    };
    fetchUserEmail();
  }, []);

  const onHandleInputChange = (inputField, inputValue) => {
    if (inputValue.length > 20) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Please enter no more than 20 characters',
        visibilityTime: 3000,
      });
    } else {
      setData(prevValue => ({
        ...prevValue,
        [inputField]: inputValue
      }));
    }
  };

  const timingOptions = [
    "Before The Breakfast",
    "After The Breakfast",
    "Morning",
    "Before The Lunch",
    "After The Lunch",
    "Afternoon",
    "Evening",
    "Before The Dinner",
    "After The Dinner",
    "Before Sleeping",
  ];

  const handleTimingSelect = (item) => { 
    onHandleInputChange("when", item); 
    setShowTimingModal(false); 
  };

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      const formattedTime = formatTime(selectedDate);
      if (datePickerMode === 'start') {
        onHandleInputChange("startDate", formattedDate);
      } else if (datePickerMode === 'end') {
        onHandleInputChange("endDate", formattedDate);
      } else if (datePickerMode === 'time') {
        onHandleInputChange("timeReminder", formattedTime);
      }
    }
    setShowDatePicker(false);
  };

  const openDatePicker = (mode) => {
    setDatePickerMode(mode);
    setCurrentDate(new Date());
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const calculateDateRange = (startDate, endDate) => {
    const start = new Date(startDate.split('.').reverse().join('-'));
    const end = new Date(endDate.split('.').reverse().join('-'));
    const dateArray = [];
    let currentDate = start;

    while (currentDate <= end) {
      dateArray.push(formatDate(new Date(currentDate)));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  const SaveMedication = async () => {
    const docId = Date.now().toString();

    if (!(data?.name && data?.dosage && data?.startDate && data?.endDate && data?.timeReminder)) {
      Alert.alert("All fields are required!");
      return;
    }

    const dateRange = calculateDateRange(data.startDate, data.endDate);

    try {
      await setDoc(doc(db, "Medicine", docId), {
        ...data,
        userEmail: userEmail,
        docId: docId,
        dateRange: dateRange,
      });
      Alert.alert("Medication saved successfully!");
      router.push("(tabs)");
    } catch (e) {
      console.log(e);
      Alert.alert("Failed to save medication.");
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.mainText}>Add New Medication</Text>
      <View style={styles.iconAndInputGroup}>
        <FontAwesome5 name="notes-medical" size={24} color="black" style={styles.inputIcon}/>
        <TextInput 
          placeholder="Enter Medicine Name" 
          placeholderTextColor="#7e7e7e" 
          style={styles.textInputGroup}
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>
      <View style={styles.iconAndInputGroup}>
        <Fontisto name="pills" size={24} color="black" style={styles.inputIcon}/>
        <TextInput 
          placeholder="Enter Medicine Dosage Ex. 2, 5ml" 
          placeholderTextColor="#7e7e7e" 
          style={styles.textInputGroup}
          onChangeText={(value) => onHandleInputChange("dosage", value)}
        />
      </View>
      <View style={styles.iconAndInputGroup}>
        <TouchableOpacity 
          style={styles.timingButton}
          onPress={() => setShowTimingModal(true)}
        >
          <Ionicons name="time" size={24} color="black" style={styles.inputIcon}/>
          <Text style={styles.timingButtonText}>
            {data?.when || "⬇️ Select Timing"}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={showTimingModal}
        onRequestClose={() => setShowTimingModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={timingOptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem}
                  onPress={() => handleTimingSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowTimingModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.dateInputGroup}>
        <TouchableOpacity 
          style={[styles.iconAndInputGroup, {flex: 1}]}
          onPress={() => openDatePicker('start')}
        >
          <Ionicons name="calendar-clear" size={24} color="black" style={styles.inputIcon}/>
          <Text style={styles.dateText}>{data.startDate || "Start Date"}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.iconAndInputGroup, {flex: 1}]}
          onPress={() => openDatePicker('end')}
        >
          <Ionicons name="calendar" size={24} color="black" style={styles.inputIcon}/>
          <Text style={styles.dateText}>{data.endDate || "End Date"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dateInputGroup}>
        <TouchableOpacity 
          style={[styles.iconAndInputGroup, {flex: 1}]}
          onPress={() => openDatePicker('time')}
        >
          <Ionicons name="alarm" size={24} color="black" style={styles.inputIcon}/>
          <Text style={styles.dateText}>{data.timeReminder || "Time Reminder"}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode={datePickerMode === 'start' || datePickerMode === 'end' ? 'date' : 'time'}
        date={currentDate}
        onConfirm={handleDateChange}
        onCancel={() => setShowDatePicker(false)}
      />

      <TouchableOpacity style={styles.addBtn} onPress={SaveMedication}>
        <Text style={styles.addBtnText}>Add New Medicine</Text>
      </TouchableOpacity>
      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
  },
  mainText: {
    color: Colors.ORANGE,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  iconAndInputGroup: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.ORANGE,
    backgroundColor: Colors.MAIN,
    marginTop: 25,
  },
  textInputGroup: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  inputIcon: {
    color: Colors.LOGIN,
    borderRightWidth: 1,
    paddingRight: 10,
  },
  timingButton: { 
    display: "flex",
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
  },
  timingButtonText: { 
    color: "black",
    paddingLeft: 5,
    width: "90%"
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0,0,0,0.5)", 
  },
  modalContent: {
    width: "80%", 
    backgroundColor: "white", 
    padding: 20, 
    borderRadius: 10, 
  },
  modalItem: { 
    padding: 10, 
    borderBottomWidth: 1,
    borderBottomColor: Colors.MAIN, 
  },
  modalItemText: { 
    fontSize: 18, 
    textAlign: "center",
  },
  closeButton: { 
    marginTop: 10, 
    padding: 10, 
    backgroundColor: Colors.ORANGE, 
    borderRadius: 5, 
  },
  closeButtonText: { 
    color: "white", 
    textAlign: "center", 
  },
  dateText: {
    fontSize: 15,
    padding: 5
  },
  dateInputGroup: {
    flexDirection: "row",
    gap: 3
  },
  addBtn: {
    padding: 20,
    backgroundColor: Colors.ORANGE,
    borderRadius: 20,
    marginTop: 40,
    minWidth: "80%",
    marginBottom: 30
  },
  addBtnText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  }
});
