export default function TabLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="group flex w-fit items-center whitespace-nowrap font-open-sans text-[94px] font-semibold leading-[1.1] tracking-tighter">
      {/* 装饰性箭头：静止时 w-0 不占位；hover 时宽度 0→0.8em，从左到右裁剪揭示，把文字推向右 */}
      <span
        aria-hidden="true"
        className="inline-flex shrink-0 overflow-hidden w-0 group-hover:w-[0.95em] transition-[width] duration-300 ease-out"
      >
        <svg
          viewBox="0 0 27 27"
          fill="none"
          className="w-[0.75em] h-[0.75em] shrink-0"
        >
          <path
            d="M3 12h17M15 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </span>
      {children}
    </p>
  );
}
