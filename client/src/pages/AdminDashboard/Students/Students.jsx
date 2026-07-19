import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllStudents } from "../../../services/adminServices";

import SearchBar from "./components/SearchBar";
import StudentCard from "./components/StudentCard";
import EmptyState from "./components/EmptyState";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response =
        await getAllStudents(search);

      setStudents(response.students || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load students"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  return (
    <div className="bg-slate-100 min-h-screen">

      {/* Heading */}

      <div className="mb-6 sm:mb-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          Students
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          View all registered students.
        </p>

      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {loading ? (

        <div className="flex justify-center items-center h-60 text-base sm:text-lg text-gray-500">
          Loading...
        </div>

      ) : students.length === 0 ? (

        <EmptyState />

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 mt-8">

          {students.map((student) => (

            <StudentCard
              key={student._id}
              student={student}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default Students;