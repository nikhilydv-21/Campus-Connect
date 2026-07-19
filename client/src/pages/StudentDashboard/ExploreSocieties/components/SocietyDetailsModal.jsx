import { useState } from "react";
import toast from "react-hot-toast";
import JoinSocietyModal from "./JoinSocietyModal";
import {
  Building2,
  Mail,
  User,
  Users,
  Eye,
  Target,
  X,
} from "lucide-react";

function SocietyDetailsModal({
  open,
  setOpen,
  societyData,
}) {
  const [joinOpen, setJoinOpen] =
    useState(false);

  const handleJoinSuccess = () => {
    setJoinOpen(false);
    setOpen(false);
  };

  if (!open) return null;

  const society = societyData?.society;

  return (
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
        px-4
        py-4
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-5xl
          max-h-[95vh]
          overflow-y-auto
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
            sticky
            top-0
            bg-white
            border-b
            px-5
            py-4
            sm:px-6
            sm:py-5
            flex
            justify-between
            items-center
            z-20
          "
        >
          <h2 className="text-2xl sm:text-3xl font-bold">
            Society Details
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="
              h-10
              w-10
              rounded-full
              hover:bg-gray-100
              flex
              items-center
              justify-center
              transition
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="p-5 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">

          {/* Logo */}

          <div className="flex flex-col items-center text-center">

            <img
              src={
                society?.logo
                  ? society.logo
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      society?.societyName
                    )}`
              }
              alt={society?.societyName}
              className="
                w-28
                h-28
                sm:w-36
                sm:h-36
                rounded-full
                object-cover
                border-4
                border-blue-100
              "
            />

            <h1
              className="
                mt-5
                text-3xl
                sm:text-4xl
                font-bold
                break-words
              "
            >
              {society?.societyName}
            </h1>

            <span
              className="
                mt-3
                text-sm
                sm:text-base
                text-slate-700
                font-medium
                break-words
              "
            >
              {society?.societyType}
            </span>

          </div>

          {/* Basic Info */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

            <div className="bg-slate-50 rounded-2xl p-5">

              <div className="flex items-center gap-3 mb-3">

                <User
                  className="text-blue-600 shrink-0"
                  size={22}
                />

                <h3 className="text-lg sm:text-xl font-bold">
                  Faculty Coordinator
                </h3>

              </div>

              <p className="break-words text-slate-700">
                {society?.facultyCoordinator || "N/A"}
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5">

              <div className="flex items-center gap-3 mb-3">

                <Mail
                  className="text-blue-600 shrink-0"
                  size={22}
                />

                <h3 className="text-lg sm:text-xl font-bold">
                  Email
                </h3>

              </div>

              <p className="break-words text-slate-700">
                {society?.email}
              </p>

            </div>

          </div>
                    {/* About */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <div className="flex items-center gap-3 mb-3">

              <Building2
                className="text-blue-600 shrink-0"
                size={22}
              />

              <h2 className="text-xl sm:text-2xl font-bold">
                About Society
              </h2>

            </div>

            <p
              className="
                mt-3
                text-sm
                sm:text-base
                text-gray-600
                leading-7
                break-words
                whitespace-pre-wrap
              "
            >
              {society?.description ||
                "No description available."}
            </p>

          </div>

          {/* Vision */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <div className="flex items-center gap-3 mb-3">

              <Eye
                className="text-blue-600 shrink-0"
                size={22}
              />

              <h2 className="text-xl sm:text-2xl font-bold">
                Vision
              </h2>

            </div>

            <p
              className="
                mt-3
                text-sm
                sm:text-base
                text-gray-600
                leading-7
                break-words
                whitespace-pre-wrap
              "
            >
              {society?.vision ||
                "Not Available"}
            </p>

          </div>

          {/* Mission */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <div className="flex items-center gap-3 mb-3">

              <Target
                className="text-blue-600 shrink-0"
                size={22}
              />

              <h2 className="text-xl sm:text-2xl font-bold">
                Mission
              </h2>

            </div>

            <p
              className="
                mt-3
                text-sm
                sm:text-base
                text-gray-600
                leading-7
                break-words
                whitespace-pre-wrap
              "
            >
              {society?.mission ||
                "Not Available"}
            </p>

          </div>

          {/* Secretaries */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <div className="flex items-center gap-3 mb-5">

              <Users
                className="text-blue-600 shrink-0"
                size={22}
              />

              <h2 className="text-xl sm:text-2xl font-bold">
                Secretaries
              </h2>

            </div>

            {society?.secretaries?.length ? (

              <div className="space-y-3">

                {society.secretaries.map((item, index) => (

                  <p
                    key={index}
                    className="
                      text-slate-700
                      text-sm
                      sm:text-base
                      break-words
                    "
                  >
                    {item.name}
                  </p>

                ))}

              </div>

            ) : (

              <p className="text-gray-500">
                No Secretaries Added
              </p>

            )}

          </div>

          {/* Joint Secretaries */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <div className="flex items-center gap-3 mb-5">

              <Users
                className="text-green-600 shrink-0"
                size={22}
              />

              <h2 className="text-xl sm:text-2xl font-bold">
                Joint Secretaries
              </h2>

            </div>

            {society?.jointSecretaries?.length ? (

              <div className="space-y-3">

                {society.jointSecretaries.map((item, index) => (

                  <p
                    key={index}
                    className="
                      text-slate-700
                      text-sm
                      sm:text-base
                      break-words
                    "
                  >
                    {item.name}
                  </p>

                ))}

              </div>

            ) : (

              <p className="text-gray-500">
                No Joint Secretaries Added
              </p>

            )}

          </div>
                    {/* Achievements */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-bold mb-5">
              🏆 Achievements
            </h2>

            {society?.achievements?.length ? (

              <div className="space-y-4">

                {society.achievements.map((item, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-4"
                  >

                    <h3 className="text-lg font-semibold break-words">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm sm:text-base text-gray-600 leading-7 break-words whitespace-pre-wrap">
                      {item.description}
                    </p>

                  </div>

                ))}

              </div>

            ) : (

              <p className="text-gray-500">
                No Achievements Added
              </p>

            )}

          </div>

          {/* Contacts */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-bold mb-5">
              📞 Contacts
            </h2>

            {society?.contacts?.length ? (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {society.contacts.map((contact, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-4"
                  >

                    <h3 className="font-bold break-words">
                      {contact.name}
                    </h3>

                    <p className="text-gray-500 break-words">
                      {contact.position}
                    </p>

                    <p className="mt-2 break-words">
                      {contact.phone}
                    </p>

                  </div>

                ))}

              </div>

            ) : (

              <p className="text-gray-500">
                No Contacts Added
              </p>

            )}

          </div>

          {/* Social Links */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-bold mb-5">
              🌐 Social Links
            </h2>

            <div className="space-y-3">

              {society?.socialLinks?.instagram && (

                <a
                  href={society.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-600 hover:underline break-all"
                >
                  Instagram
                </a>

              )}

              {society?.socialLinks?.linkedin && (

                <a
                  href={society.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-600 hover:underline break-all"
                >
                  LinkedIn
                </a>

              )}

              {society?.socialLinks?.website && (

                <a
                  href={society.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-600 hover:underline break-all"
                >
                  Website
                </a>

              )}

              {!society?.socialLinks?.instagram &&
                !society?.socialLinks?.linkedin &&
                !society?.socialLinks?.website && (

                  <p className="text-gray-500">
                    No Social Links Added
                  </p>

                )}

            </div>

          </div>

          {/* Join Button */}

          <div className="pt-4">

            {societyData?.isJoined ? (

              <button
                disabled
                className="
                  w-full
                  bg-gray-500
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  cursor-not-allowed
                "
              >
                Joined as Volunteer
              </button>

            ) : societyData?.requestStatus === "Pending" ? (

              <button
                disabled
                className="
                  w-full
                  border
                  border-slate-400
                  bg-slate-100
                  text-slate-700
                  py-4
                  rounded-2xl
                  font-semibold
                  cursor-not-allowed
                "
              >
                Request Pending
              </button>

            ) : (

              <button
                onClick={() => setJoinOpen(true)}
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  transition
                "
              >
                Join Society
              </button>

            )}

          </div>

          <JoinSocietyModal
            open={joinOpen}
            setOpen={setJoinOpen}
            societyId={society?._id}
            onSuccess={handleJoinSuccess}
          />

        </div>

      </div>

    </div>

  );

}

export default SocietyDetailsModal;