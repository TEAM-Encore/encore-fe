import { Link } from 'expo-router'
import { overlay } from 'overlay-kit'
import { Button } from 'react-native'
import { Feather } from '@/components/common/icons/svgs'
import { Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Dialog } from '@/components/Dialog'
import AddReviewBottomSheet from './_components/AddReviewBottomSheet'

const tabs = [
  { label: '후기글', value: 'review' },
  { label: '티켓북', value: 'ticketbook' },
]

export default function Index() {
  // Redirect({ href: '/login' })

  return (
    <Screen>
      <Link href="/ticket-detail/1" asChild>
        <Text className="text-center font-semibold text-white">
          Ticket Detail Screen
        </Text>
      </Link>

      <Button
        onPress={() => {
          overlay.open((o) => (
            <Dialog
              {...o}
              title="Dialog"
              description="Dialog"
              top="이어쓰기"
              bottom="새로쓰기"
            />
          ))
        }}
      />
      <Row
        center
        className="absolute right-[22px] bottom-5 z-[9998] h-[60px] w-[60px] rounded-[30px] bg-primary-04"
        onPress={() => overlay.open((o) => <AddReviewBottomSheet {...o} />)}
      >
        <Feather color="#171717" />
      </Row>
    </Screen>
  )
}
