import message, { MessageConstructor } from './message'

export const SMessage = MessageConstructor

export const $message = message
export const $success = message.success
export const $info = message.info
export const $danger = message.danger
export const $warning = message.warning

export default message
