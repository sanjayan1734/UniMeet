import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { PushNotification } from "react-native";



const EventPage = ({route}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
  const [eventName, setEventName] = useState()
  const [registrationStatus, setRegistrationStatus] = useState(false)
  const navigation = useNavigation()
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const registerPressed = () => {
    if (!registrationStatus) {
      setRegistrationStatus(true)
      alert('Event registered')
    }
  }
  const fetchEvent = () => {
    const eventId = route.params['event_id']

    axios({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://192.168.146.83:5000/events/getEventById',
      params: {event_id: eventId}
    }).then (
      (res)=>{
        console.log(res['data']['event'])
        setEventDetails(res['data']['event'][0])
        // event = res['data']['event'][0]
        // console.log(eventDetails)
      },
      (err) => {
       console.log(err)
      }
    )
  }
  useEffect(() => {
    fetchEvent()
    // console.log(eventName)
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} >
      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>&#8801;</Text>
        </TouchableOpacity>
        <Text style={styles.appName} onPress={toggleMenu}>UniMeet</Text>
        <View style={styles.spacer} />
        <View style={styles.loginIcon}>
          <Text style={styles.profileInitial}>P</Text>
        </View>
      </View>
      {menuVisible && (
        <View style={styles.menu}>
          <Text style={styles.menuItem} onPress={navigation.navigate('Home')}>Home</Text>
          <Text style={styles.menuItem}>Registered Events</Text>
          <Text style={styles.menuItem}>Notifications</Text>
          <Text style={styles.menuItem} onPress={navigation.navigate('calendar')}>Calendar</Text>
        </View>
      )}
      
      <View style={styles.verticalSpace} />
      {eventDetails ? (
        
      <View style={styles.eventDetailsContainer}>
        <View style={styles.eventBox}>
          <Text style={styles.eventsHeader}>{ eventDetails['event_name'] }</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailText}>{eventDetails['event_date']}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Event posted at</Text>
            <Text style={styles.detailText}>{eventDetails['created_at']}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailText}>{eventDetails['event_venue']}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Chief Guest:</Text>
            <Text style={styles.detailText}></Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Speaker:</Text>
            <Text style={styles.detailText}></Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Description:</Text>
          </View>
          <Text style={styles.detailText}>
            {eventDetails['event_description']}
          </Text>
          <TouchableOpacity style={{backgroundColor: registrationStatus? "#33AA73":"#AA336A",
              paddingVertical: 12,  
              paddingHorizontal: 24, 
              borderRadius: 12,      
              marginTop: 30,       
              alignItems: "center"
            }}  onPress={() =>registerPressed()}>
            <Text style={styles.registerButtonText}>{registrationStatus ? "Registered" : "Register"}</Text>
          </TouchableOpacity>
        </View>
      </View>) : (
        <Text>Loading event details...</Text>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },
  navigationBar: {
    width: '100%',
    height: 120, 
    backgroundColor: "#AA336A",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  menuButton: {
    marginRight: 20,
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
  verticalSpace: {
    height: 20,
  },
  eventsHeader: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Helvetica',
  },
  eventDetailsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    alignItems: "center",  
    justifyContent: "center", 
    marginTop: 20, 
  },
  eventBox: {
    backgroundColor: "#F5F5F5",
    padding: 40,        
    borderRadius: 12,   
    borderWidth: 5,     
    borderColor: "#E5E5E5",
    height: '95%',
    width: '95%',     
    marginBottom: 20,  
  },
  detailItem: {
    marginBottom: 20, 
    flexDirection: "row",
    alignItems: "flex-start",
    width: '100%',
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 12,   
    fontSize: 18,     
    color: "#333333",
  },
  detailText: {
    fontSize: 18,      
    color: "#333333",
    flexShrink: 1,
  },
  registerButton: {
    backgroundColor: "#AA336A",
    paddingVertical: 12,  
    paddingHorizontal: 24, 
    borderRadius: 12,      
    marginTop: 30,       
    alignItems: "center",
  },
  registerButtonText: {
    fontSize: 18,      
    color: "#FFFFFF",
  },
});

export default EventPage;