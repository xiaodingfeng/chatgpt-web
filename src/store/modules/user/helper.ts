import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://fengzhengx.cn/upload/2021/01/logo-df2a3ea06ad34f39a31f04ec1ccce41d.png',
      name: 'FengZheng',
      description: 'website <a href="https://fengzhengx.cn/" class="text-blue-500" target="_blank" >fengzhengx</a>',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
