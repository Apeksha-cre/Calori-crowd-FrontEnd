import React from 'react'
import{View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import img from '../assets/background_image.jpg'
import{ useState } from 'react';
import Btn from './Btn'
import { lightorange } from './Constants'

const SignUp = ({navigation}) => 
{
    const [name,setName] = useState("")
    const[password,setPassword]=useState('') 
    const[email,setEmail]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const[mobileNumber,setMobileNumber]=useState('')
    const[formError,setFormError]=useState({});
    const[responseData,setResponseData]=useState([]);

    const user={name,email,password,confirmPassword,mobileNumber}
    const userSignUp={name,email,password,mobileNumber}

    const handleSignUP=()=>{
        console.log("in signup method")
        setFormError(validate(user));
        console.log(formError);
        console.log(user);
        fetch('http://192.168.56.1:8080/signUp',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(userSignUp)
        }).then(console.log("new user is : ")).then(res=>res.json())
        .then(newuser=>setResponseData(newuser)).then(console.log(responseData))
        .then(navigation.navigate("Login"));
    }

    const validate=(user)=>{
        const error={};
        const regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!user.name)
        {
            error.name="Type your first name!";
        }

        if(!user.email)
        {
            error.email="email is required!";
        }
        else if(!regex.test(user.email))
        {
            error.email="email should be in a correct formate!";
        }

        if(!user.password)
        {
            error.password="password is required!!";
        }

        
        if(!user.confirmPassword)
        {
            error.password="password is required!!";
        }
        else if(user.confirmPassword != user.password)
        {
            error.confirmPassword="password is not matching!!!"
        }

        return error;

    }
    
    
  return (
   <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
    <View>
    <Text style={styles.signuptext}>SignUp</Text>
    </View>

    <Text style={styles.headingtext}> Name</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Ex.Apeksha Shah'
      placeholderTextColor={"#000000"} value={name} onChangeText={setName}/>  
    </View>

    <Text style={styles.headingtext}> Email</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Email' 
     placeholderTextColor={"#000000"} value={email} onChangeText={setEmail}/>  
    </View>

    <Text style={styles.headingtext}> Password</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Password' 
     placeholderTextColor={"#000000"} secureTextEntry={true} value={password} onChangeText={setPassword}/>  
    </View>

    <Text style={styles.headingtext}> ConfirmPassword</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Confirm your password'
      placeholderTextColor={"#000000"} value={confirmPassword}onChangeText={setConfirmPassword}/>  
    </View>

    <Text style={styles.headingtext}> MobileNumber</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Email' 
     placeholderTextColor={"#000000"} value={mobileNumber} onChangeText={setMobileNumber}/>  
    </View>

<View style={{marginTop:'8%'}}>
<Btn bgcolor={lightorange} textcolor='black' btnLable='SignUp' btnwidth='50%' press={handleSignUP}/>
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