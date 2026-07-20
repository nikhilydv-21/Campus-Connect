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

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

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
              px-5
              py-5
              sm:px-6
              sm:py-6
              shadow-sm
              hover:shadow-md
              transition-all
              duration-300
            "
          >

            <div className="flex items-center justify-between gap-4">

              <div className="min-w-0">

                <p className="text-sm font-medium text-slate-500 tracking-wide">

                  {card.title}

                </p>

                <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 break-words">

                  {card.value}

                </h2>

              </div>

              <div
                className="
                  w-11
                  h-11
                  sm:w-12
                  sm:h-12
                  rounded-xl
                  border
                  border-slate-200
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >

                <Icon
                  size={20}
                  className="text-slate-600 sm:w-[22px] sm:h-[22px]"
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