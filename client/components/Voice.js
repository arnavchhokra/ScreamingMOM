import { StatusBar } from 'expo-status-bar';
import { Switch, FlatList,TouchableOpacity , StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-community/async-storage';



const Voice =() =>{
   

  const Navigation = useNavigation();    
    useEffect(() =>{
        Navigation.setOptions({
                  headerShown: true,
                });
    });

    return(
        <SafeAreaView style={Styles.Main}>
        <Text style={{fontSize: 25, marginBottom:40, color:"white", fontWeight:600, marginTop:20, }}>Select Voice</Text>
        <View style={{display:"flex", flexDirection:"row", justifyContent:'space-around', width:'100%', borderBottomWidth:1, borderBottomColor:'white', padding:5, marginTop:10}}>
        <Text style={{fontSize:20, }}>Indian Mom</Text> 
        <TouchableOpacity style={{justifyContent:'center'}}><Text style={{color:"green", fontWeight:600, fontSize:20}}>Select</Text></TouchableOpacity>
        </View>
        <View style={{display:"flex", flexDirection:"row", justifyContent:'space-around', width:'100%', borderBottomWidth:1, borderBottomColor:'white', padding:5, marginTop:10}}>
        <Text style={{fontSize:20, }}>Indian Dad</Text> 
        <TouchableOpacity style={{justifyContent:'center'}}><Text style={{color:"green", fontWeight:600, fontSize:20}}>Select</Text></TouchableOpacity>
        </View>
        <View style={{display:"flex", flexDirection:"row", justifyContent:'space-around', width:'100%', borderBottomWidth:1, borderBottomColor:'white', padding:5, marginTop:10}}>
        <Text style={{fontSize:20, }}>Developer</Text> 
        <TouchableOpacity style={{justifyContent:'center'}}><Text style={{color:"green", fontWeight:600, fontSize:20}}>Select</Text></TouchableOpacity>
        </View>

        
        
      
        
        <StatusBar style="auto" />
        </SafeAreaView>
    )
  }

  export default Voice;

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