import { useState } from 'react'
import PostListing from '../components/PostListing'
import Sorter from '../components/Sorter'

import { useNew } from '../redditapi/hooks'

const Home = () => {
  const [limit, setLimit] = useState(30)
  const { data, isError, isLoading } = useNew(limit)

  return (
    <PostListing
      data={data}
      isLoading={isLoading}
      isError={isError}
      setLimit={setLimit}
    >
      <div className="my-4">
        <h1 className="my-4 text-4xl font-bold text-center">r/new</h1>
        <Sorter selected="new" />
      </div>
    </PostListing>
  )
}

export default Home
