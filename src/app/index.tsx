import { Button } from '@/components/Button'
import { Text } from '@/components/common/ui/Text'
import { TextField } from '@/components/TextField'
import { toast } from '@/components/Toaster'
import { Link } from 'expo-router'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context'


export default function Index() {

  return (
    <SafeArea className="flex-1 items-center justify-center bg-gray-12 px-5">
      <Link href="/add-ticket/step1" asChild>
        <Text className="text-center font-semibold text-white">
          Add Ticket 페이지로 이동
        </Text>
      </Link>

      <Button onPress={() => toast.show('토스트')}>토스트</Button>
      <TextField
        as="textarea"
        placeholder="리뷰를 입력해주세요"
        className="mt-4"
      />
    </SafeArea>
  )
}
