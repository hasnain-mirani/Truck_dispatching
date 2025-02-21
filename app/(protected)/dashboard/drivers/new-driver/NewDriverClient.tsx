"use client";

import { CloudDownload } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Button as MuiButton,
  Switch,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Button } from "components/Button/Button";
import { TextField } from "components/TextField/TextField";

export default function NewDriverClient() {
  const router = useRouter();

  const [driverPhoto, setDriverPhoto] = useState<File | null>(null);

  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [fullName, setFullName] = useState("");
  const [experience, setExperience] = useState("");
  const [designation, setDesignation] = useState("");
  const [canDrive, setCanDrive] = useState("4, 6, 12"); // e.g. "4,6,12"
  const [hasHealthInsurance, setHasHealthInsurance] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [assignedTruck, setAssignedTruck] = useState("");

  const [drivingLicenseFile, setDrivingLicenseFile] = useState<File | null>(null);
  const [healthInsuranceFile, setHealthInsuranceFile] = useState<File | null>(null);

  const handleDriverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        setDriverPhoto(file);
      }
    }
  };
  const handleDrivingLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
      if (file) {
      setDrivingLicenseFile(file);
      }
    }
  };
  const handleHealthInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
      if (file) {
        setHealthInsuranceFile(file);
      }
      
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("country", country);
      formData.append("province", province);
      formData.append("city", city);
      formData.append("fullName", fullName);
      formData.append("experience", experience);
      formData.append("designation", designation);
      formData.append("canDrive", canDrive);
      formData.append("hasHealthInsurance", String(hasHealthInsurance));
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("assignedTruck", assignedTruck);

      if (driverPhoto) {
        formData.append("driverPhoto", driverPhoto);
      }
      if (drivingLicenseFile) {
        formData.append("drivingLicense", drivingLicenseFile);
      }
      if (healthInsuranceFile) {
        formData.append("healthInsurance", healthInsuranceFile);
      }

      // const res = await fetch("/api/drivers", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (!res.ok) {
      //   throw new Error("Failed to save driver");
      // }

      router.push("/dashboard/drivers");
    } catch (error) {
      console.error("Error saving driver:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ mx: "auto" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  borderRight: { xs: "none", md: "2px solid #e0e0e0" },
                }}
              >
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    overflow: "hidden",
                    bgcolor: "#f5f5f5",
                    position: "relative",
                  }}
                >
                  {driverPhoto ? (
                    <Image
                      src={URL.createObjectURL(driverPhoto)}
                      alt="Driver Photo"
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
                      No Photo
                    </Typography>
                  )}
                </Box>

                <MuiButton variant="outlined" component="label" startIcon={<CloudDownload />}>
                  Select Pic
                  <input hidden accept="image/*" type="file" onChange={handleDriverPhotoChange} />
                </MuiButton>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Province/State"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Year of Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Can Drive (4, 6, 12 Wheeler)"
                    value={canDrive}
                    onChange={(e) => setCanDrive(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    label="Health Insurance"
                    control={
                      <Switch
                        checked={hasHealthInsurance}
                        onChange={(e) => setHasHealthInsurance(e.target.checked)}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <MuiButton
                    variant="outlined"
                    component="label"
                    startIcon={<CloudDownload />}
                  >
                    Upload Driving License
                    <input
                      hidden
                      accept="application/pdf"
                      type="file"
                      onChange={handleDrivingLicenseChange}
                    />
                  </MuiButton>
                  {drivingLicenseFile && (
                    <Typography variant="body2" mt={1}>
                      {drivingLicenseFile.name}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <MuiButton
                    variant="outlined"
                    component="label"
                    startIcon={<CloudDownload />}
                  >
                    Upload Health Insurance
                    <input
                      hidden
                      accept="application/pdf"
                      type="file"
                      onChange={handleHealthInsuranceChange}
                    />
                  </MuiButton>
                  {healthInsuranceFile && (
                    <Typography variant="body2" mt={1}>
                      {healthInsuranceFile.name}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Assigned Truck"
                    value={assignedTruck}
                    onChange={(e) => setAssignedTruck(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ borderTop: "1px solid #e0e0e0", mt: 2, pt: 2 }}>
              <Box display="flex" justifyContent="space-between">
                <Button intent="outline" onClick={() => router.push("/dashboard/drivers")}>
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
  );
}
