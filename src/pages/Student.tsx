import { useEffect, useState } from 'react'
import { socket } from '../lib/socket'
import { StudentQuestion, Response } from '../lib/types/global'
import AnswerForm from '../components/AnswerForm'
import ResponseFeed from '../components/ReponseFeed'
import setStudentListeners from '../lib/setStudentListeners'

export default function Student() {
  const [question, setQuestion] = useState<StudentQuestion | null>(null)
  const [response, setResponse] = useState<Response | null>(null)
  const [answer, setAnswer] = useState(-1)
  const [time, setTime] = useState(60)

  const answered = sessionStorage.getItem('answered') === 'true'

  useEffect(() => {
    return setStudentListeners(setQuestion, setAnswer, setTime, setResponse)
  }, [])

  useEffect(() => {
    if (time === 0) {
      socket.emit('answer', answer !== -1 ? answer : null)
      sessionStorage.setItem('answered', 'true')
      setTime(60)
    }
  }, [time])

  function inner() {
    if (!question) {
      return (
        <h1 className="text-5xl p-10 bg-blue-950 rounded-lg">
          Waiting for teacher to post question...
        </h1>
      )
    } else if (!answered) {
      return (
        <AnswerForm
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          time={time}
          setTime={setTime}
        />
      )
    } else if (response) {
      return (
        <div>
          <ResponseFeed response={response} answer={answer} />
        </div>
      )
    } else {
      return <h1>Waiting for poll results...</h1>
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center text-white">
      {inner()}
    </div>
  )
}
