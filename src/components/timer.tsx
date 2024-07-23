import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

export default function Timer({
  time,
  setTime,
}: {
  time: number
  setTime: Dispatch<SetStateAction<number>>
}) {
  const id = useRef(0)
  const timeRef = useRef(time)

  useEffect(() => {
    id.current = setInterval(() => {
      if (timeRef.current === 0) {
        clearInterval(id.current)
        return
      }

      setTime(timeRef.current - 1)
      timeRef.current -= 1
    }, 1000)

    return () => {
      clearInterval(id.current)
    }
  }, [])

  return time
}
