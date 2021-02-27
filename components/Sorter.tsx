import Link from 'next/link'

export default function Sorter({ selected }: { selected: string }) {
  return (
    <div className="flex justify-center gap-8 text-2xl">
      <Link href="/">
        <a
          className={`px-4 py-1 rounded-lg hover:text-blue-700 bg-gray-50 dark:bg-gray-500 ${
            selected == 'hot'
              ? 'bg-gray-300 dark:bg-gray-600 text-blue-900 dark:text-blue-300'
              : 'text-gray-500'
          }`}
        >
          hot
        </a>
      </Link>
      <Link href="/new">
        <a
          className={`px-4 py-1 rounded-lg hover:text-blue-700 bg-gray-50 dark:bg-gray-500 ${
            selected == 'new'
              ? 'bg-gray-300 dark:bg-gray-600 text-blue-900 dark:text-blue-300'
              : 'text-gray-500'
          }`}
        >
          new
        </a>
      </Link>
      <Link href="/top">
        <a
          className={`px-4 py-1 rounded-lg hover:text-blue-700 bg-gray-50 dark:bg-gray-500 ${
            selected == 'top'
              ? 'bg-gray-300 dark:bg-gray-600 text-blue-900 dark:text-blue-300'
              : 'text-gray-500'
          }`}
        >
          top
        </a>
      </Link>
    </div>
  )
}
