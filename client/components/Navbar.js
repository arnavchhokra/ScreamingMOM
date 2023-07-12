import { StatusBar } from 'expo-status-bar';
import { Switch, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, Linking} from 'react-native';
import { PreventRemoveContext, useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

function Navbar() {
    const Navigation = useNavigation();    
    useEffect(() =>{
        Navigation.setOptions({
                  headerShown: false,
                });
    }, []);

  return (
    <SafeAreaView style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%", position:"absolute", bottom:15}}>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around",width:"100%"}}>
            <Pressable onPress={() => Navigation.navigate('AllAlarms')}>
            <Ionicons name="alarm" size={40} color="white" />
            </Pressable >
            <Pressable onPress={() => Navigation.navigate('TaskView')} >
            <Ionicons name="hourglass" size={40} color="white" />
            </Pressable>
            <Pressable onPress={() => Navigation.navigate('Settings')}>
            <Ionicons name="settings" size={40} color="white" />
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

export default Navbar