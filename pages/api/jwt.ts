// /pages/api/jwt.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// Define the type of blacklist as an array of strings
let blacklist: string[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Retrieve the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  if (req.method === 'POST') {
    const { class: userClass, exp, action, token } = req.body;

    if (action === 'issue') {
      // Handle token issuing
      if (!userClass) {
        return res.status(400).json({ error: 'Class is required' });
      }
      if (!exp) {
        return res.status(400).json({ error: 'Expiration time is required' });
      }

      const expiresIn = `${exp}s`; // Assuming exp is in seconds
      const newToken = jwt.sign({ class: userClass }, secretKey, { expiresIn });
      return res.status(200).json({ token: newToken });
    } 
    else if (action === 'verify') {
      // Handle token verification
      if (blacklist.includes(token)) {
        return res.status(401).json({ error: 'Token is blacklisted' });
      }

      try {
        jwt.verify(token, secretKey);
        return res.status(200).json({ message: 'Token is valid' });
      } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }
    else if (action === 'blacklist') {
      // Handle token blacklisting
      if (!token) {
        return res.status(400).json({ error: 'Token is required' });
      }

      blacklist.push(token);
      return res.status(200).json({ message: 'Token blacklisted successfully' });
    } 
    else {
      return res.status(400).json({ error: 'Invalid action' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
