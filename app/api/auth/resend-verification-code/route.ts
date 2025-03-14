import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import apiClient from '../../../../utils/apiClient';

export async function POST(_request: NextRequest) {
  try {

    const cookieStore = await cookies();
    const email = cookieStore.get('userEmail')?.value;

    if (!email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 400 });
    }

    const response = await apiClient.post('/auth/resend-verification-code', {
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
