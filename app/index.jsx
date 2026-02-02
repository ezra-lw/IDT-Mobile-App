import { StyleSheet, Text, View, Image} from 'react-native'
import { Link } from 'expo-router'

import Logo from '../assets/img/logo_light.png'


const Index = () => {
  return (
    <View style={styles.container}>
        <Image source={Logo} style={styles.img}/>

      <Text style ={styles.title}>Welcome to Educentral</Text>

      <Text style={{ marginTop: 10, marginBottom: 30}}>
        Educentral!
    </Text>

        <Link href="/home" style={styles.link}>Home Page</Link>
        <Link href="/contact" style={styles.link}>Contact Page</Link>
    
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    img: {
        marginVertical: 20,
    },
     link: {
        marginVertical: 10,
        borderBottomWidth: 1,
    },
   
})