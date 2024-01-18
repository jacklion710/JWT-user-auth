// /pages/api/jwt.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

let blacklist = []; // Temporary in-memory blacklist

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle token issuing
    const { class: userClass, exp, action } = req.body;

    if (action === 'issue') {
      if (!userClass) {
        return res.status(400).json({ error: 'Class is required' });
      }
      if (!exp) {
        return res.status(400).json({ error: 'Expiration time is required' });
      }

      const expiresIn = `${exp}s`; // Assuming exp is in seconds
      const token = jwt.sign({ class: userClass }, 'your-secret-key', { expiresIn });
      res.status(200).json({ token });
    } else if (action === 'blacklist') {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ error: 'Token is required' });
      }

      blacklist.push(token); // Add token to blacklist
      res.status(200).json({ message: 'Token blacklisted successfully' });
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
