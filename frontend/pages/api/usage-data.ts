import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

if (!process.env.API_BASE_URL || !process.env.API_AUTH_TOKEN) {
  throw new Error("Missing API environment variables");
}

const API_BASE_URL = process.env.API_BASE_URL;
const API_AUTH_TOKEN = process.env.API_AUTH_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/usage-data`, {
      }, {
        headers: {
          'Authorization': `Bearer ${API_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error in usage data.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
