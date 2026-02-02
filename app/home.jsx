import { StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

//themed components
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'


const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Home</ThemedText>

      <Link href="/" style={styles.link}>
        <ThemedText>Back to Login</ThemedText>
      </Link>

    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },

})