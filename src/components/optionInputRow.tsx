import { Dispatch, SetStateAction } from 'react'
import { Option } from '../lib/types/global'

export default function OptionInputRow({
  option,
  index,
  setOptions,
}: {
  option: Option
  index: number
  setOptions: Dispatch<SetStateAction<Option[]>>
}) {
  function deleteOption(index: number) {
    setOptions((options) => [
      ...options.slice(0, index),
      ...options.slice(index + 1),
    ])
  }

  return (
    <div className="flex gap-5 items-center w-full">
      <input
        value={option.value}
        onChange={(e) => {
          setOptions((options) => {
            options[index].value = e.target.value
            return [...options]
          })
        }}
        className="font-semibold border rounded-lg border-white bg-transparent px-2 py-1 outline-0 focus:border-2 focus:border-white"
        placeholder="option"
        required
      />

      <label className="px-2 py-1.5 bg-green-500 rounded-lg flex items-center gap-2 text-md font-semibold">
        Correct?
        <input
          type="checkbox"
          checked={option.correct}
          onChange={() => {
            const checked = option.correct
            setOptions((options) => {
              options[index].correct = !checked
              return [...options]
            })
          }}
        />
      </label>

      <button
        type="button"
        onClick={() => deleteOption(index)}
        className="ml-4 bg-blue-950 p-2 text-l font-semibold rounded-lg hover:bg-blue-900 transition-all"
      >
        Remove option
      </button>
    </div>
  )
}
