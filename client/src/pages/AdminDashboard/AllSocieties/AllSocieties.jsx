import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllSocieties } from "../../../services/adminServices";

import SearchBar from "./components/SearchBar";
import SocietyCard from "./components/SocietyCard";
import EmptyState from "./components/EmptyState";

function AllSocieties() {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSocieties = async () => {
    try {
      setLoading(true);

      const response = await getAllSocieties(search);

      setSocieties(response.societies || []);
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
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Heading */}

      <div className="mb-6 sm:mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          All Societies
        </h1>

        <p className="mt-2 text-sm sm:text-base text-gray-500">
          View and manage all approved societies.
        </p>

      </div>

      {/* Search */}

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Content */}

      {loading ? (
        <div className="flex justify-center items-center py-20 text-base sm:text-lg text-gray-500">
          Loading...
        </div>
      ) : societies.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {societies.map((society) => (
            <SocietyCard
              key={society._id}
              society={society}
              refresh={fetchSocieties}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllSocieties;