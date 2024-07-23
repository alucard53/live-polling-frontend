import { Dispatch, SetStateAction } from 'react'
import { StudentQuestion } from '../lib/types/global'

export default function AnswerOptions({
  question,
  answer,
  setAnswer,
}: {
  question: StudentQuestion
  answer: number
  setAnswer: Dispatch<SetStateAction<number>>
}) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {question.options.map((option, index) => (
        <div
          className={`py-4 rounded-xl text-lg hover:opacity-85 hover:text-xl transition-all bg-blue-950 border-2 ${
            index === answer ? 'border-white' : 'border-blue-950'
          }`}
          key={option}
          onClick={() => setAnswer(index)}
        >
          <span className="text-center pl-8">{option}</span>
        </div>
      ))}
    </div>
  )
}
