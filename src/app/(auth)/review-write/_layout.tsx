import { ReviewWriteContextProvider } from '@/contexts/ReviewWriteContext'
import { Stack } from 'expo-router'
import React from 'react'

export default function ReviewWriteLayout() {
  return (
    <ReviewWriteContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="step2" />
        <Stack.Screen name="step3" />
        <Stack.Screen name="step4" />
        <Stack.Screen name="step5" />
        <Stack.Screen name="step6" />
      </Stack>
    </ReviewWriteContextProvider>
  )
}
