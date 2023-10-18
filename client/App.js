import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SignUpPage from './Pages/SignUp'
import LoginPage from './Pages/Login';
import EventListingPage from './Pages/Home';
import CalendarPage from './Pages/calendar';
import EventPage from './Pages/event';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <stack.Navigator initialRouteName = "home" screenOptions={{headerShown: false}}  >
          <stack.Screen name="Login" component={LoginPage} />
          <stack.Screen name="SignUp" component={SignUpPage} />
          <stack.Screen name="Home" component={EventListingPage} />
          <stack.Screen name = "calendar" component={CalendarPage}/>
          <stack.Screen name = "event" component={EventPage} />
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
