import { Image, Pressable, View } from 'react-native'
import { cn } from '@/utils/cn'
import { Icon } from './common/icons/Icon'
import { Flex } from './common/ui/Flex'

type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large'

type AvatarProps = {
  imageUrl?: string
  onUpload?: () => void
  size?: AvatarSize
}

const sizeConfig = {
  xsmall: {
    container: 'size-[32px]',
    iconSize: 32,
    camera: 'size-[16px]',
    cameraIcon: 10,
  },
  small: {
    container: 'size-[48px]',
    iconSize: 48,
    camera: 'size-[20px]',
    cameraIcon: 12,
  },
  medium: {
    container: 'size-[64px]',
    iconSize: 64,
    camera: 'size-[24px]',
    cameraIcon: 14,
  },
  large: {
    container: 'size-[88px]',
    iconSize: 88,
    camera: 'size-[28px]',
    cameraIcon: 16,
  },
}

export function Avatar({ imageUrl, onUpload, size = 'large' }: AvatarProps) {
  const config = sizeConfig[size]

  const content = imageUrl ? (
    <Image
      source={{ uri: imageUrl }}
      resizeMode="cover"
      className={cn(config.container, 'rounded-full')}
    />
  ) : (
    <Icon
      name={size === 'xsmall' ? 'Variant2' : 'AvatarPlaceholder'}
      size={config.iconSize}
    />
  )

  if (onUpload) {
    return (
      <Pressable className="active:opacity-80" onPress={onUpload}>
        {content}
        <Flex
          center
          className={cn(
            '-bottom-1 -right-1 absolute rounded-full bg-gray-09',
            config.camera,
          )}
        >
          <Icon name="Camera" size={config.cameraIcon} className="text-white" />
        </Flex>
      </Pressable>
    )
  }

  return <View>{content}</View>
}
