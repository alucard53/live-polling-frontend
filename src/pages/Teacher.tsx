import { useEffect, useState } from 'react'
import { socket } from '../lib/socket'

import { Response } from '../lib/types/global'
import QuestionForm from '../components/QuestionForm'
import ResponseFeed from '../components/ReponseFeed'
import PastResponses from '../components/PastResponses'

export default function Teacher() {
  const [question, setQuestion] = useState(false)
  const [response, setResponse] = useState<Response | null>(null)
  const [pastResponses, setPastResponses] = useState<Response[]>([])
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
      setPastResponses([response!, ...pastResponses])
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

  useEffect(() => {
    async function fetchPrevResponses() {
      try {
        const res = await fetch(
          'https://live-polling-backend-1.onrender.com/responses'
        )
        const data = await res.json()
        setPastResponses(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPrevResponses()
  }, [])

  return (
    <div className="flex flex-row items-center text-white gap-10 my-5 justify-evenly">
      {question && response ? (
        <div className="flex flex-col items-center">
          <ResponseFeed response={response} answer={null} />
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
      ) : (
        <QuestionForm setQuestion={setQuestion} setResponse={setResponse} />
      )}
      <PastResponses responses={pastResponses} />
    </div>
  )
}
