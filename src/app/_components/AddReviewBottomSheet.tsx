import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { ticketQueries } from '@/apis/ticket/queries'
import { BottomSheet } from '@/components/BottomSheet'
import { Button } from '@/components/Button'
import { ArrowRight, Edit, Ticket } from '@/components/common/icons/svgs'
import { Col, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { Dialog } from '@/components/Dialog'

interface AddReviewBottomSheetProps extends OverlayProps {
  close: VoidFunction
  unmount: VoidFunction
}

export default function AddReviewBottomSheet({
  close,
  unmount,
}: AddReviewBottomSheetProps) {
  const router = useRouter()

  const onClose = () => {
    close()
    unmount?.()
  }

  const { data } = useQuery(ticketQueries.getTicketList({ dateRange: '30' }))

  const tickets = data?.data ?? []

  return (
    <BottomSheet.Root isOpen close={onClose}>
      <BottomSheet.Content className="z-[9999]">
        <Row center className="py-5">
          <Text variant="subhead-04" color="gray-01">
            추가하기
          </Text>
        </Row>
        <Row
          gap={15}
          align="center"
          className="border-b border-b-gray-09 px-6 py-[18px]"
          onPress={() => {
            onClose()
            router.push('/add-ticket')
          }}
        >
          <Ticket width={36} height={36} className="text-gray-01" />
          <Col className="flex-1">
            <Text variant="subhead-03" color="gray-01">
              티켓 내역 추가
            </Text>
            <Text variant="caption" color="gray-07">
              티켓을 추가해야 후기를 작성할 수 있어요!
            </Text>
          </Col>
          <ArrowRight width={24} height={24} className="text-gray-01" />
        </Row>
        <Row
          gap={15}
          align="center"
          className="border-b border-b-gray-09 px-6 py-[18px]"
          onPress={() => {
            if (tickets?.length && tickets.length > 0) {
              onClose()
              router.push('/review-write')
              return
            }
            overlay.open((o) => (
              <Dialog
                {...o}
                title="티켓 내역 추가로 이동할까요?"
                description="내역이 없으면 후기를 작성할 수 없어요."
                top="확인"
                bottom="취소"
                onTopPress={() => {
                  onClose()
                  router.push('/add-ticket')
                }}
                onBottomPress={onClose}
              />
            ))
          }}
        >
          <Edit width={36} height={36} className="text-gray-01" />
          <Col className="flex-1">
            <Text variant="subhead-03" color="gray-01">
              후기글 추가
            </Text>
            <Text variant="caption" color="gray-07">
              체계적인 가이드와 함께 기록을 남겨보세요!
            </Text>
          </Col>
          <ArrowRight width={24} height={24} className="text-gray-01" />
        </Row>
        <Row center className="px-5 py-4">
          <Button onPress={onClose}>닫기</Button>
        </Row>
      </BottomSheet.Content>
    </BottomSheet.Root>
  )
}
