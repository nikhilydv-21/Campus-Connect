import {
    Award,
    Loader2,
} from "lucide-react";

function GenerateCertificateModal({
    open,
    setOpen,
    onConfirm,
    loading,
}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-5">

            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">

                {/* Icon */}

                <div className="flex justify-center">

                    <div className="h-20 w-20 rounded-full bg-amber-100 flex justify-center items-center">

                        <Award
                            size={38}
                            className="text-amber-600"
                        />

                    </div>

                </div>

                {/* Heading */}

                <h2 className="text-2xl font-bold text-center text-slate-800 mt-6">

                    Generate Certificates?

                </h2>

                {/* Premium Badge */}

                <div className="flex justify-center mt-4">

                    <span
                        className="
                            px-4
                            py-1.5
                            rounded-full
                            bg-amber-50
                            border
                            border-amber-200
                            text-amber-700
                            text-xs
                            font-semibold
                        "
                    >

                        This action cannot be undone

                    </span>

                </div>

                {/* Description */}

                <p className="text-center text-gray-600 leading-7 mt-6">

                    You're about to generate participation certificates
                    for all attended students.
                </p>

                {/* Buttons */}

                <div className="flex gap-4 mt-10">

                    <button
                        disabled={loading}
                        onClick={() => setOpen(false)}
                        className="
                            flex-1
                            border
                            border-slate-300
                            rounded-xl
                            py-3
                            font-semibold
                            text-slate-700
                            hover:bg-slate-100
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        Cancel

                    </button>

                    <button
                        disabled={loading}
                        onClick={onConfirm}
                        className="
                            flex-1
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:bg-blue-400
                            text-white
                            rounded-xl
                            py-3
                            font-semibold
                            transition
                            flex
                            justify-center
                            items-center
                            gap-2
                            disabled:cursor-not-allowed
                        "
                    >

                        {loading ? (
                            <>
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Award size={18} />
                                Generate
                            </>
                        )}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default GenerateCertificateModal;