import { overlay } from 'overlay-kit'
import React from 'react'
import { Pressable } from 'react-native'
import { Col } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'

export type PopupOptions = {
  title?: string
  subtitle?: string
  primaryLabel?: string
  secondaryLabel?: string
}

const OVERLAY_ID = 'continue-draft-popup' // 같은 ID로 열어 중복 방지

export async function Popup({
  title = '작성 중인 글이 있어요',
  subtitle = '이어서 쓰시겠어요?',
  primaryLabel = '이어 쓰기',
  secondaryLabel = '새로 쓰기',
}: PopupOptions = {}) {
  return overlay.openAsync<boolean>(
    ({ isOpen, close }) => {
      if (!isOpen) return null

      return (
        <Col className="absolute inset-0">
          <Pressable
            onPress={() => close(false)}
            className="absolute inset-0 bg-black/55"
            accessibilityRole="button"
            accessibilityLabel="닫기"
          />

          <Col className="absolute inset-0 mt-20 items-center justify-center px-6">
            <Col
              className={cn(
                'w-full rounded-[8px] bg-gray-10 px-[15.5px] pt-[21px] pb-[14px]',
              )}
              accessibilityLabel={title}
              center
            >
              <Text variant="subhead-03" className="text-center text-white">
                {title}
              </Text>

              {!!subtitle && (
                <Text
                  variant="body-01"
                  className="mt-[6px] text-center font-regular text-gray-07"
                >
                  {subtitle}
                </Text>
              )}

              <Pressable
                onPress={() => close(true)}
                className="mt-[13px] w-full items-center rounded-[4px] bg-[#FFDD56] py-[13px] active:scale-95"
                accessibilityRole="button"
                accessibilityLabel={primaryLabel}
              >
                <Text variant="subhead-02" className="font-bold text-gray-12">
                  {primaryLabel}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => close(false)}
                className="mt-[9px] w-full items-center py-[7px] active:opacity-70"
                accessibilityRole="button"
                accessibilityLabel={secondaryLabel}
              >
                <Text
                  variant="subhead-02"
                  className="font-semibold text-gray-07"
                >
                  {secondaryLabel}
                </Text>
              </Pressable>
            </Col>
          </Col>
        </Col>
      )
    },
    { overlayId: OVERLAY_ID }, // 동일 ID로 중복 오픈 방지
  )
}
