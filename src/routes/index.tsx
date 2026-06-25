import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Boxes, Users2, UserCog, Wallet, Calculator, KanbanSquare,
  Globe, Building2, ShoppingCart, Code2,
  Sparkles, Wrench, Layers, Rocket, MessageCircle, LifeBuoy,
  ArrowRight, Phone, Mail, MapPin, Menu, X, Sun, Moon,
  Linkedin, Facebook, Github, ChevronRight, CheckCircle2,
  Search, ClipboardList, Paintbrush, Code, PlayCircle,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import heroVisual from "@/assets/hero-visual.jpg";
import projErp from "@/assets/project-erp.jpg";
import projCrm from "@/assets/project-crm.jpg";
import projHr from "@/assets/project-hr.jpg";
import projEcom from "@/assets/project-ecom.jpg";
import projCorp from "@/assets/project-corp.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Newtonix Tech — Custom Software & Web Solutions" },
      {
        name: "description",
        content:
          "Newtonix Tech builds custom ERP, CRM, HR, and web solutions for growing businesses. A sister concern of VISER X.",
      },
      { property: "og:title", content: "Newtonix Tech — Custom Software & Web Solutions" },
      {
        property: "og:description",
        content: "Custom software and web solutions built for growing businesses.",
      },
    ],
  }),
  component: Index,
});

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Technologies", href: "#tech" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <TechStack />
        <Process />
        <Portfolio />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster richColors position="top-right" />
    </div>
  );
}

/* ---------------- Reveal-on-scroll ---------------- */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Navbar ---------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-card" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg brand-gradient shadow-glow">
            <span className="text-sm font-black text-white">N</span>
          </span>
          <span className="text-base font-bold tracking-tight">Newtonix<span className="text-[color:var(--color-glow)]">.</span>Tech</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card/50 text-foreground transition-colors hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.02]"
          >
            Get a Free Consultation <ArrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-md border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-4 pt-2">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md brand-gradient px-4 py-2.5 text-sm font-semibold text-white"
            >
              Get a Free Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Animated mesh */}
      <div className="pointer-events-none absolute inset-0 gradient-mesh animate-mesh" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-glow)]/40 to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-[color:var(--color-brand)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[color:var(--color-glow)]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:px-8">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-[color:var(--color-glow)] shadow-glow" />
              Proud Sister Concern of VISER X
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Custom Software &<br />
              <span className="text-gradient">Web Solutions</span> Built<br />
              for Growing Businesses
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Newtonix Tech helps businesses streamline operations, improve efficiency, and accelerate
              growth through custom software development and web solutions.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-lg brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.02]"
              >
                Get a Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/40 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-accent"
              >
                View Services
              </a>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "10+", v: "Industries" },
                { k: "50+", v: "Projects" },
                { k: "24h", v: "Response" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-2xl font-bold tracking-tight sm:text-3xl">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative">
            <div className="absolute -inset-6 brand-gradient opacity-20 blur-3xl rounded-[2rem]" />
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--glass-border)] glass shadow-elegant animate-float">
              <img
                src={heroVisual}
                alt="Abstract software development visualization"
                width={1280}
                height={1280}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl glass px-4 py-3">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <span className="grid h-2 w-2 place-items-center rounded-full bg-emerald-400 shadow-[0_0_10px_oklch(0.78_0.16_150)]" />
                  Engineering at scale
                </div>
                <span className="text-[10px] text-muted-foreground">v2026.1</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
type Svc = { icon: typeof Boxes; title: string; desc: string };
const businessSvcs: Svc[] = [
  { icon: Boxes, title: "ERP Development", desc: "Unified platforms that connect operations, inventory, and finance end-to-end." },
  { icon: Users2, title: "CRM Development", desc: "Sales pipelines and customer 360 dashboards built around how your team sells." },
  { icon: UserCog, title: "HR Management Systems", desc: "Hiring, onboarding, attendance, and performance — automated in one place." },
  { icon: Wallet, title: "Payroll Management", desc: "Accurate, compliant payroll with tax, leave, and benefits handled automatically." },
  { icon: Calculator, title: "Accounting & Finance", desc: "Books, invoicing, and reporting tailored to your accounting workflows." },
  { icon: KanbanSquare, title: "Project Management", desc: "Custom PM tools with timelines, resourcing, and real-time team visibility." },
];
const webSvcs: Svc[] = [
  { icon: Globe, title: "Business Websites", desc: "High-converting marketing sites engineered for speed and SEO." },
  { icon: Building2, title: "Corporate Websites", desc: "Brand-led corporate presence with CMS, multilingual, and investor sections." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Custom storefronts, marketplaces, and checkout flows that scale." },
  { icon: Code2, title: "Custom Web Apps", desc: "Bespoke SaaS dashboards, portals, and internal tools built to fit." },
];

function ServiceCard({ icon: Icon, title, desc }: Svc) {
  return (
    <div className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
           style={{ background: "radial-gradient(60% 80% at 0% 0%, color-mix(in oklab, var(--color-brand) 18%, transparent), transparent 60%)" }} />
      <div className="relative">
        <div className="grid h-11 w-11 place-items-center rounded-xl brand-gradient text-white shadow-glow">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--color-glow)] opacity-0 transition-opacity group-hover:opacity-100">
          Learn more <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-glow)]">What We Do</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Solutions Built Around <span className="text-gradient">Your Business</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              From operational backbones to customer-facing experiences — we engineer software that compounds value.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Business Software Solutions</span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businessSvcs.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}><ServiceCard {...s} /></Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Web Solutions</span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {webSvcs.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}><ServiceCard {...s} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Us ---------------- */
const whyItems = [
  { icon: Sparkles, title: "Powered by VISER X Experience", desc: "Backed by years of enterprise delivery — methodology, talent, and trust inherited." },
  { icon: Wrench, title: "Custom-Built Solutions", desc: "No templates. Software shaped to your workflows, KPIs, and growth model." },
  { icon: Layers, title: "Scalable Architecture", desc: "Built to handle 10x usage without re-platforming or technical debt." },
  { icon: Rocket, title: "Fast Delivery", desc: "Sprint-based delivery with usable milestones every two weeks." },
  { icon: MessageCircle, title: "Transparent Communication", desc: "Direct access to engineers and weekly progress demos — no black box." },
  { icon: LifeBuoy, title: "Dedicated Support", desc: "SLA-backed post-launch support, monitoring, and continuous improvements." },
];

function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-glow)]/40 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-glow)]">Why Us</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Why Businesses Choose <span className="text-gradient">Newtonix Tech</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <div className="group h-full rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-card border border-[color:var(--glass-border)] text-[color:var(--color-glow)] shadow-glow">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Tech Stack ---------------- */
const techGroups: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["React", "Next.js", "Vue.js"] },
  { label: "Backend", items: ["Laravel", "PHP", "Node.js"] },
  { label: "Database", items: ["MySQL", "PostgreSQL"] },
  { label: "Cloud & Hosting", items: ["AWS", "DigitalOcean", "Cloudflare"] },
];

function TechStack() {
  return (
    <section id="tech" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-glow)]">Stack</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Technologies <span className="text-gradient">We Use</span>
            </h2>
            <p className="mt-4 text-muted-foreground">A modern, battle-tested stack chosen for performance, longevity, and developer velocity.</p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techGroups.map((g, i) => (
            <Reveal key={g.label} delay={i * 70}>
              <div className="h-full rounded-2xl glass p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.label}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--glass-border)] bg-card/60 px-3 py-1.5 text-sm font-medium backdrop-blur transition-colors hover:border-[color:var(--color-glow)]/60 hover:text-[color:var(--color-glow)]"
                    >
                      <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-[color:var(--color-glow)]" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
const steps = [
  { icon: Search, title: "Discovery", desc: "We deeply understand your business, users, and goals." },
  { icon: ClipboardList, title: "Planning", desc: "Scope, architecture, milestones, and success criteria." },
  { icon: Paintbrush, title: "Design", desc: "Interfaces and flows mapped to real user behavior." },
  { icon: Code, title: "Development", desc: "Iterative sprints with weekly demos and feedback." },
  { icon: PlayCircle, title: "Launch & Support", desc: "Go-live, training, and continuous improvement." },
];

function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-glow)]">Process</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Our Development <span className="text-gradient">Process</span>
            </h2>
            <p className="mt-4 text-muted-foreground">A structured approach that ensures successful project delivery.</p>
          </div>
        </Reveal>

        {/* Desktop horizontal timeline */}
        <div className="relative mt-16 hidden lg:block">
          <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-[color:var(--color-glow)]/50 to-transparent" />
          <div className="grid grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full brand-gradient text-white shadow-elegant relative z-10">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {i + 1}</div>
                  <h3 className="mt-1 text-base font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[color:var(--color-glow)]/60 via-[color:var(--color-brand)]/40 to-transparent" />
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <li className="relative pl-16">
                  <div className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full brand-gradient text-white shadow-elegant">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {i + 1}</div>
                  <h3 className="mt-0.5 text-base font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Portfolio ---------------- */
