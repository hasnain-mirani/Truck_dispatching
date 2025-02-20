"use client"

import { CircularProgress, InputAdornment } from "@mui/material"
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField"
import React from "react"

export interface CustomSelectFieldProps extends Omit<MuiTextFieldProps, "error"> {
  errorMessage?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  loading?: boolean
}

export function SelectField({ errorMessage, startIcon, endIcon, loading = false, ...props }: CustomSelectFieldProps) {
  return (
    <MuiTextField
      {...props}
      select
      variant="outlined"
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      fullWidth
      InputProps={{
        startAdornment: startIcon ? <InputAdornment position="start">{startIcon}</InputAdornment> : null,
        endAdornment: (
          <InputAdornment position="end">{loading ? <CircularProgress size={20} /> : endIcon}</InputAdornment>
        ),
      }}
      //   sx={{
      //     "& label.Mui-focused": {
      //       color: "#fecf19",
      //     },
      //     "& .MuiOutlinedInput-root": {
      //       "& fieldset": {
      //         borderColor: "#fecf19",
      //       },
      //       "&:hover fieldset": {
      //         borderColor: "#e6b800",
      //       },
      //       "&.Mui-focused fieldset": {
      //         borderColor: "#fecf19",
      //       },
      //     },
      //   }}
    />
  )
}
