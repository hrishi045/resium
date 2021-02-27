import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../../redditapi/hooks'
import PostListing from '../../../components/PostListing'

const Router = () => {
  const {
    query: { username },
  } = useRouter()

  const [limit, setLimit] = useState(30)

  const { data, isLoading, isError } = useUser(limit, {
    id: username as string,
  })

  return (
    <PostListing
      data={data}
      isError={isError}
      isLoading={isLoading}
      setLimit={setLimit}
    >
      <div>
        <h1 className="my-4 text-4xl font-bold text-center">u/{username}</h1>
      </div>
    </PostListing>
  )
}

export default Router
