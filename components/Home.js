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
  const[proteinConsumed,setProteinConsumed]=useState(null);
  const[carbConsumed,setCarbConsumed]=useState(null);
  
  const user = route.params?.user || { user: { name:"" } };
  const userId=user.user.userId;
  const goalCalorie=user.user.goalCalorie;
  const goalProtein=user.user.weight*0.75;
 
  
 
 // const bs = React.useRef(null)
  //const user=route.params.user;
 // const[userId,setUserId]=useState();
  // setUserId(user.user.userId);
  // console.log(userId);
 
 // console.log("in home : .....................",userId);
  const viewShotRef = useRef();
  
  const chartRadius = 120;
  const chartCircumference = 2* Math.PI * chartRadius;

  const chartRediusProtein= 80;
  const chartCircumferenceProtein = 2* Math.PI * chartRediusProtein;
  
    const displayCalorie = async () => {
      //const cuserId=user.user.userId;
      console.log("in diaplay..",userId)
     
      try {
        const response = await fetch(`http://192.168.56.1:8080/calorie/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(),
        });
  
      const userNutriConsumed = await response.json();
      console.log("response for calorie api........",userNutriConsumed)
      setCalorieConsumed(userNutriConsumed.totalCalorie)
      setProteinConsumed(userNutriConsumed.totalProtein)
      setCarbConsumed(userNutriConsumed.totalCarb)

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

    const onLogOut = async () => {
      navigation.navigate('WelcomeScreen');
    }

    const profileHandle =async()=>{
      console.log("user in profile handle..",user)
      navigation.navigate("Profile",{user})
      console.log("in profilehandle..")
    }
   
  

  return (
    <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
   
      <View>
      <TouchableOpacity onPress={profileHandle}>
      <Text style={styles.text}>Hi, {user.user.name} </Text>
      </TouchableOpacity>
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

        <SvgText
        x={chartRadius}
        y={chartRadius + 20} // Adjust the Y-coordinate to position it below
        textAnchor="middle"
        fontSize="16"
        fill="#000000"
      >
        Calories
      </SvgText>
      </Svg>

    </View>


    <View style={styles.containerProtein}>
      <Svg width={chartRediusProtein * 2 } height={chartRediusProtein * 2} >
      
        {/* Full circle representing goal calories */}
        <Circle
          cx={chartRediusProtein}
          cy={chartRediusProtein}
          r={chartRediusProtein-5}
          stroke="#000000"
          strokeWidth={10}
          fill="transparent"
        />

        {/* Filled circle representing consumed calories */}
        <Circle
          cx={chartRediusProtein}
          cy={chartRediusProtein}
          r={chartRediusProtein-5}
          stroke='#3be38f'
          strokeWidth={5}
          fill="transparent"
          strokeDasharray={`${chartCircumferenceProtein} ${chartCircumferenceProtein}`}
          strokeDashoffset={chartCircumferenceProtein - (proteinConsumed / goalProtein) * chartCircumferenceProtein}
        />

        {/* Text in the center displaying consumed and goal calories */}
        <SvgText
          x={chartRediusProtein}
          y={chartRediusProtein}
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill={lightorange}
        >
          {`${proteinConsumed} / ${goalProtein}`}
        </SvgText>
        <SvgText
        x={chartRadius-40}
        y={chartRadius-15} // Adjust the Y-coordinate to position it below
        textAnchor="middle"
        fontSize="12"
        fontWeight='bold'
        fill="#000000"
      >
        Protein
      </SvgText>
      </Svg>

    <View style={{paddingLeft:'13%'}}>
      <Svg width={chartRediusProtein * 2 } height={chartRediusProtein * 2} >
      
        {/* Full circle representing goal calories */}
        <Circle
          cx={chartRediusProtein}
          cy={chartRediusProtein}
          r={chartRediusProtein-5}
          stroke="#000000"
          strokeWidth={10}
          fill="transparent"
        />

        {/* Filled circle representing consumed calories */}
        <Circle
          cx={chartRediusProtein}
          cy={chartRediusProtein}
          r={chartRediusProtein-5}
          stroke="#3baee3"
          strokeWidth={5}
          fill="transparent"
          strokeDasharray={`${chartCircumferenceProtein} ${chartCircumferenceProtein}`}
          strokeDashoffset={chartCircumferenceProtein - (carbConsumed / goalCalorie) * chartCircumferenceProtein}
        />

        {/* Text in the center displaying consumed and goal calories */}
        <SvgText
          x={chartRediusProtein}
          y={chartRediusProtein}
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill={lightorange}
        >
          {`${carbConsumed} / ${goalCalorie}`}
        </SvgText>
        <SvgText
        x={chartRadius-40}
        y={chartRadius-15} // Adjust the Y-coordinate to position it below
        textAnchor="middle"
        fontSize="12"
        fontWeight='bold'
        fill="#000000"
      >
        Carb
      </SvgText>
      </Svg>
      </View>

    </View>
    </ViewShot>


    <TouchableOpacity
          style={{ position: 'absolute', top: 0, 
          right: 0, padding: 16 }} onPress={onLogOut }>
          <Icon name="logout" color={lightorange} size={50}></Icon>
          <Text style={{fontSize:18,fontWeight:'bold', paddingLeft:5,color:"#F6C9B0"}}>LogOut</Text>
        </TouchableOpacity>
        

<View>
        <TouchableOpacity
          style={{ position: 'absolute', top: 1, 
          right: 0,paddingRight:14 }} onPress={onSharePress}>
          <Icon name="share-circle" color={lightorange} size={48}></Icon>
        </TouchableOpacity></View>


    {/* <View style={{marginTop:'48%'}}> */}
    <View style={{marginTop:'22%'}}>
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
      
    },
    containerProtein : {
      paddingLeft:'5%',
      flexDirection: 'row',
    },

   
})