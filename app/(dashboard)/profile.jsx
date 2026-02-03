import { StyleSheet } from 'react-native'

import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'

const Profile = () => {
    return (
        <ThemedView style={styles.container}>

            <ThemedText title={true} style={styles.heading}>
                Your Student ID
            </ThemedText>

            <Spacer />

            <ThemedText>
                Thanks for joining EduCentral!
            </ThemedText>

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
