import axios from "axios"
import { NextRequest, NextResponse } from "next/server"
import apiClient from "../../../../utils/apiClient"

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const response = await apiClient.get(`/partner/${id}`)

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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    const response = await apiClient.put(`/partner/${id}`, body)

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
    console.error("Partner update error:", error)
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
    const response = await apiClient.delete(`/partner/${id}`)

    const data = response.data as {
      success: boolean
      message: string
      statusCode: number
    }

    if (!data.success) {
      return NextResponse.json({ error: data.message }, { status: data.statusCode || 400 })
    }

    return NextResponse.json({ message: "Partner deleted successfully" }, { status: data.statusCode })
  } catch (error) {
    console.error("Partner delete error:", error)
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
