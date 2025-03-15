import axios from "axios"
import { NextRequest, NextResponse } from "next/server"
import apiClient from "../../../utils/apiClient"

// Handle creating a new partner (POST) and fetching all partners (GET)
export async function POST(_request: NextRequest) {
  try {
    const body = (await _request.json()) as { name: string; contactEmail: string }
    const { name, contactEmail } = body

    if (!name || !contactEmail) {
      return NextResponse.json({ error: "Name and contact email are required" }, { status: 400 })
    }

    const response = await apiClient.post("/partner", { name, contactEmail })

    const data = response.data as {
      success: boolean
      message: string
      responseObject: null
      statusCode: number
    }

    if (!data.success) {
      return NextResponse.json({ error: data.message }, { status: data.statusCode || 400 })
    }

    return NextResponse.json(data, { status: data.statusCode })
  } catch (error) {
    console.error("Partner creation error:", error)
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

export async function GET() {
  try {
    const response = await apiClient.get("/partner")

    const data = response.data as {
      success: boolean
      message: string
      responseObject: { id: string; name: string; contactEmail: string }[]
      statusCode: number
    }

    if (!data.success) {
      return NextResponse.json({ error: data.message }, { status: data.statusCode || 400 })
    }

    return NextResponse.json(data.responseObject, { status: 200 })
  } catch (error) {
    console.error("Partner fetch error:", error)
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
