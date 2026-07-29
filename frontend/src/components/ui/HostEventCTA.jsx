import { useState } from "react";
import { Mail, Send } from "lucide-react";
import SectionHeader from "./SectionHeader";
import InputField from "./InputField";
import Button from "./Button";
import { submitHostingRequest } from "../../services/api";
import "../../styles/ui/HostEventCTA.css";

const HOST_EMAIL = "hello@ecoconnect.org";

function HostEventCTA() {
  const [form, setForm] = useState({ organizationName: "", contactEmail: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.organizationName.trim() || !form.contactEmail.trim() || !form.message.trim()) return;

    setStatus("loading");
    const result = await submitHostingRequest(form);
    if (result) {
      setStatus("success");
      setForm({ organizationName: "", contactEmail: "", phone: "", message: "" });
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="section host-event-section">
      <div className="container">
        <div className="card host-event-card">
          <SectionHeader
            eyebrow="For organisations & NGOs"
            title="Want to host an event on EcoConnect?"
            description={
              <>
                Tell us about your organisation and the event you'd like to run. Our team will reach out to set it
                up — or email us directly at{" "}
                <a href={`mailto:${HOST_EMAIL}`}>{HOST_EMAIL}</a>.
              </>
            }
          />

          {status === "success" ? (
            <p className="host-event-success">
              <Mail size={16} aria-hidden="true" /> Thanks! Your request has been sent — we'll be in touch at the
              email you provided.
            </p>
          ) : (
            <form className="host-event-form" onSubmit={handleSubmit}>
              <div className="host-event-form-row">
                <InputField
                  label="Organisation name"
                  name="organizationName"
                  required
                  value={form.organizationName}
                  onChange={(event) => updateField("organizationName", event.target.value)}
                />
                <InputField
                  label="Contact email"
                  name="contactEmail"
                  type="email"
                  required
                  value={form.contactEmail}
                  onChange={(event) => updateField("contactEmail", event.target.value)}
                />
              </div>
              <InputField
                label="Phone (optional)"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
              <InputField
                label="Tell us about the event"
                name="message"
                as="textarea"
                required
                placeholder="What kind of event, when, and roughly how many volunteers?"
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
              />

              {status === "error" && (
                <p className="host-event-error">Something went wrong sending your request. Please try again.</p>
              )}

              <Button type="submit" icon={Send} loading={status === "loading"}>
                Send request
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default HostEventCTA;
