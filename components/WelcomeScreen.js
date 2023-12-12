import { ImageBackground,View, Text } from 'react-native'
import React from 'react'
import img from '../assets/homepage_background_image.jpg'
import Btn from './Btn'
import { lightorange } from './Constants'



export default function WelcomeScreen(props) {
  return (
    <View>
      <ImageBackground source={img} style={{ height: '100%'}} resizeMode='stretch'>
      <View style={{marginTop:'64%',paddingLeft:'13%'}}>
        <Text style={{fontSize:20, fontWeight:'bold', color:'#faebd7'}}>Counting calories, crafting wellness.</Text>
      </View>
        <View style={{ marginTop:'60%' }}>
          <Btn bgcolor={lightorange} textcolor='black' btnLable='Login' btnwidth='80%' press={()=>props.navigation.navigate("Login")}/>
        </View>

        <View style={{ paddingTop: 20 }}>
          <Btn bgcolor={lightorange} textcolor='black' btnLable='SignUp' btnwidth='80%' press={()=>props.navigation.navigate("SignUp")}/>
        </View>
        
      </ImageBackground>

    </View>
  )
}

