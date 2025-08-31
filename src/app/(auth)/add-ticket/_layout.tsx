import { Slot, Stack } from 'expo-router'
import { AddTicketProvider } from './components/AddTicketProvider'

export default function AddTicketLayout() {
  return (
    <AddTicketProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="step1" />
        <Stack.Screen name="step2" />
      </Stack>
    </AddTicketProvider>
  )
}
