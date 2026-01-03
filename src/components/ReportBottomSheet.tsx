import { BottomSheet } from '@/components/BottomSheet'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'
import React from 'react'
import { Pressable } from 'react-native'

type ReportReason =
  | 'INAPPROPRIATE_REVIEW'
  | 'COMMERCIAL_SELLING'
  | 'PROFANITY_INSULT'
  | 'PORNOGRAPHY_INAPPROPRIATE'
  | 'LEAK_IMPERSONATION'

interface ReportOption {
  value: ReportReason
  label: string
}

const REPORT_OPTIONS: ReportOption[] = [
  { value: 'INAPPROPRIATE_REVIEW', label: '주제와 관련없는 내용' },
  { value: 'COMMERCIAL_SELLING', label: '상업적 판매/도배' },
  { value: 'PROFANITY_INSULT', label: '욕설/비하' },
  { value: 'PORNOGRAPHY_INAPPROPRIATE', label: '음란물/불건전한 대화' },
  { value: 'LEAK_IMPERSONATION', label: '유출/사칭' },
]

interface ReportBottomSheetProps extends OverlayProps {
  onReport: (reason: ReportReason) => void
}

export function ReportBottomSheet({
  isOpen,
  close,
  unmount,
  onReport,
}: ReportBottomSheetProps) {
  const [selectedReason, setSelectedReason] =
    React.useState<ReportReason>('INAPPROPRIATE_REVIEW')

  const handleConfirm = () => {
    onReport(selectedReason)
    close()
    setTimeout(() => {
      unmount?.()
    }, 300)
  }

  return (
    <BottomSheet.Root
      isOpen={isOpen}
      close={close}
      unmount={unmount}
      backgroundColor="#333333"
    >
      <BottomSheet.Header>신고</BottomSheet.Header>
      <BottomSheet.Content>
        {REPORT_OPTIONS.map((option) => {
          const isSelected = selectedReason === option.value
          return (
            <Pressable
              key={option.value}
              onPress={() => setSelectedReason(option.value)}
              className={cn(
                'py-4 px-6',
                isSelected ? 'bg-gray-08' : 'bg-gray-10',
              )}
            >
              <Text
                variant="body-01"
                className={cn(
                  isSelected ? 'text-gray-01' : 'text-gray-06',
                )}
              >
                {option.label}
              </Text>
            </Pressable>
          )
        })}
      </BottomSheet.Content>
      <BottomSheet.Footer
        buttonProps={{
          onPress: handleConfirm,
          children: '확인',
        }}
      />
    </BottomSheet.Root>
  )
}
