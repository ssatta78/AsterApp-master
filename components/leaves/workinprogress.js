import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const workinprogress = () => {
  return (
    <View style={styles.container}>
      <Text>Student Affairs</Text>
      <LottieView
        source={require('../../assets/workprogress.json')} // Replace with the correct path to your Lottie animation JSON file
        autoPlay
        loop
      />
    </View>
  )
}

export default workinprogress

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        length:'100%',
        width:'100%',
    }
})