import { useState } from 'react'

export function useFieldState(initialState) {
  const [fields, setFields] = useState(initialState);
  return [
    fields,
    (event) => {
      setFields({
        ...fields,
        [event.target.name]: event.target.value
      })
    }
  ]
}
export function useSpecialFieldState(initialState) {
  const [fields, setFields] = useState(initialState);
  return [
    fields,
    (event) => {
      setFields({
        ...fields,
        [event.target.name]: event.target.value.replace(/[^A-Za-z\s]/g,"")
      })
    }
  ]
}