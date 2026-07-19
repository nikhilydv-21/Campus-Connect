import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllSocieties,
  getSocietyDetails,
} from "../../../services/studentServices";

import SearchBar from "./components/SearchBar";
import SocietyCard from "./components/SocietyCard";
import EmptyState from "./components/EmptyState";
import SocietyDetailsModal from "./components/SocietyDetailsModal";

function ExploreSocieties() {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const [selectedSociety, setSelectedSociety] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  const fetchSocieties = async () => {
    try {
      setLoading(true);

      const response = await getAllSocieties(
        search,
        type
      );

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
  }, [search, type]);

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
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <div className="mb-6 sm:mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Explore Societies
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Discover and join student societies.
        </p>

      </div>

      {/* Search */}

      <div className="mb-6 sm:mb-8">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      {/* Loading */}

      {loading ? (

        <div className="flex justify-center items-center h-60 text-base sm:text-lg text-gray-500">
          Loading...
        </div>

      ) : societies.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">

          {societies.map((society) => (

            <SocietyCard
              key={society._id}
              society={society}
              onView={handleView}
            />

          ))}

        </div>

      )}

      {/* Details Modal */}

      <SocietyDetailsModal
        open={openModal}
        setOpen={setOpenModal}
        societyData={selectedSociety}
      />

    </div>
  );
}

export default ExploreSocieties;