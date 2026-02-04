import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { useState } from 'react'
import { useUser } from '../../hooks/useUser'


// themed components

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import ThemedTextInput from '../../components/ThemedTextInput'



const Login = () => {
    const [studentid, setStudentID] = useState('')
    const [password, setPassword] = useState('')

    const { user, login } = useUser()

    const handleSubmit = () => {
        console.log('current user:', user)
        console.log('login form submitted', studentid, password)
    }
    return (
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>

            <Spacer />
            <ThemedText title={true} style={styles.title}>
                Login to your account
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
                <Text style={{ color: '#f2f2f2' }}>Login</Text>

            </ThemedButton>


            <Spacer height={100} />
            <Link href='/register'>
                <ThemedText style={{ textAlign: 'center' }}>
                    Register instead
                </ThemedText>
            </Link>

        </ThemedView>
        </TouchableWithoutFeedback>
    )
}

export default Login

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
    btn: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
    },
    pressed: {
        opacity: 0.8,
    },
})