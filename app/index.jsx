import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'

import Logo from '../assets/img/logo_light.png'

//themed components
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'


const Index = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedLogo />
            <Spacer height={20} />

            <ThemedText style={styles.title} title={true}>
                Welcome to Educentral
            </ThemedText>

            <Spacer height={10} />
            <ThemedText> Educentral! </ThemedText>
            <Spacer />

            <Link href="/register" style={styles.link}>
                <ThemedText>Student Registration</ThemedText>
            </Link>

            <Link href="/login" style={styles.link}>
                <ThemedText>Student Login</ThemedText>
            </Link>

            <Link href="/profile" style={styles.link}>
                <ThemedText>Profile Page</ThemedText>
            </Link>

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
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1,
    },

})