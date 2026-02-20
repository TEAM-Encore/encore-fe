import { ActivityIndicator, Image, Pressable, View } from 'react-native'
import { cn } from '@/utils/cn'
import { Icon } from './common/icons/Icon'
import { Flex } from './common/ui/Flex'

type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large'

type AvatarProps = {
  imageUrl?: string
  onUpload?: () => void
  size?: AvatarSize
  className?: string
  config?: {
    container: string
    iconSize: number
    camera: string
    cameraIcon: number
  }
  loading?: boolean
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

export function Avatar({
  imageUrl,
  onUpload,
  size = 'large',
  className,
  config,
  loading,
}: AvatarProps) {
  const avatarConfig = config ?? sizeConfig[size]

  const content = imageUrl ? (
    <Image
      source={{ uri: imageUrl }}
      resizeMode="cover"
      className={cn(avatarConfig.container, 'rounded-full')}
    />
  ) : (
    <Icon
      name={size === 'xsmall' ? 'Variant2' : 'AvatarPlaceholder'}
      size={avatarConfig.iconSize}
      className={className}
    />
  )

  if (onUpload) {
    return (
      <Pressable className="relative active:opacity-80" onPress={onUpload}>
        {content}
        {loading && (
          <Flex
            center
            className={cn(
              'absolute inset-0 z-10 rounded-full bg-black/40',
              avatarConfig.container,
            )}
          >
            <ActivityIndicator color="white" size="small" />
          </Flex>
        )}
        <Flex
          center
          className={cn(
            '-bottom-1 -right-1 absolute rounded-full bg-gray-09',
            avatarConfig.camera,
          )}
        >
          <Icon
            name="Camera"
            size={avatarConfig.cameraIcon}
            className="text-white"
          />
        </Flex>
      </Pressable>
    )
  }

  return <View>{content}</View>
}
