import { Metadata } from "next";
import LoginClient from "./loginClient";

export const metadata: Metadata = {
  title: "Login to your account - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
