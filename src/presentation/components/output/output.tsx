import Styles from './output-styles.scss'

import React from 'react'

type Props = {
  name: any
  value: any
}

const Output: React.FC<Props> = ({ ...props }: Props) => {
  return (
    <>
      { 
        !props.value 
          ? false 
          : <div data-testid={`${props.name}-wrap`} className={Styles.outputWrap} data-status={'valid'}>
              <label>
                {props.name}
              </label>
              <p>
                {props.value}
              </p>
            </div> 
      }
    </>
  )
}

export default Output
