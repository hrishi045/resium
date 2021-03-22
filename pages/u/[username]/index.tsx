import React from 'react'
import { useRouter } from 'next/router'
import PostListing from '../../../components/PostListing'

const Router = () => {
  const {
    query: { username },
  } = useRouter()

  return <PostListing type={`u/${username as string}`}></PostListing>
}

export default Router
