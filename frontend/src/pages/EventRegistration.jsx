import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchEventById, registerForEvent } from "../services/api";
import "../styles/EventRegistration.css";

const personalityQuestions = [
  { id: "openness_1", trait: "openness", prompt: "I enjoy exploring new ideas and creative experiences." },
  { id: "openness_2", trait: "openness", prompt: "I like learning about unfamiliar topics and perspectives." },
  { id: "conscientiousness_1", trait: "conscientiousness", prompt: "I prefer being prepared and organized before taking action." },
  { id: "conscientiousness_2", trait: "conscientiousness", prompt: "I follow through on commitments and responsibilities carefully." },
  { id: "extraversion_1", trait: "extraversion", prompt: "I feel energized when I spend time with other people." },
  { id: "extraversion_2", trait: "extraversion", prompt: "I enjoy leading conversations and meeting new people." },
  { id: "agreeableness_1", trait: "agreeableness", prompt: "I try to be considerate and supportive of others." },
  { id: "agreeableness_2", trait: "agreeableness", prompt: "I value teamwork and helping people feel included." },
  { id: "neuroticism_1", trait: "neuroticism", prompt: "I can feel stressed when plans change unexpectedly." },
  { id: "neuroticism_2", trait: "neuroticism", prompt: "I notice when I am feeling anxious or overwhelmed." },
  { id: "openness_3", trait: "openness", prompt: "I enjoy trying new approaches rather than sticking to routines." },
  { id: "conscientiousness_3", trait: "conscientiousness", prompt: "I like to keep tasks and priorities well structured." },
];

function EventRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [responses, setResponses] = useState({});
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    organization: "",
    age: "",
    gender: "",
    emergency_contact: "",
    additional_info: "",
    reminder_opt_in: true,
  });

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await fetchEventById(id);
        setEvent(data);
      } catch (err) {
        setError("Unable to load the event details for registration.");
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleResponseChange = (questionId, value) => {
    setResponses((current) => ({ ...current, [questionId]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const unanswered = personalityQuestions.filter((question) => !responses[question.id]);
    if (unanswered.length > 0) {
      setError("Please answer every personality question before submitting.");
      return;
    }

    if (!formData.full_name.trim() || !formData.email.trim()) {
      setError("Please provide your full name and email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone_number: formData.phone_number.trim() || undefined,
        organization: formData.organization.trim() || undefined,
        age: formData.age ? Number(formData.age) : undefined,
        gender: formData.gender.trim() || undefined,
        emergency_contact: formData.emergency_contact.trim() || undefined,
        additional_info: formData.additional_info.trim() || undefined,
        reminder_opt_in: formData.reminder_opt_in,
        personality_responses: personalityQuestions.map((question) => ({
          question_id: question.id,
          trait: question.trait,
          response_value: Number(responses[question.id]),
        })),
      };

      const result = await registerForEvent(id, payload);
      setSuccess(`Thanks ${result.registration.full_name}! Your RSVP has been recorded for ${event?.title || "this event"}.`);
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        organization: "",
        age: "",
        gender: "",
        emergency_contact: "",
        additional_info: "",
        reminder_opt_in: true,
      });
      setResponses({});
    } catch (err) {
      setError(err.message || "We could not complete your registration right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="registration-page">
        <section className="registration-hero">
          <Link to={`/events/${id}`} className="back-link">← Back to event</Link>
          <div className="registration-hero-copy">
            <p className="section-label">RSVP / Quick Registration</p>
            <h1>Register for your next volunteer experience</h1>
            <p>
              Share a short personality profile and your contact details so we can keep future events balanced and engaging.
            </p>
          </div>
        </section>

        <section className="registration-content">
          {loading && <p className="registration-state">Preparing your registration form...</p>}
          {error && <p className="registration-error">{error}</p>}
          {success && <p className="registration-success">{success}</p>}

          {!loading && event && (
            <div className="registration-grid">
              <aside className="registration-summary">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <ul>
                  <li><strong>Date:</strong> {event.date}</li>
                  <li><strong>Time:</strong> {event.time}</li>
                  <li><strong>Location:</strong> {event.location}</li>
                  <li><strong>Spots left:</strong> {event.available_spots ?? 0}</li>
                </ul>
                <div className="registration-instructions">
                  <h3>Registration</h3>
                  <p>
                    Please complete the personality assessment and your contact details in the form. Submitting will register you for this event and save your personality profile for future matching.
                  </p>
                </div>
              </aside>

              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>Section 1 – Personality Assessment</h3>
                  <p>Rate each statement from 1 (strongly disagree) to 5 (strongly agree).</p>
                  {personalityQuestions.map((question) => (
                    <div className="question-card" key={question.id}>
                      <label>{question.prompt}</label>
                      <div className="rating-group" role="radiogroup" aria-label={question.prompt}>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <label key={value} className="rating-option">
                            <input
                              type="radio"
                              name={question.id}
                              value={value}
                              checked={Number(responses[question.id]) === value}
                              onChange={() => handleResponseChange(question.id, value)}
                            />
                            <span>{value}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="form-section">
                  <h3>Section 2 – Participant Information</h3>
                  <div className="form-grid">
                    <label>
                      Full name
                      <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
                    </label>
                    <label>
                      Email address
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                      Phone number
                      <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                    </label>
                    <label>
                      University / Organization
                      <input type="text" name="organization" value={formData.organization} onChange={handleChange} />
                    </label>
                    <label>
                      Age
                      <input type="number" name="age" min="1" max="120" value={formData.age} onChange={handleChange} />
                    </label>
                    <label>
                      Gender
                      <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
                    </label>
                    <label>
                      Emergency contact
                      <input type="text" name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} />
                    </label>
                  </div>
                  <label>
                    Additional information
                    <textarea name="additional_info" rows="4" value={formData.additional_info} onChange={handleChange} />
                  </label>

                  <div className="notification-toggle-card">
                    <label className="notification-toggle-row">
                      <input
                        type="checkbox"
                        name="reminder_opt_in"
                        checked={formData.reminder_opt_in}
                        onChange={(event) => setFormData((current) => ({ ...current, reminder_opt_in: event.target.checked }))}
                      />
                      <span>
                        <strong>Send me email reminders for this event</strong>
                        <small>We’ll email you a reminder before the event starts.</small>
                      </span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit RSVP"}
                </button>
              </form>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventRegistration;
