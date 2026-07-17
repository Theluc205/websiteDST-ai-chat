"use client";

import {
  ArrowUpRight,
  ChevronRight,
  Mail,
  Menu,
  Mouse,
  Phone,
  Play,
  Send,
  Star,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import * as THREE from "three";
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
  VideoIcon,
} from "./site-data";

const marqueeItems = [
  "Marketing Strategy",
  "Creative Content",
  "Media Production",
  "TikTok Shop",
  "Branding",
  "Digital Transformation",
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const shell = sceneRef.current;
    if (!canvas || !shell) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const group = new THREE.Group();
    scene.add(group);

    const gold = new THREE.MeshStandardMaterial({
      color: "#e9a037",
      metalness: 0.62,
      roughness: 0.22,
      emissive: "#2d1703",
    });
    const teal = new THREE.MeshStandardMaterial({
      color: "#31585b",
      metalness: 0.45,
      roughness: 0.28,
      emissive: "#071516",
    });
    const lineMaterial = new THREE.LineBasicMaterial({ color: "#e9a037", transparent: true, opacity: 0.45 });

    const torus = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.015, 12, 160), gold);
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(3.05, 0.01, 12, 160), teal);
    orbit.rotation.x = Math.PI / 2.7;
    group.add(torus, orbit);

    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.52, 0.52), gold);
    cube.position.set(-2.7, 1.5, 0.2);
    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.48), teal);
    octa.position.set(2.45, -1.45, 0.4);
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.34, 0.08, 80, 8), gold);
    knot.position.set(2.5, 1.35, -0.4);
    group.add(cube, octa, knot);

    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 90; i += 1) {
      const angle = i * 0.45;
      const radius = 1.7 + (i % 12) * 0.13;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(i) * 0.45));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.Line(geometry, lineMaterial));

    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(190 * 3);
    for (let i = 0; i < particlePositions.length; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 7;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: "#f6c66b", size: 0.025, transparent: true, opacity: 0.75 }),
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight("#f5f5f3", 0.5));
    const key = new THREE.PointLight("#e9a037", 6, 12);
    key.position.set(-1.5, 2.5, 3);
    scene.add(key);
    const rim = new THREE.PointLight("#76a0a3", 4, 10);
    rim.position.set(3, -1, 3);
    scene.add(rim);

    const resize = () => {
      const { width, height } = shell.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const pointer = { x: 0, y: 0 };
    const onMove = (event: PointerEvent) => {
      const rect = shell.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!reduced) {
        group.rotation.y += 0.004;
        group.rotation.x += (pointer.y * 0.18 - group.rotation.x) * 0.04;
        group.rotation.z += (pointer.x * 0.11 - group.rotation.z) * 0.04;
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.008;
        octa.rotation.y -= 0.009;
        knot.rotation.x += 0.012;
        particles.rotation.y += 0.0015;
      }
      renderer.render(scene, camera);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    shell.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      shell.removeEventListener("pointermove", onMove);
      renderer.dispose();
      geometry.dispose();
      particlesGeometry.dispose();
    };
  }, []);

  return (
    <div className="hero-visual" ref={sceneRef} aria-label="Logo DST trong không gian 3D">
      <canvas ref={canvasRef} />
      <div className="logo-orb">
        <Image src="/assets/logo-dst-marketing-media.png" alt="DST Marketing Media" width={520} height={292} priority />
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
          Họ và tên
          <input required name="name" placeholder="Nguyễn Văn A" />
        </label>
        <label>
          Số điện thoại
          <input required name="phone" inputMode="tel" pattern="^[0-9+\\s]{8,15}$" placeholder="0328 247 888" />
        </label>
        <label>
          Email
          <input required name="email" type="email" placeholder="email@doanhnghiep.vn" />
        </label>
        <label>
          Tên doanh nghiệp
          <input required name="company" placeholder="Tên công ty" />
        </label>
        <label>
          Dịch vụ quan tâm
          <select required name="service" defaultValue="">
            <option value="" disabled>
              Chọn dịch vụ
            </option>
            {quickLinks.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Ngân sách dự kiến
          <select required name="budget" defaultValue="">
            <option value="" disabled>
              Chọn khoảng ngân sách
            </option>
            <option>Dưới 20 triệu</option>
            <option>20 - 50 triệu</option>
            <option>50 - 100 triệu</option>
            <option>Trên 100 triệu</option>
          </select>
        </label>
      </div>
      <label>
        Nội dung cần tư vấn
        <textarea required name="message" rows={5} placeholder="Chia sẻ mục tiêu, ngành hàng và thời gian mong muốn..." />
      </label>
      <label className="policy">
        <input required type="checkbox" />
        Tôi đồng ý để DST Group liên hệ tư vấn và xử lý thông tin theo chính sách bảo mật.
      </label>
      <button className="primary-btn wide" type="submit" aria-label="Gửi yêu cầu tư vấn">
        Gửi yêu cầu tư vấn <Send size={18} />
      </button>
      {sent ? <p className="success-message">Cảm ơn bạn. DST Group sẽ liên hệ tư vấn trong thời gian sớm nhất.</p> : null}
    </form>
  );
}

export function DstLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => setLoaded(true), 900);

    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let rafId = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function bootMotion() {
      if (!reduced) {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      }

      const gsapModule = await import("gsap");
      const scrollModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      gsap.registerPlugin(scrollModule.ScrollTrigger);

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 34, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 84%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((element) => {
        const raw = element.dataset.count ?? "";
        const numeric = Number(raw.replace(/[^0-9]/g, ""));
        if (!numeric) return;
        const suffix = raw.replace(/[0-9]/g, "");
        gsap.fromTo(
          element,
          { textContent: 0 },
          {
            textContent: numeric,
            duration: 1.4,
            snap: { textContent: 1 },
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 86%" },
            onUpdate: () => {
              element.textContent = `${Math.round(Number(element.textContent))}${suffix}`;
            },
          },
        );
      });

      gsap.fromTo(
        ".timeline-line span",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: { trigger: ".process-list", start: "top 80%", end: "bottom 35%", scrub: true },
        },
      );
    }

    bootMotion();

    const onPointer = (event: PointerEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    window.addEventListener("pointermove", onPointer);

    return () => {
      window.clearTimeout(loadTimer);
      window.removeEventListener("pointermove", onPointer);
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  function handleTilt(event: MouseEvent<HTMLElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--rx", `${-(y / rect.height - 0.5) * 8}deg`);
    card.style.setProperty("--ry", `${(x / rect.width - 0.5) * 8}deg`);
  }

  function clearTilt(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  }

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <div className={`loader ${loaded ? "loader-done" : ""}`} aria-hidden={loaded}>
        <Image src="/assets/logo-dst-group.png" alt="" width={240} height={120} priority />
        <span>Đang khởi tạo hệ sinh thái thương hiệu</span>
      </div>

      <header className="site-header">
        <button className="brand" onClick={() => scrollToSection("home")} aria-label="Về đầu trang">
          <Image src="/assets/logo-dst-group.png" alt="DST Group" width={148} height={70} priority />
        </button>
        <nav className="desktop-nav" aria-label="Menu chính">
          {navItems.map(([label, id]) => (
            <button key={id} onClick={() => scrollToSection(id)}>
              {label}
            </button>
          ))}
        </nav>
        <button className="header-cta" onClick={() => scrollToSection("contact")}>
          Nhận tư vấn
        </button>
        <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="Mở menu">
          <Menu />
        </button>
      </header>

      <div className={`mobile-panel ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <button className="close-btn" onClick={() => setMenuOpen(false)} aria-label="Đóng menu">
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
            <p className="eyebrow">MARKETING • MEDIA • BRANDING</p>
            <h1>
              Giải pháp Marketing toàn diện giúp thương hiệu <span>tăng trưởng bền vững</span>
            </h1>
            <p className="hero-desc">
              DST Group cung cấp hệ sinh thái Marketing, Media, Branding và chuyển đổi số dành cho doanh nghiệp. Chúng tôi
              đồng hành từ chiến lược, sáng tạo nội dung đến triển khai và tối ưu hiệu quả.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollToSection("services")}>
                Khám phá dịch vụ <ChevronRight size={18} />
              </button>
              <button className="ghost-btn" onClick={() => scrollToSection("contact")}>
                Nhận tư vấn miễn phí
              </button>
            </div>
            <div className="hero-metrics">
              <span>
                <Zap size={18} /> ADS • TIKTOK SHOP • DESIGN • MEDIA • CONTENT • BRANDING
              </span>
            </div>
          </div>
          <HeroScene />
          <button className="scroll-cue" onClick={() => scrollToSection("about")} aria-label="Cuộn xuống phần giới thiệu">
            <Mouse size={18} />
          </button>
        </section>

        <section className="marquee-strip" aria-label="Năng lực nổi bật">
          <div>
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section id="about" className="section split-section">
          <div className="media-panel reveal">
            <Image src="/assets/01-team-event-launch.jpg" alt="Đội ngũ DST trong một sự kiện ra mắt" width={780} height={980} />
            <div className="media-badge">
              <UsersIcon size={20} /> Strategy rõ ràng • Triển khai minh bạch
            </div>
          </div>
          <div className="section-copy reveal">
            <p className="eyebrow">Về chúng tôi</p>
            <h2>Không chỉ làm Marketing, chúng tôi xây dựng giá trị thương hiệu</h2>
            <p>
              DST Group là đơn vị cung cấp giải pháp Marketing và Media toàn diện, đồng hành cùng doanh nghiệp trong quá
              trình xây dựng thương hiệu, tiếp cận khách hàng và phát triển kinh doanh.
            </p>
            <div className="stats-grid">
              {stats.map((item) => (
                <div key={item.label}>
                  <strong data-count={item.value}>
                    {item.value}
                  </strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <p className="highlight-line">Chiến lược rõ ràng - Triển khai minh bạch - Tối ưu liên tục</p>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-heading reveal">
            <p className="eyebrow">Hệ sinh thái dịch vụ</p>
            <h2>Giải pháp toàn diện cho doanh nghiệp</h2>
            <p>
              Từ chiến lược đến thực thi, DST Group cung cấp đầy đủ giải pháp giúp doanh nghiệp xây dựng thương hiệu và
              tăng trưởng doanh thu.
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
                  <button onClick={() => scrollToSection("contact")}>
                    Xem chi tiết <ArrowUpRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="package-section">
          <div className="package-inner reveal">
            <div>
              <p className="eyebrow dark">Giải pháp trọn gói</p>
              <h2>Chi phí tối ưu cho một đội Marketing chuyên nghiệp</h2>
            </div>
            <button className="dark-btn" onClick={() => scrollToSection("contact")}>
              Yêu cầu báo giá
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
            <p className="eyebrow">Quy trình làm việc</p>
            <h2>Quy trình rõ ràng, hiệu quả minh bạch</h2>
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
            <p className="eyebrow">Tại sao chọn DST Group</p>
            <h2>Đối tác tăng trưởng đáng tin cậy</h2>
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
            <p className="eyebrow">Dự án tiêu biểu</p>
            <h2>Những dự án tạo nên dấu ấn</h2>
          </div>
          <div className="project-rail">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <Image src={project.img} alt={project.title} width={620} height={430} />
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
            <p className="eyebrow">Đối tác và khách hàng</p>
            <h2>Được tin tưởng bởi nhiều doanh nghiệp</h2>
          </div>
          <div className="logo-cloud reveal">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <span key={`${logo}-${index}`}>{logo}</span>
            ))}
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card reveal" key={item.name}>
                <Image src={item.img} alt={item.name} width={92} height={92} />
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
            <h2>Sẵn sàng đưa thương hiệu của bạn lên một tầm cao mới?</h2>
            <p>
              Hãy chia sẻ mục tiêu của bạn. Đội ngũ DST Group sẽ tư vấn giải pháp phù hợp và xây dựng kế hoạch triển khai
              cụ thể.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollToSection("contact")}>
                Nhận tư vấn miễn phí
              </button>
              <a className="ghost-btn" href="tel:0328247888">
                Liên hệ ngay
              </a>
            </div>
          </div>
          <div className="cta-sphere" aria-hidden="true">
            <Image src="/assets/logo-dst-group.png" alt="" width={360} height={180} />
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-info reveal">
            <p className="eyebrow">Liên hệ</p>
            <h2>Nhận tư vấn chiến lược Marketing phù hợp</h2>
            <p>
              Công ty Cổ phần Tập Đoàn DST
              <br />
              Địa chỉ: Hạ Long, Quảng Ninh
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

      <footer className="site-footer">
        <div>
          <Image src="/assets/logo-dst-marketing-media.png" alt="DST Group Marketing Media" width={210} height={118} />
          <p>Dịch vụ tận tâm - Nâng tầm thương hiệu.</p>
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
          <h3>Dịch vụ</h3>
          {quickLinks.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </div>
        <div>
          <h3>Kết nối</h3>
          <a href="tel:0328247888">Điện thoại</a>
          <a href="mailto:info@dstgroup.vn">Email</a>
          <a href="https://dstgroup.vn" target="_blank" rel="noreferrer">
            Website
          </a>
          <span>Facebook • TikTok • YouTube • Zalo</span>
        </div>
        <p className="copyright">© DST Group. Dịch vụ tận tâm - Nâng tầm thương hiệu.</p>
      </footer>

      <div className="floating-actions">
        <a href="tel:0328247888" aria-label="Gọi DST Group">
          <Phone size={20} />
        </a>
        <a href="https://zalo.me/0328247888" aria-label="Liên hệ Zalo DST Group">
          Zalo
        </a>
        <button onClick={() => scrollToSection("home")} aria-label="Quay lại đầu trang">
          ↑
        </button>
      </div>
    </>
  );
}
