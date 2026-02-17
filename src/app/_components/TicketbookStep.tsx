import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { ticketQueries } from '@/apis/ticket/queries'
import { Ticket } from '@/components/common/icons/svgs'
import { Col } from '@/components/common/ui/Flex'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { TicketBook } from '@/components/TicketBook'
import SortSelector from './SortSelector'

const tabs = [
  { label: '전체', value: 'all', num: '0' },
  { label: '최근 1주', value: 'week', num: '7' },
  { label: '최근 1달', value: 'month', num: '30' },
]

export default function TicketbookStep() {
  const router = useRouter()
  const [sort, setSort] = useState<(typeof tabs)[number]['value']>(
    tabs[0].value,
  )

  const { data: tickets } = useQuery(
    ticketQueries.getTicketList({
      dateRange: tabs.find((tab) => tab.value === sort)?.num ?? '30',
    }),
  )

  return (
    <>
      <SortSelector tabs={tabs} value={sort} onChange={setSort} />
      <Spacing size={1} />

      {tickets?.length && tickets?.length > 0 ? (
        <FlatList
          data={tickets}
          contentContainerClassName="px-5 gap-5 pb-6"
          keyExtractor={(item) => item.id?.toString() ?? ''}
          renderItem={({ item }) => (
            <TicketBook
              title={item.musical_title ?? ''}
              date={item.viewed_date?.replace(/-/g, '.') ?? ''}
              theaterseat={`${item.floor}층 ${item.zone}구역 ${item.col}열 ${item.number}번`}
              attendees={
                item.actors?.map((actor) => actor.name as string).join(' ') ??
                ''
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
