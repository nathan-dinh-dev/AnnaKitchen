import { transform } from "framer-motion";

const fadeInVariant = {
  visible: {
    opacity: 1,
    transform: "translateY(0)",
    transition: { duration: 0.5 },
  },
  hidden: { opacity: 0, transform: "translateY(-1.5rem)" },
};

export default fadeInVariant;
