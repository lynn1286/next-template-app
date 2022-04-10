// This is an example of how to access a session from an API route

import type { NextApiRequest, NextApiResponse } from 'next'
import Cookie from 'js-cookie'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.send({
    code: 0,
    token: req.cookies,
  })
}
