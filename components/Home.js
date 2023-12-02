import { StyleSheet, Text, View, ImageBackground, TouchableOpacity,Alert} from 'react-native'
import { Svg, Circle, Text as SvgText } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';
import Share from 'react-native-share';
import ViewShot  from 'react-native-view-shot';
import{captureRef} from 'react-native-view-shot';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import{ useEffect, useState, useRef } from 'react';
import img from '../assets/background_image.jpg'
import React from 'react'
import { lightorange } from './Constants'
import Btn from './Btn';


const Home  = ({route,navigation}) => {

  const[calorieConsumed,setCalorieConsumed]=useState(null);
  const user = route.params?.user || { user: { name:"" } };
  const userId=user.user.userId;
 // const bs = React.useRef(null)
  //const user=route.params.user;
 // const[userId,setUserId]=useState();
  // setUserId(user.user.userId);
  // console.log(userId);
 
 // console.log("in home : .....................",userId);
  const goalCalorie=5000;
  const chartRadius = 120;
  const viewShotRef = useRef();
   
  const chartCircumference = 2* Math.PI * chartRadius;
  

  // const displayCalorie=(userId)=>{
  //   fetch(`http://192.168.56.1:8080/calorie/${userId}`,{
  //         method: 'GET',
  //         headers: {'Content-Type': 'application/json'},
  //         body:JSON.stringify()
  //     }).then(res=>res.json())
  //     .then(userCalorie=>setCalorieConsumed(userCalorie.totalCalorie))
  //     console.log("after api call calorie of uesr is ",userCalorie)
  //   }

    const displayCalorie = async () => {
      //const cuserId=user.user.userId;
      console.log("in diaplay..",userId)
      try {
        const response = await fetch(`http://192.168.56.1:8080/calorie/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(),
        });
  
      const userCalorie = await response.json();
      console.log("response for calorie api",userCalorie)
      setCalorieConsumed(userCalorie.totalCalorie)
      } catch (error) {
        console.log('Error:', error);
      }
    };

    useFocusEffect(
      React.useCallback(() => {
        // Fetch data when the screen gains focus
        displayCalorie();
      }, [])
    );

    const onSharePress = async () => {
      try {
        console.log('Before captureRef');
        const uri = await captureRef(viewShotRef, {
          format: 'png',
          quality: 0.8,
          result: 'tmpfile', // 'tmpfile', 'base64', or 'data-uri'
        });
        console.log('After captureRef:', uri);
        await Share.open({ url: uri ,message:"Hello connections!! This is my today's Score"});
        // Implement your share functionality using the captured URI
      } catch (error) {
        console.log('Error during captureRef:', error);
      }
    };

   
  

  return (
    <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
   
      <View>
      <Text style={styles.text}>Hi, {user.user.name} </Text>
      </View>
     
      <ViewShot  ref={(ref) => (viewShotRef.current = ref)} options={{ format: 'png', quality: 0.8 }}>
      <View style={styles.container}>
      <Svg width={chartRadius * 2 } height={chartRadius * 2} >
      
        {/* Full circle representing goal calories */}
        <Circle
          cx={chartRadius}
          cy={chartRadius}
          r={chartRadius-10}
          stroke="#000000"
          strokeWidth={20}
          fill="transparent"
        />

        {/* Filled circle representing consumed calories */}
        <Circle
          cx={chartRadius}
          cy={chartRadius}
          r={chartRadius-10}
          stroke={lightorange}
          strokeWidth={10}
          fill="transparent"
          strokeDasharray={`${chartCircumference} ${chartCircumference}`}
          strokeDashoffset={chartCircumference - (calorieConsumed / goalCalorie) * chartCircumference}
        />

        {/* Text in the center displaying consumed and goal calories */}
        <SvgText
          x={chartRadius}
          y={chartRadius}
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fill={lightorange}
        >
          {`${calorieConsumed} / ${goalCalorie}`}
        </SvgText>
      </Svg>

    </View>
    </ViewShot>


    <TouchableOpacity
          style={{ position: 'absolute', top: 0, 
          right: 0, padding: 16 }} onPress={onSharePress}>
          <Icon name="share-circle" color={lightorange} size={50}></Icon>
        </TouchableOpacity>


    <View style={{marginTop:'48%'}}>
    <Btn bgcolor={lightorange} textcolor='black' btnLable='Search by Image' btnwidth='80%' press={() => navigation.navigate('SearchByImage',{ userId })}/>
    
    </View>
    <View style={{marginTop:'4%'}}>
    <Btn bgcolor={lightorange} textcolor='black' btnLable='Search by Name' btnwidth='80%' press={() => navigation.navigate('SearchByName',{ userId })}/>
    </View>
   
      </ImageBackground>
     
    </View>
  )
}

export default Home 
const styles = StyleSheet.create({
    text:{
        fontSize:20,
        fontStyle:'normal',
        fontWeight:'bold',
        color:'#E36A30',
        paddingLeft:32,
        alignSelf:'flex-start',
        marginTop:'7%',
        marginLeft:"13%",
        marginBottom:60
    },
    container: {
      paddingTop:'3%',
      justifyContent: 'center',
      alignItems: 'center',
      
    }
   
})