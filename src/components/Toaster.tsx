import { useSyncExternalStore } from 'react'
import {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated'
import { Col, Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type Toast = {
  id: string
  text: string
}

type Action =
  | {
      type: 'ADD'
      toast: Toast
    }
  | {
      type: 'REMOVE'
      id: string
    }

const TOAST_LIMIT_POLICY = 5

let toastMemory: Toast[] = []
let listeners: ((toasts: Toast[]) => void)[] = []

const reducer = (state: Toast[], action: Action): Toast[] => {
  switch (action.type) {
    case 'ADD': {
      const newState = [...state, action.toast]
      return newState.slice(0, TOAST_LIMIT_POLICY)
    }
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
  show: (text: string) => {
    const newToast = {
      id: `toast-${Math.random().toString(36).slice(2, 10)}`,
      text,
    }

    dispatch({ type: 'ADD', toast: newToast })

    if (toastMemory.find((t) => t.id === newToast.id)) {
      setTimeout(() => {
        toast.remove(newToast.id)
      }, 2500)
    }
  },

  remove: (id: string) => {
    const targetToRemove = toastMemory.find((t) => t.id === id)

    if (targetToRemove) {
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

  return (
    <Col
      layout={LinearTransition}
      pointerEvents="none"
      className="absolute inset-x-0 bottom-16 z-modal mx-5 gap-0.5"
    >
      {toasts.map(({ id, text }) => {
        return (
          <Row
            key={id}
            align="center"
            entering={FadeInDown}
            exiting={FadeOutUp}
            layout={LinearTransition}
            className="w-full gap-4 rounded-[10px] bg-gray-10 p-4"
          >
            {/* <Icon
                    name={type === 'success' ? 'CheckLine' : 'CloseLine'}
                    color="white"
                    size={18}
                  /> */}
            <Text variant="body-01" className="text-gray-01">
              {text}
              {id}
            </Text>
          </Row>
        )
      })}
    </Col>
  )
}
