import { StyleSheet, Text, View, ImageBackground} from 'react-native';
import { useState } from 'react';
import img from '../assets/background_image.jpg';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const Profile = () => {
  const route = useRoute();
  const [user, setUser] = useState(route.params?.user);

  return (
    <View>
      <ImageBackground source={img} style={{ height: '100%', width: '100%' }} resizeMode='stretch'>
        <Text style={{paddingTop:"50%",paddingLeft:"10%" ,fontSize:28,fontWeight:"bold"}}>{user.user.name}</Text>
        <Text style={{ paddingLeft:"10%" ,color: '#000000', paddingTop:'5%',fontSize:18}}>User ID: {user.user.userId}</Text>
        <Text style={{ paddingLeft:"10%" ,color: '#000000', paddingTop:'5%',fontSize:18}}>Email: {user.user.email}</Text>
        <Text style={{ paddingLeft:"10%" ,color: '#000000', paddingTop:'5%',fontSize:18}}>Password: {user.user.password}</Text>
        <Text style={{ paddingLeft:"10%" ,color: '#000000', paddingTop:'5%',fontSize:18}}>Weight: {user.user.weight}</Text>
        <Text style={{ paddingLeft:"10%" ,color: '#000000', paddingTop:'5%',fontSize:18}}>Goal Calorie: {user.user.goalCalorie}</Text>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
