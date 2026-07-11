const validateEvent = (data) => {
  const {
    title,
    description,
    category,
    venue,
    date,
    startTime,
    endTime,
    registrationDeadline,
    registrationMode,
    maximumParticipants,
  } = data;

  // Required Fields
  if (
    !title ||
    !description ||
    !category ||
    !venue ||
    !date ||
    !startTime ||
    !endTime ||
    !registrationDeadline ||
    !registrationMode
  ) {
    return {
      valid: false,
      message: "All required fields are mandatory",
    };
  }

  // Registration Mode
  if (!["Participant", "Viewer"].includes(registrationMode)) {
    return {
      valid: false,
      message: "Invalid Registration Mode",
    };
  }

  // Category
  const categories = [
    "Technical",
    "Workshop",
    "Hackathon",
    "Seminar",
    "Sports",
    "Cultural",
    "Placement",
    "Competition",
    "Other",
  ];

  if (!categories.includes(category)) {
    return {
      valid: false,
      message: "Invalid Category",
    };
  }

  // Event Date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(date);

  if (eventDate < today) {
    return {
      valid: false,
      message: "Event date cannot be in the past",
    };
  }

  // Registration Deadline
  // Registration Deadline

  const deadline = new Date(registrationDeadline);
  deadline.setHours(0, 0, 0, 0);

  const eventOnlyDate = new Date(date);
  eventOnlyDate.setHours(0, 0, 0, 0);

  if (deadline > eventOnlyDate) {
    return {
      valid: false,
      message: "Registration deadline cannot be after event date",
    };
  }

  // Time Validation
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  if (startMinutes >= endMinutes) {
    return {
      valid: false,
      message: "End time must be after start time",
    };
  }
  // Participant Validation
  if (
    registrationMode === "Participant" &&
    !maximumParticipants
  ) {
    return {
      valid: false,
      message: "Maximum Participants is required",
    };
  }

  if (
    registrationMode === "Participant" &&
    maximumParticipants < 1
  ) {
    return {
      valid: false,
      message: "Maximum Participants must be greater than 0",
    };
  }

  return {
    valid: true,
  };
};

module.exports = validateEvent;