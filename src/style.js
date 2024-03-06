import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      backgroundColor:"black",
      color: "white", 
      fontSize:20},
    errorText:{
      color:"red",
    }
  });

  //StyleSheet가 아닌 그냥 객체 형태도 가능
export const orangeText ={
    color:'orange'
}