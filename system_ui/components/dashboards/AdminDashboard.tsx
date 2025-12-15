// "use client";

// import React from "react";
// import { Component as Chart } from "../charts/BarChart";
// import DynamicTable from "../tables/DynamicTable";

// const columns = [
//   { id: "id", label: "ID" },
//   { id: "name", label: "Name" },
//   { id: "email", label: "Email" },
//   { id: "role", label: "Role" },
// ];

// const data = [
//   { id: "1", name: "Therapist A", email: "therapistA@example.com", role: "Therapist" },
//   { id: "2", name: "Therapist B", email: "therapistB@example.com", role: "Therapist" },
//   { id: "3", name: "Therapist C", email: "therapistC@example.com", role: "Therapist" },
// ];

// export default function AdminDashboard() {
//   const handleDelete = (selected: string[]) => {
//     console.log("Deleted rows:", selected);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-green-800 mb-4">Admin Dashboard</h1>
//       <div className="mb-8">
//         <Chart />
//       </div>
//       <DynamicTable
//         columns={columns}
//         data={data}
//         title="Therapist List"
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }
