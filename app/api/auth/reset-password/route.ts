import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import apiClient from '../../../../utils/apiClient';
export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json() as { newPassword: string };
    const newPassword = body.newPassword;

    const cookieStore = await cookies();
    const resetToken = cookieStore.get('resetToken')?.value;

    if (!resetToken) {
      return NextResponse.json({ error: 'Reset token not found' }, { status: 400 });
    }

    const response = await apiClient.post('/auth/reset-password', {
      newPassword,
      token: resetToken,
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
