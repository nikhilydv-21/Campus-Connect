import {
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function SummaryCards({ counts }) {

  const cards = [
    {
      title: "Registered",
      value: counts.registered,
      icon: Users,
    },
    {
      title: "Present",
      value: counts.attended,
      icon: CheckCircle2,
    },
    {
      title: "Absent",
      value: counts.absent,
      icon: XCircle,
    },
  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              px-6
              py-6
              shadow-sm
              hover:shadow-md
              transition-all
              duration-300
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500 tracking-wide">

                  {card.title}

                </p>

                <h2 className="text-4xl font-bold text-slate-900 mt-2">

                  {card.value}

                </h2>

              </div>

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  border
                  border-slate-200
                  flex
                  items-center
                  justify-center
                "
              >

                <Icon
                  size={22}
                  className="text-slate-600"
                />

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}

export default SummaryCards;