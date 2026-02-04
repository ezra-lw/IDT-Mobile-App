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



const Stafflogin = () => {
    const [staffid, setStaffID] = useState('')
    const [staffpassword, setStaffPassword] = useState('')


    const handleSubmit = () => {
        console.log('login form submitted', staffid, staffpassword)
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
                placeholder="Staff ID"
                keyboardType="numeric"
                onChangeText={setStaffID}
                value={staffid}
            />

            <ThemedTextInput
                style={{ width: '80%', marginBottom: 20 }}
                placeholder="Password"
                onChangeText={setStaffPassword}
                value={staffpassword}
                secureTextEntry={true}
            />

            <ThemedButton onPress={handleSubmit}>
                <Text style={{ color: '#f2f2f2' }}>Login</Text>

            </ThemedButton>


            <Spacer height={100} />   
            <Link href='/register'>
                <ThemedText style={{ textAlign: 'center' }}> 
                    Contact IT Support
                </ThemedText>
            </Link>

        </ThemedView>
        </TouchableWithoutFeedback>
    )
}

export default Stafflogin

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