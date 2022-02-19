import { useState } from 'react'
import './DropDown.css'
import { AiFillCaretDown } from 'react-icons/ai'
const DropDown = props => {
  const { defaultValue, value, setValue, optionsArray } = props
  const [show, setShow] = useState(false)
  const showList = () => {
    setShow(!show)
  }
  const closeList = () => {
    setShow(false)
  }
  const itemClicked = item => () => {
    setValue(item)
    setShow(false)
  }
  return (
    <>
      {show && <div className='dropDownOuter' onClick={closeList}></div>}
      <div className='dropdown'>
        <div className='dropdownButton'>
          <button onClick={showList}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {value === '' ? defaultValue : value}
              <AiFillCaretDown className={show ? 'rotate' : 'completeRotate'} />
            </div>
          </button>
        </div>
        {show && (
          <div className='dropdownContainer'>
            <div className='dropdownList'>
              {optionsArray.map((item, index) => (
                <div className='list' key={index} onClick={itemClicked(item)}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DropDown
