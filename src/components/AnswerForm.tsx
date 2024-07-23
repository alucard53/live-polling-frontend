import { Dispatch, FormEvent, SetStateAction } from 'react'
import { StudentQuestion } from '../lib/types/global'
import { socket } from '../lib/socket'
import AnswerOptions from './AnswerOptions'
import Timer from './Timer'

export default function AnswerForm({
  question,
  answer,
  setAnswer,
  time,
  setTime,
}: {
  question: StudentQuestion
  answer: number
  setAnswer: Dispatch<SetStateAction<number>>
  time: number
  setTime: Dispatch<SetStateAction<number>>
}) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (answer === -1) {
      alert('Choose an answer!')
      return
    }
    socket.emit('answer', answer)
    sessionStorage.setItem('answered', 'true')
    setTime(60)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-lg p-5 bg-gray-700 shadow-2xl w-2/5 min-w-80 font-semibold"
    >
      {<Timer time={time} setTime={setTime} />}
      <h1 className="bg-blue-900 text-center p-5 rounded-xl text-xl">
        {question.prompt}
      </h1>

      <AnswerOptions
        question={question}
        answer={answer}
        setAnswer={setAnswer}
      />

      <button
        type="submit"
        className="bg-blue-950 p-3 text-xl w-fit m-auto rounded-lg hover:bg-blue-900 transition-all"
      >
        Submit Response
      </button>
    </form>
  )
}
