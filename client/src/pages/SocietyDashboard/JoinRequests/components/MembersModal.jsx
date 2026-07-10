import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  X,
  Search,
  Trash2,
  Hash,
  GraduationCap,
  Mail,
  Megaphone,
} from "lucide-react";

import {
  removeMember,
} from "../../../../services/joinRequestServices";

import AnnouncementModal from "./AnnouncementModal";

function MembersModal({
  open,
  setOpen,
  members,
  refreshMembers,
}) {
  const [search, setSearch] = useState("");

  const [filteredMembers, setFilteredMembers] =
    useState([]);

  const [selectedMember, setSelectedMember] =
    useState(null);

  const [announcementOpen, setAnnouncementOpen] =
    useState(false);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFilteredMembers(
      members.filter((item) => {
        const student = item.student;

        return (
          student?.fullName
            ?.toLowerCase()
            .includes(keyword) ||
          student?.rollNumber
            ?.toLowerCase()
            .includes(keyword) ||
          student?.branch
            ?.toLowerCase()
            .includes(keyword)
        );
      })
    );
  }, [search, members]);

  if (!open) return null;

  const handleRemove = async () => {
    try {
      const response = await removeMember(
        selectedMember._id
      );

      toast.success(response.message);

      setSelectedMember(null);

      refreshMembers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove member"
      );
    }
  };

  return (
    <>
      <div
        className="
          fixed
          inset-0
          bg-black/60
          backdrop-blur-sm
          flex
          justify-center
          items-center
          z-50
          p-5
        "
      >
        <div
          className="
            bg-white
            rounded-3xl
            w-full
            max-w-5xl
            max-h-[90vh]
            overflow-hidden
            flex
            flex-col
          "
        >
          {/* Header */}

          <div className="border-b px-8 py-6">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-3xl font-bold text-slate-800">
                  Society Members
                </h2>

                <p className="text-gray-500 mt-1">
                  Total Members : {members.length}
                </p>

              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    setAnnouncementOpen(true)
                  }
                  className="
                    border
                    border-slate-300
                    hover:bg-slate-100
                    rounded-xl
                    px-4
                    py-2.5
                    flex
                    items-center
                    gap-2
                    transition
                  "
                >
                  <Megaphone size={18} />
                  Send Announcement
                </button>

                <button
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    p-2
                    rounded-xl
                    hover:bg-slate-100
                  "
                >
                  <X size={24} />
                </button>

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="border-b p-6">

            <div className="relative">

              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-3.5
                  text-gray-400
                "
              />

              <input
                type="text"
                placeholder="Search Members..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  w-full
                  border
                  rounded-xl
                  pl-11
                  pr-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-slate-300
                "
              />

            </div>

          </div>

          {/* Members List */}

          <div className="flex-1 overflow-y-auto p-6">
                        {filteredMembers.length === 0 ? (

              <div className="text-center py-20 text-gray-500">

                No Members Found

              </div>

            ) : (

              <div className="space-y-4">

                {filteredMembers.map((member) => {

                  const student = member.student;

                  return (

                    <div
                      key={member._id}
                      className="
                        border
                        rounded-2xl
                        px-5
                        py-4
                        flex
                        justify-between
                        items-center
                        hover:shadow-md
                        transition
                      "
                    >

                      {/* Left */}

                      <div className="flex-1">

                        <h3 className="text-lg font-bold text-slate-800">

                          {student.fullName}

                        </h3>

                        <div
                          className="
                            mt-3
                            flex
                            flex-wrap
                            gap-x-8
                            gap-y-2
                            text-sm
                            text-slate-600
                          "
                        >

                          <div className="flex items-center gap-2">

                            <Hash size={16} />

                            <span>

                              {student.rollNumber}

                            </span>

                          </div>

                          <div className="flex items-center gap-2">

                            <GraduationCap size={16} />

                            <span>

                              {student.branch?.toUpperCase()} • Year {student.year}

                            </span>

                          </div>

                          <div className="flex items-center gap-2">

                            <Mail size={16} />

                            <span>

                              {student.email}

                            </span>

                          </div>

                        </div>

                      </div>

                      {/* Delete */}

                      <button
                        onClick={() =>
                          setSelectedMember(member)
                        }
                        className="
                          ml-5
                          p-3
                          rounded-xl
                          hover:bg-red-50
                          text-red-600
                          transition
                        "
                      >

                        <Trash2 size={20} />

                      </button>

                    </div>

                  );

                })}

              </div>

            )}

          </div>
                    {/* Remove Member Confirmation */}

          {selectedMember && (

            <div
              className="
                fixed
                inset-0
                bg-black/50
                backdrop-blur-sm
                flex
                justify-center
                items-center
                z-[60]
              "
            >

              <div
                className="
                  bg-white
                  rounded-3xl
                  w-full
                  max-w-md
                  p-8
                  shadow-2xl
                "
              >

                <h2 className="text-2xl font-bold text-slate-800">

                  Remove Member

                </h2>

                <p className="mt-4 text-gray-600 leading-7">

                  Are you sure you want to remove

                  <span className="font-semibold">

                    {" "}
                    {selectedMember.student.fullName}

                  </span>

                  {" "}from your society?

                </p>

                <div className="flex justify-end gap-3 mt-8">

                  <button
                    onClick={() =>
                      setSelectedMember(null)
                    }
                    className="
                      px-6
                      py-3
                      border
                      border-slate-300
                      rounded-xl
                      hover:bg-slate-100
                      transition
                    "
                  >

                    Cancel

                  </button>

                  <button
                    onClick={handleRemove}
                    className="
                      px-6
                      py-3
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      rounded-xl
                      transition
                    "
                  >

                    Remove

                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* Announcement Modal */}

      <AnnouncementModal
        open={announcementOpen}
        setOpen={setAnnouncementOpen}
      />

    </>

  );

}

export default MembersModal;