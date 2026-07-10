import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getPendingSocieties } from "../../../services/adminServices";

import SearchBar from "./components/SearchBar";
import SocietyCard from "./components/SocietyCard";
import EmptyState from "./components/EmptyState";

function PendingSocieties() {

  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSocieties = async () => {

    try {

      setLoading(true);

      const response =
        await getPendingSocieties();

      setSocieties(response.societies || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load pending societies"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchSocieties();
  }, []);

  const filteredSocieties = societies.filter((society) =>

    society.societyName
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <div className="bg-slate-100 min-h-screen">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Pending Societies
        </h1>

        <p className="text-gray-500 mt-2">
          Approve or reject newly registered societies.
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

      ) : filteredSocieties.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {filteredSocieties.map((society) => (

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

export default PendingSocieties;