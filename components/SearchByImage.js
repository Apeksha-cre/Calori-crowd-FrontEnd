import { StyleSheet, Text, View, ImageBackground, PermissionsAndroid, Image,FlatList} from 'react-native'
import React, { useState } from 'react'
import { lightorange } from './Constants'
import Btn from './Btn';
import img from '../assets/background_image.jpg'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import { Image } from 'react-native-svg';

const SearchByImage = () => {

    //const [cameraPhoto,setCameraPhoto]=useState();
    const [imageString,setImageString]=useState();
    const[searchResult,setSearchResult]=useState([]);

    let options={
        saveToPhotos:true,
        mediaType:'photo',
        cameraType:'front',
        includeBase64: true
    };

    const openCamera=async()=>{
        console.log("in open camera")
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,);
            if(granted== PermissionsAndroid.RESULTS.GRANTED)
            {
                const result= await launchCamera(options);
                setImageString(result.assets[0].base64);
                //setCameraPhoto(result.assets[0].uri);
            }
            const response = await fetch('http://192.168.56.1:8080/image', {
                method: 'POST',
                body: imageString,
              });
              const responseData = await response.json();
              console.log("responsedata from image",responseData);
              setSearchResult(responseData);
    }

    const openGallary=async()=>{
        const result=await launchImageLibrary(options);
        console.log(result)
    }
    





  return (
    <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
    <View style={{paddingTop:'70%'}}>
    <View style={{paddingTop:'2%'}}>
      <Btn bgcolor={lightorange} textcolor='black' btnLable='Use Camera' btnwidth='80%' press={openCamera} />
      </View>
     
      <View style={{paddingTop:"5%"}}>
      <Btn bgcolor={lightorange} textcolor='black' btnLable='Use Gallary' btnwidth='80%'press={openGallary}  />
      </View>
      </View>
      </ImageBackground>
    </View>

  )
}

export default SearchByImage

const styles = StyleSheet.create({})