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

      const response =
        await getAllSocieties(search);

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

    <div className="bg-slate-100 min-h-screen">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          All Societies
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage all approved societies.
        </p>

      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {loading ? (

        <div className="text-center py-20 text-lg text-gray-500">
          Loading...
        </div>

      ) : societies.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center mt-8">

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