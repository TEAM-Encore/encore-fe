import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="step1/index" />
      <Stack.Screen name="step2/index" />
      <Stack.Screen name="step3/index" />
      <Stack.Screen name="step4/index" />
    </Stack>
  )
}
