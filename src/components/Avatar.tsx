import { Image, type ImageURISource, Pressable } from 'react-native'
import { Icon } from './common/icons/Icon'
import { Flex } from './common/ui/Flex'

type AvatarProps = {
  source?: ImageURISource
  onUpload?: () => void
  hideCameraIcon?: boolean
}

export function Avatar({
  source,
  onUpload,
  hideCameraIcon = false,
}: AvatarProps) {
  return (
    <Pressable className="active:opacity-80" onPress={onUpload}>
      {source?.uri ? (
        <Image
          source={source}
          resizeMode="cover"
          className="size-[88px] rounded-full"
        />
      ) : (
        <Icon name="AvatarPlaceholder" size={88} />
      )}
      {!hideCameraIcon && (
        <Flex
          center
          className="-bottom-1 -right-1 absolute size-[28px] rounded-full bg-gray-09"
        >
          <Icon name="Camera" size={16} className="text-white" />
        </Flex>
      )}
    </Pressable>
  )
}
