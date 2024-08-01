import { Response } from '../lib/types/global'
import ResponseFeed from './ReponseFeed'

export default function PastResponses({
  responses,
}: {
  responses: Response[]
}) {
  return (
    <div className="flex flex-col p-5 h-2/3 rounded-lg overflow-x-hidden overflow-y-scroll max-h-dvh bg-slate-700">
      <h1 className="bg-blue-950 p-3 text-xl w-fit rounded-lg m-auto font-semibold mb-5">
        Past Responses
      </h1>
      <div className="flex flex-col gap-5 items-center">
        {responses.map((response, index) => (
          <ResponseFeed response={response} answer={null} key={index} />
        ))}
      </div>
    </div>
  )
}
