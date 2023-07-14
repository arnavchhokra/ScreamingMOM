
import * as React from 'react';
import {
  Vibration,
  StatusBar,
  Easing,
  Pressable,
  Image,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
const { width, height } = Dimensions.get('window');
const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Navbar from './Navbar';
import { Audio } from 'expo-av';



const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;







export default function TaskView() {


  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [duration ,setDuration] = React.useState(timers[0]);
  const timerAnimation = React.useRef(new Animated.Value(height )).current;
  const buttonAnimation = React.useRef(new Animated.Value(0)).current;
  const inputRef=  React.useRef();

  const [sound, setSound] = React.useState();

  const devaudioFiles = ['../assets/Sounds/Audio-1.mp3', '../assets/Sounds/Audio-1.mp3', '../assets/Sounds/Audio-1.mp3'];
  const indiamomaudioFiles = ['../assets/Sounds/Audio-1.mp3', '../assets/Sounds/Audio-1.mp3', '../assets/Sounds/Audio-1.mp3'];
  const indiadevFiles = ['../assets/Sounds/Audio-1.mp3', '../assets/Sounds/Audio-1.mp3', '../assets/Sounds/Audio-1.mp3'];

  let paused = false;


  async function playSound(num) {
    console.log('hi');
    if(num<=3)
    {
    console.log('Loading Sound');
    let sound;
    switch(num){
      case 0:
        break;
      case 1:
        try{
          if(!paused)
          {
          ({sound} = await Audio.Sound.createAsync(require('../assets/Sounds/Audio-1.mp3')));
          setSound(sound);
          await sound.playAsync();
          }
          else{
            paused = false;
          }
        }catch(e){
          console.log("Error here")
        }
        break;
      case 2:
        try{
          if(!paused)
          {
          ({sound} = await Audio.Sound.createAsync(require('../assets/Sounds/Audio-2.mp3')));
          setSound(sound);
          await sound.playAsync();
          }
          else{
            paused=false;
          }
        }catch(e){
            console.log("Error here 2")
          }
          break;
      case 3:
        try{
          if(!paused)
          {
          ({sound} = await Audio.Sound.createAsync(require('../assets/Sounds/Audio-3.mp3')));
          setSound(sound);
          await sound.playAsync();
          }
          else{
            paused=false;

          }
        }catch(e){
            console.log("Error here 3")
          }
          break;
      default:
        break;
    }
    console.log('Playing Sound');

    try{await new Promise(resolve => setTimeout(resolve, 15000));}
    catch(e)
    {
      console.log("Error in timing");
    }
    if(!paused)
    {
    playSound(num+1);
    }
    else{
      paused=false;
    }
    }

    else{
      try{await new Promise(resolve => setTimeout(resolve, 15000));}
      catch(e)
      {
        console.log("Error in timing");
      }      
      if(!paused)
      {
        playSound(1);
      }
      else{
          paused=false;
      }
    }

  }


  const animation = React.useCallback(() =>{
    playSound(1);
    Animated.sequence([
     Animated.timing(buttonAnimation, {toValue:1, duration:300, useNativeDriver: true}),
      Animated.timing(timerAnimation, {toValue:0, duration:300, useNativeDriver: true}),
      Animated.timing(timerAnimation, {toValue:height, duration: duration * 60000, useNativeDriver: true})
    ]).start(()=>{
      Vibration.cancel();
      Vibration.vibrate();
      paused = true;
      Animated.timing(buttonAnimation, {toValue:0, duration:300, useNativeDriver: true}).start()
    })
  },[duration])

  const Navigation = useNavigation();    
  React.useEffect(() =>{
      Navigation.setOptions({
                headerShown: false,
              });

  }, []);



  const opacity = buttonAnimation.interpolate({inputRange: [0,1], outputRange: [1,0]})
  const translateY = buttonAnimation.interpolate({inputRange: [0,1], outputRange: [0,200]})
  const textOpacity =  buttonAnimation.interpolate({inputRange: [0,1], outputRange: [0,1]}) 
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={[StyleSheet.absoluteFillObject, {height, backgroundColor: colors.red, width, transform:[{
        translateY: timerAnimation
      }]}]} />
       <View style={{position:'relative'}}>
       <Image style={{height:40, width:100, top:50, zIndex:1}} source={require('../assets/Anger.png')}/>
          <Image style={{height:255, width:203}} source={require('../assets/ScreamingMA.png')}/>
        </View>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 100,
            opacity,
           transform:[{
             translateY
           }]
          },
        ]}>
        <TouchableOpacity onPress={() => Navigation.navigate('Voice')} style={{backgroundColor:"white", borderRadius:5, width:60, height:30, alignItems:'center', justifyContent:'center', marginBottom:20,  }}><Text style={{fontWeight:600}}>VOICE</Text></TouchableOpacity>
        <TouchableOpacity
          onPress={animation}>
          <View
            style={styles.roundButton}
          />
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: height / 7,
          left: 0,
          right: 0,
          flex: 1,
        }}>
          <Animated.View style={{position:'absolute', width:ITEM_SIZE, justifyContent:'center', alignSelf:'center', alignItems:'center', opacity:textOpacity}}>
            <TextInput ref={inputRef} style={styles.text} defaultValue={duration.toString()}/>
          </Animated.View>
          <Animated.FlatList data={timers} keyExtractor={item=>item.toString()} 
          initialScrollIndex={0}
          horizontal
     onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX} }}], { useNativeDriver: true }
      )} 
        onMomentumScrollEnd={ev=>{  const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE); 
          setDuration(timers[index]);
      }} 
          bounces={false}
          style={{flexGrow:0, opacity}}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          contentContainerStyle={{paddingHorizontal:ITEM_SPACING}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index}) =>{
            const inputRange =[(index-1) * ITEM_SIZE, index * ITEM_SIZE, (index+1) * ITEM_SIZE]
            const opacity = scrollX.interpolate({inputRange, outputRange: [.4,1,.4]})
            const scale = scrollX.interpolate({inputRange, outputRange: [.7,1,.7]})
            return <View style={{width:ITEM_SIZE, justifyContent:'center', alignItems:'center'}}><Animated.Text style={[styles.text, {opacity, transform:[{scale}]}]}>{item}</Animated.Text></View>
          }} />


        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#51ABB2',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    color: colors.text,
    fontWeight: '900',
  }
});