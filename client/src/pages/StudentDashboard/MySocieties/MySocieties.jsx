import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getMySocieties,
  getSocietyDetails,
} from "../../../services/studentServices";

import SocietyCard from "./components/SocietyCard";
import EmptyState from "./components/EmptyState";
import SocietyDetailsModal from "../ExploreSocieties/components/SocietyDetailsModal";

function MySocieties() {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSociety, setSelectedSociety] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  const fetchSocieties = async () => {
    try {
      setLoading(true);

      const response =
        await getMySocieties();

      setSocieties(response.societies);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load societies"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchSocieties();
  }, []);

  const handleView = async (society) => {
    try {

      const response =
        await getSocietyDetails(
          society._id
        );

      setSelectedSociety(response);

      setOpenModal(true);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load society details"
      );

    }
  };

  return (
    <div className="bg-slate-100 min-h-screen p-8">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          My Societies
        </h1>

        <p className="text-gray-500 mt-2">
          Societies where you are an active volunteer.
        </p>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="flex justify-center py-24">

          <div className="text-lg text-gray-500">
            Loading...
          </div>

        </div>

      ) : societies.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {societies.map((society) => (

            <SocietyCard
              key={society._id}
              society={society}
              onView={handleView}
            />

          ))}

        </div>

      )}

      {/* Society Details Modal */}

      <SocietyDetailsModal
        open={openModal}
        setOpen={setOpenModal}
        societyData={selectedSociety}
      />

    </div>
  );
}

export default MySocieties;