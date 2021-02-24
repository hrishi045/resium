import useSWR from 'swr'
import fetcher from './fetcher'

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

export function useHot() {
  const { data, error } = useSWR(`/api/reddit/hot?limit=30`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useNew() {
  const { data, error } = useSWR(`/api/reddit/new?limit=30`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useTop() {
  const { data, error } = useSWR(`/api/reddit/top?limit=30`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useUser({ id }: { id: string }) {
  const { data, error } = useSWR(`/api/reddit/u/${id}?limit=30`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useSubreddit({ id }: { id: string }) {
  const { data, error } = useSWR(`/api/reddit/r/${id}?limit=30`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}
