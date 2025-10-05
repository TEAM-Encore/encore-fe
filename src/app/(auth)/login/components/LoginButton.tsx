import { Button } from '@/components/Button'
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
    <Button
      className={cn(
        'relative h-[50px] rounded-[60px] px-4 active:bg-inherit active:opacity-90',
        buttonColor[type.toLowerCase() as keyof typeof buttonColor],
      )}
      onPress={onPress}
    >
      <Text variant="body-02" className="text-gray-12">
        {type} 로그인
      </Text>
      <Icon name={type} size={18} className="absolute left-4" />
    </Button>
  )
}
