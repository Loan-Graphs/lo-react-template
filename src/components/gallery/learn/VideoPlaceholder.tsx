export default function VideoPlaceholder() {
  return (
    <div className="bg-gray-900 rounded-xl flex items-center justify-center aspect-video w-full relative mb-8">
      <div className="flex flex-col items-center gap-3">
        <svg
          className="w-16 h-16 text-gray-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        <span className="inline-flex items-center rounded-full bg-gray-700 px-3 py-1 text-xs font-medium text-gray-300">
          Coming Soon
        </span>
      </div>
    </div>
  )
}
