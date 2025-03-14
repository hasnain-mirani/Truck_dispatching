import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import apiClient from '../../../../utils/apiClient';

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json() as { email: string };
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 400 });
    }

    const response = await apiClient.post('/auth/forgot-password', {
      email,
    });
    
    const data = response.data as {
      success: boolean;
      message: string;
      responseObject: null;
      statusCode: number;
    };

    if (!data.success) {
      return NextResponse.json({ error: data.message }, { status: data.statusCode || 400 });
    }

    return NextResponse.json(data, { status: data.statusCode });
  } catch (error) {
    console.error('Verification code resend error:', error);
    let errorMessage = 'An unknown error occurred';
    let status = 500;

    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        errorMessage = (error.response.data as { message?: string }).message || errorMessage;
        status = error.response.status;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
