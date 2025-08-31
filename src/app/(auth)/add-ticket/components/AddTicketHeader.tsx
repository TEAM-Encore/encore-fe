import { Header } from '@/components/Header'

export function AddTicketHeader({
  progress,
  onBack,
}: {
  progress: number
  onBack: VoidFunction
}) {
  return (
    <Header progress={progress}>
      <Header.Back onPress={onBack} />
      <Header.Center>티켓 내역 추가</Header.Center>
      <Header.Close onPress={() => {}} />
    </Header>
  )
}
