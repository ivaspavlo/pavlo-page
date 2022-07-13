import type { NextApiRequest, NextApiResponse } from 'next';

require('dotenv').config();

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: `${process.env.emailFrom}`,
    pass: `${process.env.password}`
  },
  secure: true
});

interface IEmail {
  name: string;
  email: string;
  message: string;
}

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<{success: boolean}>
) {
  const body: IEmail = req.body;
  const mailData = {
    to: `${process.env.emailTo}`,
    subject: `Message from: ${body.name}`,
    text: `${body.message} | Sent from: ${body.email}`,
    html: `<p>${body.message}</p><p>Sent from: ${body.email}</p>`
  }
  const request = new Promise<boolean>((resolve) => {
    transporter.sendMail(mailData, (err: object) => {
      resolve(err ? false : true);
    });
  });

  let success = false;

  try {
    success = await request;
  } catch(err: unknown) {
    success = false;
  }

  res.status(success ? 200 : 400).json({ success });
}
