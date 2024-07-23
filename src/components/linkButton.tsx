export default function LinkButton({
  content,
  url,
}: {
  content: string
  url: string
}) {
  return (
    <a
      href={url}
      className="bg-blue-950 w-1/4 h-1/6 text-3xl font-semibold hover:bg-blue-900 transition-colors rounded-md flex items-center justify-center"
    >
      {content}
    </a>
  )
}
