import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import the AntDesign icon set from Expo
import axios from "axios";
import { useNavigation } from '@react-navigation/native';


const AdminMain = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [allEvents, setAllEvents] = useState([]); // Add a new state variable to store all events
  const navigation = useNavigation();
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const getAllEvents = () => {
    // Implement logic to get all events
    console.log("Getting all events");
    axios({
      method: 'get',
      maxBodyLength: Infinity,
      headers: { 
        'Content-Type': 'application/json'
      },
      url: 'http://172.20.10.2:5000/events/getAllEvents',
    }).then (
      (res)=>{
        console.log(res['data'])
        if (res['data']['response'] == "events fetched successfully"){ 
          setAllEvents(res['data']['events'])
          console.log(res['data']['events'])
        }
      },
      (err)=> {
        console.error(err)
      }      
    )
  }

  useEffect(() => {
    getAllEvents();
  }, []);
  const upcomingEvents = [
    { id: "1", name: "Conference 2023", date: "September 20, 2023", location: "Amriteshwari Hall" },
    { id: "2", name: "Seminar Series", date: "October 5, 2023", location: "Pandhal" },
    { id: "3", name: "Tech Expo", date: "November 12, 2023", location: "Library" },
    { id: "4", name: "Fitness Workshop", date: "December 3, 2023", location: "Physical Department" },
    { id: "5", name: "Concert", date: "January 8, 2024", location: "Main Ground" },
  ];

  const handleDeleteEvent = (eventId) => {
    // Implement logic to delete the event with the provided eventId
    console.log("Deleting event with ID:", eventId);
    axios({
      method: 'get',
      maxBodyLength: Infinity,
      headers: { 
        'Content-Type': 'application/json'
      },
      url: 'http://172.20.10.2:5000/events/deleteEventById',
      params: {event_id: eventId}
    }).then (
      (res)=>{
        console.log(res['data'])
        if (res['data']['response'] == "event deleted successfully"){ 
          getAllEvents()
          console.log(res['data']['response'])
        }
      },
      (err)=> {
        console.error(err)
      }      
    )
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>&#8801;</Text>
        </TouchableOpacity>
        <Text style={styles.appName}>UniMeet</Text>
        <View style={styles.spacer} />
        <View style={styles.loginIcon}>
          <Text style={styles.profileInitial}>P</Text>
        </View>
      </View>
      {menuVisible && (
        <View style={styles.menu}>
          <Text style={styles.menuItem} onPress={() => {navigation.navigate('CreateEvent')}}>New Event</Text>
          <Text style={styles.menuItem}>Delete Event</Text>
          <Text style={styles.menuItem} onPress = {() => {navigation.navigate('calendar')}} >Calendar</Text>
        </View>
      )}
      <Text style={styles.eventsHeader}>All Events</Text>
      {allEvents.map((item) => (
        <View style={styles.eventItem} key={item.event_id}>
          <View style={styles.eventDetailsContainer}>
            <Text style={styles.eventName}>{item.event_name}</Text>
            <Text style={styles.eventDetails}>{item.event_date} | {item.event_venue}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => handleDeleteEvent(item.event_id)}>
            <View style={styles.deleteIconContainer}>
              <Text > Delete </Text>
              {/* <AntDesign name="delete" size={24} color="#FF0000" /> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      ))}
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
  },
  spacer: {
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
    borderRadius: 8,
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
  eventItem: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventDetailsContainer: {
    flex: 1,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 6,
  },
  eventDetails: {
    fontSize: 14,
    color: "#666666",
  },
  deleteIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AdminMain;