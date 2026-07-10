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
      <div className="bg-white rounded-3xl shadow-sm p-16 text-center text-gray-500">
        Loading Participants...
      </div>
    );

  }

  if (!participants.length) {

    return (
      <div className="bg-white rounded-3xl shadow-sm p-16 text-center">

        <h2 className="text-xl font-semibold text-slate-700">

          No Participants Found

        </h2>

        <p className="text-gray-500 mt-2">

          No matching records found.

        </p>

      </div>
    );

  }

  return (

    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

      <div className="px-6 py-5 border-b bg-white">

        <h2 className="text-xl font-bold text-slate-800">

          Registered Students

        </h2>

        

      </div>

      <div className="overflow-x-auto max-h-[65vh]">

        <table className="w-full">

          <thead className="sticky top-0 bg-slate-100 z-10">

            <tr className="text-sm text-slate-700">

              <th className="px-5 py-4 text-center">

                #

              </th>

              <th className="px-5 py-4 text-left">

                Name

              </th>

              <th className="px-5 py-4 text-left">

                Roll No

              </th>

              <th className="px-5 py-4 text-left">

                Branch

              </th>

              <th className="px-5 py-4 text-left">

                Year

              </th>

              <th className="px-5 py-4 text-left">

                Email

              </th>

              <th className="px-5 py-4 text-center">

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