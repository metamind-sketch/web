import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Booking } from "../types";
import { Search, User, Phone, MapPin, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Trash2, Edit3, ClipboardList, Mail } from "lucide-react";

interface AdminPanelProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: Booking["status"]) => void;
  onDeleteBooking: (id: string) => void;
}

export default function AdminPanel({ bookings, onUpdateStatus, onDeleteBooking }: AdminPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.mobileNumber.includes(searchTerm);
    
    const matchesFilter = statusFilter === "all" || b.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 border-amber-200 text-amber-700";
      case "confirmed":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "completed":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "cancelled":
        return "bg-gray-100 border-gray-250 text-gray-500";
      default:
        return "bg-gray-50 border-gray-150 text-gray-600";
    }
  };

  const getStatusLabel = (status: Booking["status"]) => {
    switch (status) {
      case "pending": return "Pending Coordinator";
      case "confirmed": return "Engineer Dispatched";
      case "completed": return "Service Completed";
      case "cancelled": return "Request Cancelled";
      default: return status;
    }
  };

  // Dispatch metrics
  const totalCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const activeCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 bg-white/75 backdrop-blur-xl border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs relative">
      <div className="absolute top-0 right-10 -translate-y-1/2 bg-gray-900 text-white font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
        <ClipboardList className="w-3.5 h-3.5 text-blue-400" />
        IT Dispatch Control Panel
      </div>

      <div className="mb-8">
        <h3 className="font-serif text-2xl text-gray-900 font-semibold">Active Diagnostic Dispatcher</h3>
        <p className="font-sans text-sm text-gray-500 mt-1">
          Coimbatore IT operations console. Monitor ticket queues, assign systems engineers, and track hardware resolutions in real-time.
        </p>
      </div>

      {/* Dispatch Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
        <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-2xs">
          <p className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">TOTAL LOGGED</p>
          <p className="font-sans text-xl font-bold text-gray-900 mt-1">{totalCount}</p>
        </div>

        <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-2xs flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] text-amber-500 uppercase tracking-wider">PENDING DISPATCH</p>
            <p className="font-sans text-xl font-bold text-amber-600 mt-1">{pendingCount}</p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
        </div>

        <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-2xs flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] text-blue-500 uppercase tracking-wider">ACTIVE IN-FIELD</p>
            <p className="font-sans text-xl font-bold text-blue-600 mt-1">{activeCount}</p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
        </div>

        <div className="p-3 bg-white border border-gray-100 rounded-xl shadow-2xs">
          <p className="font-mono text-[9px] text-emerald-500 uppercase tracking-wider">COMPLETED TASKS</p>
          <p className="font-sans text-xl font-bold text-emerald-600 mt-1">{completedCount}</p>
        </div>
      </div>

      {/* Filters and search box */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            id="admin-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, booking ID, or mobile..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans focus:outline-hidden focus:border-gray-400 text-gray-950"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
            <button
              key={st}
              id={`filter-status-${st}`}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-gray-900 text-white font-semibold"
                  : "bg-white text-gray-500 border border-gray-150 hover:bg-gray-100/50"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table & List View */}
      <div className="overflow-x-auto border border-gray-150 rounded-2xl bg-white shadow-inner">
        <table className="w-full text-left border-collapse font-sans">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-150 font-mono text-[10px] tracking-wider text-gray-500 uppercase">
              <th className="px-6 py-4">Booking Info</th>
              <th className="px-6 py-4">Service Required</th>
              <th className="px-6 py-4">Area & Preferred Slot</th>
              <th className="px-6 py-4">Status Dispatch</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <AnimatePresence mode="popLayout">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400 text-xs">
                    No active service bookings found matching the parameters. Try creating one above.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <motion.tr
                    key={b.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50/40 transition-colors"
                  >
                    {/* Booking Info */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-blue-600 font-bold mb-1">
                          {b.id}
                        </span>
                        <span className="font-sans text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          {b.customerName}
                        </span>
                        {b.email && (
                          <span className="font-mono text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {b.email}
                          </span>
                        )}
                        <span className="font-mono text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-gray-400" />
                          +91 {b.mobileNumber}
                        </span>
                      </div>
                    </td>

                    {/* Service Type */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col max-w-xs">
                        <span className="font-sans text-xs font-semibold text-gray-800">
                          {b.serviceType}
                        </span>
                        {b.notes && (
                          <span className="font-sans text-[11px] text-gray-400 mt-1 italic leading-tight">
                            Note: &quot;{b.notes}&quot;
                          </span>
                        )}
                        <span className="text-[9px] font-mono text-gray-400 uppercase mt-1">
                          Logged at {b.createdAt}
                        </span>
                      </div>
                    </td>

                    {/* Area & Preferred Slot */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-sans text-xs font-semibold text-gray-800 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {b.area}
                        </span>
                        <span className="font-mono text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {b.preferredDate}
                        </span>
                        <span className="font-mono text-[9px] text-gray-400 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {b.preferredTime}
                        </span>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className={`inline-block text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border w-fit ${getStatusColor(b.status)}`}>
                          {getStatusLabel(b.status)}
                        </span>
                        
                        {/* Quick state switcher buttons */}
                        <div className="flex gap-1">
                          {b.status === "pending" && (
                            <button
                              onClick={() => onUpdateStatus(b.id, "confirmed")}
                              className="text-[9px] font-mono bg-blue-500 hover:bg-blue-600 text-white px-1.5 py-0.5 rounded cursor-pointer"
                              title="Dispatch Technician"
                            >
                              Dispatch
                            </button>
                          )}
                          {b.status === "confirmed" && (
                            <button
                              onClick={() => onUpdateStatus(b.id, "completed")}
                              className="text-[9px] font-mono bg-emerald-500 hover:bg-emerald-600 text-white px-1.5 py-0.5 rounded cursor-pointer"
                              title="Complete Order"
                            >
                              Complete
                            </button>
                          )}
                          {b.status !== "cancelled" && b.status !== "completed" && (
                            <button
                              onClick={() => onUpdateStatus(b.id, "cancelled")}
                              className="text-[9px] font-mono bg-gray-100 hover:bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded cursor-pointer"
                              title="Cancel Request"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onDeleteBooking(b.id)}
                        className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-gray-100/80 transition-colors inline-block cursor-pointer"
                        title="Delete Permanent Log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
