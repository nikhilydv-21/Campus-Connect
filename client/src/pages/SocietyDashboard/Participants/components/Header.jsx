function Header({ event }) {

  const heading =
    event?.registrationMode === "Viewer"
      ? "Viewers"
      : "Participants";

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-slate-800">
        {heading}
      </h1>

      <p className="text-gray-500 mt-2">
        {event?.title}
      </p>
    </div>
  );
}

export default Header;