import axios from "axios"
import { NextRequest, NextResponse } from "next/server"
import apiClient from "../../../../utils/apiClient"

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Truck ID is required" }, { status: 400 })
    }

    const response = await apiClient.get(`/truck/${id}`)

    const data = response.data as {
      success: boolean
      message: string
      responseObject: { id: string; model: string; licensePlate: string }
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

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Truck ID is required" }, { status: 400 })
    }

    const response = await apiClient.delete(`/truck/${id}`)

    const data = response.data as {
      success: boolean
      message: string
      statusCode: number
    }

    if (!data.success) {
      return NextResponse.json({ error: data.message }, { status: data.statusCode || 400 })
    }

    return NextResponse.json({ message: "Truck deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Truck delete error:", error)
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
