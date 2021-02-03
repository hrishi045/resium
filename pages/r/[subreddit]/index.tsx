import React from 'react'
import { useRouter } from 'next/router'

const Router = () => {
  const { asPath } = useRouter()
  return (
    <div>
      <p>Index: {asPath}</p>
    </div>
  )
}

export default Router
