import { StyleSheet, Text } from 'react-native'
import { useUser } from '../../hooks/useUser'

import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import ThemedButton from '../../components/ThemedButton'

const Profile = () => {
    const { logout, user } = useUser()

    return (
        <ThemedView style={styles.container}>

            <ThemedText title={true} style={styles.heading}>
                {user.email}
            </ThemedText>

            <Spacer />

            <ThemedText>
                Thanks for joining EduCentral!
            </ThemedText>

            <ThemedButton onPress={logout}>
                <Text style={{ color: '#f2f2f2' }}>Logout</Text>
            </ThemedButton>

            <Spacer />
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
        fontSize: 25,
        textAlign: 'center',
    },
})
