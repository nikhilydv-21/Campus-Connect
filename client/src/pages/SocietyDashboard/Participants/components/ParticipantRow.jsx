import { useState } from "react";
import toast from "react-hot-toast";

import {
  markAttendance,
} from "../../../../services/eventServices";

function ParticipantRow({
  index,
  participant,
  participants,
  setParticipants,
  counts,
  setCounts,
  eventId,
}) {

  const [loading, setLoading] =
    useState(false);

  // ===============================
  // Attendance Allowed After Event Starts
  // ===============================

  let attendanceAllowed = true;

  if (participant.event?.date && participant.event?.startTime) {

    const eventStart = new Date(
      participant.event.date
    );

    const [hour, minute] =
      participant.event.startTime.split(":");

    eventStart.setHours(Number(hour));
    eventStart.setMinutes(Number(minute));
    eventStart.setSeconds(0);
    eventStart.setMilliseconds(0);

    attendanceAllowed =
      new Date() >= eventStart;

  }

  const handleAttendance = async () => {

    if (!attendanceAllowed) {

      toast.error(
        "Attendance can only be marked after the event starts."
      );

      return;

    }

    try {

      setLoading(true);

      const response =
        await markAttendance(
          eventId,
          participant._id
        );

      const updatedStatus =
        response.status;

      const updatedParticipants =
        participants.map((item) => {

          if (item._id === participant._id) {

            return {
              ...item,
              status: updatedStatus,
            };

          }

          return item;

        });

      setParticipants(
        updatedParticipants
      );

      const attended =
        updatedParticipants.filter(
          (item) =>
            item.status === "Attended"
        ).length;

      const registered =
        updatedParticipants.length;

      setCounts({
        registered,
        attended,
        absent:
          registered - attended,
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to update attendance"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <tr
      className="
        border-t
        even:bg-slate-50
        hover:bg-blue-50
        transition
      "
    >

      {/* S.No */}

      <td className="px-4 sm:px-5 py-4 text-center font-medium text-slate-600 whitespace-nowrap">

        {index + 1}

      </td>

      {/* Name */}

      <td className="px-4 sm:px-5 py-4 font-medium text-slate-800 break-words">

        {participant.student?.fullName}

      </td>

      {/* Roll */}

      <td className="px-4 sm:px-5 py-4 text-slate-600 whitespace-nowrap">

        {participant.student?.rollNumber}

      </td>

      {/* Branch */}

      <td className="px-4 sm:px-5 py-4 text-slate-600 whitespace-nowrap">

        {participant.student?.branch}

      </td>

      {/* Year */}

      <td className="px-4 sm:px-5 py-4 text-slate-600 whitespace-nowrap">

        {participant.student?.year}

      </td>

      {/* Email */}

      <td className="px-4 sm:px-5 py-4 text-slate-600 break-all">

        {participant.student?.email}

      </td>

      {/* Attendance */}

      <td className="px-4 sm:px-5 py-4 text-center">

        <input
          type="checkbox"
          checked={
            participant.status ===
            "Attended"
          }
          disabled={
            loading ||
            !attendanceAllowed
          }
          onChange={handleAttendance}
          className="
            h-5
            w-5
            accent-green-600
            cursor-pointer
            disabled:cursor-not-allowed
            disabled:opacity-50
            transition
          "
        />

        {!attendanceAllowed && (

          <p className="mt-1 text-[10px] sm:text-[11px] text-red-500 whitespace-nowrap">

            Event not started

          </p>

        )}

      </td>

    </tr>

  );

}

export default ParticipantRow;