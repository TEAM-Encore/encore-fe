import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { Col } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { AddTicketHeader } from '../components/AddTicketHeader'

export default function Step2() {
  const router = useRouter()
  return (
    <Screen
      header={<AddTicketHeader progress={50} onBack={() => router.back()} />}
    >
      <Col gap={8}>
        <Text variant="body-01" className="text-gray-07">
          2/4
        </Text>
        <Text variant="subhead-05" className="text-gray-01">
          관람한 공연을 검색해주세요.
        </Text>
      </Col>
    </Screen>
  )
}
