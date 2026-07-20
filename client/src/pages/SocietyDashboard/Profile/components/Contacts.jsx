import { Plus, Trash2, Phone } from "lucide-react";

function Contacts({
  society,
  editMode,
  formData,
  setFormData,
}) {

  const addContact = () => {

    if (formData.contacts.length >= 2)
      return;

    setFormData({
      ...formData,
      contacts: [
        ...formData.contacts,
        {
          name: "",
          position: "",
          phone: "",
        },
      ],
    });

  };

  const removeContact = (index) => {

    const updated = [...formData.contacts];

    updated.splice(index, 1);

    setFormData({
      ...formData,
      contacts: updated,
    });

  };

  return (

    <div
      className="
        mt-6
        sm:mt-8
        rounded-2xl
        sm:rounded-3xl
        bg-white
        shadow-lg
        p-5
        sm:p-8
      "
    >

      {/* Header */}

      <div
        className="
          mb-6
          sm:mb-8
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <h2
          className="
            text-xl
            sm:text-2xl
            font-bold
            text-slate-800
          "
        >

          Contact Information

        </h2>

        {editMode && (

          <button
            onClick={addContact}
            disabled={formData.contacts.length >= 2}
            className={`
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-2
              text-sm
              sm:text-base
              transition
              ${
                formData.contacts.length >= 2
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            `}
          >

            <Plus size={18} />

            Add Contact

          </button>

        )}

      </div>

      {/* Limit Message */}

      {editMode &&
        formData.contacts.length >= 2 && (

          <p className="mb-5 text-sm text-red-500">

            Maximum 2 contacts are allowed.

          </p>

        )}

      {editMode ? (

        <div className="space-y-5">

          {formData.contacts.map((contact, index) => (

            <div
              key={index}
              className="
                rounded-2xl
                border
                bg-slate-50
                p-4
                sm:p-5
              "
            >

              {/* Name */}

              <input
                type="text"
                placeholder="Name"
                value={contact.name}
                onChange={(e) => {

                  const updated = [...formData.contacts];

                  updated[index] = {
                    ...updated[index],
                    name: e.target.value,
                  };

                  setFormData({
                    ...formData,
                    contacts: updated,
                  });

                }}
                className="
                  mb-3
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  sm:text-base
                  outline-none
                  focus:border-blue-600
                "
              />

              {/* Position */}

              <input
                type="text"
                placeholder="Position"
                value={contact.position}
                onChange={(e) => {

                  const updated = [...formData.contacts];

                  updated[index] = {
                    ...updated[index],
                    position: e.target.value,
                  };

                  setFormData({
                    ...formData,
                    contacts: updated,
                  });

                }}
                className="
                  mb-3
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  sm:text-base
                  outline-none
                  focus:border-blue-600
                "
              />

              {/* Phone */}

              <input
                type="text"
                placeholder="Phone Number"
                value={contact.phone}
                onChange={(e) => {

                  const updated = [...formData.contacts];

                  updated[index] = {
                    ...updated[index],
                    phone: e.target.value,
                  };

                  setFormData({
                    ...formData,
                    contacts: updated,
                  });

                }}
                className="
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  sm:text-base
                  outline-none
                  focus:border-blue-600
                "
              />

              <button
                onClick={() => removeContact(index)}
                className="
                  mt-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                  text-red-600
                  transition
                  hover:bg-red-100
                "
              >

                <Trash2 size={18} />

              </button>

            </div>

          ))}

        </div>

      ) : (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >

          {society?.contacts?.length ? (

            society.contacts.map((contact, index) => (

              <div
                key={index}
                className="
                  flex
                  items-start
                  gap-4
                  rounded-2xl
                  border
                  bg-slate-50
                  p-4
                  sm:p-5
                  transition
                  hover:shadow-md
                "
              >

                {/* Icon */}

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-200
                  "
                >

                  <Phone
                    size={20}
                    className="text-black"
                  />

                </div>

                {/* Details */}

                <div className="min-w-0 flex-1">

                  <h3
                    className="
                      break-words
                      text-base
                      sm:text-lg
                      font-bold
                      text-slate-900
                    "
                  >

                    {contact.name}

                  </h3>

                  <p
                    className="
                      mt-1
                      break-words
                      text-sm
                      sm:text-base
                      text-gray-500
                    "
                  >

                    {contact.position}

                  </p>

                  <p
                    className="
                      mt-2
                      break-all
                      text-sm
                      sm:text-base
                      font-semibold
                      text-black
                    "
                  >

                    {contact.phone}

                  </p>

                </div>

              </div>

            ))

          ) : (

            <p
              className="
                text-sm
                sm:text-base
                text-gray-500
              "
            >

              No Contact Information Added

            </p>

          )}

        </div>

      )}

    </div>

  );

}

export default Contacts;