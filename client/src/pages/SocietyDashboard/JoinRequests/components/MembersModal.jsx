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
  const [search, setSearch] =
    useState("");

  const [
    filteredMembers,
    setFilteredMembers,
  ] = useState([]);

  const [
    selectedMember,
    setSelectedMember,
  ] = useState(null);

  const [
    announcementOpen,
    setAnnouncementOpen,
  ] = useState(false);

  useEffect(() => {
    const keyword =
      search.toLowerCase();

    setFilteredMembers(
      members.filter((item) => {
        const student =
          item.student;

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

  const handleRemove =
    async () => {
      try {
        const response =
          await removeMember(
            selectedMember._id
          );

        toast.success(
          response.message
        );

        setSelectedMember(
          null
        );

        refreshMembers();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
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
          p-4
          sm:p-5
        "
      >
        <div
          className="
            bg-white
            rounded-2xl
            sm:rounded-3xl
            w-full
            max-w-5xl
            max-h-[90vh]
            overflow-hidden
            flex
            flex-col
          "
        >

          {/* Header */}

          <div className="border-b p-5 sm:px-8 sm:py-6">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">

              <div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  Society Members
                </h2>

                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  Total Members :
                  {" "}
                  {members.length}
                </p>

              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

                <button
                  onClick={() =>
                    setAnnouncementOpen(
                      true
                    )
                  }
                  className="
                    w-full
                    sm:w-auto
                    border
                    border-slate-300
                    hover:bg-slate-100
                    rounded-xl
                    px-4
                    py-2.5
                    flex
                    justify-center
                    items-center
                    gap-2
                    transition
                  "
                >

                  <Megaphone
                    size={18}
                  />

                  Send Announcement

                </button>

                <button
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    self-end
                    sm:self-auto
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

          <div className="border-b p-5 sm:p-6">

            <div className="relative">

              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                placeholder="Search Members..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  rounded-xl
                  pl-11
                  pr-4
                  py-3
                  text-sm
                  sm:text-base
                  outline-none
                  focus:ring-2
                  focus:ring-slate-300
                "
              />

            </div>

          </div>

          {/* Members List */}

          <div className="flex-1 overflow-y-auto p-5 sm:p-6">

            {filteredMembers.length ===
            0 ? (

              <div className="text-center py-16 sm:py-20 text-sm sm:text-base text-gray-500">

                No Members Found

              </div>

            ) : (

              <div className="space-y-4">

                {filteredMembers.map(
                  (member) => {

                    const student =
                      member.student;

                    return (

                      <div
                        key={
                          member._id
                        }
                        className="
                          border
                          rounded-2xl
                          p-4
                          sm:px-5
                          sm:py-4
                          flex
                          flex-col
                          sm:flex-row
                          sm:justify-between
                          sm:items-center
                          gap-4
                          hover:shadow-md
                          transition
                        "
                      >

                        {/* Left */}

                        <div className="flex-1 min-w-0">

                          <h3 className="text-lg font-bold text-slate-800 break-words">

                            {
                              student.fullName
                            }

                          </h3>

                          <div
                            className="
                              mt-3
                              flex
                              flex-col
                              sm:flex-row
                              sm:flex-wrap
                              gap-3
                              sm:gap-x-8
                              text-sm
                              text-slate-600
                            "
                          >

                            <div className="flex items-center gap-2 min-w-0">

                              <Hash
                                size={
                                  16
                                }
                                className="shrink-0"
                              />

                              <span className="break-all">

                                {
                                  student.rollNumber
                                }

                              </span>

                            </div>

                            <div className="flex items-center gap-2 min-w-0">

                              <GraduationCap
                                size={
                                  16
                                }
                                className="shrink-0"
                              />

                              <span className="break-words">

                                {student.branch?.toUpperCase()}
                                {" • "}
                                Year{" "}
                                {
                                  student.year
                                }

                              </span>

                            </div>

                            <div className="flex items-center gap-2 min-w-0">

                              <Mail
                                size={
                                  16
                                }
                                className="shrink-0"
                              />

                              <span className="break-all">

                                {
                                  student.email
                                }

                              </span>

                            </div>

                          </div>

                        </div>

                        {/* Delete */}

                        <button
                          onClick={() =>
                            setSelectedMember(
                              member
                            )
                          }
                          className="
                            self-end
                            sm:self-auto
                            p-3
                            rounded-xl
                            hover:bg-red-50
                            text-red-600
                            transition
                          "
                        >

                          <Trash2
                            size={20}
                          />

                        </button>

                      </div>

                    );

                  }
                )}

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
                p-4
              "
            >

              <div
                className="
                  bg-white
                  w-full
                  max-w-md
                  rounded-2xl
                  sm:rounded-3xl
                  shadow-2xl
                  p-5
                  sm:p-8
                "
              >

                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">

                  Remove Member

                </h2>

                <p
                  className="
                    mt-4
                    text-sm
                    sm:text-base
                    text-gray-600
                    leading-6
                    sm:leading-7
                    break-words
                  "
                >

                  Are you sure you want to remove

                  <span className="font-semibold break-words">

                    {" "}
                    {selectedMember.student.fullName}

                  </span>

                  {" "}from your society?

                </p>

                <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3">

                  <button
                    onClick={() =>
                      setSelectedMember(null)
                    }
                    className="
                      w-full
                      sm:w-auto
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
                      w-full
                      sm:w-auto
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