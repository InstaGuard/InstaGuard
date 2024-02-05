// This is the API for the client-server communication
import type { NextApiRequest, NextApiResponse } from 'next'

type ResultData = {
  score: number,
  reasons: object,
  photo: string,
  followers: number,
  follows: number,
  posts: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultData>
) {
  const { uname } = req.query;
  // here we need to implement the call for the calculator function
  // I already listed all the data we need for the results page
  // For the moment, the API returns placeholder mock data
  res.status(200).json({ 
    score: 82,
    reasons: {},
    photo: "/InstaGuard_logo.png",
    followers: 1000,
    follows: 400,
    posts: 123
  })
}