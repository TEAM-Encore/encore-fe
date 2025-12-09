import { Dialog } from './Dialog'

type PointConfirmDialogProps = OverlayProps & {
  points: number
  onConfirm: VoidFunction
  onCancel?: VoidFunction
}

/**
 * 포인트 사용 확인 다이얼로그
 * 타인의 후기글 열람 시 사용
 */
export function PointConfirmDialog({
  isOpen,
  close,
  unmount,
  points,
  onConfirm,
  onCancel,
}: PointConfirmDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      close={close}
      unmount={unmount}
      title={`${points}포인트를 사용할까요?`}
      description="사용한 포인트는 되돌릴 수 없어요."
      top="확인"
      bottom="취소"
      onTopPress={onConfirm}
      onBottomPress={onCancel}
    />
  )
}
