export enum MessageTypes {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger'
}

export interface MessageProps {
  type?: MessageTypes
  icon?: string
  message?: string
  useHtml?: boolean
  duration?: number
  ok?(): any
  cancel?(): any
}
