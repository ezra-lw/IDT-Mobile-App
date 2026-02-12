import { StyleSheet, ScrollView } from 'react-native'
import { useUser } from '../../hooks/useUser'
import { useMotivation } from '../../hooks/useMotivation'
import { useRouter } from 'expo-router'

import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard'

const Home = () => {
    const { user } = useUser()
    const { calculateDailySummary } = useMotivation()
    const router = useRouter()
    
    // Get motivation summary if user is Staff
    const isStaff = user?.team === 'Staff'
    const summary = isStaff ? calculateDailySummary() : null

    return (
        <ThemedView safe={true} style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <ThemedText title={true} style={styles.heading}>
                    Welcome to EduCentral!
                </ThemedText>

                <Spacer />

                {isStaff && summary && (
                    <>
                        <ThemedCard style={styles.card}>
                            <ThemedText style={styles.title}>Motivation Summary (Staff)</ThemedText>
                            <Spacer />
                            <ThemedText style={styles.summaryText}>
                                Overall Average: {summary.averageScore} / 5.00
                            </ThemedText>
                            <ThemedText style={styles.summarySubtext}>
                                Total Entries: {summary.totalEntries}
                            </ThemedText>
                            <Spacer />
                            {summary.dailySummaries.length > 0 && (
                                <>
                                    <ThemedText style={styles.subtitle}>Recent Daily Averages:</ThemedText>
                                    {summary.dailySummaries.slice(0, 5).map((day, index) => (
                                        <ThemedText key={index} style={styles.dailyEntry}>
                                            {day.date}: {day.averageScore} / 5 ({day.count} {day.count === 1 ? 'entry' : 'entries'})
                                        </ThemedText>
                                    ))}
                                </>
                            )}
                        </ThemedCard>
                        <Spacer />
                    </>
                )}


                

                <ThemedCard style={styles.card}>
                    <ThemedText style={styles.title}>School Updates</ThemedText>
                    <ThemedButton onPress={() => router.push('/updates')}>
                        <ThemedText style={{ color: '#fff', textAlign: 'center' }}>View Updates</ThemedText>
                    </ThemedButton>
                </ThemedCard>

                <Spacer />

                <ThemedCard style={styles.card}>
                    <ThemedText style={styles.title}>Motivation Tracker</ThemedText>
                    <ThemedButton onPress={() => router.push('/motivation')}>
                        <ThemedText style={{ color: '#fff', textAlign: 'center' }}>View Tracker</ThemedText>
                    </ThemedButton>
                </ThemedCard>

                <Spacer />
            </ScrollView>
        </ThemedView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    card: {
        width: '90%',
        padding: 20,
        minHeight: 230,
    },
    title: {
        paddingTop: 25,
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    summarySubtext: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.8,
    },
    dailyEntry: {
        fontSize: 15,
        marginVertical: 3,
        paddingLeft: 10,
    },
})