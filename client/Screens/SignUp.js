import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";


export default function SignUpPage() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    let data = JSON.stringify({
      'userid': userId,
      'password': password,
      'firstname': firstName,
      'lastname': lastName 
    });
    console.log(data)
    if (!userId || !password || !firstName || !lastName) {
      setError("All fields are required");
    } else {
      axios({
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://172.20.10.2:5000/users/register',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
      }).then (
        (res)=>{
          if (res['data']['response'] == "registration successful"){
            navigation.navigate('Home')
          }
          else {
            // createTwoButtonAlert()
            setError("Error registering user try again")
          }
        },
        (err) => {
          console.log(err)
        }
      )
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text style={styles.appName}>UniMeet</Text>
        <Text style={styles.heading}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={userId}
            onChangeText={(text) => setUserId(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  contents: {
    backgroundColor: "#AA336A",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderRadius: 10, // Added borderRadius property
  },
  appName: {
    fontSize: 64,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    color: "#ffffff",
    marginBottom: 5,
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#AA336A",
    fontSize: 16,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});