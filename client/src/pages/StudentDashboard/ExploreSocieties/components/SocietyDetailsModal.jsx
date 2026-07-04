import { useEffect, useState } from "react";
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

import {
  getSocietyDetails,
} from "../../../../services/studentServices";

function SocietyDetailsModal({
  open,
  setOpen,
  societyData,
  
}) {
  


  

const [joinOpen, setJoinOpen] = useState(false);

const handleJoinSuccess = () => {
  setJoinOpen(false);
  setOpen(false);
};

  if (!open) return null;

  const society = societyData?.society;
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">

      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-20">

          <h2 className="text-3xl font-bold">
            Society Details
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <X />
          </button>

        </div>

       

          <div className="p-8 space-y-8">

            {/* Logo */}

            <div className="flex flex-col items-center">

              <img
                src={
                  society?.logo
                    ? society.logo
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        society?.societyName
                      )}`
                }
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-100"
              />

              <h1 className="text-4xl font-bold mt-5">
                {society?.societyName}
              </h1>

              <span className="mt-3 bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

                {society?.societyType}

              </span>
              
            <h1 className="text-4xl font-bold mt-5">
            {society?.societyName}
            </h1>

           <span className="mt-3 bg-blue-100 ...">
             {society?.societyType}
           </span>

            </div>

            {/* Basic Info */}

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">

                  <User className="text-blue-600" />

                  <h3 className="font-bold text-xl">
                    Faculty Coordinator
                  </h3>

                </div>

                <p>
                  {society?.facultyCoordinator ||
                    "N/A"}
                </p>

              </div>

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">

                  <Mail className="text-blue-600" />

                  <h3 className="font-bold text-xl">
                    Email
                  </h3>

                </div>

                <p>
                  {society?.email}
                </p>

              </div>

            </div>

            {/* About */}

            <div className="bg-white border rounded-2xl p-6">

              <div className="flex gap-3 items-center mb-3">

                <Building2 className="text-blue-600" />

                <h2 className="text-2xl font-bold">

                  About Society

                </h2>

              </div>

              <p className="mt-3 text-gray-600 leading-7 break-words whitespace-pre-wrap overflow-hidden">

                {society?.description ||
                  "No description available."}

              </p>

            </div>

            {/* Vision */}

            <div className="bg-white border rounded-2xl p-6">

              <div className="flex gap-3 items-center mb-3">

                <Eye className="text-blue-600" />

                <h2 className="text-2xl font-bold">

                  Vision

                </h2>

              </div>

              <p className="mt-3 text-gray-600 leading-7 break-words whitespace-pre-wrap overflow-hidden">

                {society?.vision ||
                  "Not Available"}

              </p>

            </div>

            {/* Mission */}

            <div className="bg-white border rounded-2xl p-6">

              <div className="flex gap-3 items-center mb-3">

                <Target className="text-blue-600" />

                <h2 className="text-2xl font-bold">

                  Mission

                </h2>

              </div>

                <p className="mt-3 text-gray-600 leading-7 break-words whitespace-pre-wrap overflow-hidden">

                {society?.mission ||
                  "Not Available"}

              </p>

            </div>

            {/* Secretaries */}

            <div className="bg-white border rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <Users className="text-blue-600" />

                <h2 className="text-2xl font-bold">

                  Secretaries

                </h2>

              </div>

              {society?.secretaries?.length ? (

                <div className="flex flex-wrap gap-3">

                  {society.secretaries.map(
                    (item, index) => (

                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                      >
                        {item.name}
                      </span>

                    )
                  )}

                </div>

              ) : (

                <p>No Secretaries Added</p>

              )}

            </div>

            {/* Joint Secretaries */}

            <div className="bg-white border rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <Users className="text-green-600" />

                <h2 className="text-2xl font-bold">

                  Joint Secretaries

                </h2>

              </div>

              {society?.jointSecretaries?.length ? (

                <div className="flex flex-wrap gap-3">

                  {society.jointSecretaries.map(
                    (item, index) => (

                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
                      >
                        {item.name}
                      </span>

                    )
                  )}

                </div>

              ) : (

                <p>
                  No Joint Secretaries Added
                </p>

              )}

            </div>
                        {/* Achievements */}

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                🏆 Achievements
              </h2>

              {society?.achievements?.length ? (

                <div className="space-y-4">

                  {society.achievements.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="border rounded-xl p-4"
                      >

                        <h3 className="font-semibold text-lg">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 mt-2">
                          {item.description}
                        </p>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p>No Achievements Added</p>

              )}

            </div>

            {/* Contacts */}

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                📞 Contacts
              </h2>

              {society?.contacts?.length ? (

                <div className="grid md:grid-cols-2 gap-5">

                  {society.contacts.map(
                    (contact, index) => (

                      <div
                        key={index}
                        className="border rounded-xl p-4"
                      >

                        <h3 className="font-bold">
                          {contact.name}
                        </h3>

                        <p className="text-gray-500">
                          {contact.position}
                        </p>

                        <p className="mt-2">
                          {contact.phone}
                        </p>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p>No Contacts Added</p>

              )}

            </div>

            {/* Social Links */}

            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                🌐 Social Links
              </h2>

              <div className="space-y-3">

                {society?.socialLinks?.instagram && (

                  <a
                    href={society.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-blue-600 hover:underline"
                  >
                    Instagram
                  </a>

                )}

                {society?.socialLinks?.linkedin && (

                  <a
                    href={society.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>

                )}

                {society?.socialLinks?.website && (

                  <a
                    href={society.socialLinks.website}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-blue-600 hover:underline"
                  >
                    Website
                  </a>

                )}

                {!society?.socialLinks?.instagram &&
                  !society?.socialLinks?.linkedin &&
                  !society?.socialLinks?.website && (
                    <p>
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
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold cursor-not-allowed"
        >
          Joined as Volunteer
        </button>

      ) : societyData?.requestStatus === "Pending" ? (

        <button
          disabled
          className="w-full bg-yellow-500 text-white py-4 rounded-2xl font-semibold cursor-not-allowed"
        >
          Request Pending
        </button>

      ) : (

        <button
          onClick={() => setJoinOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition"
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