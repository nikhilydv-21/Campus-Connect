import { X } from "lucide-react";

function ConfirmActionModal({
    open,
    setOpen,
    action,
    loading,
    onConfirm,
}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">

            <div className="bg-white rounded-3xl w-full max-w-md p-6">

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">

                        Confirm {action}

                    </h2>

                    <button onClick={() => setOpen(false)}>

                        <X />

                    </button>

                </div>

                <p className="mt-5 text-gray-600 leading-7">

                    Are you sure you want to

                    <span className="font-semibold">

                        {" "}{action.toLowerCase()}

                    </span>

                    {" "}this join request?

                </p>

                <div className="mt-8 flex gap-3">

                    <button
                        onClick={() => setOpen(false)}
                        className="flex-1 border rounded-xl py-3 hover:bg-slate-100"
                    >

                        Cancel

                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex-1 rounded-xl py-3 text-white ${
                            action === "Accept"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-red-600 hover:bg-red-700"
                        }`}
                    >

                        {loading ? "Please wait..." : action}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmActionModal;