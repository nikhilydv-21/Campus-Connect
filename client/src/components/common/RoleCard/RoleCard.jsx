import Button from "../Button/Button";

function RoleCard({ title }) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      p-10
      "
    >
      <h2 className="text-3xl font-bold text-center mb-10">
        {title}
      </h2>

      <div className="flex justify-center gap-4">

        <Button>
          Login
        </Button>

        <Button>
          Sign Up
        </Button>

      </div>

    </div>
  );
}

export default RoleCard;