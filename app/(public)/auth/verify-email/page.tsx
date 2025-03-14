import { Metadata } from "next";
import VerifyEmailClient from "./verifyEmailClient";

export const metadata: Metadata = {
  title: "Verify Your Email - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
};

export default function VerifyEmailPage() {
  return <VerifyEmailClient />;
}
