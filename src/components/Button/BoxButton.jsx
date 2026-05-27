const BoxButton = ({
  children,
  href = "#",
  variant = "primary",
}) => {
  const baseStyle =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden border px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] transition-all duration-300";

  const variants = {
    primary:
      "bg-[#E8830A] text-black border-[#E8830A] hover:bg-transparent hover:text-[#E8830A]",
    secondary:
      "bg-transparent text-white border-white/20 hover:border-white hover:bg-white hover:text-black",
  };

  return (
    <a href={href} className={`${baseStyle} ${variants[variant]}`}>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Hover Line Animation */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
      <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
};

export default BoxButton;