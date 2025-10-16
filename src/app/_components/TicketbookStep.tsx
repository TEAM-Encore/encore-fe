import { useState } from 'react'
import { FlatList } from 'react-native'
import { Ticket } from '@/components/common/icons/svgs'
import { Col } from '@/components/common/ui/Flex'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { TicketBook } from '@/components/TicketBook'
import { SortSelector } from './SortSelector'

export const MOCK = [
  {
    id: '1',
    title: '비더슈단트 [샤롯데시어터]',
    date: '2025-06-21',
    theaterseat: 'B구역 6열 4번',
    attendees: ['우선영', '염지은', '하은영', '윤혜원'],
    posterUrl: 'https://picsum.photos/200/300?1',
  },
  {
    id: '2',
    title: '레미제라블 [블루스퀘어 신한카드홀]',
    date: '2025-07-05',
    theaterseat: 'A구역 5열 12번',
    attendees: ['김채윤', '이수민'],
    posterUrl: 'https://picsum.photos/200/300?2',
  },
  {
    id: '3',
    title: '웃는 남자 [예술의전당 오페라극장]',
    date: '2025-08-03',
    theaterseat: 'C구역 3열 9번',
    attendees: ['박하늘', '조유정', '홍지민'],
    posterUrl: 'https://picsum.photos/200/300?3',
  },
  {
    id: '4',
    title: '드라큘라 [샤롯데시어터]',
    date: '2025-09-14',
    theaterseat: 'VIP석 2열 6번',
    attendees: ['정은지', '오수진'],
    posterUrl: 'https://picsum.photos/200/300?4',
  },
  {
    id: '5',
    title: '데스노트 [충무아트센터 대극장]',
    date: '2025-10-02',
    theaterseat: 'S석 10열 17번',
    attendees: ['윤혜원', '이서연', '최유진'],
    posterUrl: 'https://picsum.photos/200/300?5',
  },
]

const tabs = [{ label: '전체', value: 'all' }, { label: '최근 1주', value: 'week' }, { label: '최근 1달', value: 'month' }]

export default function TicketbookStep() {
  const [sort, setSort] = useState<typeof tabs[number]['value']>(tabs[0].value)

  return (
    <>
      <SortSelector tabs={tabs} value={sort} onChange={setSort} />
      <Spacing size={1} />

      {MOCK.length > 0 ? (
        <FlatList
          data={MOCK}
          contentContainerClassName="px-5 gap-5 pb-6"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TicketBook {...item} />}
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
