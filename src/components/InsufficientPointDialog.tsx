import { useRouter } from 'expo-router'
import { Dialog } from './Dialog'

type InsufficientPointDialogProps = OverlayProps

/**
 * 포인트 부족 다이얼로그
 * - 확인 → 포인트 안내 페이지으로 이동
 * - 취소 → 홈으로 되돌아감
 */
export function InsufficientPointDialog({
  isOpen,
  close,
  unmount,
}: InsufficientPointDialogProps) {
  const router = useRouter()

  const handleConfirm = () => {
    unmount?.()
    router.replace('/mypage/point/guide')
  }

  const handleCancel = () => {
    unmount?.()
    router.back()
  }

  return (
    <Dialog
      isOpen={isOpen}
      close={close}
      unmount={unmount}
      title="사용 가능한 포인트가 없어요!"
      description="포인트 이벤트 페이지로 이동할까요?"
      top="확인"
      bottom="취소"
      onTopPress={handleConfirm}
      onBottomPress={handleCancel}
    />
  )
}
