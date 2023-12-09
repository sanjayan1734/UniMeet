import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, TextInput } from "react-native";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEvent = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [chiefGuest, setChiefGuest] = useState("");
  const [description, setDescription] = useState("");
  const [showPicker, setshowpicker] = useState(true);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleAddEvent = () => {
    // Implement logic to handle the new event data
    console.log("New Event Details:", {
      eventName,
      eventDate,
      location,
      chiefGuest,
      description,
    });

    axios({
      method: 'post',
      url: 'http://172.20.10.2:5000/events/addEvent',
      data: {
        name: eventName,
        date: eventDate,
        location: location,
        description: description,
        chief_guest: chiefGuest
      }
    }).then(
      (response) => {
        console.log(response.data)
        if (response.data.status == 200) {
          alert("Event added successfully")
      }
      (err) => {
        console.log(err)
      }
    })
    // Clear the form fields
    setEventName("");
    setEventDate("");
    setLocation("");
    setChiefGuest("");
    setDescription("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>&#8801;</Text>
        </TouchableOpacity>
        <Text style={styles.appName}>UniMeet</Text>
        <View style={styles.loginIcon}>
          <Text style={styles.profileInitial}>P</Text>
        </View>
      </View>
      {menuVisible && (
        <View style={styles.menu}>
          <Text style={styles.menuItem} >New Event</Text>
          <Text style={styles.menuItem} onPress = {() => {navigation.navigate('admin')}}>Delete Event</Text>
          <Text style={styles.menuItem} onPress = {() => {navigation.navigate('calendar')}}>Calendar</Text>
        </View>
      )}
      <Text style={styles.eventsHeader}>New Event</Text>
      <View style={styles.inputForm}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event name"
            value={eventName}
            onChangeText={(text) => setEventName(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event date"
            value={eventDate}
            onChangeText={(text) => setEventDate(text)}
            onPressIn={() => {setshowpicker(true)}}
            // onPressOut={() => {setshowpicker(false)}}
          />
          {/* {showPicker && (
          <DateTimePicker display="spinner" value = {new Date()} onChange={(text) => setEventDate(text)}/>
          )} */}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event location"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Chief Guest:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter chief guest name"
            value={chiefGuest}
            onChangeText={(text) => setChiefGuest(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={styles.addButtonLabel}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  navigationBar: {
    width: "100%",
    height: 100,
    backgroundColor: "#AA336A",
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    marginRight: 10,
    fontSize: 24,
  },
  menuButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: Platform.OS === "android" ? "sans-serif" : "Helvetica",
    flex: 1,
  },
  loginIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#AA336A",
  },
  menu: {
    backgroundColor: "#AA336A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  menuItem: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  eventsHeader: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: Platform.OS === "android" ? "sans-serif" : "Helvetica",
  },
  inputForm: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 7,
    width: 300,
    borderColor: "#E5E5E5",
    alignSelf: "center",
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    color: "#333333",
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius:2,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#AA336A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width:200,
    alignSelf: "center",
  },
  addButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateEvent;
