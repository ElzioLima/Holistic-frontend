import { OutputBase } from '@/presentation/components'

import React from 'react'

type Props = {
  name: string
  value?: string
  type?: string
}

const Input: React.FC<Props> = ({ name, value }: Props) => {
  return (
    <OutputBase
      name={name}
      value={value}
    />
  )
}

export default Input
