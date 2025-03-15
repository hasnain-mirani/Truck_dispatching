import { Metadata } from "next"
import ForgotPasswordClient from "./forgetPasswordClient"

export const metadata: Metadata = {
  title: "Forgot password - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />
}
