"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 150 },
];

const rows = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Patient" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Therapist" },
  { id: 3, name: "Admin User", email: "admin@example.com", role: "Admin" },
];

export default function MaterialTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
      />
    </div>
  );
}
