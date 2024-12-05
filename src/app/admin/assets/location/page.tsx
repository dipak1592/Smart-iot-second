// 'use client';

// import React, { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';

// // Define types for the form and report data
// type LocationFormInputs = {
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   stations: number;
//   connectors: number;
//   access: string;
//   paymentType: string;
//   siteRating: number;
//   maxPowerSupply: number;
//   reservable: boolean;
// };

// type ReportData = {
//   stationName: string;
//   downtime: string;
//   reason: string;
//   startTime: string;
//   endTime: string;
// };

// const LocationReportingPage: React.FC = () => {
//   // Form handling using react-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LocationFormInputs>();

//   // State for report filters and data
//   const [filters, setFilters] = useState({
//     stationName: '',
//     startDate: '',
//     endDate: '',
//     reason: '',
//   });
//   const [reportData, setReportData] = useState<ReportData[]>([]);

//   // Mock data for the report
//   const mockData: ReportData[] = [
//     {
//       stationName: 'IESO',
//       downtime: '3 hours',
//       reason: 'Maintenance',
//       startTime: '2024-12-01 10:00',
//       endTime: '2024-12-01 13:00',
//     },
//     {
//       stationName: 'Collectdev LP',
//       downtime: '2 hours',
//       reason: 'Technical Issue',
//       startTime: '2024-12-02 15:00',
//       endTime: '2024-12-02 17:00',
//     },
//     {
//       stationName: '33 Isabella Street',
//       downtime: '7 hours',
//       reason: 'Weather',
//       startTime: '2024-12-04 18:00',
//       endTime: '2024-12-05 01:00',
//     },
//   ];

//   // Handle form submission for new locations
//   const onSubmit: SubmitHandler<LocationFormInputs> = (data) => {
//     console.log('Location Submitted:', data);
//   };

//   // Handle filter input changes
//   const handleFilterChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   // Filter and generate the report
//   const handleGenerateReport = () => {
//     const filteredData = mockData.filter((item) => {
//       const matchesStationName = filters.stationName
//         ? item.stationName
//             .toLowerCase()
//             .includes(filters.stationName.toLowerCase())
//         : true;

//       const matchesReason = filters.reason
//         ? item.reason.toLowerCase() === filters.reason.toLowerCase()
//         : true;

//       const matchesStartDate = filters.startDate
//         ? new Date(item.startTime) >= new Date(filters.startDate)
//         : true;

//       const matchesEndDate = filters.endDate
//         ? new Date(item.endTime) <= new Date(filters.endDate)
//         : true;

//       return (
//         matchesStationName &&
//         matchesReason &&
//         matchesStartDate &&
//         matchesEndDate
//       );
//     });

//     setReportData(filteredData);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mb-6 text-center">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Location Form & Reporting
//         </h1>
//       </div>

//       {/* Location Form */}
//       <div className="mb-6 rounded-lg bg-white p-6 shadow-2xl">
//         <h2 className="mb-4 text-lg font-bold text-gray-800">
//           Add New Location
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-900">
//               Location Name
//             </label>
//             <input
//               {...register('name', { required: 'Name is required' })}
//               className="w-full rounded-lg border border-gray-300 p-2 text-sm"
//             />
//             {errors.name && (
//               <p className="text-red-500">{errors.name.message}</p>
//             )}
//           </div>
//           {/* Add other fields similarly */}
//           <button
//             type="submit"
//             className="mt-4 rounded-lg bg-daketBlue px-6 py-2 text-white hover:bg-daketBlue"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {/* Filters Section */}
//       <div className="mb-6 rounded-lg bg-white p-6 shadow-2xl">
//         <h2 className="mb-4 text-lg font-bold text-gray-800">Filters</h2>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-900">
//               Station Name
//             </label>
//             <input
//               type="text"
//               name="stationName"
//               value={filters.stationName}
//               onChange={handleFilterChange}
//               className="w-full rounded-lg border border-gray-300 p-2 text-sm"
//               placeholder="Enter station name"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-900">
//               Start Date
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={filters.startDate}
//               onChange={handleFilterChange}
//               className="w-full rounded-lg border border-gray-300 p-2 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-900">
//               End Date
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={filters.endDate}
//               onChange={handleFilterChange}
//               className="w-full rounded-lg border border-gray-300 p-2 text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-900">
//               Downtime Reason
//             </label>
//             <select
//               name="reason"
//               value={filters.reason}
//               onChange={handleFilterChange}
//               className="w-full rounded-lg border border-gray-300 p-2 text-sm"
//             >
//               <option value="">All Reasons</option>
//               <option value="Maintenance">Maintenance</option>
//               <option value="Technical Issue">Technical Issue</option>
//               <option value="Weather">Weather</option>
//             </select>
//           </div>
//         </div>
//         <div className="mt-6 text-center">
//           <button
//             onClick={handleGenerateReport}
//             className="rounded-lg bg-daketBlue px-6 py-2 text-white hover:bg-daketBlue"
//           >
//             Generate Report
//           </button>
//         </div>
//       </div>

//       {/* Report Section */}
//       <div className="rounded-lg bg-white p-6 shadow-2xl">
//         <h2 className="mb-4 text-lg font-bold text-gray-800">Report</h2>
//         {reportData.length === 0 ? (
//           <p className="text-gray-500">
//             No data available. Please filter and generate a report.
//           </p>
//         ) : (
//           <table className="w-full table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 px-4 py-2 text-left">
//                   Station Name
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2 text-left">
//                   Downtime
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2 text-left">
//                   Reason
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2 text-left">
//                   Start Time
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2 text-left">
//                   End Time
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.map((data, index) => (
//                 <tr key={index} className="odd:bg-white even:bg-gray-50">
//                   <td className="border border-gray-300 px-4 py-2">
//                     {data.stationName}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {data.downtime}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {data.reason}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {data.startTime}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {data.endTime}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LocationReportingPage;
