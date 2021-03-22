import React from 'react'
import { useRouter } from 'next/router'
import PostListing from '../../../components/PostListing'

const Router = () => {
  const {
    query: { subreddit },
  } = useRouter()

  return <PostListing type={`r/${subreddit as string}`}></PostListing>
}

export default Router
