import { Pressable } from 'react-native'
import { Icon } from '@/components/common/icons/Icon'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'

interface LoginButtonProps {
  type: 'Kakao' | 'Google'
  onPress: () => void
}

export default function LoginButton({ type, onPress }: LoginButtonProps) {
  const buttonColor = {
    kakao: 'bg-[#FEE500]',
    google: 'bg-white',
  }

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'relative flex h-[50px] w-full items-center justify-center rounded-[60px] px-4',
        buttonColor[type.toLowerCase() as keyof typeof buttonColor],
      )}
    >
      <Text variant="body-02" className="text-gray-12">
        {type} 로그인
      </Text>
      <Icon name={type} size={18} className="absolute left-4" />
    </Pressable>
  )
}
