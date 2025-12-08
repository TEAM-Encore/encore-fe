import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [state, setState] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setState(value), delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return state
}
