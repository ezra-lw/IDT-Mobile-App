import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { useState } from 'react'

// themed components

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import ThemedTextInput from '../../components/ThemedTextInput'

const Register = () => {
    const [studentid, setStudentID] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log('register form submitted', studentid, password)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <ThemedView style={styles.container}>

                <Spacer />
                <ThemedText title={true} style={styles.title}>
                    Register your EduCentral Account Below
                </ThemedText>

                <ThemedTextInput
                    style={{ width: '80%', marginBottom: 20 }}
                    placeholder="Student ID"
                    keyboardType="numeric"
                    onChangeText={setStudentID}
                    value={studentid}
                />

                <ThemedTextInput
                    style={{ width: '80%', marginBottom: 20 }}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />

                <ThemedButton onPress={handleSubmit}>
                    <Text style={{ color: '#f2f2f2' }}>Register</Text>

                </ThemedButton>

                <Spacer height={100} />
                <Link href='/login'>
                    <ThemedText style={{ textAlign: 'center' }}>
                        Login instead
                    </ThemedText>
                </Link>

            </ThemedView>
        </TouchableWithoutFeedback>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 30,
    },
})