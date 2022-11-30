import { signUpState } from './atoms'
import { InputBase } from '@/presentation/components'

import { useRecoilState } from 'recoil'
import React from 'react'

type Props = {
  type: string
  name: string
  placeholder: string
  value?: string
}

const Input: React.FC<Props> = ({ type, name, placeholder, value }: Props) => {
  const [state, setState] = useRecoilState(signUpState)

  return (
    <InputBase
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
      value={value}
    />
  )
}

export default Input
