import { Dispatch, SetStateAction } from 'react'
import { socket } from './socket'

import { StudentQuestion, Response } from './types/global'

export default function setStudentListeners(
  setQuestion: Dispatch<SetStateAction<StudentQuestion | null>>,
  setAnswer: Dispatch<SetStateAction<number>>,
  setTime: Dispatch<SetStateAction<number>>,
  setResponse: Dispatch<SetStateAction<Response | null>>
) {
  socket.connect()
  function onConnect() {
    console.log('connected')
    socket.emit('student')
  }
  function onDisconnect() {
    console.log('disconnected')
  }
  function onQuestion(question: StudentQuestion) {
    console.log(question)
    setQuestion(question)
    setAnswer(-1)
    setTime(question.time)
    setResponse(null)
    sessionStorage.setItem('answered', 'false')
  }
  function onPoll(response: Response) {
    console.log('latest update', response)
    setResponse(response)
  }

  socket.on('connect', onConnect)
  socket.on('disconnect', onDisconnect)
  socket.on('question', onQuestion)
  socket.on('poll', onPoll)

  return () => {
    socket.off('connect', onConnect)
    socket.off('disconnect', onDisconnect)
    socket.off('question', onQuestion)
    socket.off('poll', onPoll)
  }
}
