import React from "react";

const InputWithLabel = ({
  id,
  type,
  value,
  onInputChange,
  isFocused,
  children,
}) => {
  // const [searchTerm, setSearchTerm] = React.useState('')
  // const handleChange = event => {
  //   setSearchTerm(event.target.value)
  //   props.onSearch(event)
  // }
  // const {search, onSearch} = props;

  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id} className="label">
        {children}
      </label>
      <input
        className="w-72 h-10 rounded bg-slate-900"
        type={type}
        id={id}
        onChange={onInputChange}
        value={value}
        ref={inputRef}
      />
    </>
  );
};

export default InputWithLabel;
