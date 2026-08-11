export default function TabLabel({
  children,
  triggerClass,
}: {
  children: React.ReactNode;
  /** 可选：附加到根节点的类名，供支持真实 hover 的设备切换背景场景。 */
  triggerClass?: string;
}) {
  return (
    <p
      className={`home-tab-title group flex w-fit max-w-full items-center font-neue-haas-text font-medium tracking-tighter${triggerClass ? ` ${triggerClass}` : ""}`}
    >
      {/* 装饰性箭头：仅在支持真实 hover 的设备上展开，避免触摸屏首次点击只触发悬停。 */}
      <span
        aria-hidden="true"
        className="home-tab-arrow inline-flex shrink-0 overflow-hidden transition-[width] duration-300 ease-out"
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
