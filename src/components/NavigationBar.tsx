import { cn } from '@/utils/cn'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { Pressable } from 'react-native'
import { Icon } from './common/icons/Icon'
import { Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'

export interface NavigationBarProps {
  /**
   * 뒤로가기 버튼 표시 여부
   * leftComponent가 제공되면 이 prop은 무시됩니다.
   */
  showBackButton?: boolean

  /**
   * 네비게이션 바의 왼쪽 컴포넌트
   */
  leftComponent?: React.ReactNode

  /**
   * 중앙에 표시할 제목 텍스트
   */
  title?: string

  /**
   * 네비게이션 바의 중앙 영역 컴포넌트
   */
  centerComponent?: React.ReactNode

  /**
   * 네비게이션 바의 오른쪽 컴포넌트
   */
  rightComponent?: React.ReactNode

  /**
   * 추가 스타일 클래스
   */
  className?: string
}

export default function NavigationBar({
  leftComponent,
  showBackButton = false,
  title,
  centerComponent,
  rightComponent,
  className,
}: NavigationBarProps) {
  const router = useRouter()

  // 왼쪽 영역 렌더링
  const leftElement = useMemo(() => {
    if (leftComponent) {
      return leftComponent
    }

    if (showBackButton) {
      return (
        <Pressable onPress={() => router.back()}>
          <Icon name="ArrowLeft" className="text-gray-01" />
        </Pressable>
      )
    }

    return null
  }, [leftComponent, showBackButton, router])

  // 중앙 영역 렌더링
  const centerElement = useMemo(() => {
    if (centerComponent) {
      return centerComponent
    }

    if (title) {
      return (
        <Text
          numberOfLines={1}
          variant={'headline'}
          className="text-center text-gray-01"
        >
          {title}
        </Text>
      )
    }

    return null
  }, [centerComponent, title])

  return (
    <Row className={cn('relative h-[62px] w-full bg-gray-12', className)}>
      {/* 왼쪽 영역 */}
      {leftElement && (
        <Row className="flex-shrink-0" align="center">
          {leftElement}
        </Row>
      )}

      {/* 오른쪽 영역 */}
      {rightComponent && (
        <Row className="flex-1" align="center" justify="flex-end">
          {rightComponent}
        </Row>
      )}

      {/* 중앙 영역 */}
      {centerElement && (
        <Row className="absolute inset-0" align="center" justify="center">
          {centerElement}
        </Row>
      )}
    </Row>
  )
}

export { NavigationBar }
