import { Plus, Trash2, Phone } from "lucide-react";

function Contacts({
  society,
  editMode,
  formData,
  setFormData,
}) {

  const addContact = () => {

    if (formData.contacts.length >= 2) return;

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

    <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Contact Information
        </h2>

        {editMode && (

          <button
            onClick={addContact}
            disabled={formData.contacts.length >= 2}
            className={`px-5 py-2 rounded-xl flex items-center gap-2 transition ${
              formData.contacts.length >= 2
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >

            <Plus size={18} />

            Add Contact

          </button>

        )}

      </div>

      {/* Limit Message */}

      {editMode &&
        formData.contacts.length >= 2 && (

          <p className="text-sm text-red-500 mb-5">

            Maximum 2 contacts are allowed.

          </p>

        )}

      {editMode ? (

        <div className="space-y-5">

          {formData.contacts.map((contact, index) => (

            <div
              key={index}
              className="border rounded-2xl p-5 bg-slate-50"
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
                className="w-full border rounded-xl px-4 py-3 mb-3 outline-none focus:border-blue-600"
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
                className="w-full border rounded-xl px-4 py-3 mb-3 outline-none focus:border-blue-600"
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
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-600"
              />

              <button
                onClick={() => removeContact(index)}
                className="
                  mt-4
                  h-11
                  w-11
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                  hover:bg-red-100
                  text-red-600
                  transition
                "
              >

                <Trash2 size={18} />

              </button>

            </div>

          ))}

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-5">

          {society?.contacts?.length ? (

            society.contacts.map((contact, index) => (

              <div
                key={index}
                className="
                  border
                  rounded-2xl
                  p-5
                  bg-slate-50
                  flex
                  gap-4
                  items-start
                  hover:shadow-md
                  transition
                "
              >

                {/* Icon */}

                <div
                  className="
                    h-11
                    w-11
                    rounded-full
                    bg-slate-200
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "
                >

                  <Phone
                    size={20}
                    className="text-black"
                  />

                </div>

                {/* Details */}

                <div>

                  <h3 className="font-bold text-lg text-slate-900">

                    {contact.name}

                  </h3>

                  <p className="text-gray-500 mt-1">

                    {contact.position}

                  </p>

                  <p className="text-black font-semibold mt-2">

                    {contact.phone}

                  </p>

                </div>

              </div>

            ))

          ) : (

            <p className="text-gray-500">
              No Contact Information Added
            </p>

          )}

        </div>

      )}

    </div>

  );

}

export default Contacts;