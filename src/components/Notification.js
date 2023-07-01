const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const errorStyle = {
    color: message.color,
    fontWeight: message.fontWeight,
    fontSize: message.fontSize,
    background: message.background,
    borderStyle: message.borderStyle,
    borderRadius: message.borderRadius,
    padding: message.padding
  }

  return (
    <div className="error" style={errorStyle}>
      {message.text}
    </div>
  )
}

export default Notification