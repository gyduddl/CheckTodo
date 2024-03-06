import React from 'react';
import { StyleSheet,Text, View, TextInput} from 'react-native';
import Box from './Box';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <Box style={{backgroundColor:"red", height:100}}/>
      <Box style={{backgroundColor:"green", flex:1}}/>
      <Box style={{backgroundColor:"blue", height:100}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});