import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Calendar } from 'react-native-calendars';

const CalendarPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const currentDate = new Date(); // Get the current date

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
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
          <Text style={styles.menuItem}>Registered Events</Text>
          <Text style={styles.menuItem}>Notifications</Text>
          <Text style={styles.menuItem}>Calendar</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.eventsHeader}>Calendar</Text>
        <Calendar 
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: 20,
            borderWidth: 2,
            borderColor: '#AA336A',
          }}
          theme={{
            'stylesheet.day.basic': {
              monthText: {
                fontSize: 16,
                fontWeight: 'bold',
                lineHeight: 18,
                color: '#333333',
              },
            },
          }}
          markedDates={{
            [currentDate.toISOString().split('T')[0]]: {
              selected: true,
              marked: true,
              selectedColor: '#AA336A',
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  navigationBar: {
    height: 100,
    backgroundColor: "#AA336A",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  menuButton: {
    marginRight: 10,
    fontSize: 24,
    color: "#FFFFFF",
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  eventsHeader: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
    fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Helvetica',
  },
});

export default CalendarPage;