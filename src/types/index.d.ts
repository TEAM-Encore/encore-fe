type PropsWithStrictChildren<
  P = unknown,
  T extends React.ReactNode = ReactNode,
> = P & {
  children: T
}

type RenderPropsChildren<P = unknown, T = unknown> = P & {
  children: ((props: T) => React.ReactNode) | React.ReactNode
}

type OverlayProps = {
  isOpen: boolean
  close: VoidFunction
  unmount?: VoidFunction
}

type CommonResponse<T> = {
  code?: number
  message?: string
  data?: T
  timestamp?: string
}

declare module '*.png' {
  const value: string
  export default value
}
