import React from 'react'
import{View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import img from '../assets/background_image.jpg'
import{ useState } from 'react';
import Btn from './Btn'
import { lightorange } from './Constants'

const SignUp = () => 
{
    const [state,setState] = useState({
        Name: '',
        Email: '',
        password:'',
        confirmPassword:'',
        MobileNumber:''
        })

  return (
   <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
    <View>
    <Text style={styles.signuptext}>SignUp</Text>
    </View>

    <Text style={styles.headingtext}> Name</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Ex.Apeksha Shah' placeholderTextColor={"#000000"} onChangeText={text => setState({email:text})}/>  
    </View>

    <Text style={styles.headingtext}> Email</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Email' placeholderTextColor={"#000000"} onChangeText={text => setState({email:text})}/>  
    </View>

    <Text style={styles.headingtext}> Password</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Password' placeholderTextColor={"#000000"} secureTextEntry={true} onChangeText={text => setState({password:text})}/>  
    </View>

    <Text style={styles.headingtext}> ConfirmPassword</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Confirm your password' placeholderTextColor={"#000000"} onChangeText={text => setState({email:text})}/>  
    </View>

    <Text style={styles.headingtext}> MobileNumber</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Email' placeholderTextColor={"#000000"} onChangeText={text => setState({email:text})}/>  
    </View>

<View style={{marginTop:'8%'}}>
<Btn bgcolor={lightorange} textcolor='black' btnLable='SignUp' btnwidth='50%'/>
</View>
    
    </ImageBackground>
   </View>
  )
}

const styles = StyleSheet.create({
    signuptext:{
        fontSize:30,
        fontStyle:'normal',
        fontWeight:'bold',
        color:'#000000',
        paddingLeft:20,
        alignSelf:'center',
        marginTop:'28%',
        marginBottom:'4%'
    },
    inputview:{
        width:"80%",
        backgroundColor:"#ffffff",
        borderRadius:20,
        borderColor:'black',
        height:35,
        marginTop:10,
        marginLeft:32,
        marginBottom:10,
        justifyContent:"center",
        paddingLeft:32
    },

    headingtext:{
      color:'#000000', 
      fontSize:18, 
      fontWeight:'bold', 
      paddingLeft:32

    }
})

export default SignUp