import { motion } from "framer-motion";

interface TimelineItemProps {
  src: string;
  alt: string;
  message: string;
  index: number;
  isLeft: boolean;
}

export default function TimelineItem({
  src,
  message,
  index,
  isLeft,
}: TimelineItemProps) {
  return (
    <motion.div
      className={`relative flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-10 ${
        isLeft ? "" : "md:flex-row-reverse"
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
    >
      {/* Image */}
      <div className="w-4/5 max-w-xs flex-shrink-0 md:w-5/12 md:max-w-none">
        <motion.div
          className="overflow-hidden rounded-3xl shadow-xl shadow-primary/10"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring" as const, stiffness: 300 }}
        >
          <img
            src={src}
            alt={message}
            className="aspect-[3/4] w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Timeline dot + ring */}
      <div className="hidden md:flex md:w-2/12 md:justify-center">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 + 0.3, type: "spring" as const }}
        >
          <div className="h-5 w-5 rounded-full bg-primary shadow-md shadow-primary/30" />
          <div className="absolute h-9 w-9 rounded-full border-2 border-primary-light/50" />
        </motion.div>
      </div>

      {/* Text */}
      <div className="w-full text-center md:w-5/12 md:text-left">
        <p
          className="text-base leading-relaxed text-text-muted md:text-xl md:leading-relaxed"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {message}
        </p>
      </div>
    </motion.div>
  );
}
