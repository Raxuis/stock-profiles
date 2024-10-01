import { env } from '@/env';
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const emailRateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'localhost';
  const rateLimit = emailRateLimitMap.get(ip) || { count: 0, timestamp: Date.now() };

  // Check if the user exceeded the email limit (e.g., 1 email per minute)
  if (rateLimit.count >= 1 && Date.now() - rateLimit.timestamp < 60 * 1000) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute before sending another email.' }, { status: 429 });
  }

  const { email, name, message } = await request.json();
  if (!email || !name || !message) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });

  const mailOptions: Mail.Options = {
    from: email,
    to: env.EMAIL_USER,
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();

    // Update rate limit data
    rateLimit.count++;
    rateLimit.timestamp = Date.now();
    emailRateLimitMap.set(ip, rateLimit);

    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
