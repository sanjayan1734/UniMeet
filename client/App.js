import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignUpPage from './Screens/SignUp'
import LoginPage from './Screens/Login';
import EventListingPage from './Screens/Home';
import CalendarPage from './Screens/calendar';
import EventPage from './Screens/event';
import AdminMain from './Screens/adminMain';

const stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();

export default function App() {
  const [isLoaded] = useFonts({
    "Cochin": require("./assets/fonts/cochin.otf")
  });

  if (!isLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <drawer.Navigator>
          <drawer.Screen name="Home" component={EventListingPage} />
          {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
        </drawer.Navigator>
        <stack.Navigator initialRouteName = "login" screenOptions={{headerShown: false}}  >
          <stack.Screen name="Login" component={LoginPage} />
          <stack.Screen name="SignUp" component={SignUpPage} />
          <stack.Screen name="Home" component={EventListingPage} />
          <stack.Screen name = "calendar" component={CalendarPage}/>
          <stack.Screen name = "event" component={EventPage} />
          <stack.Screen name = 'admin' component={AdminMain} />
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
