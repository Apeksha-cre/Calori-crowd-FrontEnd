import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import img from '../assets/background_image.jpg'
import React from 'react'

const Home  = ({route}) => {

const user=route.params.user;
  return (
    <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
    <View>
      <Text style={styles.text}>Hi, {user.user.name} </Text>
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
    }
})