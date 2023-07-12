import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllAlarms from './components/AllAlarms';
import TaskView from './components/TaskView';
import AddAlarm from './components/AddAlarm';
import Voice from './components/Voice';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{
        headerStyle: { elevation: 0,  backgroundColor: '#51ABB2', borderBottomWidth: 0},
        cardStyle: { backgroundColor: '#51ABB2' }
    }} >
        <Stack.Screen name="TaskView" component={TaskView} />
        <Stack.Screen name="AllAlarms" component={AllAlarms} />
        <Stack.Screen name="AddAlarm" component={AddAlarm} />
        <Stack.Screen name="Voice" component={Voice} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
