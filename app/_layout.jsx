import { Stack } from 'expo-router'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { UserProvider } from '../context/UserContext'
import { UpdatesProvider } from '../context/UpdatesContext'
import { MotivationProvider } from '../context/MotivationContext'
import { FeedbackProvider } from '../context/FeedbackContext'

const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light





    return (
        <UserProvider>
            <UpdatesProvider>
                <MotivationProvider>
                    <FeedbackProvider>
                        <StatusBar value="auto" />
                        <Stack screenOptions={{
                            headerStyle: { backgroundColor: theme.navBackground },
                            headerTintColor: theme.title,

                        }}>
                            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                            <Stack.Screen name="index" options={{ title: 'Login', headerShown: false }} />
                            <Stack.Screen name="home" options={{ title: 'Home' }} />
                            <Stack.Screen name="contact" options={{ title: 'Contact' }} />
                            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />

                        </Stack>
                    </FeedbackProvider>
                </MotivationProvider>
            </UpdatesProvider>
        </UserProvider>
    )
}

export default RootLayout

const styles = StyleSheet.create({})