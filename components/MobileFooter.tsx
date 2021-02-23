import ArrowDown from '../resources/icons/arrowDown.svg'
import ArrowUp from '../resources/icons/arrowUp.svg'
import Next from '../resources/icons/next.svg'
import Prev from '../resources/icons/prev.svg'
import ToTop from '../resources/icons/toTop.svg'

interface MobileFooterProps {
  goNext: () => void
  goPrev: () => void
}
export default function MobileFooter({ goNext, goPrev }: MobileFooterProps) {
  return (
    <div className="fixed bottom-0 flex justify-around w-full text-gray-800 border-t border-gray-300 dark:border-gray-600 sm:hidden bg-gray-50 dark:bg-gray-800 dark:text-gray-100">
      <a className="py-3">
        <ArrowDown height={25} />
      </a>
      <a className="py-3">
        <ArrowUp height={25} />
      </a>
      <a className="py-3">
        <ToTop height={25} />
      </a>
      <a className="py-3" onClick={() => goPrev()}>
        <Prev height={25} />
      </a>
      <a className="py-3" onClick={() => goNext()}>
        <Next height={25} />
      </a>
    </div>
  )
}
