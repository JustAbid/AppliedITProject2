import { Quote } from "lucide-react";
import "../../styles/ui/TestimonialCard.css";

function TestimonialCard({ quote, authorName, authorRole, image }) {
  return (
    <div className="card testimonial-card">
      <Quote className="testimonial-card-icon" size={28} aria-hidden="true" />
      <p className="testimonial-card-quote">&ldquo;{quote}&rdquo;</p>
      <div className="testimonial-card-author">
        <img src={image} alt="" loading="lazy" />
        <div>
          <p className="testimonial-card-name">{authorName}</p>
          <p className="testimonial-card-role">{authorRole}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
