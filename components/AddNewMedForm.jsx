import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import React, { useState } from 'react';
import Colors from '../Constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AddNewMedForm() {

  const [data, setData] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const onHandleInputChange = (inputField, inputValue) => {
    setData(prevValue => ({
      ...prevValue,
      [inputField]: inputValue
    }));
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
    setModalVisible(false); 
  };

  return (
    <View style={styles.mainContainer}>
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
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="time" size={24} color="black" style={styles.inputIcon}/>
          <Text style={styles.timingButtonText}>
            {data?.when || "⬇️ Select Timing"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
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
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  }
});
