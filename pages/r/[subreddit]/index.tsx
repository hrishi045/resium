import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSubreddit } from '../../../redditapi/hooks'
import PostListing from '../../../components/PostListing'

const Router = () => {
  const {
    query: { subreddit },
  } = useRouter()

  const [limit, setLimit] = useState(30)

  const { data, isLoading, isError } = useSubreddit(limit, {
    id: subreddit as string,
  })

  return (
    <PostListing
      data={data}
      isLoading={isLoading}
      isError={isError}
      setLimit={setLimit}
    >
      <div>
        <h1 className="my-4 text-4xl font-bold text-center">u/{subreddit}</h1>
      </div>
    </PostListing>
  )
}

export default Router
