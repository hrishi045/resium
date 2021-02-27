import React from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../../redditapi/hooks'
import PostListing from '../../../components/PostListing'

const Router = () => {
  const {
    query: { username },
  } = useRouter()

  const { data, isLoading, isError } = useUser({ id: username as string })

  return <PostListing data={data} isError={isError} isLoading={isLoading} />
}

export default Router
