import { createSafeContext } from '@/utils/create-safe-context'
import { useState, type ReactNode, useCallback } from 'react'

export interface ReviewWriteData {
  // Step 1: 티켓 선택
  ticketId?: number
  // Step 2: 제목
  title?: string
  // Step 3: 시야
  seatViewImage?: string
  seatViewComment?: string
  // Step 4: 음향
  soundQuality?: 'GOOD' | 'AVERAGE' | 'POOR'
  soundQualityReason?: string
  // Step 5: 시설
  facilityQuality?: 'GOOD' | 'AVERAGE' | 'POOR'
  facilityQualityReason?: string
  // Step 6: 총평
  ratingNumber?: number
  ratingStory?: number
  ratingRewatch?: number
  ratingActing?: number
  ratingPerformance?: number
  overallComment?: string
}

interface ReviewWriteContextValue {
  data: ReviewWriteData
  setData: (data: Partial<ReviewWriteData>) => void
  reset: () => void
}

const [ReviewWriteProvider, useReviewWriteContext] =
  createSafeContext<ReviewWriteContextValue>('ReviewWriteContext')

export { useReviewWriteContext }

const initialData: ReviewWriteData = {}

export function ReviewWriteContextProvider({
  children,
}: { children: ReactNode }) {
  const [data, setDataState] = useState<ReviewWriteData>(initialData)

  const setData = useCallback((newData: Partial<ReviewWriteData>) => {
    setDataState((prev) => ({ ...prev, ...newData }))
  }, [])

  const reset = useCallback(() => {
    setDataState(initialData)
  }, [])

  return (
    <ReviewWriteProvider value={{ data, setData, reset }}>
      {children}
    </ReviewWriteProvider>
  )
}
