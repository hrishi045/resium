import React from 'react'
import { useRouter } from 'next/router'
import { useSubreddit } from '../../../redditapi/hooks'
import PostListing from '../../../components/PostListing'

const Router = () => {
  const {
    query: { subreddit },
  } = useRouter()

  const { data, isLoading, isError } = useSubreddit({ id: subreddit as string })

  return <PostListing data={data} isLoading={isLoading} isError={isError} />
}

export default Router
