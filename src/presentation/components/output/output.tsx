import Styles from './output-styles.scss'

import React, { useRef } from 'react'

type Props = {
  name: any
  value: any
}

const Output: React.FC<Props> = ({ ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement>()

  return (
    <>
      { 
        props.value 
          &&
          <div data-testid={`${props.name}-wrap`} className={Styles.outputWrap} data-status={'valid'}>
            <input
              {...props}
              ref={inputRef}
              placeholder=" "
              data-testid={props.name}
              readOnly
              onFocus={e => { e.target.readOnly = false }}
              value={props.value}
            />
            <label data-testid={`${props.name}-label`} onClick={() => { inputRef.current.focus() }}>
              {props.name}
            </label>
          </div>
      }
    </>
  )
}

export default Output
