import { router, usePathname } from 'expo-router'
import { overlay } from 'overlay-kit'
import type { ReactNode } from 'react'
import { Keyboard, Pressable } from 'react-native'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Dialog } from '@/components/Dialog'
import { StepHeader, type StepHeaderProps } from '@/components/StepHeader'
import { StepIndicator } from '@/components/StepIndicator'

interface ReviewWriteStepLayoutProps
  extends Omit<
    StepHeaderProps,
    | 'title'
    | 'currentStep'
    | 'totalSteps'
    | 'onClose'
    | 'showBack'
    | 'showClose'
  > {
  instruction: string
  fixedButton: ReactNode
  children: ReactNode
  stepIndicatorClassName?: string
}

export function ReviewWriteStepLayout({
  instruction,
  fixedButton,
  children,
  stepIndicatorClassName,
}: ReviewWriteStepLayoutProps) {
  const TOTAL_STEPS = 6

  const pathname = usePathname()
  const currentStep = pathname.split('/').pop()?.includes('step')
    ? Number(pathname.split('/').pop()?.at(-1))
    : 1

  const handleClose = () => {
    overlay.open((ov) => (
      <Dialog
        {...ov}
        title="리뷰 작성을 그만할까요?"
        description="중간에 나갈 시 작성한 내용이 삭제돼요."
        top="확인"
        bottom="취소"
        onTopPress={() => router.replace('/')}
      />
    ))
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
    <Screen
      header={
        <StepHeader
          title="후기글 추가"
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          showBack
          showClose={currentStep !== 1}
          onClose={handleClose}
        />
      }
      fixedButton={fixedButton}
    >
      {instruction != null ? (
        <>
          <Spacing size={30} />
          <StepIndicator
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            instruction={instruction}
            className={stepIndicatorClassName}
          />
          <Spacing size={30} />
          {children}
        </>
      ) : (
        children
      )}
    </Screen>
    </Pressable>
  )
}
