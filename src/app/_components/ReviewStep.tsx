import { api } from '@/api'
import { Spacing } from '@/components/common/ui/Spacing'
import { ReviewCard } from '@/components/ReviewCard'
import { useInfiniteList } from '@/hooks/useInfiniteList'
import { useUser } from '@/providers/user.provider'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import SortSelector from './SortSelector'

const tabs = [
  { label: '인기순', value: 'likecount' },
  { label: '최신순', value: 'createdat' },
]

export default function ReviewStep() {
  const router = useRouter()
  const flatListRef = useRef<FlatList>(null)

  const user = useUser()
  const [sort, setSort] = useState<(typeof tabs)[number]['value']>(
    tabs[0].value,
  )

  const {
    rows: reviews,
    fetchNextPage,
    ...queryProps
  } = useInfiniteList({
    queryKey: 'reviews',
    fn: api().getReviewList,
    params: {
      sort: 'id', // TODO: 채윤님, defualt값이 id?
      userId: user?.id ?? 0,
    },
  })

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false })
  }, [])

  return (
    <>
      <SortSelector tabs={tabs} value={sort} onChange={setSort} />
      <Spacing size={1} />
      <FlatList
        data={reviews}
        ref={flatListRef}
        contentContainerClassName="px-5 gap-5"
        renderItem={({ item }) => (
          <ReviewCard
            title={item.title}
            summary={item.content ?? ''}
            author={item.nickname ?? ''}
            likes={item.like_count ?? 0}
            onPress={() => router.push(`/review-detail/${item.review_id}`)}
          />
        )}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          queryProps.isFetchingNextPage ? (
            <ActivityIndicator style={{ padding: 20 }} />
          ) : null
        }
        ListEmptyComponent={
          queryProps.isLoading ? (
            <ActivityIndicator style={{ padding: 20 }} />
          ) : null
        }
      />
      <Spacing size={24} />
    </>
  )
}
