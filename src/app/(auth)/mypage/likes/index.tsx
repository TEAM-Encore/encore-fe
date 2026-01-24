import { LinearGradient } from 'expo-linear-gradient'
import { ActivityIndicator, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { api } from '@/api'
import { Screen } from '@/components/common/ui/Screen'
import { Header } from '@/components/Header'
import { ReviewCard } from '@/components/ReviewCard'
import { useInfiniteList } from '@/hooks/useInfiniteList'

export default function Reviews() {
  const insets = useSafeAreaInsets()

  const {
    rows: likes,
    fetchNextPage,
    ...queryProps
  } = useInfiniteList({
    queryKey: 'reviews',
    fn: api().getMyLikedReviewList,
    params: {
      size: 3,
      sort: 'like_count',
    },
  })

  return (
    <Screen
      header={
        <Header>
          <Header.Back />
          <Header.Center>좋아요 목록</Header.Center>
        </Header>
      }
    >
      <FlatList
        data={likes ?? []}
        contentContainerClassName="gap-5 py-6"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.review_id?.toString() ?? ''}
        renderItem={({ item }) => (
          <ReviewCard
            title={item.title ?? ''}
            summary={item.content ?? ''}
            author={item.nickname ?? ''}
            likes={item.like_count ?? 0}
            hideImage
          />
        )}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          queryProps.isFetchingNextPage ? (
            <ActivityIndicator style={{ padding: 20 }} />
          ) : null
        }
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.1)', '#000000']}
        locations={[0, 0.5, 1]}
        style={{
          position: 'absolute',
          right: 0,
          bottom: insets.bottom - 70,
          left: 0,
          height: 200,
          zIndex: 40,
          pointerEvents: 'none',
        }}
      />
    </Screen>
  )
}
