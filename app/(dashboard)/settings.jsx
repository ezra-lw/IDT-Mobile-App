import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useUser } from '../../hooks/useUser'

// themed components

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import ThemedCard from '../../components/ThemedCard'



const Settings = () => {
    const { logout, user } = useUser()
    const router = useRouter()

    return (
        <ThemedView safe={true} style={styles.container}>

            <ThemedText title={true} style={styles.heading}>
                Settings
            </ThemedText>
            <Spacer />

            <ThemedCard style={styles.card}>
                <ThemedText style={styles.title}>Your Email:</ThemedText>
                <ThemedText title={true} style={styles.title}>
                    {user.email}
                </ThemedText>
            </ThemedCard>
            <Spacer />


             <ThemedCard style={styles.card}>
                <ThemedText style={styles.title}>School Contact Information</ThemedText>
                <ThemedText text={true} style={styles.text}>
                    Phone: (123) 456-7890{'\n'}
                    Email: info@school.edu{'\n'}
                    Address: 123 Main St, Anytown, UK
                </ThemedText>
            </ThemedCard>
            <Spacer />


             <ThemedCard style={styles.card}>
                <ThemedText style={styles.title}>Application Feedback</ThemedText>
                <ThemedText text={true} style={styles.text}>
                    We value your feedback! Please leave us a comment below.
                </ThemedText>
                <ThemedButton onPress={() => router.push('/feedback')}>
                    <ThemedText style={{ color: '#fff', textAlign: 'center' }}>Leave Feedback</ThemedText>
                </ThemedButton>
            </ThemedCard>
            <Spacer />

            <ThemedCard style={styles.card}>
                <ThemedButton onPress={logout}>
                    <ThemedText style={{ color: '#f2f2f2', textAlign: 'center' }}>Logout</ThemedText>
                </ThemedButton>
            </ThemedCard>

            <Spacer />
        </ThemedView>
    )
}

export default Settings


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 70,
    },
    card: {
        width: '90%',
        padding: 10,
        minHeight: 60,
    },
    title: {
    
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})
