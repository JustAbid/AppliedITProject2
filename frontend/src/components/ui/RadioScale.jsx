import "../../styles/ui/RadioScale.css";

const DEFAULT_LABELS = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

function RadioScale({ prompt, name, value, onChange, error, scaleLabels = DEFAULT_LABELS }) {
  return (
    <fieldset className="radio-scale" aria-invalid={Boolean(error)}>
      <legend className="radio-scale-prompt">{prompt}</legend>
      <div className="radio-scale-options">
        {scaleLabels.map((scaleLabel, index) => {
          const optionValue = index + 1;
          const isChecked = Number(value) === optionValue;
          return (
            <label key={optionValue} className={`radio-scale-option ${isChecked ? "is-checked" : ""}`}>
              <input
                type="radio"
                name={name}
                value={optionValue}
                checked={isChecked}
                onChange={() => onChange(optionValue)}
              />
              <span className="radio-scale-dot" aria-hidden="true">
                {optionValue}
              </span>
              <span className="radio-scale-caption">{scaleLabel}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default RadioScale;
