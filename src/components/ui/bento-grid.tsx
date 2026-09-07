import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon && icon}
        <div className="font-sans font-bold text-slate-900 mb-1.5 mt-2">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5 group/link"
            >
              <span>{title}</span>
              <span className="text-sm text-blue-500 font-semibold transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                ↗
              </span>
            </a>
          ) : (
            <span className="text-base sm:text-lg font-bold text-slate-900">{title}</span>
          )}
        </div>
        <div className="font-sans font-normal text-slate-600 text-xs sm:text-[13px] leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
