import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import Authenitcationpage from './Pages/AuthenticationPage';

// function Authenitcationpage() {
//   const insets =  useSafeAreaInsets();
//   return (
//     <View style = {styles.AuthenticationPage}>
//       <View className='header' style = { { paddingTop: insets.top}}>
//         <Text>Event Manager</Text>
//       </View>
//     <View style={styles.container}>
      
//       <Button
//       title='Login/ Signup'
//       />
//       <StatusBar style="auto" />
//     </View>
//     </View>
//   );
// }

export default function App() {
  return (
    <SafeAreaProvider>
      <Authenitcationpage />
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
