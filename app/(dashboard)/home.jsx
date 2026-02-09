import { StyleSheet, Text } from 'react-native'
import { useUser } from '../../hooks/useUser'
import { useRouter } from 'expo-router'

import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard'

const Profile = () => {
    const { user } = useUser()
    const router = useRouter()

    return (
        <ThemedView safe={true} style={styles.container}>
            <ThemedText title={true} style={styles.heading}>
                Welcome to EduCentral!
            </ThemedText>



            <Spacer />

            <ThemedCard style={styles.card}>
                <ThemedText style={styles.title}>School Updates</ThemedText>
                <ThemedButton onPress={() => router.push('/updates')}>
                    <ThemedText style={{ color: '#fff', textAlign: 'center' }}>View Updates</ThemedText>
                </ThemedButton>
            </ThemedCard>

            <Spacer />

            <ThemedCard style={styles.card}>
                <ThemedText style={styles.title}>Motivation Tracker</ThemedText>
                <ThemedButton onPress={() => router.push('/motivation')}>
                    <ThemedText style={{ color: '#fff', textAlign: 'center' }}>View Tracker</ThemedText>
                </ThemedButton>
            </ThemedCard>




        </ThemedView>
    )
}

export default Profile

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
    },
    card: {
        width: '90%',
        padding: 20,
        minHeight: 230,
    },
    title: {
        paddingTop: 25,
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
})