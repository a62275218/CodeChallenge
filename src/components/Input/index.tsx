import React from "react";
import "./index.less";

export default function Input(props: {
  value: string;
  onChange: (v: string) => void;
  className: string;
  placeholder?: string;
  type?: string;
}) {
  const { value, onChange, className, placeholder, type } = props;
  const handleChange = (e: React.BaseSyntheticEvent) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`common-input ${className}`}
      value={value}
      onChange={handleChange}
    />
  );
}
