import { useSyncExternalStore } from 'react'
import { Animated, View } from 'react-native'
import { AnimatedFlex } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type Toast = {
  id: number
  text: string
  duration?: number
  animatedValue?: Animated.Value
}

type Action =
  | {
      type: 'ADD'
      toast: Toast
    }
  | {
      type: 'REMOVE'
      id: number
    }

const TOAST_LIMIT_POLICY = 5

let toastMemory: Toast[] = []
let listeners: ((toasts: Toast[]) => void)[] = []

const reducer = (state: Toast[], action: Action): Toast[] => {
  switch (action.type) {
    case 'ADD':
      const newState = [...state, action.toast]
      return newState.slice(0, TOAST_LIMIT_POLICY)
    case 'REMOVE':
      return state.filter((toast) => toast.id !== action.id)
  }
}

const emitChange = () => {
  for (const listener of listeners) {
    listener(toastMemory)
  }
}

const dispatch = (action: Action) => {
  toastMemory = reducer(toastMemory, action)
  emitChange()
}

export const toast = {
  show: ({ text, duration }: Omit<Toast, 'id'>) => {
    const newToast = {
      id: Date.now(),
      text,
      duration: duration ?? 2500,
      animatedValue: new Animated.Value(0),
    }

    dispatch({ type: 'ADD', toast: newToast })

    Animated.spring(newToast.animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start()

    setTimeout(() => {
      toast.remove(newToast.id)
    }, newToast.duration)
  },

  remove: (id: number) => {
    const targetToRemove = toastMemory.find((t) => t.id === id)
    if (targetToRemove?.animatedValue) {
      Animated.timing(targetToRemove.animatedValue, {
        toValue: 2,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        dispatch({ type: 'REMOVE', id })
      })
    } else {
      dispatch({ type: 'REMOVE', id })
    }
  },

  subscribe: (listener: (toasts: Toast[]) => void) => {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
}

export function Toaster() {
  const toasts = useSyncExternalStore(
    toast.subscribe,
    () => toastMemory,
    () => toastMemory,
  )

  if (!toasts.length) return null

  return (
    <View className="z-modal max-w-base pointer-events-none absolute inset-x-0 bottom-16 mx-auto gap-0.5 px-5">
      {toasts.map(({ id, text, animatedValue }) => {
        if (!animatedValue) return null

        const opacity = animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 1, 0],
        })

        const translateY = animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [50, 0, -20],
        })

        const scale = animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0.95, 1, 1],
        })

        return (
          <AnimatedFlex
            key={id}
            justify="center"
            className="max-w-base mx-auto w-full gap-4 rounded-[10px] bg-[#333333] p-4"
            style={{
              opacity,
              transform: [{ translateY }, { scale }],
            }}
          >
            {/* <Icon
                  name={type === 'success' ? 'CheckLine' : 'CloseLine'}
                  color="white"
                  size={18}
                /> */}
            <Text variant="body-01" className="text-[#FBFBFB]">
              {text}
            </Text>
          </AnimatedFlex>
        )
      })}
    </View>
  )
}
