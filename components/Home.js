import { ImageBackground,View } from 'react-native'
import React from 'react'
import img from '../assets/homepage_background_image.jpg'
import Btn from './Btn'
import { lightorange } from './Constants'



export default function Home(props) {
  return (
    <View>
      <ImageBackground source={img} style={{ height: '100%'}} resizeMode='stretch'>
        <View style={{ paddingTop: 430 }}>
          <Btn bgcolor={lightorange} textcolor='black' btnLable='Login' btnwidth='80%' press={()=>props.navigation.navigate("Login")}/>
        </View>

        <View style={{ paddingTop: 10 }}>
          <Btn bgcolor={lightorange} textcolor='black' btnLable='SignUp' btnwidth='80%' press={()=>props.navigation.navigate("SignUp")}/>
        </View>
        
      </ImageBackground>

    </View>
  )
}

//const styles = StyleSheet.create({})