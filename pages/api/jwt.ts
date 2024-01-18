import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { class: userClass, exp } = req.body;

    // Validation for userClass and exp
    if (!userClass) {
      return res.status(400).json({ error: 'Class is required' });
    }
    if (!exp) {
      return res.status(400).json({ error: 'Expiration time is required' });
    }

    // Convert exp to a suitable format for jwt.sign (e.g., seconds, '2h', '7d')
    const expiresIn = `${exp}s`; // Assuming exp is in seconds

    const token = jwt.sign({ class: userClass }, 'your-secret-key', { expiresIn });

    res.status(200).json({ token });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
