import LinkButton from '../components/LinkButton'

export default function Index() {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center gap-16 text-white">
      <LinkButton content="Student" url="/studentLogin" />
      <LinkButton content="Teacher" url="/teacher" />
    </div>
  )
}
