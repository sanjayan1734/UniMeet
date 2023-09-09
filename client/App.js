import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
// import Authenitcationpage from './Pages/AuthenticationPage';
import SignUpPage from './Pages/SignUp'

export default function App() {
  return (
    <SafeAreaProvider>
      <SignUpPage />
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
