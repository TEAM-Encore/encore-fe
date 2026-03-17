import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard, Platform, ScrollView, View } from 'react-native'
import type { z } from 'zod'
import { Button } from '@/components/Button'
import { Col } from '@/components/common/ui/Flex'
import { ReviewOptions } from '@/components/ReviewOptions'
import { FormTextField } from '@/components/TextField'
import { useReviewWriteContext } from '@/contexts/ReviewWriteContext'
import { ReviewWriteStepLayout } from '../_components/ReviewWriteStepLayout'
import { reviewWriteSchema } from '../schema'

const step4Schema = reviewWriteSchema.pick({
  soundQuality: true,
  soundQualityReason: true,
})
type Step4FormType = z.infer<typeof step4Schema>

const soundQualityOptions = [
  { value: 'GOOD' as const, label: '잘 들려요' },
  { value: 'AVERAGE' as const, label: '보통이에요' },
  { value: 'POOR' as const, label: '좋지 않아요' },
]

export default function ReviewWriteStep4() {
  const router = useRouter()
  const { setData } = useReviewWriteContext()
  const scrollRef = useRef<ScrollView>(null)
  const textFieldY = useRef(0)

  const form = useForm<Step4FormType>({
    resolver: zodResolver(step4Schema),
    mode: 'onChange',
    defaultValues: {
      soundQuality: 1,
      soundQualityReason: '',
    },
  })

  const selectedQuality = form.watch('soundQuality')

  const handleQualitySelect = (value: 'GOOD' | 'AVERAGE' | 'POOR') => {
    const index = soundQualityOptions.findIndex((opt) => opt.value === value)
    if (index !== -1) {
      form.setValue('soundQuality', index + 1, { shouldValidate: true })
    }
  }

  const handleNext = () => {
    const values = form.getValues()
    setData({
      soundQuality: soundQualityOptions.map((el) => el.value)[
        values.soundQuality - 1
      ],
      soundQualityReason: values.soundQualityReason,
    })
    router.push('/review-write/step5')
  }

  const soundQualityReason = form.watch('soundQualityReason')
  const isFormValid = soundQualityReason.length >= 20

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
    const showSub = Keyboard.addListener(showEvent, () =>
      setIsKeyboardVisible(true),
    )
    const hideSub = Keyboard.addListener(hideEvent, () =>
      setIsKeyboardVisible(false),
    )
    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [])

  return (
    <ReviewWriteStepLayout
      instruction="관람한 공연의 음향은 어떤가요?"
      fixedButton={
        <Button onPress={handleNext} disabled={!isFormValid}>
          다음
        </Button>
      }
    >
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: isKeyboardVisible ? 100 : 60 }}
      >
        <Col gap={20}>
          <ReviewOptions
            options={soundQualityOptions}
            value={
              soundQualityOptions.map((el) => el.value)[selectedQuality - 1]
            }
            onSelect={handleQualitySelect}
          />

          <View
            onLayout={(e) => {
              textFieldY.current = e.nativeEvent.layout.y
            }}
          >
            <FormTextField
              control={form.control}
              name="soundQualityReason"
              placeholder="자유롭게 이유를 작성해주세요. (최소 20자)"
              as="textarea"
              className="p-4 text-body-02 placeholder:text-gray-06"
              onFocus={() =>
                setTimeout(
                  () =>
                    scrollRef.current?.scrollTo({
                      y: textFieldY.current,
                      animated: true,
                    }),
                  100,
                )
              }
            />
          </View>
        </Col>
      </ScrollView>
    </ReviewWriteStepLayout>
  )
}
