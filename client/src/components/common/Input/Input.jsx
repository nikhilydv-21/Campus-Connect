function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  options = [],
  maxLength,
  inputMode,
  pattern,
}) {

  if (type === "select") {
    return (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-3
          rounded-2xl
          border
          border-gray-300
          outline-none
          transition-all
          duration-300
          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100
        "
      >
        <option value="">
          Select
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      inputMode={inputMode}
      pattern={pattern}
      className="
        w-full
        px-4
        py-3
        rounded-2xl
        border
        border-gray-300
        text-gray-800
        placeholder:text-gray-400
        outline-none
        transition-all
        duration-300
        focus:border-blue-600
        focus:ring-4
        focus:ring-blue-100
      "
    />
  );
}

export default Input;