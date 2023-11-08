import React from 'react'
import{View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Button, Alert} from 'react-native';
import img from '../assets/background_image.jpg'
import{ useState } from 'react';
import Btn from './Btn'
import { lightorange } from './Constants'


 
const Login = ({navigation}) => 
{
    const url='http://192.168.56.1:8080/login';
    const[email,setEmail]=useState("");
   const[password,setPassword]=useState("");
   const[responseData,setResponseData]=useState([])
   const loginUser={email,password}

       const handlePress=()=>{
        console.log("in hadlepress function");
        fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(loginUser)
        }).then(res=>res.json()).then(User=>{setResponseData(User)}).then(console.log(responseData))
        .catch(err=>console.log(err));

        if(responseData.user==null)
        {
            Alert.alert("USER NOT REGISTERD")
        }
        else{
            navigation.navigate('Home',{user:responseData});
        }
        

        console.log(" still in hadlepress function"); 
    }

  return (
   <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
    <View>
    <Text style={styles.text}>Login</Text>
    </View>

    <Text style={{color:'#000000', fontSize:22, fontWeight:'bold', paddingLeft:32}}> Email</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Email' value={email}
     placeholderTextColor={"#000000"} onChangeText={setEmail}/>  
    </View>

    <Text style={{color:'#000000', fontSize:22, fontWeight:'bold', paddingLeft:32}}> Password</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Password' 
     placeholderTextColor={"#000000"} secureTextEntry={true} value={password}
     onChangeText={setPassword}/>  
    </View>

<TouchableOpacity>
<Text style={{alignSelf:'flex-end',paddingRight:'2%', fontWeight:'bold', fontSize:18 }}>Forgot Password?</Text>
</TouchableOpacity>

<View style={{marginTop:'10%'}}>
<Btn bgcolor={lightorange} textcolor='black' btnLable='LogIn'btnwidth='50%' 
    press={handlePress}/>

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