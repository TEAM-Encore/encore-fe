import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { ticketQueries } from '@/apis/ticket/queries'
import { Button } from '@/components/Button'
import { TicketBook } from '@/components/TicketBook'
import { useReviewWriteContext } from '@/contexts/ReviewWriteContext'
import { ReviewWriteStepLayout } from './_components/ReviewWriteStepLayout'

export default function ReviewWritePage() {
  const router = useRouter()
  const { setData } = useReviewWriteContext()
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null)

  const { data } = useQuery(ticketQueries.getUnreviewedTicketList())
  const tickets = data?.data ?? []

  const handleNext = () => {
    if (selectedTicketId) {
      setData({ ticketId: selectedTicketId })
      router.push('/review-write/step2')
    }
  }

  return (
    <ReviewWriteStepLayout
      instruction="후기를 작성할 내역을 선택해주세요."
      fixedButton={
        <Button onPress={handleNext} disabled={!selectedTicketId}>
          다음
        </Button>
      }
    >
      {/* Ticket List */}
      <FlatList
        data={tickets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const title = item.location
            ? `${item.musical_title} [${item.location}]`
            : (item.musical_title ?? '')
          const attendees =
            item.actors?.map((actor) => actor.name ?? '').join(' ') ?? ''

          return (
            <TicketBook
              title={title}
              date={item.viewed_date?.replace(/-/g, '.') ?? ''}
              theaterseat={`${item.floor}층 ${item.zone}구역 ${item.col}열 ${item.number}번`}
              attendees={attendees}
              posterUrl={item.musical_image_url ?? ''}
              active={selectedTicketId === item.id}
              onPress={() => item.id && setSelectedTicketId(item.id)}
            />
          )
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, gap: 20 }}
      />
    </ReviewWriteStepLayout>
  )
}
