import { Link } from "react-router-dom";
export default function Button({
  to,
  href,
  children,
  variant = "dark",
  ...props
}) {
  const cls = `button button-${variant}`;
  return to ? (
    <Link className={cls} to={to} {...props}>
      {children}
    </Link>
  ) : href ? (
    <a className={cls} href={href} {...props}>
      {children}
    </a>
  ) : (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
