import { socket } from './socket'
import { Response } from '../lib/types/global'
import { Dispatch, SetStateAction } from 'react'

export default function setTeacherListeners(
  setResponse: Dispatch<SetStateAction<Response | null>>,
  setAllAnswered: Dispatch<SetStateAction<boolean>>,
  fetchPrevResponses: () => Promise<void>
) {
  function onConnect() {
    console.log('connected')
  }
  function onDisconnect() {
    console.log('disconnected')
  }
  function onPoll(response: any) {
    console.log('latest update', response)
    setResponse(response)
  }
  function onAllAnswered() {
    setAllAnswered(true)
    console.log('all answered')
    fetchPrevResponses()
  }

  socket.on('connect', onConnect)
  socket.on('disconnect', onDisconnect)
  socket.on('poll', onPoll)
  socket.on('allanswered', onAllAnswered)

  return () => {
    socket.off('connect', onConnect)
    socket.off('disconnect', onDisconnect)
    socket.off('poll', onPoll)
    socket.off('allanswered', onAllAnswered)
  }
}
