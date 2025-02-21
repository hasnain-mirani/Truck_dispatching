"use client"

import { CloudDownload } from "@mui/icons-material"
import { Box, Card, CardContent, Grid, Button as MuiButton, Typography } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "components/Button/Button"
import { TextField } from "components/TextField/TextField"

/**
 * A production-ready "Add New Truck" form with multiple text fields,
 * a large circular photo upload on the left, and file uploads for registration and insurance.
 */
export default function NewTruckClient() {
  const router = useRouter()

  // Image upload (truck photo)
  const [truckPhotoFile, setTruckPhotoFile] = useState<File | null>(null)

  // File uploads for registration and insurance
  const [registrationFile, setRegistrationFile] = useState<File | null>(null)
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null)

  // Example form fields (adjust as needed)
  const [vehicleName, setVehicleName] = useState("")
  const [vin, setVin] = useState("")
  const [licensePlate, setLicensePlate] = useState("")
  const [type, setType] = useState("")
  const [fuel, setFuel] = useState("")
  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [trim, setTrim] = useState("")
  const [registrationState, setRegistrationState] = useState("")
  const [airConditioning, setAirConditioning] = useState("")
  const [brakeSystem, setBrakeSystem] = useState("")
  const [color, setColor] = useState("")
  const [curbWeight, setCurbWeight] = useState("")
  const [grossWeight, setGrossWeight] = useState("")
  const [gvwr, setGvwr] = useState("")
  const [fullTank1Capacity, setFullTank1Capacity] = useState("")
  const [fullTank2Capacity, setFullTank2Capacity] = useState("")
  const [engine, setEngine] = useState("")
  const [length, setLength] = useState("")
  const [ownership, setOwnership] = useState("")
  const [status, setStatus] = useState("")

  // Handlers for file uploads
  const handleTruckPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0]) {
        setTruckPhotoFile(e.target.files[0])
      }
    }
  }
  const handleRegistrationFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0]) {
        setRegistrationFile(e.target.files[0])
      }
    }
  }
  const handleInsuranceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0]) {
        setInsuranceFile(e.target.files[0])
      }
    }
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append("vehicleName", vehicleName)
      formData.append("vin", vin)
      formData.append("licensePlate", licensePlate)
      formData.append("type", type)
      formData.append("fuel", fuel)
      formData.append("year", year)
      formData.append("make", make)
      formData.append("model", model)
      formData.append("trim", trim)
      formData.append("registrationState", registrationState)
      formData.append("airConditioning", airConditioning)
      formData.append("brakeSystem", brakeSystem)
      formData.append("color", color)
      formData.append("curbWeight", curbWeight)
      formData.append("grossWeight", grossWeight)
      formData.append("gvwr", gvwr)
      formData.append("fullTank1Capacity", fullTank1Capacity)
      formData.append("fullTank2Capacity", fullTank2Capacity)
      formData.append("engine", engine)
      formData.append("length", length)
      formData.append("ownership", ownership)
      formData.append("status", status)

      if (truckPhotoFile) {
        formData.append("truckPhoto", truckPhotoFile)
      }
      if (registrationFile) {
        formData.append("registrationFile", registrationFile)
      }
      if (insuranceFile) {
        formData.append("insuranceFile", insuranceFile)
      }

      // const res = await fetch("/api/trucks", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (!res.ok) {
      //   throw new Error("Failed to save truck");
      // }
      router.push("/dashboard/trucks")
    } catch (error) {
      console.error("Error saving truck:", error)
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{  mx: "auto" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                    overflow: "hidden",
                    bgcolor: "#f5f5f5",
                    position: "relative",
                  }}
                >
                  {truckPhotoFile ? (
                    <Image
                      src={URL.createObjectURL(truckPhotoFile)}
                      alt="Truck Photo"
                      fill
                      style={{ objectFit: "cover" }}
                    />
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
                      No Picture
                    </Typography>
                  )}
                </Box>

                <MuiButton variant="outlined" component="label" startIcon={<CloudDownload />}>
                  Select Pic
                  <input hidden accept="image/*" type="file" onChange={handleTruckPhotoChange} />
                </MuiButton>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Vehicle Name"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="VIN/SN" value={vin} onChange={(e) => setVin(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="License Plate Number"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Type" value={type} onChange={(e) => setType(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Fuel" value={fuel} onChange={(e) => setFuel(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Year" value={year} onChange={(e) => setYear(e.target.value)} />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Make" value={make} onChange={(e) => setMake(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Model" value={model} onChange={(e) => setModel(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Trim" value={trim} onChange={(e) => setTrim(e.target.value)} />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Registration State/Province"
                    value={registrationState}
                    onChange={(e) => setRegistrationState(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Air Conditioning"
                    value={airConditioning}
                    onChange={(e) => setAirConditioning(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Brake System"
                    value={brakeSystem}
                    onChange={(e) => setBrakeSystem(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Color" value={color} onChange={(e) => setColor(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Curb Weight"
                    value={curbWeight}
                    onChange={(e) => setCurbWeight(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Gross Weight"
                    value={grossWeight}
                    onChange={(e) => setGrossWeight(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="GVWR" value={gvwr} onChange={(e) => setGvwr(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Full Tank 1 Capacity"
                    value={fullTank1Capacity}
                    onChange={(e) => setFullTank1Capacity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Full Tank 2 Capacity"
                    value={fullTank2Capacity}
                    onChange={(e) => setFullTank2Capacity(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Engine" value={engine} onChange={(e) => setEngine(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Length" value={length} onChange={(e) => setLength(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Ownership"
                    value={ownership}
                    onChange={(e) => setOwnership(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={6}>
                    <MuiButton variant="outlined" component="label" startIcon={<CloudDownload />}>
                      Upload Truck Registration
                      <input hidden accept="application/pdf" type="file" onChange={handleRegistrationFileChange} />
                    </MuiButton>
                    {registrationFile && (
                      <Typography variant="body2" mt={1}>
                        {registrationFile.name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MuiButton variant="outlined" component="label" startIcon={<CloudDownload />}>
                      Upload Truck Insurance
                      <input hidden accept="application/pdf" type="file" onChange={handleInsuranceFileChange} />
                    </MuiButton>
                    {insuranceFile && (
                      <Typography variant="body2" mt={1}>
                        {insuranceFile.name}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ borderTop: "1px solid #e0e0e0", mt: 2, pt: 2 }}>
              <Box display="flex" justifyContent="space-between">
                <Button intent="outline" onClick={() => router.push("/dashboard/trucks")}>
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
