import { StyleSheet} from 'react-native'
import { useLocalSearchParams } from 'expo-router'

//themed components
import Spacer from '../../../components/Spacer'
import ThemedText from '../../../components/ThemedText'
import ThemedView from '../../../components/ThemedView'
import ThemedCard from '../../../components/ThemedCard'
import ThemedButton from '../../../components/ThemedButton'

const UpdateDetails = () => {
    const { id } = useLocalSearchParams()


  return (
    <ThemedView safe={true} style={styles.container}>
        <ThemedText> Update Details - {id}</ThemedText>
    </ThemedView>

  )
}

export default UpdateDetails
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
})