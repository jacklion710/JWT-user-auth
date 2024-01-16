import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { class: userClass } = req.body;

    if (!userClass) {
      return res.status(400).json({ error: 'Class is required' });
    }

    const token = jwt.sign({ class: userClass }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
