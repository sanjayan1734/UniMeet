import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";

const EventListingPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const upcomingEvents = [
    { id: "1", name: "Conference 2023", date: "September 20, 2023", location: "Amriteshwari Hall" },
    { id: "2", name: "Seminar Series", date: "October 5, 2023", location: "Pandhal" },
    { id: "3", name: "Tech Expo", date: "November 12, 2023", location: "Library" },
    { id: "4", name: "Fitness Workshop", date: "December 3, 2023", location: "Physical Department" },
    { id: "5", name: "Concert", date: "January 8, 2024", location: "Main Ground" },
  ];

  const ongoingEvents = [
    { id: "6", name: "Workshop Series", date: "Ongoing", location: "Anugraha Hall" },
    { id: "7", name: "Art Exhibition", date: "Ongoing", location: "AB I Parking" },
  ];

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
          <Text style={styles.menuItem}>Registered Events</Text>
          <Text style={styles.menuItem}>Notifications</Text>
          <Text style={styles.menuItem}>Calendar</Text>
        </View>
      )}
      <Text style={styles.eventsHeader}>Upcoming Events</Text>
      {upcomingEvents.map(item => (
        <View style={styles.eventItem} key={item.id}>
          <Text style={styles.eventName}>{item.name}</Text>
          <Text style={styles.eventDetails}>{item.date} | {item.location}</Text>
        </View>
      ))}
      <Text style={styles.eventsHeader}>Ongoing Events</Text>
      {ongoingEvents.map(item => (
        <View style={styles.eventItem} key={item.id}>
          <Text style={styles.eventName}>{item.name}</Text>
          <Text style={styles.eventDetails}>{item.date} | {item.location}</Text>
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
    width: '100%',
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