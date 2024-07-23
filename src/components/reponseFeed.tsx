import { Response } from '../lib/types/global'

export default function ResponseFeed({
  response,
  answer,
}: {
  response: Response
  answer: number | null
}) {
  function getBorderColor(correct: boolean, index: number) {
    if (correct) {
      return 'border border-2 border-green-300'
    } else if (index === answer) {
      return 'border border-2 border-red-500'
    }
  }

  const total = response.options.reduce((acc, { count }) => acc + count, 0)

  return (
    <div className="flex flex-col gap-5 rounded-lg p-5 bg-gray-700 shadow-2xl w-2/5 min-w-72 font-semibold">
      <h1 className="bg-blue-900 text-justify p-5 rounded-xl text-xl inline">
        {response.prompt}
      </h1>

      <div className="flex flex-col gap-2 mt-4">
        {response.options.map((option, index) => (
          <div
            className={`flex justify-between p-4 rounded-xl text-base bg-blue-950 ${getBorderColor(
              option.correct,
              index
            )}`}
            key={option.value}
          >
            <span>{option.value}</span>
            <span>{total > 0 ? (option.count / total) * 100 : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
