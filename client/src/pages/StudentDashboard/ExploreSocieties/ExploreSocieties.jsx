import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getAllSocieties,
    getSocietyDetails,
} from "../../../services/studentServices";

import SearchBar from "./components/SearchBar";
import SocietyCard from "./components/SocietyCard";
import EmptyState from "./components/EmptyState";
import SocietyDetailsModal from "./components/SocietyDetailsModal";

function ExploreSocieties() {
    const [societies, setSocieties] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("");

    const [selectedSociety, setSelectedSociety] =
        useState(null);

    const [openModal, setOpenModal] =
        useState(false);

    const fetchSocieties = async () => {
        try {
            setLoading(true);

            const response = await getAllSocieties(
                search,
                type
            );

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
    }, [search, type]);

    // Fetch details first, then open modal
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

    return (
        <div className="bg-slate-100 min-h-screen p-8">

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-slate-800">
                    Explore Societies
                </h1>

                <p className="text-gray-500 mt-2">
                    Discover and join student societies.
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
                    Loading...
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
                        />

                    ))}

                </div>

            )}

            {/* Details Modal */}

            <SocietyDetailsModal
                open={openModal}
                setOpen={setOpenModal}
                societyData={selectedSociety}
            />

        </div>
    );
}

export default ExploreSocieties;