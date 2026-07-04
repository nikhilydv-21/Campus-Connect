import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getJoinRequests } from "../../../services/joinRequestServices";

import SearchBar from "./components/SearchBar";
import RequestCard from "./components/RequestCard";
import EmptyState from "./components/EmptyState";

function JoinRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const response = await getJoinRequests(search);

      setRequests(response.requests);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load join requests"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchRequests();
  }, [search]);

  return (
    <div className="bg-slate-100 min-h-screen p-8">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Join Requests
        </h1>

        <p className="text-gray-500 mt-2">
          Review and manage students requesting to join your society.
        </p>

      </div>

      {/* Search */}

      <div className="mb-8">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      {/* Loading */}

      {loading ? (

        <div className="text-center py-20 text-lg text-gray-500">
          Loading Requests...
        </div>

      ) : requests.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid lg:grid-cols-2 gap-8">

          {requests.map((request) => (

            <RequestCard
              key={request._id}
              request={request}
              refreshRequests={fetchRequests}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default JoinRequests;