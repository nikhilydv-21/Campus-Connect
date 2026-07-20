function Header({ event }) {

  const heading =
    event?.registrationMode === "Viewer"
      ? "Viewers"
      : "Participants";

  return (

    <div className="mb-6 sm:mb-8">

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 break-words">

        {heading}

      </h1>

      <p className="mt-2 text-sm sm:text-base text-gray-500 break-words">

        {event?.title}

      </p>

    </div>

  );

}

export default Header;