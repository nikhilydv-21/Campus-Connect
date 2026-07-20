import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Users,
} from "lucide-react";

import { getJoinRequests } from "../../../services/joinRequestServices";

import {
  getMembers,
} from "../../../services/authServices";

import SearchBar from "./components/SearchBar";
import RequestCard from "./components/RequestCard";
import EmptyState from "./components/EmptyState";
import MembersModal from "./components/MembersModal";

function JoinRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [membersOpen, setMembersOpen] =
    useState(false);

  const [members, setMembers] =
    useState([]);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const response =
        await getJoinRequests(search);

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

  const fetchMembers = async () => {
    try {

      const response =
        await getMembers();

      setMembers(response.members);

      setMembersOpen(true);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to load members"
      );

    }
  };

  useEffect(() => {
    fetchRequests();
  }, [search]);

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">

      {/* Heading */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 mb-6 sm:mb-8">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Join Requests
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Review and manage students requesting to join your society.
          </p>

        </div>

        <button
          onClick={fetchMembers}
          className="
            w-full
            sm:w-auto
            flex
            items-center
            justify-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-slate-900
            hover:bg-black
            text-white
            font-semibold
            transition
          "
        >
          <Users size={18} />

          View Members

        </button>

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

        <div className="text-center py-16 sm:py-20 text-base sm:text-lg text-gray-500">

          Loading Requests...

        </div>

      ) : requests.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 justify-items-center">

          {requests.map((request) => (

            <RequestCard
              key={request._id}
              request={request}
              refreshRequests={fetchRequests}
            />

          ))}

        </div>

      )}

      <MembersModal
        open={membersOpen}
        setOpen={setMembersOpen}
        members={members}
        refreshMembers={fetchMembers}
      />

    </div>
  );
}

export default JoinRequests;