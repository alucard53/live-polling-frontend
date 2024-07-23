import { Dispatch, SetStateAction } from 'react'
import { Option } from '../lib/types/global.d'
import OptionInputRow from './OptionInputRow'

export default function OptionsInput({
  options,
  setOptions,
}: {
  options: Option[]
  setOptions: Dispatch<SetStateAction<Option[]>>
}) {
  function addOption() {
    setOptions([...options, new Option()])
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          return (
            <OptionInputRow
              option={option}
              index={index}
              setOptions={setOptions}
              key={option.id}
            />
          )
        })}
      </div>

      <button
        type="button"
        className="bg-blue-950 p-2 text-l font-semibold rounded-lg hover:bg-blue-900 transition-all"
        onClick={addOption}
      >
        Add Option
      </button>
    </>
  )
}
