import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarPlus, CheckCircle2, Pencil } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import FormProgress from "../components/ui/FormProgress";
import InputField from "../components/ui/InputField";
import RadioScale from "../components/ui/RadioScale";
import personalityQuestions from "../data/personalityQuestions";
import { fetchEventById, registerForEvent } from "../services/api";
import { downloadEventICS } from "../utils/calendar";
import "../styles/EventRegistration.css";

const STEP_LABELS = ["About You", "Volunteer Preferences", "Emergency Details", "Review & Confirm"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENDER_OPTIONS = [
  { value: "", label: "Select an option" },
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
  { value: "Non-binary", label: "Non-binary" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const INITIAL_FORM_DATA = {
  full_name: "",
  email: "",
  phone_number: "",
  organization: "",
  age: "",
  gender: "",
  emergency_contact: "",
  emergency_contact_phone: "",
  accessibility_needs: "",
  additional_info: "",
  reminder_opt_in: true,
};

function EventRegistration() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [responses, setResponses] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await fetchEventById(id);
        setEvent(data);
      } catch {
        setLoadError("Unable to load the event details for registration.");
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  function updateField(name, value) {
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function validateStep(stepNumber) {
    const nextErrors = {};

    if (stepNumber === 1) {
      if (!formData.full_name.trim()) nextErrors.full_name = "Please enter your full name.";
      if (!formData.email.trim()) {
        nextErrors.email = "Please enter your email address.";
      } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
        nextErrors.email = "Please enter a valid email address.";
      }
      if (formData.age && (Number(formData.age) < 1 || Number(formData.age) > 120)) {
        nextErrors.age = "Please enter a valid age.";
      }
    }

    if (stepNumber === 2) {
      const unanswered = personalityQuestions.filter((question) => !responses[question.id]);
      if (unanswered.length > 0) {
        nextErrors.personality = "Please answer every question before continuing.";
      }
    }

    if (stepNumber === 4 && !confirmed) {
      nextErrors.confirmed = "Please confirm your details before submitting.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (validateStep(step)) {
      setStep((current) => Math.min(current + 1, STEP_LABELS.length));
    }
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(current - 1, 1));
  }

  async function handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    if (!validateStep(4)) return;

    setSubmitting(true);
    setSubmitError("");

    const payload = {
      full_name: formData.full_name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone_number: formData.phone_number.trim() || undefined,
      organization: formData.organization.trim() || undefined,
      age: formData.age ? Number(formData.age) : undefined,
      gender: formData.gender || undefined,
      emergency_contact: formData.emergency_contact.trim() || undefined,
      emergency_contact_phone: formData.emergency_contact_phone.trim() || undefined,
      accessibility_needs: formData.accessibility_needs.trim() || undefined,
      additional_info: formData.additional_info.trim() || undefined,
      reminder_opt_in: formData.reminder_opt_in,
      personality_responses: personalityQuestions.map((question) => ({
        question_id: question.id,
        trait: question.trait,
        response_value: Number(responses[question.id]),
      })),
    };

    const response = await registerForEvent(id, payload);
    setSubmitting(false);

    if (response) {
      setResult(response);
    } else {
      setSubmitError("We could not complete your registration right now. Please try again.");
    }
  }

  if (result) {
    return (
      <>
        <Navbar />
        <main className="section registration-success">
          <div className="container registration-success-inner">
            <span className="registration-success-icon">
              <CheckCircle2 size={40} aria-hidden="true" />
            </span>
            <h1>You&apos;re registered!</h1>
            <p>
              Your place has been reserved for <strong>{event?.title}</strong>. A confirmation email with event
              details will be sent to {result.registration.email} shortly.
            </p>

            <div className="registration-success-actions">
              <Button icon={CalendarPlus} onClick={() => event && downloadEventICS(event)}>
                Add to Calendar
              </Button>
              <Button to="/events" variant="secondary">
                View More Events
              </Button>
              <Button to="/" variant="ghost">
                Return Home
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="registration-page section">
        <div className="container">
          <Link to={`/events/${id}`} className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Back to event
          </Link>

          {loading && <p className="registration-state">Preparing your registration form…</p>}
          {loadError && <p className="registration-error">{loadError}</p>}

          {!loading && event && (
            <div className="registration-grid">
              <aside className="registration-summary">
                <img src={event.image} alt={event.title} className="registration-summary-image" />
                <h2>{event.title}</h2>
                <ul>
                  <li><strong>Date:</strong> {event.date}</li>
                  <li><strong>Time:</strong> {event.time}</li>
                  <li><strong>Location:</strong> {event.location}</li>
                  <li><strong>Organiser:</strong> {event.organizer}</li>
                  <li><strong>Spots left:</strong> {event.available_spots ?? 0}</li>
                </ul>
                <div className="registration-summary-note">
                  <h3>Registration notes</h3>
                  <p>
                    Complete the four short steps to register. Your volunteer-preference answers help us match you
                    with events and teams that suit you.
                  </p>
                </div>
              </aside>

              <div className="registration-form-panel">
                <FormProgress steps={STEP_LABELS} currentStep={step} />

                <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}>
                  {step === 1 && (
                    <div className="registration-step">
                      <h3>About you</h3>
                      <div className="registration-form-grid">
                        <InputField
                          label="Full name"
                          name="full_name"
                          required
                          placeholder="Jane Doe"
                          value={formData.full_name}
                          onChange={(e) => updateField("full_name", e.target.value)}
                          error={errors.full_name}
                        />
                        <InputField
                          label="Email address"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          error={errors.email}
                        />
                        <InputField
                          label="Phone number"
                          name="phone_number"
                          type="tel"
                          placeholder="+49 30 1234 5678"
                          value={formData.phone_number}
                          onChange={(e) => updateField("phone_number", e.target.value)}
                        />
                        <InputField
                          label="Age"
                          name="age"
                          type="number"
                          min="1"
                          max="120"
                          placeholder="25"
                          value={formData.age}
                          onChange={(e) => updateField("age", e.target.value)}
                          error={errors.age}
                        />
                        <InputField
                          label="University or organisation"
                          name="organization"
                          placeholder="e.g. Technical University of Berlin"
                          value={formData.organization}
                          onChange={(e) => updateField("organization", e.target.value)}
                          className="registration-field-wide"
                        />
                        <InputField
                          as="select"
                          label="Gender"
                          name="gender"
                          options={GENDER_OPTIONS}
                          value={formData.gender}
                          onChange={(e) => updateField("gender", e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="registration-step">
                      <h3>Volunteer preferences</h3>
                      <p className="registration-step-intro">
                        Rate each statement from strongly disagree to strongly agree — this helps us match you with
                        events and teams that suit you.
                      </p>

                      {errors.personality && <p className="field-error registration-step-error">{errors.personality}</p>}

                      {personalityQuestions.map((question) => (
                        <RadioScale
                          key={question.id}
                          prompt={question.prompt}
                          name={question.id}
                          value={responses[question.id]}
                          onChange={(value) => setResponses((current) => ({ ...current, [question.id]: value }))}
                        />
                      ))}

                      <label className="registration-checkbox">
                        <input
                          type="checkbox"
                          checked={formData.reminder_opt_in}
                          onChange={(e) => updateField("reminder_opt_in", e.target.checked)}
                        />
                        <span>
                          <strong>Send me email reminders for this event</strong>
                          <small>We&apos;ll email you a reminder before the event starts.</small>
                        </span>
                      </label>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="registration-step">
                      <h3>Emergency details</h3>
                      <div className="registration-form-grid">
                        <InputField
                          label="Emergency contact name"
                          name="emergency_contact"
                          placeholder="Contact's full name"
                          value={formData.emergency_contact}
                          onChange={(e) => updateField("emergency_contact", e.target.value)}
                        />
                        <InputField
                          label="Emergency contact phone"
                          name="emergency_contact_phone"
                          type="tel"
                          placeholder="+49 30 1234 5678"
                          value={formData.emergency_contact_phone}
                          onChange={(e) => updateField("emergency_contact_phone", e.target.value)}
                        />
                      </div>
                      <InputField
                        as="textarea"
                        label="Accessibility or support requirements"
                        name="accessibility_needs"
                        placeholder="Let us know how we can support your participation"
                        value={formData.accessibility_needs}
                        onChange={(e) => updateField("accessibility_needs", e.target.value)}
                      />
                      <InputField
                        as="textarea"
                        label="Additional information"
                        name="additional_info"
                        placeholder="Anything else the organiser should know"
                        value={formData.additional_info}
                        onChange={(e) => updateField("additional_info", e.target.value)}
                      />
                    </div>
                  )}

                  {step === 4 && (
                    <div className="registration-step">
                      <h3>Review and confirm</h3>

                      <div className="review-card">
                        <div className="review-card-header">
                          <h4>About you</h4>
                          <button type="button" className="review-edit" onClick={() => setStep(1)}>
                            <Pencil size={13} aria-hidden="true" /> Edit
                          </button>
                        </div>
                        <dl>
                          <div><dt>Name</dt><dd>{formData.full_name}</dd></div>
                          <div><dt>Email</dt><dd>{formData.email}</dd></div>
                          {formData.phone_number && <div><dt>Phone</dt><dd>{formData.phone_number}</dd></div>}
                          {formData.organization && <div><dt>Organisation</dt><dd>{formData.organization}</dd></div>}
                        </dl>
                      </div>

                      <div className="review-card">
                        <div className="review-card-header">
                          <h4>Emergency details</h4>
                          <button type="button" className="review-edit" onClick={() => setStep(3)}>
                            <Pencil size={13} aria-hidden="true" /> Edit
                          </button>
                        </div>
                        <dl>
                          <div><dt>Contact name</dt><dd>{formData.emergency_contact || "Not provided"}</dd></div>
                          <div><dt>Contact phone</dt><dd>{formData.emergency_contact_phone || "Not provided"}</dd></div>
                        </dl>
                      </div>

                      <label className="registration-checkbox">
                        <input
                          type="checkbox"
                          checked={confirmed}
                          onChange={(e) => setConfirmed(e.target.checked)}
                        />
                        <span>
                          <strong>I confirm the details above are correct</strong>
                          <small>You can still be contacted by the organiser to update these details later.</small>
                        </span>
                      </label>
                      {errors.confirmed && <p className="field-error">{errors.confirmed}</p>}

                      {submitError && <p className="registration-error">{submitError}</p>}
                    </div>
                  )}

                  <div className="registration-nav">
                    {step > 1 && (
                      <Button type="button" variant="secondary" icon={ArrowLeft} onClick={goBack}>
                        Previous
                      </Button>
                    )}
                    {step < STEP_LABELS.length && (
                      <Button type="button" icon={ArrowRight} iconPosition="right" onClick={goNext} className="registration-nav-next">
                        Next
                      </Button>
                    )}
                    {step === STEP_LABELS.length && (
                      <Button type="submit" loading={submitting} className="registration-nav-next">
                        {submitting ? "Submitting…" : "Submit registration"}
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default EventRegistration;
