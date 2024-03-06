import React from 'react';
import { View } from 'react-native';

const Box =({style})=>{
    return <View style={[{borderWidth:2, width:'100%'},style]}></View>
}

export default Box;