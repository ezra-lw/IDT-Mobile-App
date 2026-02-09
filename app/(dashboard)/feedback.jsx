import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useFeedback } from '../../hooks/useFeedback'
import { useState } from 'react'
import { useRouter } from 'expo-router'

// themed components

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import ThemedCard from '../../components/ThemedCard'

const Feedback = () => {

    const [date, setDate] = useState('')
    const [feedback, setFeedback] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const { createFeedback } = useFeedback()
    const router = useRouter()
    const handleSubmit = async () => {
        if (!date.trim() || !feedback.trim()) return

        setLoading(true)
        setSuccess(false)

        try {
            console.log('Submitting feedback:', { Date: date, Feedback: feedback })
            await createFeedback({ Date: date, Feedback: feedback })
            console.log('Feedback submitted successfully')

            // reset fields
            setFeedback('')
            setDate('')

            //reset loading state
            setLoading(false)
            setSuccess(true)

            // Hide success message after 3 seconds, reroute to home
            setTimeout(() => {
                setSuccess(false)
                router.push('/home')
            }, 3000)
                

            

            

        } catch (error) {
            console.error('Error submitting feedback:', error)
            setLoading(false)
            alert('Error submitting feedback: ' + error.message)
        }
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={styles.container}>
                <ThemedText title={true} style={styles.heading}>
                    Submit Your Feedback
                </ThemedText>

                <Spacer />

                <ThemedTextInput
                    style={styles.input}
                    placeholder="DD/MM/YYYY"
                    value={date}
                    onChangeText={setDate}
                />

                <Spacer />

                <ThemedTextInput
                    style={styles.multiline}
                    placeholder="Suggestions, Comments, or Concerns"
                    value={feedback}
                    onChangeText={setFeedback}
                    multiline={true}
                />
                <Spacer />


                <ThemedButton onPress={handleSubmit} disabled={loading}>
                    <ThemedText style={{ color: "#fff" }}>
                        {loading ? "Saving..." : "Submit"}
                    </ThemedText>
                </ThemedButton>


                {success && (
                    <>
                        <Spacer />
                        <ThemedCard style={styles.ThemedCard}>
                            <ThemedText style={styles.title}>
                                Feedback logged successfully!
                            </ThemedText>
                        </ThemedCard>
                    </>
                )}
            </ThemedView>
        </TouchableWithoutFeedback>
    );
}

export default Feedback

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
    title: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    card: {
        width: '60%',
        padding: 20,
        minHeight: 100,
    },
});
