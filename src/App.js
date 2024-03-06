import React,{useState} from 'react';
import { StyleSheet,Text, View, TextInput} from 'react-native';
import {styles, orangeText} from './style'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text,orangeText]}>style Code</Text>
      <Text style={[styles.text, styles.errorText]}>Error Text</Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text:{
//     backgroundColor:"black",
//     color: "white", 
//     fontSize:20},
//   errorText:{
//     color:"red",
//   }
// });