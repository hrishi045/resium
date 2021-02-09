import { getToken } from 'next-auth/jwt'
import { NextApiRequest } from 'next-auth/_utils'
import snoowrap from 'snoowrap'
import type { JWTToken } from '../pages/api/auth/[...nextauth]'

const secret = process.env.SECRET

export default async function getSnoowrap(req: NextApiRequest) {
  const token = (await getToken({ req, secret })) as JWTToken

  const r = new snoowrap({
    userAgent: 'Resium/1.0',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: token.refreshToken,
  })

  return r
}
