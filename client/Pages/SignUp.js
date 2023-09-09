import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function SignUpPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = () => {
        if (!userId || !password || !firstName || !lastName) {
            setError("All fields are required");
        } else {
            setError("");
            // Handle sign up logic
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.appName}>UniMeet</Text>
            <Text style={styles.heading}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="User ID"
                value={userId}
                onChangeText={(text) => setUserId(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#AA336A",
    },
    appName: {
        fontSize: 64,
        color: "#ffffff",
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Cochin", // Add fontFamily property
    },
    heading: {
        fontSize: 24,
        color: "#ffffff",
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 40,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
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