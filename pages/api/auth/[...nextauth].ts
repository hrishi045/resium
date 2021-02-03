import NextAuth, { InitOptions } from 'next-auth'
import {
  GenericObject,
  NextApiRequest,
  NextApiResponse,
} from 'next-auth/_utils'

export interface Token {
  accessToken: string
  refreshToken: string
}

export type JWTToken = GenericObject & Token

const options: InitOptions = {
  providers: [
    {
      id: 'reddit',
      name: 'Reddit',
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      scope: 'identity mysubreddits read',
      type: 'oauth',
      version: '2.0',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: ' https://www.reddit.com/api/v1/access_token',
      authorizationUrl:
        'https://www.reddit.com/api/v1/authorize?response_type=code&duration=permanent',
      profileUrl: 'https://oauth.reddit.com/api/v1/me',
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: null,
        }
      },
    },
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token: JWTToken, user, account) {
      if (account) {
        token.accessToken = account.accessToken
        token.refreshToken = account.refreshToken
      }
      return token
    },
  },
}

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
  NextAuth(req, res, options)
