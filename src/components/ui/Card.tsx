import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";
import { motion } from "motion/react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    if (hover) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            "bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 cursor-pointer",
            className
          )}
          whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.2 }}
          {...(props as Record<string, unknown>)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
