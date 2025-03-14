import { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Create a new account - Truckvise",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
