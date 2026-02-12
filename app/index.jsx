import { StyleSheet, Text } from 'react-native'
import { useRouter } from 'expo-router'

import Logo from '../assets/img/logo_light.png'

//themed components
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'
import ThemedCard from '../components/ThemedCard'


const Index = () => {
    const router = useRouter()

    return (
        <ThemedView style={styles.container}>
            <ThemedLogo />
            <Spacer height={20} />

            <ThemedText style={styles.title} title={true}>
                Welcome to Educentral
            </ThemedText>

            <Spacer />

            <ThemedButton style={styles.button} onPress={() => router.push('/register')}>
                <ThemedText style={{ color: '#f2f2f2', textAlign: 'center', fontSize: 20 }}>Registration</ThemedText>
            </ThemedButton>


            <ThemedButton style={styles.button} onPress={() => router.push('/login')}>
                <ThemedText style={{ color: '#f2f2f2', textAlign: 'center', fontSize: 20 }}>Login</ThemedText>
            </ThemedButton>

        </ThemedView>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        fontSize: 30,
    },

})