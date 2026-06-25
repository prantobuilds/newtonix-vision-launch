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
  Globe, ShoppingCart, Smartphone, Gauge, Wrench as WrenchIcon, ShoppingBag,
  Sparkles, Wrench, Layers, Rocket, MessageCircle, LifeBuoy,
  ArrowRight, Phone, Mail, MapPin, Menu, X, Sun, Moon, Star,
  Linkedin, Facebook, Github, ChevronRight, CheckCircle2,
  Search, ClipboardList, Paintbrush, Code, PlayCircle,
  Factory, Stethoscope, GraduationCap, Truck, Landmark, Store,
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
          "Newtonix Tech builds custom ERP, CRM, HR, payroll, mobile apps, and web solutions. A sister concern of VISER X.",
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
  { label: "Industries", href: "#industries" },
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <Services />
        <Industries />
        <Stats />
        <WhyUs />
        <TechStack />
        <Process />
        <Portfolio />
        <SisterBrand />
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

/* ---------------- Top Utility Bar ---------------- */
function TopBar() {
  return (
    <div className="relative z-50 brand-gradient text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-medium">
          <span className="hidden sm:inline opacity-80">Proud sister concern of</span>
          <a href="https://viserx.com" target="_blank" rel="noreferrer" className="font-bold tracking-wide hover:underline">VISER X</a>
          <span className="hidden md:inline opacity-60">•</span>
          <span className="hidden md:inline opacity-90">Engineering revenue-driven software</span>
        </div>
        <div className="flex items-center gap-4 font-medium">
          <a href="tel:+8801842088100" className="inline-flex items-center gap-1.5 hover:underline">
            <Phone className="h-3.5 w-3.5" /> +88 018-42088100
          </a>
          <a href="mailto:info@newtonixtech.com" className="hidden sm:inline-flex items-center gap-1.5 hover:underline">
            <Mail className="h-3.5 w-3.5" /> info@newtonixtech.com
          </a>
        </div>
      </div>
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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass shadow-card" : "bg-background/60 backdrop-blur border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg brand-gradient shadow-glow">
            <span className="text-sm font-black text-white">N</span>
          </span>
          <span className="font-display text-base font-extrabold tracking-tight">Newtonix<span className="text-[color:var(--color-brand)]">.</span>Tech</span>
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
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/50 text-foreground transition-colors hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="hidden sm:inline-flex btn-pill brand-gradient text-white shadow-elegant transition-transform hover:scale-[1.02]"
          >
            Get Free Quote <ArrowRight className="h-4 w-4" />
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
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full brand-gradient px-4 py-2.5 text-sm font-semibold text-white"
            >
              Get Free Quote
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
    <section id="top" className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh animate-mesh" />
      <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-[color:var(--color-brand)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[color:var(--color-glow)]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:px-8">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-semibold">
              <span className="flex items-center gap-0.5 text-amber-400">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
              </span>
              <span className="text-foreground">5.0</span>
              <span className="text-muted-foreground">Rated by clients</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Custom Software &<br />
              <span className="text-gradient">Web Solutions</span> Built<br />
              for Growing Businesses
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Newtonix Tech helps businesses streamline operations, win more customers, and accelerate
              growth through tailored software, mobile apps, and high-performance websites.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="btn-pill brand-gradient text-white shadow-elegant transition-transform hover:scale-[1.02]"
              >
                Get a Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="btn-pill border border-border bg-card/40 text-foreground backdrop-blur transition-colors hover:bg-accent"
              >
                Explore Services
              </a>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "12+", v: "Industries" },
                { k: "120+", v: "Brands served" },
                { k: "24h", v: "Response" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{s.k}</div>
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

/* ---------------- Logo Marquee ---------------- */
const brandLogos = [
  "Bridge Chemie", "Clipping Pixel", "AM Group", "Deen", "Guidance",
  "Macy's", "Naaptol", "Business Post", "ShareTrip", "AKIJ Resource",
  "Mercari", "Sakura", "Oakwood", "Hatil", "Apple Gadgets",
];
function LogoMarquee() {
  const row = [...brandLogos, ...brandLogos];
  return (
    <section className="relative border-y border-border/60 bg-card/30 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          120+ Brands trust the VISER X group
        </p>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max items-center gap-12 animate-marquee">
            {row.map((b, i) => (
              <span key={`${b}-${i}`} className="font-display whitespace-nowrap text-lg font-bold tracking-tight text-muted-foreground/70 hover:text-foreground transition-colors">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
type Svc = { icon: typeof Boxes; title: string; desc: string; bullets: string[] };

const webSvcs: Svc[] = [
  {
    icon: Globe, title: "Website Development",
    desc: "High-converting marketing & corporate websites engineered for speed and SEO.",
    bullets: ["Custom CMS", "SEO-ready", "Mobile-first"],
  },
  {
    icon: ShoppingBag, title: "Ecommerce Website",
    desc: "Storefronts and marketplaces with smooth checkout and scalable catalog.",
    bullets: ["Multi-payment", "Inventory sync", "Vendor system"],
  },
  {
    icon: Gauge, title: "Website Speed Optimization",
    desc: "Make your existing site load in under 2 seconds — Core Web Vitals first.",
    bullets: ["Core Web Vitals", "Image / cache", "Lighthouse 95+"],
  },
  {
    icon: WrenchIcon, title: "Website Maintenance",
    desc: "Ongoing security, updates, monitoring and content management you can trust.",
    bullets: ["Security patches", "Daily backups", "24/7 monitoring"],
  },
];

const softwareSvcs: Svc[] = [
  {
    icon: Boxes, title: "ERP",
    desc: "Unified platforms that connect operations, inventory and finance end-to-end.",
    bullets: ["Inventory & POS", "Manufacturing", "Multi-branch"],
  },
  {
    icon: ShoppingCart, title: "Ecommerce Platform",
    desc: "Headless or full-stack commerce engines tailored to your business model.",
    bullets: ["B2B / B2C", "Marketplace", "Subscription"],
  },
  {
    icon: KanbanSquare, title: "Project Management",
    desc: "Custom PM tools with timelines, resourcing and real-time visibility.",
    bullets: ["Kanban / Gantt", "Timesheets", "Client portals"],
  },
  {
    icon: Users2, title: "CRM",
    desc: "Sales pipelines and customer 360 dashboards built around how your team sells.",
    bullets: ["Lead capture", "Forecasting", "Automation"],
  },
  {
    icon: UserCog, title: "HR Management",
    desc: "Hiring, onboarding, attendance, leave and performance — all in one place.",
    bullets: ["Attendance", "Recruitment", "Performance"],
  },
  {
    icon: Calculator, title: "Accounts & Finance",
    desc: "Books, invoicing, taxation and financial reporting tailored to your workflows.",
    bullets: ["GL & journals", "VAT / TAX", "P&L dashboards"],
  },
  {
    icon: Wallet, title: "Payroll",
    desc: "Accurate, compliant payroll with tax, leave and benefits handled automatically.",
    bullets: ["Tax compliance", "Payslips", "Bank file export"],
  },
  {
    icon: Smartphone, title: "Mobile App",
    desc: "Cross-platform iOS & Android apps powered by React Native and Flutter.",
    bullets: ["iOS + Android", "Push & offline", "App Store launch"],
  },
];

type Tab = "all" | "web" | "software";

function ServiceCard({ icon: Icon, title, desc, bullets }: Svc) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
           style={{ background: "radial-gradient(60% 80% at 0% 0%, color-mix(in oklab, var(--color-brand) 18%, transparent), transparent 60%)" }} />
      <div className="relative">
        <div className="grid h-11 w-11 place-items-center rounded-xl brand-gradient text-white shadow-glow">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display mt-4 text-lg font-bold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        <ul className="mt-4 space-y-1.5">
          {bullets.map(b => (
            <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--color-brand)]" /> {b}
            </li>
          ))}
        </ul>
        <div className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--color-brand)] opacity-70 transition-opacity group-hover:opacity-100">
          Learn more <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

function Services() {
  const [tab, setTab] = useState<Tab>("all");
  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: "All Services" },
    { id: "web", label: "Web Development" },
    { id: "software", label: "Software Solutions" },
  ];

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">What We Do</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Solutions Built Around <span className="text-gradient">Your Business</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              From websites that convert to enterprise software that scales — engineered for measurable revenue impact.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`btn-pill text-xs sm:text-sm transition-all ${
                  tab === t.id
                    ? "brand-gradient text-white shadow-elegant"
                    : "border border-border bg-card/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {(tab === "all" || tab === "web") && (
          <>
            <Reveal delay={80}>
              <div className="mt-12 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="font-display text-xs font-bold uppercase tracking-wider text-[color:var(--color-brand)]">Web Development</span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {webSvcs.map((s, i) => (
                <Reveal key={s.title} delay={i * 50}><ServiceCard {...s} /></Reveal>
              ))}
            </div>
          </>
        )}

        {(tab === "all" || tab === "software") && (
          <>
            <Reveal delay={80}>
              <div className="mt-16 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="font-display text-xs font-bold uppercase tracking-wider text-[color:var(--color-brand)]">Software Solutions</span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {softwareSvcs.map((s, i) => (
                <Reveal key={s.title} delay={i * 50}><ServiceCard {...s} /></Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------------- Industries ---------------- */
const industries = [
  { icon: Factory, label: "Manufacturing" },
  { icon: Store, label: "Retail & POS" },
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Stethoscope, label: "Healthcare" },
  { icon: GraduationCap, label: "Education" },
  { icon: Truck, label: "Logistics" },
  { icon: Landmark, label: "Financial Services" },
  { icon: Boxes, label: "Distribution" },
];

function Industries() {
  return (
    <section id="industries" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">Industries</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Industries We <span className="text-gradient">Power</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {industries.map((it, i) => (
            <Reveal key={it.label} delay={i * 40}>
              <div className="group flex items-center gap-3 rounded-xl glass px-4 py-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <span className="grid h-10 w-10 place-items-center rounded-lg brand-gradient text-white shadow-glow">
                  <it.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold">{it.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Animated Stats ---------------- */
function useCounter(target: number, durationMs = 1200, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return val;
}

function Stat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const n = useCounter(value, 1400, seen);
  return (
    <div ref={ref} className="rounded-2xl glass p-6 text-center">
      <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl text-gradient">{n}{suffix}</div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={120} suffix="+" label="Brands served" />
          <Stat value={250} suffix="+" label="Projects delivered" />
          <Stat value={12} suffix="+" label="Industries" />
          <Stat value={10} suffix="M+" label="Revenue driven (USD)" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Us ---------------- */
const whyItems = [
  { icon: Sparkles, title: "Powered by VISER X Experience", desc: "Backed by years of enterprise delivery — methodology, talent and trust inherited." },
  { icon: Wrench, title: "Custom-Built Solutions", desc: "No templates. Software shaped to your workflows, KPIs and growth model." },
  { icon: Layers, title: "Scalable Architecture", desc: "Built to handle 10x usage without re-platforming or technical debt." },
  { icon: Rocket, title: "Fast Delivery", desc: "Sprint-based delivery with usable milestones every two weeks." },
  { icon: MessageCircle, title: "Transparent Communication", desc: "Direct access to engineers and weekly progress demos — no black box." },
  { icon: LifeBuoy, title: "Dedicated Support", desc: "SLA-backed post-launch support, monitoring and continuous improvements." },
];

function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">Why Us</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Why Businesses Choose <span className="text-gradient">Newtonix Tech</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((w, i) => (
            <Reveal key={w.title} delay={i * 60}>
              <div className="group h-full rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-card border border-[color:var(--glass-border)] text-[color:var(--color-brand)] shadow-glow">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-5 text-lg font-bold tracking-tight">{w.title}</h3>
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
  { label: "Frontend", items: ["React", "Next.js", "Vue.js", "Flutter"] },
  { label: "Backend", items: ["Laravel", "Node.js", "PHP", "Python"] },
  { label: "Database", items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { label: "Cloud & DevOps", items: ["AWS", "DigitalOcean", "Cloudflare", "Docker"] },
];

function TechStack() {
  return (
    <section id="tech" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">Stack</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Technologies <span className="text-gradient">We Use</span>
            </h2>
            <p className="mt-4 text-muted-foreground">A modern, battle-tested stack chosen for performance, longevity and developer velocity.</p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techGroups.map((g, i) => (
            <Reveal key={g.label} delay={i * 70}>
              <div className="h-full rounded-2xl glass p-6">
                <div className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">{g.label}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--glass-border)] bg-card/60 px-3 py-1.5 text-sm font-medium backdrop-blur transition-colors hover:border-[color:var(--color-brand)]/60 hover:text-[color:var(--color-brand)]"
                    >
                      <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-[color:var(--color-brand)]" />
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
  { icon: Search, title: "Discovery", desc: "We deeply understand your business, users and goals." },
  { icon: ClipboardList, title: "Planning", desc: "Scope, architecture, milestones and success criteria." },
  { icon: Paintbrush, title: "Design", desc: "Interfaces and flows mapped to real user behavior." },
  { icon: Code, title: "Development", desc: "Iterative sprints with weekly demos and feedback." },
  { icon: PlayCircle, title: "Launch & Support", desc: "Go-live, training and continuous improvement." },
];

function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">Process</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Our Development <span className="text-gradient">Process</span>
            </h2>
            <p className="mt-4 text-muted-foreground">A structured approach that ensures successful project delivery.</p>
          </div>
        </Reveal>

        <div className="relative mt-16 hidden lg:block">
          <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-[color:var(--color-brand)]/50 to-transparent" />
          <div className="grid grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full brand-gradient text-white shadow-elegant relative z-10">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {i + 1}</div>
                  <h3 className="font-display mt-1 text-base font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative mt-12 lg:hidden">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[color:var(--color-brand)]/60 via-[color:var(--color-glow)]/40 to-transparent" />
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <li className="relative pl-16">
                  <div className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full brand-gradient text-white shadow-elegant">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {i + 1}</div>
                  <h3 className="font-display mt-0.5 text-base font-bold tracking-tight">{s.title}</h3>
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
  { img: projErp, title: "Manufacturing ERP Platform", category: "ERP", desc: "End-to-end production, inventory and finance for a multi-facility manufacturer." },
  { img: projCrm, title: "Sales CRM Dashboard", category: "CRM", desc: "Pipeline visibility and forecasting for a high-velocity B2B sales team." },
  { img: projHr, title: "HR & Payroll Management", category: "HR / Payroll", desc: "Attendance, payroll and compliance for 1,000+ employees across regions." },
  { img: projEcom, title: "Multi-Vendor E-commerce", category: "Ecommerce", desc: "Marketplace with vendor onboarding, payouts and unified storefront." },
  { img: projCorp, title: "Corporate Business Website", category: "Website", desc: "Brand-led, multilingual corporate site with custom CMS and case studies." },
];

function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">Portfolio</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
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
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full glass px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-brand)]">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold tracking-tight">{p.title}</h3>
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

/* ---------------- Sister Brand Callout ---------------- */
function SisterBrand() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass p-8 sm:p-12 shadow-elegant">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full brand-gradient opacity-20 blur-3xl" />
            <div className="relative grid items-center gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">Part of the VISER X group</p>
                <h3 className="font-display mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Backed by a $10M+ revenue-driven agency.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Newtonix Tech is the software & engineering arm of VISER X — a Clutch 5.0 rated growth partner
                  trusted by 120+ brands. You get startup speed with enterprise pedigree.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <a href="https://viserx.com" target="_blank" rel="noreferrer" className="btn-pill brand-gradient text-white shadow-elegant">
                  Visit VISER X <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#contact" className="btn-pill border border-border bg-card/40 text-foreground hover:bg-accent">
                  Start a project
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const faqs = [
  { q: "What industries do you serve?", a: "We work across manufacturing, retail, e-commerce, education, healthcare, logistics, financial services, and professional services." },
  { q: "How long does a software project take?", a: "Most custom solutions take 8–16 weeks from kickoff to launch, depending on scope. We deliver in two-week sprints so you see working software early and often." },
  { q: "Do you provide post-launch support?", a: "Yes. Every engagement includes warranty support, and we offer SLA-backed maintenance, monitoring, and continuous improvement plans." },
  { q: "Can you develop custom business software?", a: "Absolutely — custom ERP, CRM, HR, payroll, accounting, mobile apps, and bespoke internal tools are our core. We build around your processes, not a template." },
  { q: "Do you work with international clients?", a: "Yes. We work remotely with clients across Asia, the Middle East, Europe, and North America with overlapping working hours and async-friendly processes." },
  { q: "How do we get started?", a: "Request a free consultation. We'll explore your goals, recommend an approach, and share a clear proposal — usually within a week." },
];

function Faq() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">FAQ</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
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
                <AccordionTrigger className="font-display py-5 text-left text-base font-bold hover:no-underline">
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
const serviceOptions = [
  "Website Development",
  "Ecommerce Website",
  "Website Speed Optimization",
  "Website Maintenance",
  "ERP",
  "Ecommerce Platform",
  "Project Management",
  "CRM",
  "HR Management",
  "Accounts & Finance",
  "Payroll",
  "Mobile App",
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
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">Contact</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Let's Build Something <span className="text-gradient">Great Together</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your project and our team will get back to you within 24 hours.
            </p>

            <ul className="mt-10 space-y-5">
              <li className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg glass text-[color:var(--color-brand)]">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</div>
                  <a href="mailto:info@newtonixtech.com" className="block break-all text-sm font-medium hover:text-[color:var(--color-brand)]">
                    info@newtonixtech.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg glass text-[color:var(--color-brand)]">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</div>
                  <a href="tel:+8801842088100" className="block text-sm font-medium hover:text-[color:var(--color-brand)]">
                    +88 018-42088100
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg glass text-[color:var(--color-brand)]">
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
                className="btn-pill bg-[oklch(0.72_0.17_150)] text-white shadow-elegant transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <a
                href="tel:+8801842088100"
                className="btn-pill border border-border bg-card/40 backdrop-blur transition-colors hover:bg-accent"
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
                  className="mt-1.5 w-full rounded-lg border border-border bg-card/40 px-3 py-2.5 text-sm text-foreground outline-none ring-0 backdrop-blur transition-colors focus:border-[color:var(--color-brand)]"
                  defaultValue=""
                >
                  <option value="" disabled>Select a service…</option>
                  {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="details" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  required
                  maxLength={2000}
                  placeholder="Tell us about your project, goals and timeline."
                  rows={5}
                  className="mt-1.5 bg-card/40 backdrop-blur"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-full brand-gradient text-white shadow-elegant transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {submitting ? "Sending…" : "Request Free Consultation"}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--color-brand)]" />
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
        {label}{required && <span className="text-[color:var(--color-brand)]"> *</span>}
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
              <span className="font-display text-base font-extrabold tracking-tight">Newtonix<span className="text-[color:var(--color-brand)]">.</span>Tech</span>
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
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/40 text-muted-foreground transition-colors hover:border-[color:var(--color-brand)]/60 hover:text-[color:var(--color-brand)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Web Development" items={[
            { label: "Website Development", href: "#services" },
            { label: "Ecommerce Website", href: "#services" },
            { label: "Speed Optimization", href: "#services" },
            { label: "Website Maintenance", href: "#services" },
          ]} />
          <FooterCol title="Software Solutions" items={[
            { label: "ERP", href: "#services" },
            { label: "CRM", href: "#services" },
            { label: "HR & Payroll", href: "#services" },
            { label: "Accounts & Finance", href: "#services" },
            { label: "Mobile App", href: "#services" },
          ]} />
          <div>
            <div className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Information</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-brand)]" />
                <a href="mailto:info@newtonixtech.com" className="break-all hover:text-foreground">info@newtonixtech.com</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-brand)]" />
                <a href="tel:+8801842088100" className="hover:text-foreground">+88 018-42088100</a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-brand)]" />
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
      <div className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</div>
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
