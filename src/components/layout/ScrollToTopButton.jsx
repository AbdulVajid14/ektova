import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 
      w-11 h-11 md:w-14 md:h-14
      bg-[#E8830A] text-black 
      flex items-center justify-center
      shadow-lg transition-all duration-300
      hover:scale-105 hover:bg-[#d4740a]
      ${
        showButton
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronUp
        size={20}
        strokeWidth={3}
        className="md:w-[26px] md:h-[26px]"
      />
    </button>
  );
};

export default ScrollToTopButton;