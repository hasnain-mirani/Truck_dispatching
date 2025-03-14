"use client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "components/Button/Button";
import { AuthLayout } from "components/Layouts/AuthLayout";

export default function VerifyEmailClient() {
  const [verificationCode, setVerificationCode] = useState(new Array(6).fill(""));
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingVerificationCode, setIsResendingVerificationCode] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (error || successMessage) {
      timeoutId = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [error, successMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value.slice(-1);
    setVerificationCode(newVerificationCode);

    if (value && index < verificationCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const verificationCodeString = verificationCode.join("");

    if (verificationCodeString.length !== 6) {
      setError("Please enter a 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode: verificationCodeString }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error((data as {error?: string, message?: string}).error || (data as {error?: string, message?: string}).message || "Verification failed");
      }

      router.push("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerificationCode = async () => {
    setIsResendingVerificationCode(true);
    try {
      const response = await fetch("/api/auth/resend-verification-code", {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error((data as {error?: string, message?: string}).error || (data as {error?: string, message?: string}).message || "Verification code resend failed");
      }
      setSuccessMessage("Verification code sent successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend verification code");
    } finally {
      setIsResendingVerificationCode(false);
    }
  };
  return (
    <AuthLayout imageSrc="/assets/auth/register/register.jpg">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 350 }}
      >
        <Typography variant="h5" fontWeight="bold">
          Verify Your Email
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please enter the 6-digit verification code sent to your email.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              style={{
                width: "40px",
                height: "40px",
                fontSize: "24px",
                textAlign: "center",
                marginRight: index < verificationCode.length - 1 ? "8px" : 0,
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          ))}
        </Box>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <Button type="submit" intent="primary" size="lg" fullWidth disabled={isLoading} loading={isLoading}>
          {isLoading ? "VERIFYING..." : "VERIFY EMAIL"}
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">Didn't receive the code?</Typography>
          <Button intent="link" onClick={handleResendVerificationCode} loading={isResendingVerificationCode}>Resend Code</Button>
        </Box>

        {successMessage && (
          <Typography variant="body2" color="success">
            {successMessage}
          </Typography>
        )}
      </Box>
    </AuthLayout>
  );
}
