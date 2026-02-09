import { StyleSheet, FlatList, Pressable } from 'react-native'
import { useUpdates } from '../../hooks/useUpdates'
import { Colors } from '../../constants/Colors'

import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import ThemedCard from '../../components/ThemedCard'

const Updates = () => {

  const { updates } = useUpdates()

  return (
    <ThemedView style={styles.container} safe={true}>
      <Spacer />

      <ThemedText title={true} style={styles.heading}>
        All School Updates
      </ThemedText>

      <Spacer />


      <FlatList
        data={updates}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.Title}</ThemedText>
              <ThemedText>Posted by {item.Author} on {item.Date}</ThemedText>
            </ThemedCard>


          </Pressable>
        )}

      />

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
  list: {
    marginTop: 40,
  },
  card: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
})
