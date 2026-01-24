import { toast } from '@/components/Toaster'
import * as SecureStore from 'expo-secure-store'

const POINT_TOAST_KEY = 'last_point_toast_date'

export async function showPointRewardToast(points: number = 5): Promise<void> {
  try {
    const lastShownDate = await SecureStore.getItemAsync(POINT_TOAST_KEY)
    const today = new Date().toDateString()

    if (lastShownDate === today) {
      return
    }

    toast.show(`${points}포인트를 획득했어요!`)

    await SecureStore.setItemAsync(POINT_TOAST_KEY, today)
  } catch (error) {
    console.error('Failed to show point reward toast:', error)
  }
}
