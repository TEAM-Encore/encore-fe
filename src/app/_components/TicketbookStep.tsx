import { ticketQueries } from '@/apis/ticket/queries'
import { Ticket } from '@/components/common/icons/svgs'
import { Col } from '@/components/common/ui/Flex'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { TicketBook } from '@/components/TicketBook'
import { useUser } from '@/providers/user.provider'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList } from 'react-native'
import SortSelector from './SortSelector'

const tabs = [
  { label: '전체', value: 'all' },
  { label: '최근 1주', value: 'week' },
  { label: '최근 1달', value: 'month' },
]

export default function TicketbookStep() {
  const user = useUser()
  const router = useRouter()
  const [sort, setSort] = useState<(typeof tabs)[number]['value']>(
    tabs[0].value,
  )

  const { data } = useQuery(
    ticketQueries.getTicketList({
      dateRange: sort === 'all' ? '30' : sort === 'week' ? '7' : '0',
    }),
  )

  const tickets = data?.data ?? []

  console.log(tickets, 'tickets')

  return (
    <>
      <SortSelector tabs={tabs} value={sort} onChange={setSort} />
      <Spacing size={1} />

      {tickets?.length && tickets?.length > 0 ? (
        <FlatList
          data={tickets ?? []}
          contentContainerClassName="px-5 gap-5 pb-6"
          keyExtractor={(item) => item.id?.toString() ?? ''}
          renderItem={({ item }) => (
            <TicketBook
              title={item.musical_title ?? ''}
              date={item.viewed_date ?? ''}
              theaterseat={item.zone ?? ''}
              attendees={
                item.actors?.map((actor) => actor.name as string) ?? []
              }
              posterUrl={item.musical_image_url ?? ''}
              onPress={() => {
                if (!item.id) return

                router.push(`/ticket-detail/${item.id}`)
              }}
            />
          )}
        />
      ) : (
        <Col gap={8} center className="flex-1">
          <Ticket width={64} height={64} color="#A5A5A5" />
          <Text variant="body-02" color="gray-06">
            뮤지컬 티켓을 추가해보세요!
          </Text>
        </Col>
      )}
    </>
  )
}
