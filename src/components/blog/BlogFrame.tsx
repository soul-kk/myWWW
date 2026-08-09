import type { ReactNode } from "react";

type BlogFrameProps = {
  actions: ReactNode;
  children: ReactNode;
};

export default function BlogFrame({ actions, children }: BlogFrameProps) {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <aside className="flex min-h-64 w-full flex-col items-start justify-center gap-8 px-6 py-10 md:fixed md:top-0 md:right-0 md:h-dvh md:w-[30vw] md:items-center md:gap-10 md:px-10 md:py-16">
        <p className="font-open-sans text-2xl leading-none font-semibold tracking-[0.08em] whitespace-nowrap md:text-4xl md:tracking-[0.12em] md:[writing-mode:vertical-rl]">
          保持思考、感受、输出
        </p>

        <div className="flex shrink-0 flex-wrap justify-start gap-x-5 gap-y-2 text-sm font-semibold md:flex-col md:items-start md:text-base">
          {actions}
        </div>
      </aside>

      <main className="w-full px-6 pb-24 md:w-[70vw] md:px-[7vw] md:pt-20 md:pb-32">
        {children}
      </main>
    </div>
  );
}
