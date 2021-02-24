import React from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../../redditapi/hooks'
import Head from 'next/head'
import Link from 'next/link'

const Router = () => {
  const {
    query: { username },
  } = useRouter()

  const { data, isLoading, isError } = useUser({ id: username as string })

  if (isError) return <p>Failed to fetch user</p>
  if (isLoading) return <p>Loading user...</p>

  return (
    <div>
      <Head>
        <title>u/{username}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1 className="text-lg font-medium">u/{username}</h1>
        </div>
        {data.map((post) => (
          <div className="post" key={post.name}>
            <p>
              <Link href={post.permalink}>
                <a>{post.title}</a>
              </Link>
            </p>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Router
