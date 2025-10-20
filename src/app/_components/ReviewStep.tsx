import { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { Spacing } from '@/components/common/ui/Spacing'
import { ReviewCard } from '@/components/ReviewCard'
import { SortSelector } from './SortSelector'

export const MOCK = [
  {
    id: '1',
    title: '5년차 찐 뮤덕의 알라딘 후기',
    summary:
      '넘버 퀄리티부터 배우합까지, 전반적으로 모두 만족스러웠던 공연입니다. 다시 본다면 개인적으로는 1열..',
    author: '뮤사랑',
    likes: 10,
  },
  {
    id: '2',
    title: '레미제라블 재연 후기 — 전율 그 자체',
    summary:
      '오랜만에 무대 전체가 압도적인 공연이었습니다. 장발장과 자베르의 대립, 그리고 앙상블의 완성도까지 최고!',
    author: '뮤덕정',
    likes: 24,
  },
  {
    id: '3',
    title: '지킬앤하이드, 그 날의 브라운은 미쳤다',
    summary:
      '넘버 하나하나가 다 귀에 꽂혔어요. 특히 ‘This is the Moment’에서 소름이 쫙… 객석 모두 숨죽였던 순간.',
    author: '연뮤보',
    likes: 17,
  },
  {
    id: '4',
    title: '드라큘라 후기 — 세트와 조명의 힘을 느낀 공연',
    summary:
      '무대 전환이 예술이었습니다. 드라큘라 성의 붉은 조명 연출이 너무 인상적이었어요.',
    author: '별빛연뮤',
    likes: 8,
  },
  {
    id: '5',
    title: '웃는 남자 초연 이후 다시 본 후기',
    summary:
      '초연 때보다 훨씬 안정적이었고, 배우들의 감정선이 더 깊어졌어요. 엔딩 장면에서 눈물 터졌습니다.',
    author: '하뮤',
    likes: 15,
  },
  {
    id: '6',
    title: '시카고 내한 공연 후기 — 완벽한 프로페셔널리즘',
    summary:
      '브로드웨이 배우들의 에너지가 그대로 느껴졌어요. 무대는 심플했지만 카리스마는 폭발적이었습니다.',
    author: '연뮤홀릭',
    likes: 31,
  },
]

const tabs = [{ label: '인기순', value: 'likes' }, { label: '최신순', value: 'createdAt' }]

export default function ReviewStep() {
  const [sort, setSort] = useState<typeof tabs[number]['value']>(tabs[0].value)

  const flatListRef = useRef<FlatList>(null)

  // 탭 변경 시
  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false })
  }, [])

  return (
    <>
      <SortSelector tabs={tabs} value={sort} onChange={setSort} />
      <Spacing size={1} />
      <FlatList
        data={MOCK}
        ref={flatListRef}
        contentContainerClassName="px-5 gap-5 pb-6"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard {...item} hideImage />}
      />
    </>
  )
}
