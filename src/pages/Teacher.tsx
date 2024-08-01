import { useEffect, useState } from 'react'

import { Response } from '../lib/types/global'
import QuestionForm from '../components/QuestionForm'
import ResponseFeed from '../components/ReponseFeed'
import PastResponses from '../components/PastResponses'
import setTeacherListeners from '../lib/setTeacherListeners'

export default function Teacher() {
  const [question, setQuestion] = useState(false)
  const [response, setResponse] = useState<Response | null>(null)
  const [pastResponses, setPastResponses] = useState<Response[]>([])
  const [allAnswered, setAllAnswered] = useState(false)

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

  useEffect(() => {
    return setTeacherListeners(setResponse, setAllAnswered, fetchPrevResponses)
  }, [])

  useEffect(() => {
    fetchPrevResponses()
  }, [])

  function reset() {
    setAllAnswered(false)
    setQuestion(false)
    setResponse(null)
  }

  return (
    <div className="flex flex-row h-screen items-center text-white gap-10 my-5 justify-evenly">
      {question && response ? (
        <div className="flex flex-col items-center">
          <ResponseFeed response={response} answer={null} />
          {allAnswered && (
            <button
              className="bg-blue-950 mt-5 p-3 text-xl w-fit rounded-lg hover:bg-blue-900 transition-all"
              onClick={reset}
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
