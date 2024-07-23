import { useEffect, useState } from 'react'
import { socket } from '../lib/socket'

import { Response } from '../lib/types/global'
import QuestionForm from '../components/questionForm'
import ResponseFeed from '../components/reponseFeed'

export default function Teacher() {
  const [question, setQuestion] = useState(false)
  const [response, setResponse] = useState<Response | null>(null)
  const [allAnswered, setAllAnswered] = useState(false)

  useEffect(() => {
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
  }, [])

  return (
    <div className="w-screen h-screen bg-gray-600 flex flex-col justify-center items-center text-white">
      {question && response ? (
        <ResponseFeed response={response} answer={null} />
      ) : (
        <QuestionForm setQuestion={setQuestion} setResponse={setResponse} />
      )}

      {allAnswered && (
        <button
          className="bg-blue-950 mt-5 p-3 text-xl w-fit rounded-lg hover:bg-blue-900 transition-all"
          onClick={() => {
            setAllAnswered(false)
            setQuestion(false)
            setResponse(null)
          }}
        >
          Ask another question
        </button>
      )}
    </div>
  )
}
