import { X } from "lucide-react";

function SocietyDetailsModal({
  open,
  setOpen,
  society,
}) {
  if (!open || !society) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}

        <div className="flex items-center gap-5 p-8 border-b">

          <img
            src={
              society.logo
                ? society.logo
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    society.societyName
                  )}&background=2563eb&color=fff`
            }
            alt={society.societyName}
            className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-100"
          />

          <div className="flex-1">

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-3xl font-bold text-slate-800">
                  {society.societyName}
                </h2>

                <p className="text-blue-600 font-semibold mt-2">
                  {society.societyType || "Society"}
                </p>

              </div>

              <div className="flex items-center gap-3">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    society.isDisabled
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
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

        <div className="p-8 space-y-6">

          {/* Stats */}

          <div className="grid grid-cols-2 gap-5">

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

              <h2 className="font-bold text-slate-700 mt-2">
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

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <h3 className="text-sm text-gray-500 mb-2">
                Faculty Coordinator
              </h3>

              <p className="font-semibold">
                {society.facultyCoordinator || "Not Added"}
              </p>

            </div>

            <div>

              <h3 className="text-sm text-gray-500 mb-2">
                Society Type
              </h3>

              <p className="font-semibold">
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

          {/* Description */}

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              About Society
            </h2>

            <p className="text-gray-600 leading-7 whitespace-pre-wrap">
              {society.description ||
                "No description available."}
            </p>

          </div>

          {/* Vision */}

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Vision
            </h2>

            <p className="text-gray-600 leading-7 whitespace-pre-wrap">
              {society.vision ||
                "No vision available."}
            </p>

          </div>

          {/* Mission */}

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Mission
            </h2>

            <p className="text-gray-600 leading-7 whitespace-pre-wrap">
              {society.mission ||
                "No mission available."}
            </p>

          </div>
                    {/* Secretaries */}

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Secretaries
            </h2>

            {society.secretaries?.length ? (

              <div className="flex flex-wrap gap-3">

                {society.secretaries.map((sec, index) => (

                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                  >
                    {sec.name}
                  </span>

                ))}

              </div>

            ) : (

              <p className="text-gray-500">
                No Secretaries Added
              </p>

            )}

          </div>

          {/* Joint Secretaries */}

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Joint Secretaries
            </h2>

            {society.jointSecretaries?.length ? (

              <div className="flex flex-wrap gap-3">

                {society.jointSecretaries.map((sec, index) => (

                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
                  >
                    {sec.name}
                  </span>

                ))}

              </div>

            ) : (

              <p className="text-gray-500">
                No Joint Secretaries Added
              </p>

            )}

          </div>

          {/* Achievements */}

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Achievements
            </h2>

            {society.achievements?.length ? (

              <div className="space-y-4">

                {society.achievements.map((item, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-slate-50"
                  >

                    <h3 className="font-semibold text-lg">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mt-2">
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

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Contacts
            </h2>

            {society.contacts?.length ? (

              <div className="grid md:grid-cols-2 gap-5">

                {society.contacts.map((contact, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5"
                  >

                    <h3 className="font-bold">
                      {contact.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {contact.position}
                    </p>

                    <p className="mt-3 font-medium">
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

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Social Links
            </h2>

            <div className="space-y-3">

              {society.socialLinks?.instagram && (

                <a
                  href={society.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  Instagram
                </a>

              )}

              {society.socialLinks?.linkedin && (

                <a
                  href={society.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  LinkedIn
                </a>

              )}

              {society.socialLinks?.website && (

                <a
                  href={society.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-blue-600 hover:underline"
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