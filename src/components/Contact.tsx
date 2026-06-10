import { useState } from "react";
import { Enso } from "./Enso";

const EMAIL = "jhkimuniversity@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-40"
    >
      <div className="mb-8 flex justify-center">
        <Enso variant="mark" size={30} animate={false} />
      </div>

      <h2 className="font-[Fraunces] text-[clamp(30px,5vw,48px)] font-light text-[#1c1812]">
        Let&apos;s make something.
      </h2>
      <p className="mt-4 text-[15px] text-[#6f685c]">
        Open to software roles and creative work. The fastest way to reach me is
        below.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[14px]">
        <a
          href="https://www.linkedin.com/in/iswearthisisntme/"
          target="_blank"
          rel="noreferrer"
          className="border-b border-[#1c1812]/30 pb-0.5 transition-colors hover:border-[#1c1812]"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/jjhhkimm"
          target="_blank"
          rel="noreferrer"
          className="border-b border-[#1c1812]/30 pb-0.5 transition-colors hover:border-[#1c1812]"
        >
          GitHub
        </a>

        <button
          type="button"
          onClick={copyEmail}
          className="border-b border-[#1c1812]/30 pb-0.5 transition-colors hover:border-[#1c1812]"
        >
          {copied ? "copied!" : EMAIL}
        </button>

        <a
          href="/jay_kim_resume.pdf"
          download
          className="rounded-full border border-[#1c1812]/40 px-5 py-2 transition-colors hover:bg-[#1c1812] hover:text-[#f1e9d9]"
        >
          resume
        </a>
      </div>
    </section>
  );
}
