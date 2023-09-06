import { View, Button, Text, StatusBar, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Authenitcationpage() {
    const insets =  useSafeAreaInsets();
    return (
        <SafeAreaProvider>
            <View style = {{paddingTop: insets.top, flex: 1}}>
                <View style = {styles.page}>
                    <View style = { styles.header }>
                        <Image source={require('../assets/logo.jpg')} />
                    </View>
                    <View style = {styles.body}>
                        <Text style = {styles.text}>Username</Text>
                        <TextInput placeholder="Username" style = {styles.textinput}/>
                        <Text style = {styles.text}>Password</Text>
                        <TextInput placeholder="Password" style = {styles.textinput} />
                        <TouchableOpacity >
                            <View style = {styles.buttonstyle}>
                                <Text style = {styles.textstyle}>
                                    Login
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Text style = {styles.text}> Don't have an account?</Text>
                        <TouchableOpacity >
                            <View style = {styles.buttonstyle}>
                                <Text style = {styles.textstyle}>
                                    Signup
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <StatusBar style="auto" />
                    </View>
                </View>
            </View>
        </SafeAreaProvider>
    );

}

const styles = StyleSheet.create(
    {
        page: {
            flexDirection: "column",
            flex: 1,
            justifyContent: "flex-start"
        },
        header: {
            flex: 3,
            backgroundColor: "#FBF6F4"
        },
        body: {
            flex: 3,
            backgroundColor: "#e5ad9a",
            borderTopStartRadius: 35,
            borderTopEndRadius: 35
        
        },
        buttonstyle: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 2,
            width: '87%',
            alignSelf: "center",
            marginBottom: "5%",
            marginTop: "3%",
            borderColor: "white",
            
        },
        textstyle: {
            textAlign: "center",
            color: "white",
            fontWeight: "500",
            fontSize: 15
        },
        textinput: {
            height: 40,
            margin: 7,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            width: "87%",
            alignSelf: "center",
            color: "white",
            borderColor: "white",
            fontSize: 15
        },
        text: {
            paddingLeft: "3%",
            marginTop: '5%',
            color: "white",
            fontWeight: "500",
            fontSize: 15
        },
        topmargin: {
            
        }
    }
)