import { useId } from "react";
import "../../styles/ui/InputField.css";

function InputField({
  label,
  name,
  as = "input",
  type = "text",
  required = false,
  error,
  helpText,
  options = [],
  className = "",
  ...rest
}) {
  const generatedId = useId();
  const inputId = `field-${name || generatedId}`;
  const errorId = `${inputId}-error`;
  const helpId = `${inputId}-help`;

  const describedBy = [helpText ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  const commonProps = {
    id: inputId,
    name,
    required,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    className: `field-control ${error ? "field-control-error" : ""}`,
    ...rest,
  };

  return (
    <div className={`field ${className}`}>
      {label && (
        <label htmlFor={inputId} className="field-label">
          {label} {required && <span className="field-required">*</span>}
        </label>
      )}

      {as === "textarea" && <textarea rows={4} {...commonProps} />}

      {as === "select" && (
        <select {...commonProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {as === "input" && <input type={type} {...commonProps} />}

      {helpText && !error && (
        <p id={helpId} className="field-help">
          {helpText}
        </p>
      )}
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;
