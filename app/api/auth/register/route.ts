import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import apiClient from "../../../../utils/apiClient"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password } = body as {
      firstName: string
      lastName: string
      email: string
      password: string
    }

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "All fields (firstName, lastName, email, password) are required" },
        { status: 400 }
      )
    }

    const response = await apiClient.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
      role: "FLEET_MANAGER",
    })

    const data = response.data as {
      success: boolean
      message: string
      responseObject: { requiresVerification: boolean } | null
      statusCode: number
    }

    if (!data.success) {
      return NextResponse.json({ error: data.message }, { status: data.statusCode || 400 })
    }

    const cookieStore = await cookies()
    cookieStore.set("userEmail", email, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60, // 1 hour
    })

    return NextResponse.json(data, { status: data.statusCode })
  } catch (error) {
    console.error("Registration error:", error)
    let errorMessage = "An unknown error occurred"
    let status = 500

    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        errorMessage = (error.response.data as { message?: string }).message || errorMessage
        status = error.response.status
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status })
  }
}
