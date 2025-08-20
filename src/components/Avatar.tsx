import { Image, type ImageURISource, Pressable } from 'react-native'
import { Icon } from './common/icons/Icon'
import { Flex } from './common/ui/Flex'

type AvatarProps = {
  source?: ImageURISource
  onUpload?: () => void
}

export function Avatar({ source, onUpload }: AvatarProps) {
  return (
    <Pressable className="relative active:opacity-80" onPress={onUpload}>
      {source?.uri ? (
        <Image
          source={source}
          resizeMode="cover"
          className="absolute inset-0 size-[88px] rounded-full"
        />
      ) : (
        <Icon name="AvatarPlaceholder" size={88} />
      )}
      <Flex
        center
        className="absolute -bottom-1 -right-1 size-[28px] rounded-full bg-gray-09"
      >
        <Icon name="Camera" size={16} className="text-white" />
      </Flex>
    </Pressable>
  )
}
