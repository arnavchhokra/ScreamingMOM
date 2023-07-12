import { StatusBar } from 'expo-status-bar';
import { Switch, FlatList,TouchableOpacity , StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-community/async-storage';



const AllAlarms =() =>{
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
      };
      const [alarms, setAlarms] = React.useState([]);


  const loadAlarms = async () => {
    try {
      const storedAlarms = await AsyncStorage.getItem('alarms');
      if (storedAlarms !== null) {
        setAlarms(JSON.parse(storedAlarms));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAlarm = async(id) => {
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(updatedAlarms);
    await AsyncStorage.setItem('alarms', JSON.stringify(updatedAlarms));
  };

  const renderAlarm = ({ item }) => (
    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center',width:'100%', borderBottomWidth:1,padding:10 }}>
      <Text style={{fontSize:20}} >{item.time}</Text>
      <TouchableOpacity onPress={() => handleRemoveAlarm(item.id)}>
        <Text style={{alignSelf:'center'}}>Remove</Text>
      </TouchableOpacity>
    </View>
  );




  const Navigation = useNavigation();    
    useEffect(() =>{
        Navigation.setOptions({
                  headerShown: true,
                });
                loadAlarms();
    });

    return(
        <SafeAreaView style={Styles.Main}>
          <FlatList
        data={alarms}
        renderItem={renderAlarm}
        keyExtractor={(item, index) => `${item.id}-${index}`} />  
          <Navbar/>
        <StatusBar style="auto" />
        <Pressable onPress={() => Navigation.navigate('AddAlarm')} style={{position:'absolute', bottom:100, alignSelf:'center', alignItems:'center'}}><Text style={{fontSize:40}}>+</Text></Pressable>
        </SafeAreaView>
    )
  }

  export default AllAlarms;

  const Styles= StyleSheet.create(
    {
        Main: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor: '#51ABB2',
        },
        
        


    


    })