import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useFonts } from 'expo-font';
import { Icon } from 'react-native-paper';
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import BottomBar from "./BottomBar";

const EventListingPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const navigation = useNavigation();

  const [isLoaded] = useFonts({
    "Cochin": require("../assets/fonts/cochin.otf")
  });

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const fetchEvents= () => {
    axios({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://172.20.10.2:5000/events/getAllEvents'
    }).then (
      (res)=>{
        
        function filteronGoingEvents(value, index, array) {
          const currentDate = new Date()
          eventDate = new Date(value['event_date'])
          if (eventDate >= currentDate) {
            return value
          }
          
        }
        function filterCompletedEvents(value, index, array) {
          const currentDate = new Date()
          eventDate = new Date(value['event_date'])
          if (eventDate < currentDate) {
          return value
          }
        }
        function mapdate(value, index, array) {
          value['event_date'] = value['event_date'].substring(0,10)
          return value
        }
        var temp = res['data']['events'].filter(filteronGoingEvents)
        temp = temp.map(mapdate)
        setUpcomingEvents(temp)
        temp = res['data']['events'].filter(filterCompletedEvents)
        temp.map(mapdate)
        setCompletedEvents(temp)


      },
      (err) => {
          console.log(err)
      }
      )
    }
    useEffect(() => {
      fetchEvents()
    }, []);

 

  const ongoingEvents = [
    { id: "6", name: "Workshop Series", date: "Ongoing", location: "Anugraha Hall" },
    { id: "7", name: "Art Exhibition", date: "Ongoing", location: "AB I Parking" },
  ];

  return (
    <>
    <View style={styles.navigationBar}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>&#8801;</Text>
        </TouchableOpacity>
        <Text style={styles.appName} onPress={toggleMenu}>UniMeet</Text>
        <View style={styles.spacer} />
        <View style = {styles.loginIcon}>
          <Text style={styles.profileInitial}>Q</Text>
          {/* <Icon source={"account"} color="white" size={35}/> */}
        </View>
      </View>
      {menuVisible && (
        <View style={styles.menu}>
          <Text style={styles.menuItem} onPress={()=>navigation.navigate('Home')}>Home</Text>
          <Text style={styles.menuItem} onPress={() => navigation.navigate('registeredEvents', user_id = 'Q')}>Registered Events</Text>
          {/* <Text style={styles.menuItem}>Notifications</Text> */}
          <Text style={styles.menuItem} onPress={()=>navigation.navigate('calendar')}>Calendar</Text>
        </View>
      )}
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.eventsHeader}>Upcoming Events</Text>
      {upcomingEvents.map(item => (
        <View style={styles.eventItem} key={item.event_id} onPress = {() =>navigation.navigate('event', {event_id: item.event_id, user_id: 'Q'})}>
          <Text style={styles.eventName} onPress = {() =>navigation.navigate('event', {event_id: item.event_id})}>{item.event_name}</Text>
          <Text style={styles.eventDetails} onPress = {() =>navigation.navigate('event', {event_id: item.event_id})}>{item.event_date} | {item.event_venue}</Text>
        </View>
      ))}
      <Text style={styles.eventsHeader}>Completed Events</Text>
      {completedEvents.map(item => (
        <View style={styles.eventItem} key={item.event_id} onPress = {() =>navigation.navigate('event', {event_id: item.event_id})}>
        <Text style={styles.eventName} onPress = {() =>navigation.navigate('event', {event_id: item.event_id})}>{item.event_name}</Text>
        <Text style={styles.eventDetails} onPress = {() =>navigation.navigate('event', {event_id: item.event_id})}>{item.event_date} | {item.event_venue}</Text>
      </View>
      ))}
    </ScrollView>
    {/* <BottomBar /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  navigationBar: {
    // width: '100%',
    height: '13%',
    backgroundColor: "#AA336A",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    verticalAlign: "center"
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
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Helvetica',
  },
  spacer: {
    flex: 1,
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 30
  },
  loginIcon: {
    // width: 50,
    // height: 50,
    backgroundColor: "#AA336A",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 26,  // Adjust font size
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Helvetica',
  },
  eventItem: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
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
});

export default EventListingPage;