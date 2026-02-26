import { Image } from 'expo-image'
import { useCallback, useState } from 'react'
import { Pressable, View } from 'react-native'
import { Icon } from '@/components/common/icons/Icon'
import { Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'

type SeatViewImageGridProps = {
  selectedImage: string | null
  onImageSelect: (imageId: string) => void
  onRefresh: () => void
  images: Array<{ id: string; url: string }>
  className?: string
}

export function SeatViewImageGrid({
  selectedImage,
  onImageSelect,
  onRefresh,
  images,
  className,
}: SeatViewImageGridProps) {
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set())

  const handleImageLoad = useCallback((imageId: string) => {
    setLoadedIds((prev) => new Set(prev).add(imageId))
  }, [])

  return (
    <View className={cn(className)}>
      <View className="mb-3 items-end">
        <Pressable onPress={onRefresh} hitSlop={8}>
          <Row align="center" gap={4}>
            <Icon name="Stopwatch" size={14} className="text-gray-05" />
            <Text variant="caption" color="gray-05">
              새로고침
            </Text>
          </Row>
        </Pressable>
      </View>

      <View className="gap-2">
        {[0, 1].map((rowIndex) => (
          <Row key={rowIndex} gap={8}>
            {[0, 1].map((colIndex) => {
              const imageIndex = rowIndex * 2 + colIndex
              const image = images[imageIndex]

              if (!image) return null

              const isSelected = selectedImage === image.id

              return (
                <Pressable
                  key={image.id}
                  onPress={() => onImageSelect(image.id)}
                  className="flex-1"
                >
                  <View
                    className={cn(
                      'overflow-hidden rounded-[6px] bg-gray-10',
                      !loadedIds.has(image.id) && 'animate-pulse',
                    )}
                    style={{
                      aspectRatio: 3 / 2,
                      opacity: selectedImage && !isSelected ? 0.2 : 1,
                    }}
                  >
                    <Image
                      source={{ uri: image.url }}
                      className="h-full w-full"
                      contentFit="cover"
                      cachePolicy="memory-disk"
                      onLoad={() => handleImageLoad(image.id)}
                    />
                  </View>
                </Pressable>
              )
            })}
          </Row>
        ))}
      </View>
    </View>
  )
}
