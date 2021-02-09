import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next-auth/_utils'
import getSnoowrap from '../../../utils/snoowrap'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    res.send({
      error: 'You must be sign in to view the protected content on this page.',
    })
    return
  }

  const qs = new URLSearchParams()

  for (const [key, value] of Object.entries(req.query)) {
    if (key != 'api') qs.set(key, value as string)
  }

  const sw = await getSnoowrap(req)

  console.log(qs.get('id'))

  const { id } = req.query

  if (!id) {
    res.send({
      error: 'You must provide an id',
    })
    return
  }

  sw.getSubmission(id as string)
    .fetch()
    .then((submission) => {
      res.send({
        submission,
      })
    })
}