const projects = [
  { img: projErp, title: "Manufacturing ERP Platform", category: "Enterprise Software", desc: "End-to-end production, inventory, and finance for a multi-facility manufacturer." },
  { img: projCrm, title: "Sales CRM Dashboard", category: "CRM", desc: "Pipeline visibility and forecasting for a high-velocity B2B sales team." },
  { img: projHr, title: "HR & Payroll Management", category: "HR Tech", desc: "Attendance, payroll, and compliance for 1,000+ employees across regions." },
  { img: projEcom, title: "Multi-Vendor E-commerce", category: "E-commerce", desc: "Marketplace with vendor onboarding, payouts, and unified storefront." },
  { img: projCorp, title: "Corporate Business Website", category: "Web", desc: "Brand-led, multilingual corporate site with custom CMS and case studies." },
];

function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-glow)]">Portfolio</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Project <span className="text-gradient">Showcase</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Examples of software and web solutions we build.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <article className={`group h-full overflow-hidden rounded-2xl glass transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant ${i === 0 ? "lg:col-span-2" : ""}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full glass px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-glow)]">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const faqs = [
  { q: "What industries do you serve?", a: "We work across manufacturing, retail, e-commerce, education, healthcare, logistics, financial services, and professional services. If your business has operational complexity, we can help." },
  { q: "How long does a software project take?", a: "Most custom solutions take 8–16 weeks from kickoff to launch, depending on scope. We deliver in two-week sprints so you see working software early and often." },
  { q: "Do you provide post-launch support?", a: "Yes. Every engagement includes warranty support, and we offer SLA-backed maintenance, monitoring, and continuous improvement plans." },
  { q: "Can you develop custom business software?", a: "Absolutely — custom ERP, CRM, HR, payroll, accounting, and bespoke internal tools are our core. We build around your processes, not a template." },
  { q: "Do you work with international clients?", a: "Yes. We work remotely with clients across Asia, the Middle East, Europe, and North America with overlapping working hours and async-friendly processes." },
  { q: "How do we get started?", a: "Request a free consultation. We'll explore your goals, recommend an approach, and share a clear proposal — usually within a week." },
];

