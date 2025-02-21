"use client"

import { Cancel, Delete, Edit } from "@mui/icons-material"
import {
  IconButton,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@mui/material"
import React from "react"

export interface DataColumn<T = unknown> {
  /** Unique key to match data keys */
  key: keyof T
  /** Header label displayed in the table */
  label: string
  /** (Optional) Alignment of the column */
  align?: "left" | "right" | "center" | "justify" | "inherit"
  /** (Optional) Custom cell renderer */
  render?: (row: T) => React.ReactNode
}

export interface DataTableProps<T = unknown> {
  /** Column definitions */
  columns: DataColumn<T>[]
  /** The array of data objects to display */
  data: T[]
  /** (Optional) If true, shows an extra Actions column at the end */
  enableActions?: boolean
  /** (Optional) Called when the user clicks "Edit" in the actions column */
  onEdit?: (row: T) => void
  /** (Optional) Called when the user clicks "Delete" in the actions column */
  onDelete?: (row: T) => void
  /** (Optional) Called when the user clicks "Cancel" in the actions column */
  onCancel?: (row: T) => void
  /** (Optional) Custom styles for the entire table container */
  sx?: SxProps<Theme>
}

/**
 * A reusable, production-ready MUI table that:
 *  - Dynamically renders columns from "columns" prop
 *  - Dynamically renders rows from "data" prop
 *  - Optionally includes an Actions column (Edit, Delete, Cancel)
 */
export function DataTable<T>({ columns, data, enableActions, onEdit, onDelete, onCancel, sx }: DataTableProps<T>) {
  return (
    <TableContainer component={Paper} sx={sx}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={String(col.key)} align={col.align || "left"}>
                {col.label}
              </TableCell>
            ))}
            {/* Optional Actions Column */}
            {enableActions && <TableCell align="center">Actions</TableCell>}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => (
                <TableCell key={String(col.key)} align={col.align || "left"}>
                  {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                </TableCell>
              ))}

              {/* Actions Column */}
              {enableActions && (
                <TableCell align="center">
                  {onEdit && (
                    <IconButton size="small" color="primary" onClick={() => onEdit(row)} sx={{ mr: 1 }}>
                      <Edit />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton size="small" color="error" onClick={() => onDelete(row)} sx={{ mr: 1 }}>
                      <Delete />
                    </IconButton>
                  )}
                  {onCancel && (
                    <IconButton size="small" color="secondary" onClick={() => onCancel(row)}>
                      <Cancel />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}

          {/* Optionally handle "no data" */}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length + (enableActions ? 1 : 0)} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
