import { StyleSheet, 
  Text, 
  View, 
  ImageBackground,
  PermissionsAndroid, 
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { lightorange } from './Constants'
import Btn from './Btn';
import img from '../assets/background_image.jpg'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import { Image } from 'react-native-svg';

const SearchByImage = ({route,navigation}) => {
  const {userId}=route.params;
  console.log("useid in searchbyimage",userId)
console.log("component rendered");
    //const [cameraPhoto,setCameraPhoto]=useState();
    const [imageString, setImageString]=useState("");
    //const[searchResult,setSearchResult]=useState([]);
  const [recognitionResults, setRecognitionResults] = useState([]);
  const[selectedItemName,setSelectedItemName]=useState("");
  const [isListVisible, setIsListVisible] = useState(true);
 
  useEffect(() => {
    if(imageString){
    console.log("use effect called searchbyimage");
    //console.log("image set 2", imageString);
    const fetchData = async () => {
    try{
      const response = await fetch('http://192.168.56.1:8080/image', {
          method: 'POST',
          body: imageString,
        });

        const responseData = await response.json();
        //console.log(imageString);

        console.log("responsedata from image", JSON.stringify(responseData));
      //  setSearchResult(responseData);
      // const nameList=[];
      // for(let i=0;i<responseData.segmentation_results[0].recognition_results)
        setRecognitionResults(responseData.segmentation_results[0].recognition_results);
      //  console.log("recognization result",recognitionResults);
      }
      catch (error) {
        // Handle errors that might occur during the asynchronous operations
        console.error('An error occurred:', error);
      }
    };

    fetchData();
    }
  }, [imageString]);

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
                //console.log("image set", result);
                //setCameraPhoto(result.assets[0].uri);
            }            
          
    }

    const openGallary=async()=>{
        const result=await launchImageLibrary(options);
        console.log(result)
    }
    
    const handleItemPress = (item) => {

      setSelectedItemName(item);
      navigation.navigate('SearchByName',{item,userId});

    }





  return (
    <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
    <View style={{marginLeft:'21%',marginTop:'9%'}} >
        <Text style={{fontSize:22, fontWeight:'bold', color:'#E36A30'}}>CalorieCrowd</Text>
      </View>
    <View style={{paddingTop:'70%'}}>
    <View style={{paddingTop:'2%'}}>
      <Btn bgcolor={lightorange} textcolor='black' btnLable='Use Camera' btnwidth='80%' press={openCamera} />
      </View>

      <View style={{paddingTop:"5%"}}>
      <Btn bgcolor={lightorange} textcolor='black' btnLable='Use Gallary' btnwidth='80%'press={openGallary}  />
      </View>

      {isListVisible && (
      <FlatList style={{marginTop:'5%',width:'80%',marginLeft:'10%'}}
            data={recognitionResults}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item })=>(
                <TouchableOpacity onPress={() => handleItemPress(item.name)}>
                  <View style={styles.resultItem}>
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
          />
      )}
      </View>
      </ImageBackground>
    </View>

  )
}

export default SearchByImage

const styles = StyleSheet.create({

  resultItem: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent:"center",
    alignContent:'center',
    alignItems:'center'
  },
})