"use client"

import { CloudDownload } from "@mui/icons-material"
import { Box, Card, CardContent, Grid, Button as MuiButton, Typography } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "components/Button/Button"
import { TextField } from "components/TextField/TextField"

export default function NewPartnerClient() {
  const router = useRouter()

  const [partnerName, setPartnerName] = useState("")
  const [partnerAddress, setPartnerAddress] = useState("")

  const [logoFile, setLogoFile] = useState<File | null>(null)

  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const [licenseValidFrom, setLicenseValidFrom] = useState("")
  const [licenseValidTo, setLicenseValidTo] = useState("")

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file) {
        setLogoFile(file)
      }
    }
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file) {
        setPdfFile(file)
      }
    }
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append("partnerName", partnerName)
      formData.append("partnerAddress", partnerAddress)

      if (logoFile) {
        formData.append("logo", logoFile)
      }

      if (pdfFile) {
        formData.append("pdfDocument", pdfFile)
      }

      formData.append("licenseValidFrom", licenseValidFrom)
      formData.append("licenseValidTo", licenseValidTo)

      //   const res = await fetch("/api/partners", {
      //     method: "POST",
      //     body: formData,
      //   });

      //   if (!res.ok) {
      //     throw new Error("Failed to save partner");
      //   }
      router.push("/dashboard/partners")
    } catch (error) {
      console.error("Error saving partner:", error)
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ maxWidth: 900, mx: "auto" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  borderRight: {
                    xs: "none",
                    md: "2px solid #e0e0e0",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    overflow: "hidden",
                    bgcolor: "#f5f5f5",
                    position: "relative",
                  }}
                >
                  {logoFile ? (
                    <Image src={URL.createObjectURL(logoFile)} alt="Partner Logo" fill style={{ objectFit: "cover" }} />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      No Logo
                    </Typography>
                  )}
                </Box>

                <MuiButton variant="outlined" component="label" startIcon={<CloudDownload />}>
                  Select Logo
                  <input hidden accept="image/*" type="file" onChange={handleLogoChange} />
                </MuiButton>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Partner Name"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Partner Address"
                    value={partnerAddress}
                    onChange={(e) => setPartnerAddress(e.target.value)}
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="License Valid From"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={licenseValidFrom}
                    onChange={(e) => setLicenseValidFrom(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="License Valid To"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={licenseValidTo}
                    onChange={(e) => setLicenseValidTo(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MuiButton variant="outlined" component="label" startIcon={<CloudDownload />}>
                    Upload PDF
                    <input hidden accept="application/pdf" type="file" onChange={handlePdfChange} />
                  </MuiButton>
                  {pdfFile && (
                    <Typography variant="body2" mt={1}>
                      {pdfFile.name}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ borderTop: "1px solid #e0e0e0", mt: 2, pt: 2 }}>
              <Box display="flex" justifyContent="space-between">
                <Button intent="outline" onClick={() => router.push("/dashboard/partners")}>
                  Cancel
                </Button>
                <Button intent="primary" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
