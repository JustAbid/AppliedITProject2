import { Check } from "lucide-react";
import "../../styles/ui/FormProgress.css";

function FormProgress({ steps, currentStep }) {
  return (
    <ol className="form-progress" aria-label="Registration progress">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const status = stepNumber < currentStep ? "done" : stepNumber === currentStep ? "current" : "upcoming";

        return (
          <li key={step} className={`form-progress-step form-progress-${status}`}>
            <span className="form-progress-marker" aria-hidden="true">
              {status === "done" ? <Check size={16} /> : stepNumber}
            </span>
            <span className="form-progress-label">{step}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default FormProgress;
