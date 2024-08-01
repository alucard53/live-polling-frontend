import { Response } from '../lib/types/global'

function getBorderColor(correct: boolean, index: number, answer: number | null) {
	if (correct) {
		return 'border border-2 border-green-300'
	} else if (index === answer) {
		return 'border border-2 border-red-500'
	}
}

export default function ResponseFeed({
  response,
  answer,
}: {
  response: Response
  answer: number | null
}) {
  const total = response.options.reduce((acc, { count }) => acc + count, 0)

  return (
    <div className="flex flex-col gap-5 rounded-lg p-5 bg-gray-700 shadow-2xl w-full sm:min-w-96 font-semibold">
      <h1 className="bg-blue-900 p-5 rounded-xl text-xl inline">
        {response.prompt}
      </h1>

      <div className="flex flex-col gap-2 mt-4">
        {response.options.map((option, index) => (
          <div
            className={`flex justify-between p-4 rounded-xl text-base bg-blue-950 ${getBorderColor(
              option.correct,
              index,
							answer
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
