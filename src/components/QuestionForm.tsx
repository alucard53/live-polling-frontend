import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import OptionsInput from './OptionsInput'
import { socket } from '../lib/socket'
import { validateQuestion } from '../lib/validateQuestion'
import { Option, Response } from '../lib/types/global.d'

export default function QuestionForm({
  setQuestion,
  setResponse,
}: {
  setQuestion: Dispatch<SetStateAction<boolean>>
  setResponse: Dispatch<SetStateAction<Response | null>>
}) {
  const [prompt, setPrompt] = useState('')
  const [options, setOptions] = useState<Option[]>([new Option(), new Option()])
  const [time, setTime] = useState(60)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const question = {
      prompt,
      time,
      options,
    }

    if (!validateQuestion(question)) {
      return
    }

    socket.connect()

    setQuestion(true)
    setResponse({
      prompt,
      options: options.map((option) => ({
        ...option,
        count: 0,
      })),
    })

    socket.emit('newQuestion', question)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-8 bg-gray-700 p-10 rounded-lg shadow-2xl min-w-52"
    >
      <textarea
        placeholder="Enter the question..."
        className="w-4/5 h-20 text-l font-semibold border rounded-lg border-white bg-transparent px-3 py-2.5 outline-0 focus:border-2 focus:border-white"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />

      <label className="flex justify-center items-center">
        Timer:
        <input
          value={time}
          className="ml-5 text-l w-1/2 font-semibold border rounded-lg border-white bg-transparent px-3 py-2.5 outline-0 focus:border-2 focus:border-white"
          onChange={(e) => setTime(Number(e.target.value))}
          type="number"
          required
        />
      </label>

      <OptionsInput options={options} setOptions={setOptions} />

      <button
        type="submit"
        className="bg-blue-950 p-3 text-xl font-semibold rounded-lg hover:bg-blue-900 transition-all"
      >
        Start Poll
      </button>
    </form>
  )
}
