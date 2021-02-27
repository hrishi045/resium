import { useTheme } from 'next-themes'
import cx from 'classnames'

export default function ThemeChanger() {
  const { setTheme } = useTheme()

  return (
    <div className={cx('bg-gray-50 dark:bg-gray-800')}>
      <div className="flex justify-around max-w-4xl gap-2 px-3 py-2 mx-auto text-xs font-semibold text-white capitalize">
        <button
          className={cx(
            'px-4 py-2  bg-gray-700 rounded-sm hover:bg-gray-300 hover:text-gray-800'
          )}
          onClick={() => setTheme('light')}
        >
          Light Mode
        </button>
        <button
          className={cx(
            'px-4 py-2  bg-gray-700 rounded-sm hover:bg-gray-300 hover:text-gray-800'
          )}
          onClick={() => setTheme('dark')}
        >
          Dark Mode
        </button>
        <button
          className={cx(
            'px-4 py-2  bg-gray-700 rounded-sm hover:bg-gray-300 hover:text-gray-800'
          )}
          onClick={() => setTheme('system')}
        >
          System Default
        </button>
      </div>
    </div>
  )
}
