import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentLogin() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const saved = sessionStorage.getItem('studentName')
    if (saved) {
      navigate('student')
    }
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    sessionStorage.setItem('studentName', name)
    navigate('/student')
  }

  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center text-white">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          placeholder="Enter your name..."
          className="w-96 h-16 text-xl font-semibold border rounded-lg border-white bg-transparent px-3 py-2.5 outline outline-0 focus:border-2 focus:border-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="ml-5 text-2xl font-semibold bg-gray-800 hover:bg-blue-950 p-5 rounded-full text-center transition-colors"
        >
          &gt;
        </button>
      </form>
    </div>
  )
}
