import { StyleSheet, Text, View, ImageBackground} from 'react-native'
import { Svg, Circle, Text as SvgText } from 'react-native-svg';

import{ useEffect, useState } from 'react';
import img from '../assets/background_image.jpg'
import React from 'react'
import { lightorange } from './Constants'
import Btn from './Btn';

const Home  = ({route,navigation}) => {

  const[calorieConsumed,setCalorieConsumed]=useState(null);
  const user = route.params?.user || { user: { name:"" } };
  //const user=route.params.user;
  const goalCalorie=5000;
  const chartRadius = 120;
 
  const chartCircumference = 2* Math.PI * chartRadius;

  const displayCalorie=()=>{
    fetch("http://192.168.56.1:8080/calorie",{
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify()
      }).then(res=>res.json())
      .then(userCalorie=>setCalorieConsumed(userCalorie.totalCalorie))
    }
   
    // useEffect(() => {
    //   // Fetch data when the calorieConsumed state changes
    //   console.log("useeffect in displaycalorie")
    //   displayCalorie();
    // }, [calorieConsumed]);

    useFocusEffect(
      React.useCallback(() => {
        // Fetch data when the screen gains focus
        displayCalorie();
      }, [])
    );

  return (
    <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
      <View>
      <Text style={styles.text}>Hi, {user.user.name} </Text>
      </View>
     

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
    <View style={{marginTop:'22%'}}>
    <Btn bgcolor={lightorange} textcolor='black' btnLable='Search by Image' btnwidth='80%' press={()=>navigation.navigate("Login")}/>
    </View>
    <View style={{marginTop:'4%'}}>
    <Btn bgcolor={lightorange} textcolor='black' btnLable='Search by Name' btnwidth='80%' press={() => navigation.navigate('SearchByName')}/>
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
        marginTop:'6%',
        marginLeft:"13%",
        marginBottom:60
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      
    }
   
})