import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useMotivation } from '../../hooks/useMotivation'
import { useRouter } from 'expo-router'
import { useState } from 'react'

// themed components

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import ThemedCard from '../../components/ThemedCard'

const Create = () => {

    const [date, setDate] = useState('')
    const [motivation, setMotivation] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const { createMotivation } = useMotivation()
    const router = useRouter()

    const handleSubmit = async () => {
        if (!date.trim() || !motivation.trim()) return

        const motivationNum = parseInt(motivation)
        if (isNaN(motivationNum) || motivationNum < 0 || motivationNum > 5) {
            alert('Motivation must be a number between 0 and 5')
            return
        }

        setLoading(true)
        setSuccess(false)

        await createMotivation({ Date: date, Motivation: motivationNum })

        // reset fields
        setMotivation('')
        setDate('')

        //reset loading state
        setLoading(false)
        setSuccess(true)

        // Hide success message after 3 seconds
        setTimeout(() => {
            setSuccess(false)
        }, 5000)
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={styles.container}>
                <ThemedText title={true} style={styles.heading}>
                    Log Your Daily Motivation
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
                    style={styles.input}
                    placeholder="0-5 (5 being most motivated)"
                    value={motivation}
                    onChangeText={setMotivation}
                    keyboardType="numeric"
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
                                Motivation logged successfully!
                            </ThemedText>
                        </ThemedCard>
                    </>
                )}
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
