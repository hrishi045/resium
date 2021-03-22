import useSWR from 'swr'
import fetcher from './fetcher'
import axios from 'axios'

import { useInfiniteQuery } from 'react-query'

export function usePost({ id }: { id: string }) {
  const { data, error } = useSWR(`/api/reddit/by_id/${id}`, fetcher)

  return {
    data: data && data[0],
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCommentsForPost({ sub, id }: { sub: string; id: string }) {
  const { data, error } = useSWR(
    `/api/reddit/r/${sub}/comments/${id}?raw_json=1`,
    fetcher
  )

  return {
    data: data && data.comments,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useMoreCommentsForPost({
  sub,
  id,
  comment,
}: {
  sub: string
  id: string
  comment: string
}) {
  const { data, error } = useSWR(
    `/api/reddit/r/${sub}/comments/${id}/blah/${comment}`,
    fetcher
  )

  return {
    data: data && data.comments,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useMoreComments({ id }: { id: string }) {
  const { data, error } = useSWR(
    `/api/morechildren?api_type=json&link_id=${id}`,
    fetcher
  )

  return {
    data: data && data.comments,
    isLoading: !error && !data,
    isError: error,
  }
}

export type PostResponseData = {
  data: object[] | { error: any }
}

export function usePostListing(type: string, limit?: number) {
  const {
    data,
    isFetching,
    fetchNextPage,
    isError,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PostResponseData>(
    type || 'hot',
    async function ({ pageParam }) {
      return await axios(
        `/api/reddit/${type || 'hot'}?limit=${limit || 30}&after=${pageParam}`
      )
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage) return ''
        return lastPage.data[(limit || 30) - 1].name
      },
    }
  )

  return {
    data: data,
    isLoading: isFetching,
    isError: isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}

export function useUser(limit: number, { id }: { id: string }) {
  const { data, error } = useSWR(`/api/reddit/u/${id}?limit=${limit}`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useSubreddit(limit, { id }: { id: string }) {
  const { data, error } = useSWR(`/api/reddit/r/${id}?limit=${limit}`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}
