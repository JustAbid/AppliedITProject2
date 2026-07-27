import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import "../../styles/ui/Button.css";

function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  children,
  type = "button",
  ...rest
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? "btn-full" : "",
    loading ? "btn-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading && <Loader2 className="btn-icon btn-spinner" size={18} aria-hidden="true" />}
      {!loading && Icon && iconPosition === "left" && <Icon className="btn-icon" size={18} aria-hidden="true" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === "right" && <Icon className="btn-icon" size={18} aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} aria-disabled={disabled} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...rest}>
      {content}
    </button>
  );
}

export default Button;
