'use client';

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteData, friends, techSkills } from "@/lib/data";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("inverted", entry.isIntersecting);
      },
      { rootMargin: "0px 0px 50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="pt-12 col-span-full bg-paper text-ink ">

      <div id="footer-main" className="flex mb-10 text-[26px] leading-snug px-10 pt-10">
        {/* Friends — 25% */}
        <div className="w-1/4 shrink-0 pr-8">
          <p className="border-t-[0.5px] border-ink pt-2 mb-10">Friends</p>
          <ul className="list-none flex flex-col ">
            {friends.map((f) => (
              <li key={f.name}>
                <Link href={f.href}>{f.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Skills — 25% */}
        <div className="w-1/4 shrink-0 pr-8">
          <p className="border-t-[0.5px] border-ink pt-2 mb-10">Tech Skills</p>
          <ul className="list-none flex flex-col ">
            {techSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Bio — 50% */}
        <div className="w-1/2">
          <p className="border-t-[0.5px] border-ink pt-2 mb-10">Bio</p>
          <div className="text-[23px]">
            <p>
              我是一名计算机专业学生，也是一位软件开发者，喜欢优雅的数字体验，致力于使用现代技术栈构建高性能、用户友好的Web应用。
              <br />
              <br />

              作为一名大学生，我在完成学校课程之外更注重自我技术力与审美品味的提升。我发现我热爱一切与用户体验直接关联的技术，我认为打造有用、好用、优雅、令用户心情愉悦的产品是一件富有挑战而且意义非凡的事情。
              <br />
              <br />

              作为一名开发者，我在不断拓展自己的技术边界和深度。我在大二上学期完成了一段前端开发实习，目前正在拓展自己的工程化与服务端技术，未来想进行一些web3D的学习和实践。另外，我也在积极使用和探索AI，不断调整自己在AI时代的定位，思考AI对我们工作生活带来的深刻变革。
              <br />
              <br />

              日常生活中，我喜欢运动、探索与体验。我认为没有什么比羽毛球和骑行更能让我感受到生命的活力！电影和第九艺术“使我的寿命延长了三倍”，摄影让我的记忆有迹可循，而风格各异的音乐则给我的生活增添了不少趣味！
              <br />

            </p>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="p-10">
        <Link
          href={`mailto:${siteData.email}`}
          className="text-[62px] font-semibold leading-none tracking-tight"
        >
          {siteData.email}
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="pb-6 pt-0 px-12 flex items-center text-[26px] ">
        {/* col-6 (50%) — socials */}
        <div className="basis-1/2 shrink-0 flex gap-10">
          {siteData.socials.map((s) => (
            <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-stone-400">
              {s.label}
            </Link>
          ))}
        </div>
        {/* col-5 (~42%) — location */}
        <div className="basis-5/12 shrink-0 flex">
          <span>{siteData.location}</span>
        </div>
        {/* col-1 (~8%) — copyright */}
        <div className="basis-1/12">
          <span>{siteData.copyright}</span>
        </div>
      </div>


    </footer>
  );
}
