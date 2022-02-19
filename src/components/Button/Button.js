import './Button.css'
const Button = props => {
  const { type, onClick } = props
  if (type === 'primary') {
    return (
      <div className='primaryBtn'>
        <button onClick={onClick}>{props.children}</button>
      </div>
    )
  }
  return (
    <div className='button'>
      <button onClick={onClick}>{props.children}</button>
    </div>
  )
}

export default Button
