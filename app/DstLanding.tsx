"use client";

import {
  ArrowUpRight,
  ChevronRight,
  Mail,
  Menu,
  Mouse,
  Phone,
  Send,
  Star,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import {
  CheckIcon,
  clientLogos,
  navItems,
  packageGroups,
  processSteps,
  projects,
  quickLinks,
  reasons,
  services,
  stats,
  testimonials,
  UsersIcon,
} from "./site-data";

const marqueeItems = [
  "Marketing Strategy",
  "Creative Content",
  "Media Production",
  "TikTok Shop",
  "Branding",
  "Digital Transformation",
];

type ServiceItem = (typeof services)[number];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BrandLogo({ variant = "group", className = "" }: { variant?: "group" | "media"; className?: string }) {
  const src = variant === "media" ? "/assets/logo-dst-marketing-media.png" : "/assets/logo-dst-group.png";
  const alt = variant === "media" ? "DST Marketing Media" : "DST Group - Dá»‹ch vá»¥ táº­n tÃ¢m - NÃ¢ng táº§m thÆ°Æ¡ng hiá»‡u";

  return <img className={`brand-logo ${className}`} src={src} alt={alt} loading="eager" decoding="async" />;
}

function HeroScene() {
  return (
    <div className="hero-visual" aria-label="Logo DST trong không gian nhận diện">
      <div className="brand-orbit brand-orbit-one" />
      <div className="brand-orbit brand-orbit-two" />
      <div className="brand-chip chip-gold" />
      <div className="brand-chip chip-teal" />
      <div className="logo-orb">
        <BrandLogo variant="media" />
      </div>
      <div className="orbit-label orbit-label-top">ADS</div>
      <div className="orbit-label orbit-label-bottom">BRANDING</div>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const trap = (form.elements.namedItem("company_site") as HTMLInputElement | null)?.value;
    if (trap) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSent(true);
    form.reset();
  }

  return (
    <form className="contact-form reveal" onSubmit={onSubmit}>
      <input className="hidden-field" name="company_site" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-grid">
        <label>
          Há» vÃ  tÃªn
          <input required name="name" placeholder="Nguyá»…n VÄƒn A" />
        </label>
        <label>
          Sá»‘ Ä‘iá»‡n thoáº¡i
          <input required name="phone" inputMode="tel" pattern="^[0-9+\\s]{8,15}$" placeholder="0328 247 888" />
        </label>
        <label>
          Email
          <input required name="email" type="email" placeholder="email@doanhnghiep.vn" />
        </label>
        <label>
          TÃªn doanh nghiá»‡p
          <input required name="company" placeholder="TÃªn cÃ´ng ty" />
        </label>
        <label>
          Dá»‹ch vá»¥ quan tÃ¢m
          <select required name="service" defaultValue="">
            <option value="" disabled>
              Chá»n dá»‹ch vá»¥
            </option>
            {quickLinks.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          NgÃ¢n sÃ¡ch dá»± kiáº¿n
          <select required name="budget" defaultValue="">
            <option value="" disabled>
              Chá»n khoáº£ng ngÃ¢n sÃ¡ch
            </option>
            <option>DÆ°á»›i 20 triá»‡u</option>
            <option>20 - 50 triá»‡u</option>
            <option>50 - 100 triá»‡u</option>
            <option>TrÃªn 100 triá»‡u</option>
          </select>
        </label>
      </div>
      <label>
        Ná»™i dung cáº§n tÆ° váº¥n
        <textarea required name="message" rows={5} placeholder="Chia sáº» má»¥c tiÃªu, ngÃ nh hÃ ng vÃ  thá»i gian mong muá»‘n..." />
      </label>
      <label className="policy">
        <input required type="checkbox" />
        TÃ´i Ä‘á»“ng Ã½ Ä‘á»ƒ DST Group liÃªn há»‡ tÆ° váº¥n vÃ  xá»­ lÃ½ thÃ´ng tin theo chÃ­nh sÃ¡ch báº£o máº­t.
      </label>
      <button className="primary-btn wide" type="submit" aria-label="Gá»­i yÃªu cáº§u tÆ° váº¥n">
        Gá»­i yÃªu cáº§u tÆ° váº¥n <Send size={18} />
      </button>
      {sent ? <p className="success-message">Cáº£m Æ¡n báº¡n. DST Group sáº½ liÃªn há»‡ tÆ° váº¥n trong thá»i gian sá»›m nháº¥t.</p> : null}
    </form>
  );
}

function ServiceDetailModal({
  service,
  onClose,
}: {
  service: ServiceItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!service) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const Icon = service.icon;
  const hasImage = "proofImage" in service && service.proofImage;

  return (
    <div className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
      <button className="modal-backdrop" onClick={onClose} aria-label="ÄÃ³ng chi tiáº¿t dá»‹ch vá»¥" />
      <article className="service-modal-card">
        <button className="modal-close" onClick={onClose} aria-label="ÄÃ³ng chi tiáº¿t dá»‹ch vá»¥">
          <X size={20} />
        </button>
        <div className="modal-intro">
          <div className="modal-icon">
            <Icon size={30} />
          </div>
          <p className="eyebrow">Chi tiáº¿t dá»‹ch vá»¥</p>
          <h2 id="service-modal-title">{service.title}</h2>
          <p>{service.detail}</p>
        </div>

        <div className={`modal-body ${hasImage ? "" : "no-proof-image"}`}>
          {hasImage ? (
            <figure className="service-proof">
              <img src={service.proofImage} alt={service.proofAlt} loading="lazy" decoding="async" />
              <figcaption>{service.proofCaption}</figcaption>
            </figure> ) : null}

          <div className="modal-detail-grid">
            <section>
              <h3>PhÃ¹ há»£p vá»›i</h3>
              <p>{service.fit}</p>
            </section>
            <section>
              <h3>Háº¡ng má»¥c bÃ n giao</h3>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>
                    <CheckIcon size={16} /> {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="primary-btn"
            onClick={() => {
              onClose();
              scrollToSection("contact");
            }}
          >
            TÆ° váº¥n dá»‹ch vá»¥ nÃ y <ChevronRight size={18} />
          </button>
          <button className="ghost-btn" onClick={onClose}>
            Xem dá»‹ch vá»¥ khÃ¡c
          </button>
        </div>
      </article>
    </div>
  );
}

export function DstLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => setLoaded(true), 550);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const raw = element.dataset.count ?? "";
          const numeric = Number(raw.replace(/[^0-9]/g, ""));
          const suffix = raw.replace(/[0-9]/g, "");
          if (!numeric || raw.includes("/") || reduced) {
            element.textContent = raw;
          } else {
            let current = 0;
            const step = Math.max(1, Math.ceil(numeric / 28));
            const timer = window.setInterval(() => {
              current = Math.min(numeric, current + step);
              element.textContent = `${current}${suffix}`;
              if (current >= numeric) window.clearInterval(timer);
            }, 32);
          }
          countObserver.unobserve(element);
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll("[data-count]").forEach((element) => countObserver.observe(element));
    return () => {
      window.clearTimeout(loadTimer);
      observer.disconnect();
      countObserver.disconnect();
    };
  }, []);

  function handleTilt(event: MouseEvent<HTMLElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--rx", `${-(y / rect.height - 0.5) * 4}deg`);
    card.style.setProperty("--ry", `${(x / rect.width - 0.5) * 4}deg`);
  }

  function clearTilt(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  }

  return (
    <>
      <div className={`loader ${loaded ? "loader-done" : ""}`} aria-hidden={loaded}>
        <BrandLogo />
        <span>Dá»‹ch vá»¥ táº­n tÃ¢m - NÃ¢ng táº§m thÆ°Æ¡ng hiá»‡u</span>
      </div>

      <header className="site-header">
        <button className="brand" onClick={() => scrollToSection("home")} aria-label="Vá» Ä‘áº§u trang">
          <BrandLogo />
        </button>
        <nav className="desktop-nav" aria-label="Menu chÃ­nh">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollToSection(id)}>
              {label}
            </button>
          ))}
        </nav>
        <button className="header-cta" onClick={() => scrollToSection("contact")}>
          Nháº­n tÆ° váº¥n
        </button>
        <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="Má»Ÿ menu">
          <Menu />
        </button>
      </header>

      <div className={`mobile-panel ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button className="close-btn" onClick={() => setMenuOpen(false)} aria-label="ÄÃ³ng menu">
          <X />
        </button>
        {navItems.map(([label, id]) => (
          <button
            key={id}
            onClick={() => {
              setMenuOpen(false);
              scrollToSection(id);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <main>
        <section id="home" className="hero-section">
          <div className="ambient-grid" />
          <div className="hero-copy reveal">
            <p className="eyebrow">MARKETING â€¢ MEDIA â€¢ BRANDING</p>
            <h1>
              Marketing Ä‘Ãºng hÆ°á»›ng, thÆ°Æ¡ng hiá»‡u <span>tÄƒng trÆ°á»Ÿng</span>
            </h1>
            <p className="hero-desc">
              DST Group Ä‘á»“ng hÃ nh cÃ¹ng doanh nghiá»‡p tá»« chiáº¿n lÆ°á»£c, ná»™i dung, quáº£ng cÃ¡o Ä‘áº¿n Media vÃ  Branding. Má»—i káº¿ hoáº¡ch
              Ä‘Æ°á»£c triá»ƒn khai rÃµ rÃ ng, Ä‘o lÆ°á»ng minh báº¡ch vÃ  tá»‘i Æ°u liÃªn tá»¥c.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollToSection("services")}>
                KhÃ¡m phÃ¡ dá»‹ch vá»¥ <ChevronRight size={18} />
              </button>
              <button className="ghost-btn" onClick={() => scrollToSection("contact")}>
                Nháº­n tÆ° váº¥n miá»…n phÃ­
              </button>
            </div>
            <div className="hero-metrics">
              <span>
                <Zap size={18} /> ADS â€¢ TIKTOK SHOP â€¢ DESIGN â€¢ MEDIA â€¢ CONTENT â€¢ BRANDING
              </span>
            </div>
          </div>
          <HeroScene />
          <button className="scroll-cue" onClick={() => scrollToSection("about")} aria-label="Cuá»™n xuá»‘ng pháº§n giá»›i thiá»‡u">
            <Mouse size={18} />
          </button>
        </section>

        <section className="marquee-strip" aria-label="NÄƒng lá»±c ná»•i báº­t">
          <div>
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section id="about" className="section split-section">
          <div className="media-panel reveal">
            <img src="/assets/01-team-event-launch.jpg" alt="Äá»™i ngÅ© DST trong má»™t sá»± kiá»‡n ra máº¯t" loading="lazy" decoding="async" />
            <div className="media-badge">
              <UsersIcon size={20} /> Chiáº¿n lÆ°á»£c rÃµ rÃ ng â€¢ Triá»ƒn khai minh báº¡ch
            </div>
          </div>
          <div className="section-copy reveal">
            <p className="eyebrow">Vá» chÃºng tÃ´i</p>
            <h2>XÃ¢y dá»±ng giÃ¡ trá»‹ thÆ°Æ¡ng hiá»‡u bá»n vá»¯ng</h2>
            <p>
              DST Group lÃ  Ä‘Æ¡n vá»‹ cung cáº¥p giáº£i phÃ¡p Marketing vÃ  Media toÃ n diá»‡n, Ä‘á»“ng hÃ nh cÃ¹ng doanh nghiá»‡p trong quÃ¡
              trÃ¬nh tiáº¿p cáº­n khÃ¡ch hÃ ng, xÃ¢y dá»±ng hÃ¬nh áº£nh vÃ  phÃ¡t triá»ƒn kinh doanh.
            </p>
            <div className="stats-grid">
              {stats.map((item) => (
                <div key={item.label}>
                  <strong data-count={item.value}>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <p className="highlight-line">Dá»‹ch vá»¥ táº­n tÃ¢m - NÃ¢ng táº§m thÆ°Æ¡ng hiá»‡u</p>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-heading reveal">
            <p className="eyebrow">Há»‡ sinh thÃ¡i dá»‹ch vá»¥</p>
            <h2>Giáº£i phÃ¡p toÃ n diá»‡n</h2>
            <p>
              Tá»« chiáº¿n lÆ°á»£c Ä‘áº¿n thá»±c thi, DST Group cung cáº¥p Ä‘áº§y Ä‘á»§ giáº£i phÃ¡p giÃºp doanh nghiá»‡p xÃ¢y dá»±ng thÆ°Æ¡ng hiá»‡u vÃ 
              tÄƒng trÆ°á»Ÿng doanh thu.
            </p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  className="service-card reveal"
                  key={service.title}
                  onMouseMove={handleTilt}
                  onMouseLeave={clearTilt}
                >
                  <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
                  <Icon className="service-icon" size={30} />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="tag-list">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button onClick={() => setSelectedService(service)}>
                    Xem chi tiáº¿t <ArrowUpRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="package-section">
          <div className="package-inner reveal">
            <div>
              <p className="eyebrow dark">Giáº£i phÃ¡p trá»n gÃ³i</p>
              <h2>Má»™t Ä‘á»™i Marketing chuyÃªn nghiá»‡p, chi phÃ­ tá»‘i Æ°u</h2>
            </div>
            <button className="dark-btn" onClick={() => scrollToSection("contact")}>
              YÃªu cáº§u bÃ¡o giÃ¡
            </button>
          </div>
          <div className="package-grid">
            {packageGroups.map((group) => {
              const Icon = group.icon;
              return (
                <article className="package-card reveal" key={group.title}>
                  <Icon size={26} />
                  <h3>{group.title}</h3>
                  {group.items.map((item) => (
                    <p key={item}>
                      <CheckIcon size={16} /> {item}
                    </p>
                  ))}
                </article>
              );
            })}
          </div>
        </section>

        <section id="process" className="section process-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Quy trÃ¬nh lÃ m viá»‡c</p>
            <h2>RÃµ rÃ ng vÃ  minh báº¡ch</h2>
          </div>
          <div className="process-list">
            <div className="timeline-line">
              <span />
            </div>
            {processSteps.map(([step, title, Icon]) => (
              <article className="process-item reveal" key={step}>
                <div className="step-index">{step}</div>
                <Icon size={24} />
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section reasons-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Táº¡i sao chá»n DST Group</p>
            <h2>Äá»‘i tÃ¡c tÄƒng trÆ°á»Ÿng Ä‘Ã¡ng tin cáº­y</h2>
          </div>
          <div className="reason-grid">
            {reasons.map((reason) => (
              <article className="reason-card reveal" key={reason}>
                <CheckIcon size={22} />
                <p>{reason}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section project-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Dá»± Ã¡n tiÃªu biá»ƒu</p>
            <h2>Dáº¥u áº¥n triá»ƒn khai</h2>
          </div>
          <div className="project-rail">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <img src={project.img} alt={project.title} loading="lazy" decoding="async" />
                <div className="project-overlay">
                  <span>{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.goal}</p>
                  <strong>{project.result}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="clients" className="section clients-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Äá»‘i tÃ¡c vÃ  khÃ¡ch hÃ ng</p>
            <h2>ÄÆ°á»£c doanh nghiá»‡p tin tÆ°á»Ÿng</h2>
          </div>
          <div className="logo-cloud reveal">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <span key={`${logo}-${index}`}>{logo}</span>
            ))}
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card reveal" key={item.name}>
                <img src={item.img} alt={item.name} loading="lazy" decoding="async" />
                <div className="stars" aria-label="5 sao">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={15} fill="currentColor" />
                  ))}
                </div>
                <p>"{item.quote}"</p>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-content reveal">
            <p className="eyebrow">DST Group Marketing & Media</p>
            <h2>Sáºµn sÃ ng nÃ¢ng táº§m thÆ°Æ¡ng hiá»‡u?</h2>
            <p>
              HÃ£y chia sáº» má»¥c tiÃªu cá»§a báº¡n. Äá»™i ngÅ© DST Group sáº½ tÆ° váº¥n giáº£i phÃ¡p phÃ¹ há»£p vÃ  xÃ¢y dá»±ng káº¿ hoáº¡ch triá»ƒn khai
              cá»¥ thá»ƒ.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollToSection("contact")}>
                Nháº­n tÆ° váº¥n miá»…n phÃ­
              </button>
              <a className="ghost-btn" href="tel:0328247888">
                LiÃªn há»‡ ngay
              </a>
            </div>
          </div>
          <div className="cta-sphere" aria-hidden="true">
            <BrandLogo />
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-info reveal">
            <p className="eyebrow">LiÃªn há»‡</p>
            <h2>Nháº­n tÆ° váº¥n chiáº¿n lÆ°á»£c</h2>
            <p>
              CÃ´ng ty Cá»• pháº§n Táº­p ÄoÃ n DST
              <br />
              Äá»‹a chá»‰: Háº¡ Long, Quáº£ng Ninh
            </p>
            <a href="tel:0328247888">
              <Phone size={18} /> 0328 247 888
            </a>
            <a href="mailto:info@dstgroup.vn">
              <Mail size={18} /> info@dstgroup.vn
            </a>
            <a href="https://dstgroup.vn" target="_blank" rel="noreferrer">
              <ArrowUpRight size={18} /> dstgroup.vn
            </a>
          </div>
          <ContactForm />
        </section>
      </main>

      <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />

      <footer className="site-footer">
        <div>
          <BrandLogo variant="media" />
          <p>Dá»‹ch vá»¥ táº­n tÃ¢m - NÃ¢ng táº§m thÆ°Æ¡ng hiá»‡u.</p>
        </div>
        <div>
          <h3>Menu nhanh</h3>
          {navItems.slice(1).map(([label, id]) => (
            <button key={id} onClick={() => scrollToSection(id)}>
              {label}
            </button>
          ))}
        </div>
        <div>
          <h3>Dá»‹ch vá»¥</h3>
          {quickLinks.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </div>
        <div>
          <h3>Káº¿t ná»‘i</h3>
          <a href="tel:0328247888">Äiá»‡n thoáº¡i</a>
          <a href="mailto:info@dstgroup.vn">Email</a>
          <a href="https://dstgroup.vn" target="_blank" rel="noreferrer">
            Website
          </a>
          <span>Facebook â€¢ TikTok â€¢ YouTube â€¢ Zalo</span>
        </div>
        <p className="copyright">Â© DST Group. Dá»‹ch vá»¥ táº­n tÃ¢m - NÃ¢ng táº§m thÆ°Æ¡ng hiá»‡u.</p>
      </footer>

      <div className="floating-actions">
        <a href="tel:0328247888" aria-label="Gá»i DST Group">
          <Phone size={20} />
        </a>
        <a href="https://zalo.me/0328247888" aria-label="LiÃªn há»‡ Zalo DST Group">
          Zalo
        </a>
        <button onClick={() => scrollToSection("home")} aria-label="Quay láº¡i Ä‘áº§u trang">
          â†‘
        </button>
      </div>
    </>
  );
}

