import { getSession } from 'next-auth/client'
import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import getSnoowrap from '../../../utils/api/snoowrap'
import type { JWTToken } from '../auth/[...nextauth]'

const secret = process.env.SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const token = (await getToken({ req, secret })) as JWTToken

  const qs = new URLSearchParams()

  if (!session || !token) {
    res.send({
      error: 'You must be sign in to view the protected content on this page.',
    })
    return
  }

  for (const [key, value] of Object.entries(req.query)) {
    if (key != 'api') qs.set(key, value as string)
  }

  const uri = (req.query.api as string[]).join('/') as string

  if (uri.includes('undefined')) {
    res.send('null')
  }

  const r = await getSnoowrap(req)

  const data = await r.oauthRequest({
    uri: `${uri}${qs.toString().length > 0 ? '?' + qs.toString() : ''}`,
    qs: qs.toString(),
    method: req.method,
  })

  res.send(data)
}
