import { StyleSheet, ScrollView, Alert, Platform, Share } from 'react-native'
import { useUser } from '../../hooks/useUser'
import { useMotivation } from '../../hooks/useMotivation'
import { useRouter } from 'expo-router'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

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

    const downloadReport = async () => {
        if (!summary) return

        try {
            const now = new Date()
            // Create CSV content
            let csvContent = 'Motivation Data Summary Report\n\n'
            csvContent += `Generated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}\n\n`
            csvContent += `Overall Average Score: ${summary.averageScore} / 5.00\n`
            csvContent += `Total Entries: ${summary.totalEntries}\n\n`
            csvContent += 'Daily Breakdown:\n'
            csvContent += 'Date,Average Score,Entry Count\n'

            summary.dailySummaries.forEach(day => {
                csvContent += `${day.date},${day.averageScore},${day.count}\n`
            })

            const fileName = `motivation_report_${now.toISOString().split('T')[0]}.csv`

            if (Platform.OS === 'web') {
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
                const url = URL.createObjectURL(blob)
                const anchor = document.createElement('a')
                anchor.href = url
                anchor.download = fileName
                document.body.appendChild(anchor)
                anchor.click()
                anchor.remove()
                URL.revokeObjectURL(url)
                return
            }

            const baseDir = FileSystem.documentDirectory ?? FileSystem.cacheDirectory
            if (!baseDir) {
                await Share.share({
                    title: 'Motivation Report',
                    message: csvContent,
                })
                return
            }
            const fileUri = baseDir + fileName

            if (FileSystem.EncodingType?.UTF8) {
                await FileSystem.writeAsStringAsync(fileUri, csvContent, {
                    encoding: FileSystem.EncodingType.UTF8,
                })
            } else {
                await FileSystem.writeAsStringAsync(fileUri, csvContent)
            }

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri)
            } else {
                Alert.alert('Success', `Report saved to ${fileUri}`)
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to generate report: ' + error.message)
        }
    }

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
                            <Spacer />
                            <ThemedButton onPress={downloadReport}>
                                <ThemedText style={{ color: '#fff', textAlign: 'center' }}>Download Report</ThemedText>
                            </ThemedButton>
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