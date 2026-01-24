import { ticketQueries } from '@/apis/ticket/queries'
import { Button } from '@/components/Button'
import { Screen } from '@/components/common/ui/Screen'
import { Dialog } from '@/components/Dialog'
import { StepHeader } from '@/components/StepHeader'
import { StepIndicator } from '@/components/StepIndicator'
import { TicketBook } from '@/components/TicketBook'
import { useReviewWriteContext } from '@/contexts/ReviewWriteContext'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useState } from 'react'
import { FlatList } from 'react-native'

export default function ReviewWritePage() {
  const router = useRouter()
  const { setData } = useReviewWriteContext()
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null)

  const { data } = useQuery(ticketQueries.getUnreviewedTicketList())
  const tickets = data?.data ?? []

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
        data={tickets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const title = item.location
            ? `${item.musical_title} [${item.location}]`
            : item.musical_title ?? ''
          const date = item.viewed_date?.replace(/-/g, '.') ?? ''
          const seatParts = [item.zone, item.col, item.number].filter(Boolean)
          const theaterseat = seatParts.join(' ')
          const attendees = item.actors?.map((actor) => actor.name ?? '') ?? []

          return (
            <TicketBook
              title={title}
              date={date}
              theaterseat={theaterseat}
              attendees={attendees}
              posterUrl={item.musical_image_url ?? ''}
              active={selectedTicketId === item.id}
              onPress={() => item.id && handleTicketSelect(item.id)}
            />
          )
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, gap: 20 }}
      />
    </Screen>
  )
}
