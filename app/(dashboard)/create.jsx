import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useUpdates } from '../../hooks/useUpdates'
import { useRouter } from 'expo-router'
import { useState } from 'react'

// themed components

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'


const Create = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)

    const { createUpdate } = useUpdates()
    const router = useRouter()

    const handleSubmit = async () => {
        if (!title.trim() || !author.trim() || !content.trim()) return

        setLoading(true)

        await createUpdate({ Title: title, Author: author, Content: content, Date: date })

        // reset fields
        setTitle('')
        setAuthor('')
        setContent('')
        setDate('')

        // redirect
        router.replace('/updates')


        //reset loading state
        setLoading(false)
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={styles.container}>
                <ThemedText title={true} style={styles.heading}>
                    Create a New Update
                </ThemedText>

                <Spacer />

                  <ThemedTextInput
                    style={styles.input}
                    placeholder="DD/MM/YYYY"
                    value={date}
                    onChangeText={setDate}
                    keyboardType="date-pad"
                />

                <Spacer />

                <ThemedTextInput
                    style={styles.input}
                    placeholder="Update Title"
                    value={title}
                    onChangeText={setTitle}
                />

                <Spacer />

                <ThemedTextInput
                    style={styles.input}
                    placeholder="Author"
                    value={author}
                    onChangeText={setAuthor}
                />

                <Spacer />

                <ThemedTextInput
                    style={styles.multiline}
                    placeholder="Update Content"
                    value={content}
                    onChangeText={setContent}
                    multiline={true}
                />

                <Spacer />

                <ThemedButton onPress={handleSubmit} disabled={loading}>
                    <Text style={{ color: "#fff" }}>
                        {loading ? "Saving..." : "Create Update"}
                    </Text>
                </ThemedButton>
            </ThemedView>
        </TouchableWithoutFeedback>
    );
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
});
