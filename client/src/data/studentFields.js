const studentFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "rollNumber",
    label: "Roll Number",
    type: "text",
    placeholder: "Enter your roll number",
  },
  {
    name: "branch",
    label: "Branch",
    type: "text",
    placeholder: "Enter your branch",
  },
  {
    name: "year",
    type: "select",
    label: "Year",
    options: ["1", "2", "3", "4"],
  },
  {
  name: "contactNumber",
  label: "Contact Number",
  type: "tel",
  placeholder: "Enter your contact number",
},
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
  },
];

export default studentFields;