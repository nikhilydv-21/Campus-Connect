import ParticipantRow from "./ParticipantRow";

function ParticipantsTable({
  loading,
  participants,
  refresh,
  eventId,
  setParticipants,
  counts,
  setCounts,
}) {

  if (loading) {

    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-10 sm:p-16 text-center text-sm sm:text-base text-gray-500">
        Loading Participants...
      </div>
    );

  }

  if (!participants.length) {

    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm p-10 sm:p-16 text-center">

        <h2 className="text-lg sm:text-xl font-semibold text-slate-700">

          No Participants Found

        </h2>

        <p className="mt-2 text-sm sm:text-base text-gray-500">

          No matching records found.

        </p>

      </div>
    );

  }

  return (

    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b bg-white">

        <h2 className="text-lg sm:text-xl font-bold text-slate-800">

          Registered Students

        </h2>

      </div>

      {/* Table */}

      <div className="overflow-x-auto max-h-[65vh]">

        <table className="min-w-[900px] w-full">

          <thead className="sticky top-0 bg-slate-100 z-10">

            <tr className="text-xs sm:text-sm text-slate-700">

              <th className="px-4 sm:px-5 py-4 text-center whitespace-nowrap">

                #

              </th>

              <th className="px-4 sm:px-5 py-4 text-left whitespace-nowrap">

                Name

              </th>

              <th className="px-4 sm:px-5 py-4 text-left whitespace-nowrap">

                Roll No

              </th>

              <th className="px-4 sm:px-5 py-4 text-left whitespace-nowrap">

                Branch

              </th>

              <th className="px-4 sm:px-5 py-4 text-left whitespace-nowrap">

                Year

              </th>

              <th className="px-4 sm:px-5 py-4 text-left whitespace-nowrap">

                Email

              </th>

              <th className="px-4 sm:px-5 py-4 text-center whitespace-nowrap">

                Attendance

              </th>

            </tr>

          </thead>

          <tbody>

            {participants.map(
              (participant, index) => (

                <ParticipantRow
                  key={participant._id}
                  index={index}
                  participant={participant}
                  participants={participants}
                  setParticipants={setParticipants}
                  counts={counts}
                  setCounts={setCounts}
                  eventId={eventId}
                  refresh={refresh}
                />

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ParticipantsTable;