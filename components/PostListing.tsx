import Link from 'next/link'
import React from 'react'

import { usePostListing } from '../redditapi/hooks'
import Sorter from './Sorter'

type FrontPageTypes = 'hot' | 'new' | 'top'

interface PostListingProps {
  type: FrontPageTypes | string
}
export default function PostListing({ type }: PostListingProps) {
  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePostListing(type, 30)

  let content
  if (isError) content = <Link href="/api/auth/signin/reddit">Sign in</Link>
  else if (!isFetchingNextPage && (isLoading || !data))
    content = <p>Loading posts &hellip;</p>
  else
    content = (
      <>
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {(page.data as any[]).map((post) => (
              <div className="px-4 py-3" key={post.name}>
                <div className="flex gap-4 justify-items-center">
                  {post.url &&
                    (post.url as string).match(/\.(jpg|jpeg|png|webp)/) && (
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
          </React.Fragment>
        ))}
        {isFetchingNextPage ? (
          <p>Loading...</p>
        ) : (
          <button onClick={() => fetchNextPage()}>Load more...</button>
        )}
      </>
    )

  return (
    <div>
      <main className="block max-w-4xl px-2 py-4 mx-auto mt-8 divide-y divide-gray-100 dark:divide-gray-700">
        {(type === 'hot' || type === 'new' || type === 'top') && (
          <div className="my-4">
            <h1 className="my-4 text-4xl font-bold text-center">r/{type}</h1>
            <Sorter selected={type} />
          </div>
        )}
        {content}
      </main>
    </div>
  )
}
