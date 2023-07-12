import { StatusBar } from 'expo-status-bar';
import { Switch, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';


const AddAlarm =() =>{
    
    const [showPicker, setShowPicker] = React.useState(false);
    const [selectedTime, setSelectedTime] = React.useState(new Date());
    const [alarms, setAlarms] = useState([]);

    const handleTimeChange = (event, time) => {
      if (event.type === 'set') {
        setSelectedTime(time || selectedTime);
      }
      setShowPicker(false);
    };
  
    const showTimePicker = () => {
      setShowPicker(true);
    };


  const Navigation = useNavigation();    
    useEffect(() =>{
        Navigation.setOptions({
                  headerShown: false,
                });
    }, []);

    const handleAddAlarm = async() => {
        const newAlarm = { id: Date.now(), time: selectedTime.toLocaleTimeString() };
        console.log(newAlarm)
        const storedAlarms = await AsyncStorage.getItem('alarms');
        if (storedAlarms == null) {
            try{
                await AsyncStorage.setItem('alarms', JSON.stringify(newAlarm));

            } catch(error)
            {
                console.log("Hi")
            }
        }
        else{
          const alarms = JSON.parse(storedAlarms);
          const updatedAlarms = [...alarms, newAlarm];
            try{
                await AsyncStorage.setItem('alarms', JSON.stringify(updatedAlarms));
            } catch(error)
            {
                console.log(error)
            }   

        }
            
    };

    return(
        <SafeAreaView style={Styles.Main}> 
  <Pressable onPress={() => Navigation.navigate('AllAlarms')} style={{position:'absolute', top:30, left:10}}>
      <Ionicons name="chevron-back-circle" size={50} color="white" />
      </Pressable>  
         <View  style={{ display:'flex', flexDirection:'column-reverse', gap:5}}>
    <Pressable  onPress={handleAddAlarm} style={{alignItems:'center',backgroundColor:'white', borderRadius:50, padding:5,}} ><Text>Save</Text></Pressable>
      <Pressable  onPress={showTimePicker} style={{alignItems:'center',backgroundColor:'#F0DFC8', borderRadius:50, padding:5,}} ><Text>Pick Time</Text></Pressable>
      {showPicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="clock"
          onChange={handleTimeChange}
          disableClockSeconds={true} 
        />
      )}
      {selectedTime && !showPicker && <Text style={{ fontSize: 40 }}>{selectedTime.toLocaleTimeString()}</Text>}
    </View>
          <Navbar/>
        <StatusBar style="auto" />
        </SafeAreaView>
    )
  }

  export default AddAlarm;

  const Styles= StyleSheet.create(
    {
        Main: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: '#51ABB2',
        },
       

    


    })