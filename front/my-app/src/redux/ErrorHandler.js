const ErrorHandler = (number) => {
let  msg = ''
console.log(number)
    if (number === 401){
        msg= 'Please login again'
        return (msg)
    }


  if (number === 400){
    msg= 'Unable to continue with the provided credentials.'
    return (msg)
}
if (number === 1){
  msg= 'there is already a phone like that.'
  return (msg)
}
  if (number === 2){
  msg= 'there is already a name like that.'
  return (msg)
}
if (number === 3){
  msg= 'how did you get that?.'
  return (msg)
}
  if (number === 999){
  msg= 'unknown error from the data base'
  return (msg)
}

  return (`unknown error detected ${number}`)
}

export default ErrorHandler