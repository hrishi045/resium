import useSWR from 'swr'
import fetcher from './fetcher'

export function usePost({ id }) {
  const { data, error } = useSWR(`/api/reddit/by_id/${id}`, fetcher)

  return {
    data: data && data[0],
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCommentsForPost({ sub, id }) {
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

export function useMoreCommentsForPost({ sub, id, comment }) {
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

export function useMoreComments({ id }) {
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
  const { data, error } = useSWR(`/api/reddit/hot?limit=100`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}
