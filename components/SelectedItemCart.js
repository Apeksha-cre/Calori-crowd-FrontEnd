import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList,ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import img from '../assets/background_image.jpg'

const SelectedItemCart = () => {
    const route = useRoute();
    const [cartItems, setCartItems] = useState(route.params?.selectedItems);
    
    console.log(cartItems);
  return (
    <View>
    <ImageBackground source={img} style={{ height: '100%', width:'100%'}} resizeMode='stretch'>
      <Text style={{paddingTop:'50%',paddingLeft:"15%",fontWeight:'bold',fontSize:26}}>Selected items:</Text>
     
      <FlatList style={{marginTop:'10%',width:'80%',marginLeft:'10%'}}
              data={cartItems}
              keyExtractor={(item) => item.foodId.toString()}
              renderItem={({ item }) => (
                  <View style={styles.resultItem}>
                    <Text>{item.foodName}</Text>
                    <Text>{item.foodId}</Text>
                    <Text>{item.foodQuantity}</Text>
                    <Text>Calorie: {item.totalCalorie}</Text>
                    <Text>Protein: {item.totalProtein}</Text>
                    <Text>Net Carb: {item.totalCarb}</Text>
                    {/* Add more information or components as needed */}
                  </View>
              )}
            />
       </ImageBackground>
    </View>
  )
}

export default SelectedItemCart

const styles = StyleSheet.create({
    resultItem: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 2,
        borderRadius: 30,
      },
})