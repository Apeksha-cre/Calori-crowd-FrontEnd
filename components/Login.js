import React from 'react'
import{View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import img from '../assets/background_image.jpg'
import{ useState } from 'react';
import Btn from './Btn'
import { lightorange } from './Constants'

const Login = () => 
{
    const [state,setState] = useState({
        email: '',
        password: '',
        })

  return (
   <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
    <View>
    <Text style={styles.text}>Login</Text>
    </View>

    <Text style={{color:'#000000', fontSize:22, fontWeight:'bold', paddingLeft:32}}> Email</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Email' placeholderTextColor={"#000000"} onChangeText={text => setState({email:text})}/>  
    </View>

    <Text style={{color:'#000000', fontSize:22, fontWeight:'bold', paddingLeft:32}}> Password</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Password' placeholderTextColor={"#000000"} secureTextEntry={true} onChangeText={text => setState({password:text})}/>  
    </View>

    <TouchableOpacity>
<Text style={{alignSelf:'flex-end',paddingRight:'2%', fontWeight:'bold', fontSize:18 }}>Forgot Password?</Text>
</TouchableOpacity>

<View style={{marginTop:'10%'}}>
<Btn bgcolor={lightorange} textcolor='black' btnLable='LogIn'btnwidth='50%' press={()=>props.navigation.navigate("SignUp")}/>
</View>
    
    </ImageBackground>
   </View>
  )
}

const styles = StyleSheet.create({
    text:{
        fontSize:40,
        fontStyle:'normal',
        fontWeight:'bold',
        color:'#000000',
        paddingLeft:32,
        alignSelf:'flex-start',
        marginTop:'38%',
        marginBottom:60
    },
    inputview:{
        width:"80%",
        backgroundColor:"#ffffff",
        borderRadius:20,
        borderColor:'black',
        height:50,
        marginTop:15,
        marginLeft:32,
        marginBottom:10,
        justifyContent:"center",
        paddingLeft:32
    }
})

export default Login