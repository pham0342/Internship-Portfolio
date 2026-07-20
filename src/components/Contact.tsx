import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EnvelopeSimple, Phone, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { profile } from "../data/resume";
import { ContactOrbFallback } from "./ContactOrbFallback";

const ContactOrb = lazy(() =>
  import("./ContactOrb").then((m) => ({ default: m.ContactOrb }))
);

const links = [
  { icon: EnvelopeSimple, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: GithubLogo, label: "github.com/pham0342", href: profile.github },
  { icon: LinkedinLogo, label: "LinkedIn profile", href: profile.linkedin },
];

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="border-t border-zinc-900 bg-zinc-950/90">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-50">
            Let's talk about your placement team.
          </h2>
          <p className="mt-4 text-zinc-400 max-w-[55ch]">
            Based in {profile.location}. Reach out directly using any of the
            details below.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 rounded-md border border-zinc-800 px-4 py-3 text-sm text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-colors"
              >
                <Icon size={18} className="text-accent shrink-0" />
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <div className="relative h-[280px] sm:h-[340px]">
          <Suspense fallback={<ContactOrbFallback />}>
            <ContactOrb />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
