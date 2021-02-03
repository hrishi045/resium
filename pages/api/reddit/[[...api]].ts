import { getSession } from 'next-auth/client'
import { getToken } from 'next-auth/jwt'
import { NextApiRequest, NextApiResponse } from 'next-auth/_utils'
import snoowrap from 'snoowrap'
import type { JWTToken } from '../auth/[...nextauth]'

const secret = process.env.SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const token = (await getToken({ req, secret })) as JWTToken

  const qs = new URLSearchParams()

  for (const [key, value] of Object.entries(req.query)) {
    if (key != 'api') qs.set(key, value as string)
  }

  const uri = (req.query.api as string[]).join('/')

  const r = new snoowrap({
    userAgent: 'Resium/1.0',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: token.refreshToken,
  })

  const data = await r.oauthRequest({
    uri: `${uri}${qs.toString().length > 0 ? '?' + qs.toString() : ''}`,
    qs: qs.toString(),
    method: req.method,
  })

  if (!session) {
    res.send({
      error: 'You must be sign in to view the protected content on this page.',
    })
    return
  }

  // r.getMe().then((_) => {
  res.send(data)
  // })
}
