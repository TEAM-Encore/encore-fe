import { Link, Redirect } from 'expo-router'
import { overlay } from 'overlay-kit'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context'
import { Button } from '@/components/Button'
import { Text } from '@/components/common/ui/Text'
import { Dialog } from '@/components/Dialog'
import { TextField } from '@/components/TextField'

export default function Index() {
  Redirect({ href: '/login' })

  return (
    <SafeArea className="flex-1 items-center justify-center bg-gray-12 px-5">
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
      >
        Dialog
      </Button>
      <TextField
        as="textarea"
        placeholder="리뷰를 입력해주세요"
        className="mt-4"
      />
    </SafeArea>
  )
}
