import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import img from '../assets/background_image.png'

const Background = () => {
  return (
    <View>
      <ImageBackground source={img} style={{height:'100%'}}></ImageBackground>
    </View>
  )
}

export default Background

const styles = StyleSheet.create({
  text:{
    
  }
})