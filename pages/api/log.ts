// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { msg } = JSON.parse(req.body)

    console.log(`前端日志记录： ====> ${JSON.stringify(msg)}`)
    return res
      .status(200)
      .json({ code: 0, msg: 'success', data: 'message logged is success' })
  } catch (error) {
    return res.status(200).json({ code: 0, msg: 'error', data: error })
  }
}
