import { useInView } from "../../hooks/useInView";

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, isVisible] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
