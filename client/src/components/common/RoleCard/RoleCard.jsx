import Button from "../Button/Button";

function RoleCard({ title }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl md:rounded-3xl
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300

        w-full
        max-w-md
        mx-auto

        p-6
        sm:p-8
        md:p-10
      "
    >
      <h2
        className="
          text-2xl
          sm:text-3xl
          font-bold
          text-center
          mb-8
        "
      >
        {title}
      </h2>

      <div
        className="
          flex
          flex-col
          sm:flex-row
          justify-center
          gap-4
        "
      >
        <Button fullWidth>
          Login
        </Button>

        <Button fullWidth>
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default RoleCard;