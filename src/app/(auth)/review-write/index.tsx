import { Button } from '@/components/Button'
import { Screen } from '@/components/common/ui/Screen'
import { Dialog } from '@/components/Dialog'
import { StepHeader } from '@/components/StepHeader'
import { StepIndicator } from '@/components/StepIndicator'
import { TicketBook } from '@/components/TicketBook'
import { useReviewWriteContext } from '@/contexts/ReviewWriteContext'
import { useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useState } from 'react'
import { FlatList } from 'react-native'

// TODO: api 연동 후 Mock data 삭제 (미작성 티켓 조회 API 필요)
const mockTickets = [
  {
    id: 1,
    posterUrl: 'https://via.placeholder.com/88x132',
    title: '비더슈탄트 [사롯데시어터]',
    date: '2024.06.21',
    theaterseat: 'B구역 6열 4번',
    attendees: ['우선영', '염지은', '하은영', '윤혜원'],
  },
  {
    id: 2,
    posterUrl: 'https://via.placeholder.com/88x132',
    title: '비더슈탄트 [사롯데시어터]',
    date: '2024.06.21',
    theaterseat: 'B구역 6열 4번',
    attendees: ['우선영', '염지은', '하은영', '윤혜원'],
  },
  {
    id: 3,
    posterUrl: 'https://via.placeholder.com/88x132',
    title: '비더슈탄트 [사롯데시어터]',
    date: '2024.06.21',
    theaterseat: 'B구역 6열 4번',
    attendees: ['우선영', '염지은', '하은영', '윤혜원'],
  },
  {
    id: 4,
    posterUrl: 'https://via.placeholder.com/88x132',
    title: '비더슈탄트 [사롯데시어터]',
    date: '2024.06.21',
    theaterseat: 'B구역 6열 4번',
    attendees: ['우선영', '염지은', '하은영', '윤혜원'],
  },
]

export default function ReviewWritePage() {
  const router = useRouter()
  const { setData } = useReviewWriteContext()
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null)

  const handleTicketSelect = (ticketId: number) => {
    setSelectedTicketId(ticketId)
  }

  const handleNext = () => {
    if (selectedTicketId) {
      setData({ ticketId: selectedTicketId })
      router.push('/review-write/step2')
    }
  }

  const handleClose = () => {
    overlay.open((ov) => (
      <Dialog
        {...ov}
        title="리뷰 작성을 그만할까요?"
        description="중간에 나갈 시 작성한 내용이 삭제돼요."
        top="확인"
        bottom="취소"
        onTopPress={() => {
          router.push('/')
        }}
      />
    ))
  }

  return (
    <Screen
      header={
        <StepHeader
          title="후기글 추가"
          currentStep={1}
          totalSteps={6}
          showBack={false}
          showClose={true}
          onClose={handleClose}
        />
      }
      fixedButton={
        <Button onPress={handleNext} disabled={!selectedTicketId}>
          다음
        </Button>
      }
    >
      <StepIndicator
        currentStep={1}
        totalSteps={6}
        instruction="후기를 작성할 내역을 선택해주세요."
        className="my-7"
      />

      {/* Ticket List */}
      <FlatList
        data={mockTickets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TicketBook
            title={item.title}
            date={item.date}
            theaterseat={item.theaterseat}
            attendees={item.attendees}
            posterUrl={item.posterUrl}
            active={selectedTicketId === item.id}
            onPress={() => handleTicketSelect(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, gap: 20 }}
      />
    </Screen>
  )
}
