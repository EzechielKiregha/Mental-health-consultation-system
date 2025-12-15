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
//   { id: "1", name: "Admin A", email: "adminA@example.com", role: "Admin" },
//   { id: "2", name: "Admin B", email: "adminB@example.com", role: "Admin" },
//   { id: "3", name: "Admin C", email: "adminC@example.com", role: "Admin" },
// ];

// export default function ManagerDashboard() {
//   const handleDelete = (selected: string[]) => {
//     console.log("Deleted rows:", selected);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-green-800 mb-4">Manager Dashboard</h1>
//       <div className="mb-8">
//         <Chart />
//       </div>
//       <DynamicTable
//         columns={columns}
//         data={data}
//         title="Admin List"
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }
