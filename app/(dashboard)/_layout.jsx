import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import UserOnly from "../../components/auth/UserOnly";


const DashboardLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light;

    return (

        <UserOnly>

            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: theme.navBackground,
                        paddingTop: 10,
                        height: 90,
                    },
                    tabBarActiveTintColor: theme.iconColorFocused,
                    tabBarInactiveTintColor: theme.iconColor
                }}

            >
              
                  <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name={focused ? 'home' : 'home-outline'}

                                size={24}
                                color={focused ? theme.iconColorFocused : theme.iconColor}
                            />
                        )
                    }}
                />

                <Tabs.Screen
                    name="updates"
                    options={{
                        title: 'Updates',
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name={focused ? 'notifications' : 'notifications-outline'}
                                size={24}
                                color={focused ? theme.iconColorFocused : theme.iconColor}
                            />
                        )
                    }}
                />


                   <Tabs.Screen
                    name="motivation"
                    options={{
                        title: 'Motivation',
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name={focused ? 'happy' : 'happy-outline'}

                                size={24}
                                color={focused ? theme.iconColorFocused : theme.iconColor}
                            />
                        )
                    }}
                />

                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Create', tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name={focused ? 'create' : 'create-outline'}
                                size={24}
                                color={focused ? theme.iconColorFocused : theme.iconColor}
                            />

                        )
                    }}
                />

                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name={focused ? 'settings' : 'settings-outline'}
                                size={24}
                                color={focused ? theme.iconColorFocused : theme.iconColor}
                            />

                        )
                    }}

                />

                <Tabs.Screen
                    name="updates/[id]"
                    options={{
                        href: null,
                    }}
                />


                 <Tabs.Screen
                    name="feedback"
                    options={{
                        href: null,
                    }}
                />

            </Tabs>
        </UserOnly>

    )
}

export default DashboardLayout