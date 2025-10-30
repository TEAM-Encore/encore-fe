import { useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { Dialog } from '@/components/Dialog'
import { Header } from '@/components/Header'

function AddTicketHeader({
  progress,
  onBack,
}: {
  progress: number
  onBack: VoidFunction
}) {
  const router = useRouter()
  return (
    <Header progress={progress}>
      <Header.Back onPress={onBack} />
      <Header.Center>티켓 내역 추가</Header.Center>
      <Header.Close
        onPress={() => {
          overlay.open((ov) => (
            <Dialog
              {...ov}
              title="티켓 내역 추가를 그만할까요?"
              description="중간에 나갈 시 작성한 내용은 삭제됩니다."
              top="확인"
              bottom="취소"
              onTopPress={() => {
                Array.from({ length: progress / 25 }).forEach(() =>
                  router.back(),
                )
              }}
            />
          ))
        }}
      />
    </Header>
  )
}

export default AddTicketHeader