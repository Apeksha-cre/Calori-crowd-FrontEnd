import React,{useState,useEffect} from 'react'
import { View, Text,ImageBackground,TextInput ,Button, StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import img from '../assets/background_image.jpg'
import SearchableDropdown from 'react-native-searchable-dropdown';
import Btn from './Btn'
import { lightorange } from './Constants'

const SearchByName = ({route,navigation}) => {

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity,setQuantity]=useState();
  const [isListVisible, setIsListVisible] = useState(true);
  const userId = route.params?.userId;
  console.log("useid in searchbyname",userId);
  //const [requestBody,setRequestBody]=useState([]);

 
  console.log("search text",searchText);

  const fetchItems = async (foodName) => {
    try {
      
      // Make API call to get the list of items based on the text
      // Example:
     
      const response = await fetch(`http://192.168.56.1:8080/food?foodName=${foodName}`);
      const data = await response.json();
      // Update the setSearchResults state with the response
      // if(data.items==null)
      // {
      //   console.log("empty");
      // }
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAdd = async () => {
    try {
      // Make sure selectedItems is an array of the selected items
      //await fetchItems(searchText);
      console.log("selected items in handleAdd",selectedItems);
      const requestBody = selectedItems.map(item => ({ 
          calorie: item.calorie, 
          foodId: item.foodId,
          foodName: item.foodName,
          userId:userId, 
          foodQuantity: quantity, 
          totalCalorie: quantity*item.calorie}));
      console.log("selected items in request body",requestBody)
      const response = await fetch('http://192.168.56.1:8080/calorie/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you need
        },
        body: JSON.stringify(requestBody),
      });
  
      const responseData = await response.json();
  
      // Handle the response data as needed
      console.log('calorie add API Response:', responseData);
  
      // Clear the selected items after the API call
      setSelectedItems([]);
      
      navigation.goBack();
      //navigation.navigate('Home');
    } catch (error) {
      console.error('Error performing API call:', error);
    }

    

  };
  

  const handleItemPress = (item) => {
    // Check if the item is already selected
    const isSelected = selectedItems.some((selectedItem) => selectedItem.foodId === item.foodId);
  
    if (isSelected) {
      // If selected, remove it from the selectedItems
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem.foodId !== item.foodId)
      );
    
    } else {
      // If not selected, add it to the selectedItems
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }
    setIsListVisible(false);
  };

 

  return (
    <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
     <View style={{paddingTop:'42%'}}>
      <Text style={{paddingLeft:'12%',fontWeight:'bold', fontSize:18}} >Search for items:</Text>
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

      {isListVisible && (
      <FlatList
  data={searchResults}
  keyExtractor={(item) => item.foodId.toString()}
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

      <Text style={{paddingLeft:'12%',fontWeight:'bold', fontSize:18}}>Quantity:</Text>
      <TextInput
        style={styles.inputview}
        onChangeText={text=>setQuantity(text)}
        value={quantity}
      />
      <Btn bgcolor={lightorange} textcolor='black' btnLable='Add'btnwidth='50%' 
    press={handleAdd} />
    </View> 
    </ImageBackground>
    </View>
  )
}

export default SearchByName
const styles = StyleSheet.create({
    inputview:{
        width:"55%",
        backgroundColor:"#ffffff",
        borderRadius:20,
        borderColor:'black',
        height:50,
        marginTop:15,
        marginLeft:32,
        marginBottom:10,
        justifyContent:"center",
        paddingLeft:32
    },

    searchContainer: {
      flexDirection: 'row',
      width: '80%',
      marginBottom: 10,
    },

    searchButton: {
      backgroundColor: lightorange,
      borderRadius: 20,
      height: 50,
      width:'30%',
      marginLeft: 10,
      marginTop: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },

    resultItem: {
      padding: 10,
      marginTop: 2,
      backgroundColor: '#ddd',
      borderColor: '#bbb',
      borderWidth: 1,
      borderRadius: 5,
    },
   
})