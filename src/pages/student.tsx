import { useEffect, useState } from 'react'
import { socket } from '../lib/socket'
import { StudentQuestion, Response } from '../lib/types/global'
import AnswerForm from '../components/AnswerForm'
import ResponseFeed from '../components/ReponseFeed'

export default function Student() {
  const [question, setQuestion] = useState<StudentQuestion | null>(null)
  const [response, setResponse] = useState<Response | null>(null)
  const [answer, setAnswer] = useState(-1)

  const answered = sessionStorage.getItem('answered') === 'true'

  useEffect(() => {
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
  }, [])

  const [time, setTime] = useState(60)

  useEffect(() => {
    if (time === 0) {
      socket.emit('answer', null)
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
    <div className="w-screen h-screen bg-gray-600 flex flex-row justify-center items-center text-white">
      {inner()}
    </div>
  )
}
