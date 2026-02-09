import { StyleSheet } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useUpdates } from '../../../hooks/useUpdates'

//themed components
import Spacer from '../../../components/Spacer'
import ThemedText from '../../../components/ThemedText'
import ThemedView from '../../../components/ThemedView'
import ThemedCard from '../../../components/ThemedCard'
import ThemedButton from '../../../components/ThemedButton'
import ThemedLoader from '../../../components/ThemedLoader'
import { Colors } from '../../../constants/Colors'

const UpdateDetails = () => {

    const [update, setUpdate] = useState(null)


    const { id } = useLocalSearchParams()
    const { fetchUpdateById, deleteUpdate } = useUpdates()
    const router = useRouter()

    const handleDelete = async () => {
        await deleteUpdate(id)
        setUpdate(null)
        router.replace('/updates')
    }

    useEffect(() => {
        async function loadUpdate() {
            const updateData = await fetchUpdateById(id)
            setUpdate(updateData);
        }
        loadUpdate();
    }, [id])

    if (!update) {
        return (
            <ThemedView safe={true} style={styles.container}>
                <ThemedLoader />
            </ThemedView>
        )
    }


    return (
        <ThemedView safe={true} style={styles.container}>
            <ThemedCard style={styles.card}>
                <ThemedText style={styles.title}>{update.Title}</ThemedText>
                <ThemedText>Posted by {update.Author} on {update.Date}</ThemedText>
                <Spacer />

                <ThemedText title={true}>Update Content:</ThemedText>
                <Spacer height={10} />

                <ThemedText>{update.Content}</ThemedText>
            </ThemedCard>

            <ThemedButton style={styles.delete} onPress={handleDelete}>
                <ThemedText style={{ color: '#fff', textAlign: 'center' }}>
                Delete Update
                </ThemedText>

            </ThemedButton>
        </ThemedView>

    )
}

export default UpdateDetails
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    title: {
        fontSize: 22,
        marginVertical: 10,
    },
    card: {
        margin: 20,
    },
    delete: {
        marginTop: 40,
        backgroundColor: Colors.warning,
        width: 200,
        alignSelf: 'center',
    }
})