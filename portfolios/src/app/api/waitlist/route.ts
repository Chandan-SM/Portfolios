// src/app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Destructure both name and email from the request
    const { name, email } = await request.json();

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      throw new Error("Google Script URL is not configured.");
    }

    // Forward both name and email to your Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
        throw new Error('Failed to submit to the waitlist.');
    }
    
    console.log(`Successfully added ${name} (${email}) to waitlist.`);
    return NextResponse.json({ message: 'Success! You are on the waitlist.' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}