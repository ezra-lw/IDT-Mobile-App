import { StyleSheet, Text, View, Image} from 'react-native'
import Logo from '../assets/img/logo_light.png'

const Home = () => {
  return (
    <View style={styles.container}>
        <Image source={Logo} style={styles.img}/>

      <Text style ={styles.title}>Welcome to</Text>

      <Text style={{ marginTop: 10, marginBottom: 30}}>
        Educentral!
    </Text>

    <View style={styles.card}>      
        <Text>Your one-stop solution for all educational needs.</Text>

    </View>
    
    </View>
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    img: {
        marginVertical: 20,
    },
    card:{
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 5,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }
})