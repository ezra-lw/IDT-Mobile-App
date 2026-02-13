import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function useNotifications() {
    useEffect(() => {
        async function setupNotifications() {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') return;

            await Notifications.cancelAllScheduledNotificationsAsync();

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Log Your Motivation 💪",
                    body: "How motivated are you feeling today?",
                },
                trigger: {
                    type: 'timeInterval',
                    seconds: 10,
                    repeats: false,
                }
            });
        }

        setupNotifications();
    }, []);
}