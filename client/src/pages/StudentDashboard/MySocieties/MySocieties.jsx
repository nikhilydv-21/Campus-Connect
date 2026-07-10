import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TriangleAlert } from "lucide-react";

import {
    getMySocieties,
    getSocietyDetails,
    leaveSociety,
} from "../../../services/studentServices";

import SocietyCard from "./components/SocietyCard";
import EmptyState from "./components/EmptyState";
import SocietyDetailsModal from "../ExploreSocieties/components/SocietyDetailsModal";

function MySocieties() {

    const [societies, setSocieties] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedSociety, setSelectedSociety] =
        useState(null);

    const [openModal, setOpenModal] =
        useState(false);

    const [leaveModal, setLeaveModal] =
        useState(false);

    const [selectedSocietyId, setSelectedSocietyId] =
        useState(null);

    const fetchSocieties = async () => {

        try {

            setLoading(true);

            const response =
                await getMySocieties();

            setSocieties(response.societies);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load societies"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchSocieties();

    }, []);

    const handleView = async (society) => {

        try {

            const response =
                await getSocietyDetails(
                    society._id
                );

            setSelectedSociety(response);

            setOpenModal(true);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load society details"
            );

        }

    };

    const handleLeave = (societyId) => {

        setSelectedSocietyId(societyId);

        setLeaveModal(true);

    };

    const confirmLeave = async () => {

        try {

            const response =
                await leaveSociety(
                    selectedSocietyId
                );

            toast.success(response.message);

            setSocieties((prev) =>
                prev.filter(
                    (society) =>
                        society._id !==
                        selectedSocietyId
                )
            );

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to leave society"
            );

        } finally {

            setLeaveModal(false);

            setSelectedSocietyId(null);

        }

    };

    return (

        <div className="bg-slate-100 min-h-screen p-8">

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-slate-800">

                    My Societies

                </h1>

                <p className="text-gray-500 mt-2">

                    Societies where you are an active volunteer.

                </p>

            </div>

            {/* Loading */}

            {loading ? (

                <div className="flex justify-center py-24">

                    <div className="text-lg text-gray-500">

                        Loading...

                    </div>

                </div>

            ) : societies.length === 0 ? (

                <EmptyState />

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">

                    {societies.map((society) => (

                        <SocietyCard
                            key={society._id}
                            society={society}
                            onView={handleView}
                            onLeave={handleLeave}
                        />

                    ))}

                </div>

            )}

            <SocietyDetailsModal
                open={openModal}
                setOpen={setOpenModal}
                societyData={selectedSociety}
            />
                        {/* Leave Society Modal */}

            {leaveModal && (

                <div
                    onClick={() => setLeaveModal(false)}
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        flex
                        justify-center
                        items-center
                        z-50
                        p-5
                    "
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="
                            bg-white
                            rounded-3xl
                            w-full
                            max-w-md
                            p-8
                            shadow-2xl
                        "
                    >

                        {/* Icon */}

                        <div className="flex justify-center">

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-full
                                    bg-red-100
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <TriangleAlert
                                    size={32}
                                    className="text-red-600"
                                />

                            </div>

                        </div>

                        {/* Heading */}

                        <h2
                            className="
                                mt-6
                                text-2xl
                                font-bold
                                text-center
                                text-slate-800
                            "
                        >

                            Leave Society?

                        </h2>

                        <p
                            className="
                                mt-3
                                text-center
                                text-gray-500
                                leading-7
                            "
                        >

                            Are you sure you want to leave this
                            society?

                            

                        </p>

                        {/* Buttons */}

                        <div className="flex gap-3 mt-8">

                            <button
                                onClick={() =>
                                    setLeaveModal(false)
                                }
                                className="
                                    flex-1
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-300
                                    hover:bg-slate-100
                                    transition
                                    font-semibold
                                "
                            >

                                Cancel

                            </button>

                            <button
                                onClick={confirmLeave}
                                className="
                                    flex-1
                                    py-3
                                    rounded-xl
                                    bg-red-600
                                    hover:bg-red-700
                                    text-white
                                    transition
                                    font-semibold
                                "
                            >

                                Leave Society

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default MySocieties;