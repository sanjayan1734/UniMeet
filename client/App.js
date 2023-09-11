import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpPage from './Pages/SignUp'
import LoginPage from './Pages/Login';
import EventListingPage from './Pages/Home';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <stack.Navigator initialRouteName = "Login" screenOptions={{headerShown: false}}>
          <stack.Screen name="Login" component={LoginPage} />
          <stack.Screen name="SignUp" component={SignUpPage} />
          <stack.Screen name="Home" component={EventListingPage} />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Authenitcationpage: {
    backgroundColor: 'white',
  }
});
