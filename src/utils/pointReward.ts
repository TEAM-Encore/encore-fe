import * as SecureStore from 'expo-secure-store'
import { toast } from '@/components/Toaster'

const POINT_TOAST_KEY = 'last_point_toast_date'

/**
 * 좋아요 포인트 획득 토스트 표시 (1일 1회 제한)
 * 명세: 좋아요 직후 2초간 "5포인트를 획득했어요!" 토스트 노출
 */
export async function showPointRewardToast(points: number = 5): Promise<void> {
  try {
    const lastShownDate = await SecureStore.getItemAsync(POINT_TOAST_KEY)
    const today = new Date().toDateString()

    // 1일 1회 제한: 오늘 이미 표시했으면 리턴
    if (lastShownDate === today) {
      return
    }

    // 토스트 표시
    toast.show(`${points}포인트를 획득했어요!`)

    // 오늘 날짜 저장
    await SecureStore.setItemAsync(POINT_TOAST_KEY, today)
  } catch (error) {
    console.error('Failed to show point reward toast:', error)
  }
}

/**
 * 포인트 토스트 날짜 초기화 (테스트용)
 */
export async function resetPointRewardDate(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(POINT_TOAST_KEY)
  } catch (error) {
    console.error('Failed to reset point reward date:', error)
  }
}
