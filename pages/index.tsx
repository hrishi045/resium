import Head from 'next/head'
import Link from 'next/link'

import { useHot } from '../redditapi/hooks'

const Home = () => {
  const { data, isError, isLoading } = useHot()

  if (isError) return <Link href="/api/auth/signin/reddit">Sign in</Link>
  if (isLoading) return <p>Loading posts &hellip;</p>

  return (
    <div className="container">
      <Head>
        <title>Resium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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

export default Home
