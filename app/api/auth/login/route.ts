import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import apiClient from "../../../../utils/apiClient"

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const { email, password } = body as { email: string; password: string }

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }
    const response = await apiClient.post("/auth/login", { email, password })
    const data = response.data as {
      responseObject: {
        user: {
          userId: string
          firstName: string
          lastName: string
          email: string
          phone: string
          role: string
        }
        accessToken: string
        refreshToken: string
      }
    }

    if (!data.responseObject) {
      return NextResponse.json({ error: "Invalid response from server" }, { status: 500 })
    }

    const { accessToken, refreshToken, user } = data.responseObject as {
      accessToken: string
      refreshToken: string
      user: {
        userId: string
        firstName: string
        lastName: string
        email: string
        phone: string
        role: string
      }
    }
    const cookieStore = await cookies()
    cookieStore.set("accessToken", accessToken)
    cookieStore.set("refreshToken", refreshToken)
    cookieStore.set("user", JSON.stringify(user))

    return NextResponse.json({ accessToken, refreshToken })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    )
  }
}
