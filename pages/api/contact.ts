import type { NextApiRequest, NextApiResponse } from 'next'

interface Email {
  name: string;
  email: string;
  messgae: string;
}

export default function(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
}
