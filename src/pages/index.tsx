import LinkButton from '../components/linkButton';

export default function Index() {
  return (
    <div className="w-screen h-screen bg-gray-700 flex flex-row justify-center items-center gap-16 text-white">
      <LinkButton content="Student" url="/studentLogin" />
      <LinkButton content="Teacher" url="/teacher" />
    </div>
  );
}
