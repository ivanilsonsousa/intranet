import React, { useState, useEffect } from 'react'
import Switch from 'react-switch'

function Switcher(props) {
  const [check, setCheck] = useState(false)

  function handleChange() {
    props.onChange(props.id, !check).then((e) => {
      setCheck(!check)
    }).catch((e) => {
      console.log(e.data)
    })
  } 

  useEffect(() => {
    setCheck(props.checked)
  }, [props.checked])

  return(
        <Switch
            onHandleColor='#3C52B4'
            offHandleColor='#999'
            onColor='#284A77'
            checked={check}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={30}
            handleDiameter={20}
            onChange={() => handleChange()}
        />
  )

}

export default Switcher;