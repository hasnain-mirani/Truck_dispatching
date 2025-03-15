import axios from "axios"
import { NextRequest, NextResponse } from "next/server"
import apiClient from "../../../utils/apiClient"

// Handle creating a new truck (POST) and fetching all trucks (GET)
export async function POST(_request: NextRequest) {
  try {
    const body = (await _request.json()) as { model: string; licensePlate: string }
    const { model, licensePlate } = body

    if (!model || !licensePlate) {
      return NextResponse.json({ error: "Model and license plate are required" }, { status: 400 })
    }

    const response = await apiClient.post("/truck", { model, licensePlate })

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
    console.error("Truck creation error:", error)
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
    const response = await apiClient.get("/truck")

    const data = response.data as {
      success: boolean
      message: string
      responseObject: { id: string; model: string; licensePlate: string }[]
      statusCode: number
    }

    if (!data.success) {
      return NextResponse.json({ error: data.message }, { status: data.statusCode || 400 })
    }

    return NextResponse.json(data.responseObject, { status: 200 })
  } catch (error) {
    console.error("Truck fetch error:", error)
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
