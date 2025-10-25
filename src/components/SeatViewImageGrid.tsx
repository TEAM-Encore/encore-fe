import { Icon } from '@/components/common/icons/Icon'
import { Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'
import { Image, Pressable, View } from 'react-native'

type SeatViewImageGridProps = {
  selectedImage: string | null
  onImageSelect: (imageId: string) => void
  onRefresh: () => void
  images: Array<{ id: string; url: string }>
}

export function SeatViewImageGrid({
  selectedImage,
  onImageSelect,
  onRefresh,
  images,
}: SeatViewImageGridProps) {
  return (
    <View>
      <View className="mb-3 items-end">
        <Pressable onPress={onRefresh} hitSlop={8}>
          <Row align="center" gap={4}>
            <Icon name="Stopwatch" size={14} className="text-gray-05" />
            <Text variant="caption" className="text-gray-05">
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
                      'aspect-[3/2] overflow-hidden rounded-[6px] bg-gray-11',
                      {
                        'opacity-20': selectedImage && !isSelected,
                      },
                    )}
                  >
                    <Image
                      source={{ uri: image.url }}
                      className="h-full w-full"
                      resizeMode="cover"
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
