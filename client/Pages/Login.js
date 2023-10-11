import axios from "axios";
import React, { useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, TextInput, Image, Alert, ScrollView } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import SignUpPage from "./SignUp";
import * as keychain from 'react-native-keychain';


export default function LoginPage() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    var [userid, setUserId] = useState('')
    var [Password, setPassword] = useState('')
    const [error, setError] = useState("");

    const authenticateUser = () => {
        console.log('http://192.168.25.83:5000/users/authenticate/' + userid + '/' + Password)

        let body = JSON.stringify({
            'userid': userid,
            'password': Password,
        });
        console.log(body)

        axios({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://192.168.146.83:5000/users/authenticate/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : body
        }).then(
            (res)=>{
                console.log(res['data'])
                if (res['data']['response'] == "authentication successful"){
                    navigation.navigate('Home')
                }
                else {
                    // createTwoButtonAlert()
                    setError("Invalid Username or Password")
                }
            },
            (err) => {
                console.log(err)
            }
        )
    }
    
    return (
        <SafeAreaProvider>
            <View style={{ paddingTop: insets.top, flex: 1 }}>
                <View style={styles.page}>
                    <Text style={styles.appName}>UniMeet</Text>
                    <View style={styles.header}>
                        <Image source={require('../assets/logo.jpg')} />
                    </View>
                    <View style={styles.body}>
                        <View style={styles.content}>
                            <Text style={styles.text}>Username</Text>
                            <TextInput placeholder="Username" style={[styles.textinput, { color: "#00000080" }]}  onChangeText={text => setUserId(text)}/>
                            <Text style={styles.text}>Password</Text>
                            <TextInput placeholder="Password" style={[styles.textinput, { color: "#00000080" }]} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
                            <Text style={[{color: "red"} ]}>{error}</Text>
                            <TouchableOpacity onPress={authenticateUser}>
                                <View style={styles.buttonstyle}>
                                    <Text style={styles.textstyle}>
                                        Login
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.signupContainer}>
                                <Text style={styles.text}>Don't have an account?</Text>
                            </View>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <View style={[styles.buttonstyle, styles.signupButton]} >
                                        <Text style={[styles.textstyle, styles.signupText]} >
                                            Signup
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            
                        </View>
                        <StatusBar style="auto" />
                    </View>
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    appName: {
        textAlign: "center",
        color: "#AA336A",
        fontFamily: 'Cochin',
        fontWeight: "bold",
        fontSize: 64,
        marginTop: 30,
    },
    page: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "flex-start"
    },
    header: {
        flex: 3,
        backgroundColor: "#AA336A"
    },
    body: {
        flex: 4,
        backgroundColor: "#AA336A",
        borderTopStartRadius: 35,
        borderTopEndRadius: 35,
        paddingHorizontal: "5%",
        paddingTop: "10%",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40%"
    },
    content: {
        width: "100%",
    },
    buttonstyle: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        width: '100%',
        alignSelf: "center",
        marginBottom: "5%",
        marginTop: "7%",
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },

    signupButton: {
        backgroundColor: "#AA336A",
        borderColor: "#AA336A",
    },
    signupText: {
        color: "#ffffff",
    },
    textstyle: {
        textAlign: "center",
        color: "#121212",
        fontWeight: "500",
        fontSize: 16,
    },
    textinput: {
        height: 40,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: "100%",
        color: "#ffffff",
        backgroundColor: "#ffffff",
        fontSize: 15,
    },
    text: {
        paddingLeft: "3%",
        marginTop: '5%',
        color: "#ffffff",
        fontWeight: "500",
        fontSize: 15,
    },
    signupContainer: {
        marginTop: '2%',
    }
});