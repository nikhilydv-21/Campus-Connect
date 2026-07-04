import {
  Mail,
  Users,
  Eye,
  Trash2,
  Ban,
  CheckCircle,
} from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  disableSociety,
  deleteSociety,
  getSocietyDetails,
} from "../../../../services/adminServices";

import SocietyDetailsModal from "./SocietyDetailsModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import DisableConfirmModal from "./DisableConfirmModal";

function SocietyCard({
  society,
  refresh,
}) {
 
 const [selectedSociety, setSelectedSociety] =
  useState(null);

  const [loading, setLoading] =
    useState(false);

  const [openDetails, setOpenDetails] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [disableOpen, setDisableOpen] =
    useState(false);

  const handleDisable = async () => {

    try {

      setLoading(true);

      const response =
        await disableSociety(
          society._id
        );

      toast.success(response.message);

      setDisableOpen(false);

      refresh();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Operation Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async () => {

    try {

      setLoading(true);

      const response =
        await deleteSociety(
          society._id
        );

      toast.success(response.message);

      setDeleteOpen(false);

      refresh();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );

    } finally {

      setLoading(false);

    }

  };
const handleView = async () => {
  try {

    const response =
      await getSocietyDetails(
        society._id
      );

    setSelectedSociety({
      ...response.society,
      totalMembers: response.totalMembers,
    });

    setOpenDetails(true);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to load society details"
    );

  }
};
  return (
    <>

      <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden">

        {/* Header */}

        <div className="p-6 flex justify-between">

          <div className="flex gap-4">

            <img
              src={
                society.logo
                  ? society.logo
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      society.societyName
                    )}&background=2563eb&color=fff`
              }
              alt={society.societyName}
              className="w-16 h-16 rounded-2xl object-cover"
            />

            <div>

              <h2 className="text-xl font-bold">
                {society.societyName}
              </h2>

              <p className="text-blue-600">
                {society.societyType}
              </p>

            </div>

          </div>

          <span
            className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
              society.isDisabled
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {society.isDisabled
              ? "Disabled"
              : "Active"}
          </span>

        </div>

        {/* Body */}

        <div className="px-6 pb-6 space-y-3">

          <div className="flex items-center gap-2 text-gray-600">

            <Users size={18} />

            {society.facultyCoordinator}

          </div>

          <div className="flex items-center gap-2 text-gray-600">

            <Mail size={18} />

            <span className="truncate">
              {society.email}
            </span>

          </div>

          {/* Buttons */}

          <div className="grid grid-cols-3 gap-3 pt-5">

            <button
              onClick={handleView}
              className="flex items-center justify-center gap-2 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl py-3 transition font-medium"
            >
              <Eye size={16} />
              <span className="text-sm">
                View
              </span>
            </button>

            <button
              onClick={() =>
                setDisableOpen(true)
              }
              className={`flex items-center justify-center gap-2 rounded-xl py-3 transition font-medium ${
                society.isDisabled
                  ? "border border-green-200 bg-green-50 hover:bg-green-100 text-green-600"
                  : "border border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-700"
              }`}
            >
              {society.isDisabled ? (
                <CheckCircle size={16} />
              ) : (
                <Ban size={16} />
              )}

              <span className="text-sm">
                {society.isDisabled
                  ? "Enable"
                  : "Disable"}
              </span>
            </button>

            <button
              onClick={() =>
                setDeleteOpen(true)
              }
              className="flex items-center justify-center gap-2 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl py-3 transition font-medium"
            >
              <Trash2 size={16} />
              <span className="text-sm">
                Delete
              </span>
            </button>

          </div>

        </div>

      </div>

      <SocietyDetailsModal
        open={openDetails}
        setOpen={setOpenDetails}
        society={society}
        
      />

      <DisableConfirmModal
        open={disableOpen}
        setOpen={setDisableOpen}
        society={society}
        loading={loading}
        onConfirm={handleDisable}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        society={society}
        loading={loading}
        onConfirm={handleDelete}
      />

    </>
  );

}

export default SocietyCard;