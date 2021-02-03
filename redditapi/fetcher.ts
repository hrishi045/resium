const fetcher = (arg, ...args) => fetch(arg, ...args).then((res) => res.json())
export default fetcher
