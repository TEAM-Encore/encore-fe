import { REVIEW_MOCK } from '@/app/_components/ReviewStep';
import { Screen } from '@/components/common/ui/Screen';
import { Header } from '@/components/Header';
import { ReviewCard } from '@/components/ReviewCard';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';

export default function Reviews() {
  const insets = useSafeAreaInsets()

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
        data={REVIEW_MOCK}
        contentContainerClassName='gap-5 py-6'
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ReviewCard
            {...item}
            hideImage
          />
        )}
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
  );
}
