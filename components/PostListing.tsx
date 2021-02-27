import Head from 'next/head'
import Link from 'next/link'
import { Dispatch, ReactChild, ReactChildren, SetStateAction } from 'react'
import ErrorResp from '../types/ErrorResp'
import Post from '../types/Post'

interface PostListingProps {
  data: (Post[] & ErrorResp) | null
  isError: boolean
  isLoading: boolean
  setLimit: Dispatch<SetStateAction<number>>
  children: ReactChild
}
export default function PostListing({
  data,
  isError,
  isLoading,
  setLimit,
  children,
}: PostListingProps) {
  let content
  if (isError || data?.error)
    content = <Link href="/api/auth/signin/reddit">Sign in</Link>
  else if (isLoading) content = <p>Loading posts &hellip;</p>
  else
    content = (
      <>
        {data.map((post) => (
          <div className="px-4 py-3" key={post.name}>
            <div className="flex gap-4 justify-items-center">
              {post.url && (post.url as string).match(/\.(jpg|jpeg|png|webp)/) && (
                <div
                  style={{
                    backgroundImage: `url(${post.url})`,
                    content: ' ',
                  }}
                  className="w-20 h-20 bg-center bg-cover ring-2 ring-gray-400"
                  // src={post.url}
                ></div>
              )}
              <div className="flex-1">
                <div>
                  <div className="inline-block mr-2 text-xl font-semibold text-gray-400">
                    {post.score}
                  </div>

                  <Link href={post.permalink}>
                    <a className="text-lg font-semibold text-justify text-gray-800 no-underline hover:underline sm:text-lg dark:text-gray-200">
                      {post.title}
                    </a>
                  </Link>
                </div>
                <div className="block mt-2 -ml-0 text-sm font-semibold text-gray-500 divide-x-0 divide-gray-300 dark:divide-gray-500 dark:text-gray-300">
                  {post.spoiler && <div className="text-xs">SPOILER</div>}
                  <div className="inline-block px-0">
                    by{' '}
                    <Link href={`/u/${post.author}`}>
                      <a className="text-yellow-900">u/{post.author}</a>
                    </Link>{' '}
                    in{' '}
                    <Link href={`/${post.subreddit_name_prefixed}`}>
                      <a className="text-blue-900">
                        {post.subreddit_name_prefixed}
                      </a>
                    </Link>
                  </div>{' '}
                  with{' '}
                  <span className="inline-block text-fuchsia-900">
                    {post.num_comments} comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setLimit((limit) => limit + 15)}>
          Load more...
        </button>
      </>
    )

  return (
    <div>
      <Head>
        <title>Title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="block max-w-4xl px-2 py-4 mx-auto mt-8 divide-y divide-gray-100 dark:divide-gray-700">
        {children}
        {content}
      </main>
    </div>
  )
}
