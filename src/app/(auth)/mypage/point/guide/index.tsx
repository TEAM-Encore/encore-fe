import { Button } from '@/components/Button';
import { Col } from '@/components/common/ui/Flex';
import { Screen } from '@/components/common/ui/Screen';
import { Spacing } from '@/components/common/ui/Spacing';
import { Text } from '@/components/common/ui/Text';
import { Header } from '@/components/Header';
import { router } from 'expo-router';
import { ScrollView } from 'react-native';

export default function PointGuide() {
  return (
    <Screen
      header={
        <Header>
          <Header.Back />
          <Header.Center>포인트 안내</Header.Center>
        </Header>
      }
    >
      <ScrollView
        contentContainerClassName='px-5'
        contentContainerStyle={{ paddingBottom: 38 }}
      >
        <Spacing size={32} />
        <Col className='bg-gray-10 rounded-[10px] w-full p-4'>
          <Text
            variant='subhead-03'
            color='gray-01'
          >
            포인트란?
          </Text>
          <Spacing size={8} />
          <Text
            variant='body-long-01'
            color='gray-06'
          >
            포인트로 앙코르의 후기글을 볼 수 있어요.
          </Text>
          <Text
            variant='body-long-01'
            color='gray-06'
          >
            글을 작성하거나 좋아요를 눌러서 받아보세요!
          </Text>
        </Col>
        <Spacing size={35} />
        <Text
          variant='subhead-03'
          color='gray-01'
        >
          포인트 이벤트
        </Text>
        <Spacing size={20} />
        <Col gap={16}>
          <Col className='p-4 bg-gray-11 rounded-[10px]'>
            <Text
              variant='subhead-03'
              color='gray-01'
            >
              글 작성하기
            </Text>
            <Spacing size={8} />
            <Text
              variant='body-long-01'
              color='gray-06'
            >
              글을 작성할때마다 10포인트를 얻을 수 있어요.
            </Text>
            <Spacing size={16} />
            <Button
              className='!h-12'
              textClassName='!text-[14px] !text-gray-12'
            >
              바로가기
            </Button>
          </Col>
          <Col className='p-4 bg-gray-11 rounded-[10px]'>
            <Text
              variant='subhead-03'
							color='gray-01'
							onPress={() => {
								// TODO: 리뷰 작성 페이지로 이동
							}}
            >
              좋아요 누르기
            </Text>
            <Spacing size={8} />
            <Text
              variant='body-long-01'
              color='gray-06'
            >
              타인의 후기글에 좋아요를 누르면 5포인트를 얻을 수 있어요. 하루에 한번만 가능해요.
            </Text>
            <Spacing size={16} />
            <Button
              className='!h-12'
							textClassName='!text-[14px] !text-gray-12'
							onPress={() => router.push("/")}
            >
              바로가기
            </Button>
          </Col>
        </Col>
        <Spacing size={30} />
        <Text
          variant='subhead-03'
          color='gray-01'
        >
          포인트 유의사항
        </Text>
        <Spacing size={20} />
        <Text
          variant='caption'
          color='gray-08'
        >
          {`후기글은 작성할 때마다 포인트가 지급되며, 이외의 포인트 이벤트는 매일 00:00시에 갱신됩니다.

• 포인트를 얻기 위해 중복/성의 없는 글을 작성할 경우 최대 30 포인트 차감과 삭제 조치가 취해질 수 있습니다.
• 중복/성의 없는 게시물은 신고할 수 있습니다.`}
        </Text>
      </ScrollView>
    </Screen>
  );
}
