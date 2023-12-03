import React from 'react'
import{View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity,Alert} from 'react-native';
import img from '../assets/background_image.jpg'
import{ useState } from 'react';
import Btn from './Btn'
import { lightorange } from './Constants'

const SignUp = ({navigation}) => 
{
    const [name,setName] = useState("")
    const[password,setPassword]=useState('') 
    const[email,setEmail]=useState("")
    const[mobileNumber,setMobileNumber]=useState('')
    const [goalCalorie,setGoalCalorie]=useState('');
    const[weight,setWeight]=useState('');
    const[formError,setFormError]=useState({});
    const[responseData,setResponseData]=useState([]);

    const user={name,email,password,mobileNumber,goalCalorie,weight}
    //const userSignUp={name,email,password,mobileNumber,goalCalorie,weight}

    const handleSignUp = async () => {
        try {
            console.log("In signup method");
    
            // Validate user input
            const formError = await validate(user);
            setFormError(formError);
            console.log("Form errors:", formError);
    
            // If there are validation errors, do not proceed with signup
            if (Object.keys(formError).length > 0) {
                return;
            }
    
            // If validation passes, proceed with signup
            const response = await fetch('http://192.168.56.1:8080/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
    
            // Check if the request was successful
            if (!response.ok) {
                console.error('Failed to sign up:', response.statusText);
                // Handle the error appropriately, e.g., show a user-friendly message
                return;
            }
    
            // Parse the response JSON
            const newUser = await response.json();
            console.log("New user is:", newUser);
    
            // Update the state with the response data
            setResponseData(newUser);
    
            // Navigate to the login screen
            navigation.navigate("Login");
        } catch (error) {
            console.error('Error during signup:', error);
            // Handle the error appropriately, e.g., show a user-friendly message
        }
    };
    
    const validate = (user) => {
        const errors = {};
    
        // Validate name
        if (!user.name) {
            errors.name = "Type your first name!";
            Alert.alert("Type your first name!");
        }
    
        // Validate email
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!user.email) {
            errors.email = "Email is required!";
        } else if (!emailRegex.test(user.email)) {
            errors.email = "Email should be in the correct format!";
            Alert.alert("Email should be in the correct format!");
            
        }
    
        // Validate password
        if (!user.password) {
            errors.password = "Password is required!";
            Alert.alert("Password is required!");
        }
    
        return errors;
    };
    
    
    
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

    <Text style={styles.headingtext}> Goal Calorie</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Ex.3000'
      placeholderTextColor={"#000000"} value={goalCalorie}onChangeText={setGoalCalorie}/>  
    </View>

    <Text style={styles.headingtext}> weight </Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Ex.50'
      placeholderTextColor={"#000000"} value={weight}onChangeText={setWeight}/>  
    </View>

    <Text style={styles.headingtext}> MobileNumber</Text>
    <View style={styles.inputview}>
     <TextInput style={{height:50,color:'#000000'}} placeholder='Enter your Email' 
     placeholderTextColor={"#000000"} value={mobileNumber} onChangeText={setMobileNumber}/>  
    </View>

<View style={{marginTop:'8%'}}>
<Btn bgcolor={lightorange} textcolor='black' btnLable='SignUp' btnwidth='50%' press={handleSignUp}/>
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
        marginTop:'32%',
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