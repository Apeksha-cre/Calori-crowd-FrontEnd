


import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import img from '../assets/background_image.jpg'
import Btn from './Btn'
import { lightorange } from './Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchByName = ({ route, navigation }) => {

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState();
  const [quantity, setQuantity] = useState('1');
  const [isListVisible, setIsListVisible] = useState(true);
  const userId = route.params?.userId;
 const itemName= route.params?.item;
  console.log("useid in searchbyname", userId);
  //const [requestBody,setRequestBody]=useState([]);
  
  useEffect(()=>{
    if(itemName!="")
    {

      console.log("use effect call")
      //setSearchText(itemName);
     fetchItems(itemName);
    }

  },[]);
 


  console.log("search text", searchText);

  const fetchItems = async (foodName) => {
    try {

      // Make API call to get the list of items based on the text
      // Example:
      console.log("in fetch")
      console.log(foodName)
      const response = await fetch(`http://192.168.56.1:8080/food?foodName=${foodName}`);
      const data = await response.json();
      // Update the setSearchResults state with the response
      // if(data.items==null)
      // {
      //   console.log("empty");
      // }
     
      setIsListVisible(true);
      setSearchResults(data);

    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleQtyAdded = async () => {
    try {
     
      console.log("selected items in handleAdd", selectedItems);
      selectedItems.push({
        calories: currentSelectedItem.calorie,
        foodId: currentSelectedItem.foodId,
        foodName: currentSelectedItem.foodName,
        protein:currentSelectedItem.protein,
        carb:currentSelectedItem.netCarb,
        userId: userId,
        foodQuantity: quantity,
        totalCalorie: quantity * currentSelectedItem.calorie,
        totalProtein:quantity*currentSelectedItem.protein,
        totalCarb:quantity*currentSelectedItem.netCarb
      })
    
      console.log("selected items in request body", selectedItems)
     
      setSelectedItems(selectedItems);

    
      //navigation.navigate('Home');
    } catch (error) {
      console.error('Error performing API call:', error);
    }



  };

const handleAdd = async()=>{
console.log("calling api++++", selectedItems);
const requestBody = selectedItems;
const response = await fetch('http://192.168.56.1:8080/calorie/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you need
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log('calorie add API Response:', responseData);
      setSelectedItems([]);
      navigation.goBack();

};
  const handleItemPress = (item) => {
    // Check if the item is already selected
    console.log("item in handlepress",item);
    //const isSelected = selectedItems.some((selectedItem) => selectedItem.foodId === item.foodId);
setCurrentSelectedItem(item);
console.log("item calorie................",item.calorie);
  
      setSearchText(item.foodName);
    
    setIsListVisible(false);
  };

    const ListHeader=()=>{
      return(
      <View>
        <Text style={{fontSize:15,color:'#000000'}}>
          Select items:
        </Text>
      </View>
    )}


  return (
    <View>
      <ImageBackground source={img} style={{ height: '100%', width: '100%' }} resizeMode='stretch'>
      <View style={{marginLeft:'21%',marginTop:'9%'}} >
        <Text style={{fontSize:22, fontWeight:'bold', color:'#E36A30'}}>CalorieCrowd</Text>
      </View>
        <View style={{ paddingTop: '30%' }}>
          <Text style={{ paddingLeft: '12%', fontWeight: 'bold', fontSize: 18 }} >Search for items:</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.inputview}
              placeholder='Search food by name' placeholderTextColor={"#000000"}
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
            />
            <TouchableOpacity style={styles.searchButton} onPress={() => fetchItems(searchText)}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>

          
          <Text style={{ paddingLeft: '12%', fontWeight: 'bold', fontSize: 18 }}>Quantity:</Text>
          
          
            <View style={styles.quantityContainer}>
            <TextInput
              style={styles.inputview}
              placeholder='Add Quantity' placeholderTextColor={"#000000"}
              defaultValue="1"
              onChangeText={text => setQuantity(text)}
              value={quantity}
             
            />
            <TouchableOpacity style={{paddingTop:12,paddingLeft:10}} onPress={() => handleQtyAdded()}>
            <Icon name="checkbox-marked-circle" color={lightorange} size={50}></Icon>
            </TouchableOpacity>
            
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAdd()}>
              <Text style={{fontSize:20,fontWeight:'bold'}}>Add Items</Text>
            </TouchableOpacity>
          
          

{isListVisible && (
            <FlatList style={{marginTop:'5%',width:'80%',marginLeft:'10%'}}
              data={searchResults}
              keyExtractor={(item) => item.foodId.toString()}
              ListHeaderComponent={ListHeader}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemPress(item)}>
                  <View style={styles.resultItem}>
                    <Text>{item.foodName}</Text>
                    <Text>{item.foodId}</Text>
                    <Text>Calorie: {item.calorie}</Text>
                    <Text>Protein: {item.protein}</Text>
                    <Text>Net Carb: {item.netCarb}</Text>
                    {/* Add more information or components as needed */}
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

export default SearchByName
const styles = StyleSheet.create({
  inputview: {
    width: "55%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderColor: 'black',
    height: 50,
    marginTop: 15,
    marginLeft: 32,
    marginBottom: 10,
    justifyContent: "center",
    paddingLeft: 32
  },

  QuantityInputview:{
    width: "0%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderColor: 'black',
    height: 50,
    marginTop: 15,
    marginLeft: 32,
    marginBottom: 10,
    justifyContent: "center",
    paddingLeft: 32

  },

  searchContainer: {
    flexDirection: 'row',
    width: '115%',
    marginBottom: 10,
  },

  quantityContainer:{
    flexDirection: 'row',
    width: '60%',
    
  },

  searchButton: {
    backgroundColor: lightorange,
    borderRadius: 20,
    height: 50,
    width: '15%',
    marginLeft: 10,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: lightorange,
    borderRadius: 20,
    height: 50,
    width: '70%',
    marginLeft: "15%",
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultItem: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 2,
    borderRadius: 30,
  },

})