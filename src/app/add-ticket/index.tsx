import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import z from 'zod'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { SwitchRenderer } from '@/components/util/SwitchRenderer'
import { Step1 } from './components/Step1'

const schema = z.object({})

export default function AddTicket() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const form = useForm()

  return (
    <Screen
      header={
        <Header progress={step / 4}>
          <Header.Back />
          <Header.Title>내역 추가하기</Header.Title>
          <Header.Close onPress={() => router.back()} />
        </Header>
      }
    >
      <SwitchRenderer
        value={step}
        caseBy={{
          1: <Step1 />,
        }}
      />
    </Screen>
  )
}
