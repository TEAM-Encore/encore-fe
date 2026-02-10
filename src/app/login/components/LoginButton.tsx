import { Icon } from '@/components/common/icons/Icon'
import { Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'

const buttonColor = {
  kakao: 'bg-[#FEE500]',
  google: 'bg-white',
}

interface LoginButtonProps {
  type: 'Kakao' | 'Google'
  onPress: () => void
}

export default function LoginButton({ type, onPress }: LoginButtonProps) {
  return (
    <Row
      align="center"
      justify="center"
      className={cn(
        'relative h-[50px] rounded-[60px] px-4 active:opacity-90',
        buttonColor[type.toLowerCase() as keyof typeof buttonColor],
      )}
      onPress={onPress}
    >
      <Icon name={type} size={18} className="absolute left-4 text-gray-12" />
      <Text variant="body-02" className="text-gray-12">
        {type} 로그인
      </Text>
    </Row>
  )
}
