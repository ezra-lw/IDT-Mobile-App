import { Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RootLayout = () => {
  return (
     <Stack>
        <Stack.Screen name ="index" options={{ title: 'Login', headerShown : false }} />
        <Stack.Screen name ="home" options={{ title: 'Home' }} />
        <Stack.Screen name ="contact" options={{ title: 'Contact' }} />

     </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})