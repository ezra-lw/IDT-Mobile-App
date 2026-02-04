import { StyleSheet } from 'react-native'

import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'

const Updates = () => {
  return (
    <ThemedView style={styles.container} safe={true}>
      <Spacer />

      <ThemedText title={true} style={styles.heading}>
        All School Updates
      </ThemedText>
    </ThemedView>
  )
}

export default Updates

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'stretch',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
})
