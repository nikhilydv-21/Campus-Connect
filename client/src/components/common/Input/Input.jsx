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
  disabled = false,
  className = "",
}) {
  const baseStyle = `
    w-full
    px-4
    py-3
    text-sm
    sm:text-base
    rounded-xl
    sm:rounded-2xl
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
    disabled:bg-gray-100
    disabled:cursor-not-allowed
  `;

  if (type === "select") {
    return (
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${baseStyle} ${className}`}
      >
        <option value="">Select</option>

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
      disabled={disabled}
      className={`${baseStyle} ${className}`}
    />
  );
}

export default Input;