import { X } from "lucide-react";

function SocietyDetailsModal({
  open,
  setOpen,
  society,
}) {
  if (!open || !society) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-4">

      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">

        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-5 sm:p-8 border-b">

          <div className="flex justify-center sm:justify-start">

            <img
              src={
                society.logo
                  ? society.logo
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      society.societyName
                    )}&background=f8fafc&color=111827`
              }
              alt={society.societyName}
              className="
                w-20
                h-20
                sm:w-24
                sm:h-24
                rounded-2xl
                object-cover
                border-2
                border-slate-300
                p-1
                bg-white
                shadow-sm
              "
            />

          </div>

          <div className="flex-1">

            <div className="flex justify-between items-start gap-4">

              <div className="min-w-0">

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 break-words">
                  {society.societyName}
                </h2>

                <p className="text-slate-700 font-semibold mt-2 break-words">
                  {society.societyType || "Society"}
                </p>

              </div>

              <div className="flex items-center gap-2 shrink-0">

                <span
                  className="
                    px-3
                    sm:px-4
                    py-2
                    rounded-full
                    text-xs
                    sm:text-sm
                    font-semibold
                    bg-slate-100
                    text-slate-700
                  "
                >
                  {society.isDisabled
                    ? "Disabled"
                    : "Active"}
                </span>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <X size={22} />
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="p-5 sm:p-8 space-y-6">

          {/* Stats */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="bg-blue-50 rounded-2xl p-5 text-center">

              <p className="text-sm text-gray-500">
                Total Members
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {society.totalMembers || 0}
              </h2>

            </div>

            <div className="bg-purple-50 rounded-2xl p-5 text-center">

              <p className="text-sm text-gray-500">
                Created On
              </p>

              <h2 className="font-bold text-slate-700 mt-2 text-sm sm:text-base">
                {new Date(
                  society.createdAt
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h2>

            </div>

          </div>

          {/* Basic Information */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>

              <h3 className="text-sm text-gray-500 mb-2">
                Faculty Coordinator
              </h3>

              <p className="font-semibold break-words">
                {society.facultyCoordinator || "Not Added"}
              </p>

            </div>

            <div>

              <h3 className="text-sm text-gray-500 mb-2">
                Society Type
              </h3>

              <p className="font-semibold break-words">
                {society.societyType || "Not Added"}
              </p>

            </div>

            <div className="md:col-span-2">

              <h3 className="text-sm text-gray-500 mb-2">
                Email
              </h3>

              <p className="font-semibold break-all">
                {society.email}
              </p>

            </div>

          </div>
                    {/* About Society */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              About Society
            </h2>

            <p className="text-gray-600 leading-7 whitespace-pre-wrap break-words">
              {society.description ||
                "No description available."}
            </p>

          </div>

          {/* Vision */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Vision
            </h2>

            <p className="text-gray-600 leading-7 whitespace-pre-wrap break-words">
              {society.vision ||
                "No vision available."}
            </p>

          </div>

          {/* Mission */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Mission
            </h2>

            <p className="text-gray-600 leading-7 whitespace-pre-wrap break-words">
              {society.mission ||
                "No mission available."}
            </p>

          </div>

          {/* Secretaries */}

          <div className="bg-white border rounded-2xl p-5 sm:p-6">

            <h2 className="text-xl sm:text-2xl font-bold mb-5">
              Secretaries
            </h2>

            {society.secretaries?.length ? (

              <div className="space-y-3">

                {society.secretaries.map((sec, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-slate-50"
                  >
                    <p className="font-medium break-words">
                      {sec.name}
                    </p>
                  </div>

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

            <h2 className="text-xl sm:text-2xl font-bold mb-5">
              Joint Secretaries
            </h2>

            {society.jointSecretaries?.length ? (

              <div className="space-y-3">

                {society.jointSecretaries.map((sec, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-slate-50"
                  >
                    <p className="font-medium break-words">
                      {sec.name}
                    </p>
                  </div>

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
              Achievements
            </h2>

            {society.achievements?.length ? (

              <div className="space-y-4">

                {society.achievements.map((item, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-slate-50"
                  >

                    <h3 className="font-semibold text-base sm:text-lg break-words">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mt-2 break-words whitespace-pre-wrap">
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
              Contacts
            </h2>

            {society.contacts?.length ? (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {society.contacts.map((contact, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5"
                  >

                    <h3 className="font-bold break-words">
                      {contact.name}
                    </h3>

                    <p className="text-gray-500 mt-1 break-words">
                      {contact.position}
                    </p>

                    <p className="mt-3 font-medium break-all">
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
              Social Links
            </h2>

            <div className="space-y-3">

              {society.socialLinks?.instagram && (

                <a
                  href={society.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-600 hover:underline break-all"
                >
                  Instagram
                </a>

              )}

              {society.socialLinks?.linkedin && (

                <a
                  href={society.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-600 hover:underline break-all"
                >
                  LinkedIn
                </a>

              )}

              {society.socialLinks?.website && (

                <a
                  href={society.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-600 hover:underline break-all"
                >
                  Website
                </a>

              )}

              {!society.socialLinks?.instagram &&
                !society.socialLinks?.linkedin &&
                !society.socialLinks?.website && (

                  <p className="text-gray-500">
                    No Social Links Added
                  </p>

                )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SocietyDetailsModal;