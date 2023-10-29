import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


export default function Btn({bgcolor, btnLable, textcolor,btnwidth, press}) {
    return (
        <View>
            <TouchableOpacity
                onPress={press}
                style={{
                backgroundColor: bgcolor, 
                borderRadius: 100,
                alignItems: 'center',
                alignSelf:'center',
                paddingVertical:5,
                width: btnwidth
            }}>
                <Text style={{ color: textcolor, fontWeight: 'bold', fontSize: 25 }}>
                {btnLable}
                </Text>
            </TouchableOpacity>
        </View>
    );
}