function Faq() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-glow)]">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl glass border-b-0 px-5 data-[state=open]:shadow-elegant"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
const services = [
  "ERP Development",
  "CRM Development",
  "HR / Payroll Systems",
  "Accounting & Finance",
  "Project Management Software",
  "Business Website",
  "Corporate Website",
  "E-commerce",
  "Custom Web App",
  "Other",
];

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const details = String(fd.get("details") ?? "").trim();

    if (!name || name.length > 100) return toast.error("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) return toast.error("Please enter a valid email.");
    if (!details || details.length > 2000) return toast.error("Please share a few words about your project.");

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Request received. We'll get back to you within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-glow)]/40 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-glow)]">Contact</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Let's Build Something <span className="text-gradient">Great Together</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your project and our team will get back to you within 24 hours.
            </p>

            <ul className="mt-10 space-y-5">
              <li className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg glass text-[color:var(--color-glow)]">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</div>
                  <a href="mailto:info@newtonixtech.com" className="block break-all text-sm font-medium hover:text-[color:var(--color-glow)]">
                    info@newtonixtech.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg glass text-[color:var(--color-glow)]">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</div>
                  <a href="tel:+8801842088100" className="block text-sm font-medium hover:text-[color:var(--color-glow)]">
                    +88 018-42088100
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg glass text-[color:var(--color-glow)]">
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</div>
                  <p className="text-sm font-medium leading-relaxed">
                    Plot 06, Road 02, Sector 11,<br />Uttara, Dhaka-1230, Bangladesh
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://wa.me/8801842088100"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[oklch(0.72_0.17_150)] px-4 py-2.5 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <a
                href="tel:+8801842088100"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/40 px-4 py-2.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-accent"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl glass p-6 sm:p-8 shadow-elegant"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" placeholder="Jane Doe" required maxLength={100} />
              <Field label="Company Name" name="company" placeholder="Acme Inc." maxLength={120} />
              <Field label="Email Address" name="email" type="email" placeholder="you@company.com" required maxLength={255} />
              <Field label="Phone Number" name="phone" placeholder="+880 …" maxLength={30} />
              <div className="sm:col-span-2">
                <Label htmlFor="service" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service Required</Label>
                <select
                  id="service"
                  name="service"
                  className="mt-1.5 w-full rounded-lg border border-border bg-card/40 px-3 py-2.5 text-sm text-foreground outline-none ring-0 backdrop-blur transition-colors focus:border-[color:var(--color-glow)]"
                  defaultValue=""
                >
                  <option value="" disabled>Select a service…</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="details" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  required
                  maxLength={2000}
                  placeholder="Tell us about your project, goals, and timeline."
                  rows={5}
                  className="mt-1.5 bg-card/40 backdrop-blur"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full brand-gradient text-white shadow-elegant transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {submitting ? "Sending…" : "Request Consultation"}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--color-glow)]" />
              We reply within 24 hours.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", placeholder, required, maxLength,
}: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; maxLength?: number }) {
  return (
    <div>
      <Label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="text-[color:var(--color-glow)]"> *</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        className="mt-1.5 bg-card/40 backdrop-blur"
      />
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg brand-gradient shadow-glow">
                <span className="text-sm font-black text-white">N</span>
              </span>
              <span className="text-base font-bold tracking-tight">Newtonix<span className="text-[color:var(--color-glow)]">.</span>Tech</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Custom Software & Web Solutions for Modern Businesses.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: MessageCircle, href: "https://wa.me/8801842088100", label: "WhatsApp" },
                { Icon: Github, href: "#", label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/40 text-muted-foreground transition-colors hover:border-[color:var(--color-glow)]/60 hover:text-[color:var(--color-glow)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Services" items={[
            { label: "ERP Development", href: "#services" },
            { label: "CRM Development", href: "#services" },
            { label: "HR & Payroll", href: "#services" },
            { label: "E-commerce", href: "#services" },
            { label: "Custom Web Apps", href: "#services" },
          ]} />
          <FooterCol title="Quick Links" items={[
            { label: "Why Us", href: "#why" },
            { label: "Technologies", href: "#tech" },
            { label: "Process", href: "#process" },
            { label: "Portfolio", href: "#portfolio" },
            { label: "FAQ", href: "#faq" },
          ]} />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact Information</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-glow)]" />
                <a href="mailto:info@newtonixtech.com" className="break-all hover:text-foreground">info@newtonixtech.com</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-glow)]" />
                <a href="tel:+8801842088100" className="hover:text-foreground">+88 018-42088100</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-glow)]" />
                <span>Plot 06, Road 02, Sector 11, Uttara, Dhaka-1230, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 Newtonix Tech. A sister concern of VISER X. All rights reserved.</p>
          <p>Engineered with precision in Dhaka.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} className="text-muted-foreground transition-colors hover:text-foreground">{i.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Floating WhatsApp ---------------- */
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/8801842088100"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.72_0.17_150)] text-white shadow-elegant transition-transform hover:scale-110"
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[oklch(0.72_0.17_150)] opacity-70 animate-ping" />
      <MessageCircle className="relative h-6 w-6" />
    </a>
  );
}
