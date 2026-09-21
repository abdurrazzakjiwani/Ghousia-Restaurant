import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "motion/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500":
              variant === "primary",
            "border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-400":
              variant === "secondary",
            "hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-400":
              variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
              variant === "danger",
          },
          {
            "text-sm px-3 py-1.5": size === "sm",
            "text-sm px-5 py-2.5": size === "md",
            "text-base px-6 py-3": size === "lg",
          },
          className
        )}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
