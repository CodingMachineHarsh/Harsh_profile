import { useEffect, useRef, useState } from "react";
import SectionTitle from "./components/SectionTitle";
import { achievements, experience, oldExperience, profile, projects, skills } from "./portfolioData";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function App() {
  const cursorGlowRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const quickStats = [
    { value: "$100K+", label: "Monthly Savings Impact" },
    { value: "$700K+", label: "Total Savings Delivered" },
    { value: "140+", label: "Reusable Components Built" },
  ];
  const [activeSection, setActiveSection] = useState("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [theme, setTheme] = useState(() => window.localStorage.getItem("theme") || "dark");

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter((section) => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.25, 0.5], rootMargin: "-35% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const glowElement = cursorGlowRef.current;
    const dotElement = cursorDotRef.current;
    const ringElement = cursorRingRef.current;
    if (!glowElement || !dotElement || !ringElement || !window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    let animationFrameId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let dotX = targetX;
    let dotY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let previousTargetX = targetX;
    let previousTargetY = targetY;
    let hoverScale = 1;
    let pressScale = 1;
    const interactiveSelector = "a, button, .panel--bordered, .chip, .inline-link";

    const onMouseMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      glowElement.style.opacity = "1";
      dotElement.style.opacity = "1";
      ringElement.style.opacity = "1";
    };

    const onMouseLeave = () => {
      glowElement.style.opacity = "0";
      dotElement.style.opacity = "0";
      ringElement.style.opacity = "0";
    };

    const onPointerOver = (event) => {
      if (event.target.closest(interactiveSelector)) {
        hoverScale = 1.32;
        ringElement.classList.add("is-hovering");
      }
    };

    const onPointerOut = (event) => {
      if (event.target.closest(interactiveSelector) && !event.relatedTarget?.closest(interactiveSelector)) {
        hoverScale = 1;
        ringElement.classList.remove("is-hovering");
      }
    };

    const onMouseDown = () => {
      pressScale = 0.82;
      dotElement.classList.add("is-pressed");
    };

    const onMouseUp = () => {
      pressScale = 1;
      dotElement.classList.remove("is-pressed");
    };

    const animate = () => {
      const velocityX = targetX - previousTargetX;
      const velocityY = targetY - previousTargetY;
      const velocity = Math.min(Math.hypot(velocityX, velocityY), 42);
      const velocityScale = 1 + velocity / 110;

      dotX += (targetX - dotX) * 0.36;
      dotY += (targetY - dotY) * 0.36;
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;

      const finalRingScale = velocityScale * hoverScale * pressScale;
      const finalDotScale = (hoverScale > 1 ? 1.35 : 1) * pressScale;

      dotElement.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0) scale(${finalDotScale})`;
      ringElement.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) scale(${finalRingScale})`;
      glowElement.style.transform = `translate3d(${ringX - 140}px, ${ringY - 140}px, 0) scale(${1 + velocity / 220})`;

      previousTargetX = targetX;
      previousTargetY = targetY;
      animationFrameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout", onMouseLeave);
    window.addEventListener("mouseover", onPointerOver);
    window.addEventListener("mouseout", onPointerOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
      window.removeEventListener("mouseover", onPointerOver);
      window.removeEventListener("mouseout", onPointerOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    const cards = Array.from(document.querySelectorAll(".panel--bordered"));
    const buttons = Array.from(document.querySelectorAll(".btn"));
    const cleanupFns = [];

    cards.forEach((card) => {
      const onMove = (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty("--spot-x", `${x}px`);
        card.style.setProperty("--spot-y", `${y}px`);
      };

      const onEnter = () => card.classList.add("card-active");
      const onLeave = () => card.classList.remove("card-active");

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanupFns.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    buttons.forEach((button) => {
      const onMove = (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      };

      const onLeave = () => {
        button.style.transform = "";
      };

      button.addEventListener("mousemove", onMove);
      button.addEventListener("mouseleave", onLeave);
      cleanupFns.push(() => {
        button.removeEventListener("mousemove", onMove);
        button.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="page-shell neon-mode">
      <div className="cursor-glow" ref={cursorGlowRef} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <div className="background-overlay" aria-hidden="true" />
      <header className="top-nav">
        <p className="top-nav__name">
          {profile.name}
          <span>{profile.role}</span>
        </p>
        <div className="top-nav__actions">
          <nav className="section-nav" aria-label="Page sections">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="btn btn--small btn--ghost btn--theme"
            onClick={() => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? "Light UI" : "Dark UI"}
          </button>
          <a className="btn btn--small" href={`mailto:${profile.email}`}>
            Connect Me
          </a>
        </div>
      </header>

      <main className="content">
        <section className="hero panel reveal-on-scroll is-visible" id="about">
          <div className="hero-layout">
            <div className="hero-main">
              <span className="pill">
                <span aria-hidden="true">✦</span> Open to software opportunities
              </span>
              <h1>
                {profile.name}
                <span>{profile.role}</span>
              </h1>
              <p className="hero-tagline">{profile.tagline}</p>
              <p>{profile.about}</p>

              <div className="meta-grid">
                <p>
                  <span aria-hidden="true">📍</span> {profile.location}
                </p>
                <p>
                  <span aria-hidden="true">🎓</span> {profile.education}
                </p>
                <p>
                  <span aria-hidden="true">📞</span> {profile.phone}
                </p>
                <p>
                  <span aria-hidden="true">✉</span> {profile.email}
                </p>
              </div>

              <div className="hero-actions">
                <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  <span aria-hidden="true">in</span> LinkedIn
                </a>
                <a className="btn btn--ghost" href={profile.links.github} target="_blank" rel="noreferrer">
                  <span aria-hidden="true">{`</>`}</span> GitHub
                </a>
              </div>
              <div className="stats-grid">
                {quickStats.map((stat) => (
                  <article className="stat-card" key={stat.label}>
                    <p>{stat.value}</p>
                    <span>{stat.label}</span>
                  </article>
                ))}
              </div>
            </div>
            <div className="hero-image-wrap">
              <img
                src="/images/harsh-profile.png"
                alt="Harsh Raj portrait"
                className="hero-image"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <SectionTitle
            eyebrow="Professional Journey"
            title="Experience"
            description="Hands-on work across data engineering, product development, and design leadership."
          />
          <div className="grid gap-lg">
            {experience.map((item, itemIndex) => (
              <article
                className="panel panel--bordered reveal-on-scroll"
                key={`${item.company}-${item.role}`}
                style={{ "--reveal-delay": `${itemIndex * 70}ms` }}
              >
                <div className="panel__header">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                  <div className="panel__meta">
                    <span>{item.duration}</span>
                    <span>{item.location}</span>
                  </div>
                </div>
                {item.sections?.length ? (
                  <div className="experience-sections">
                    {item.sections.map((section) => (
                      <section className="experience-section" key={`${item.role}-${section.title}`}>
                        <h4>{section.title}</h4>
                        {section.techStack?.length ? (
                          <div className="chip-list experience-tech-list">
                            {section.techStack.map((tech) => (
                              <span className="chip" key={`${section.title}-${tech}`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <ul>
                          {section.highlights.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                ) : (
                  <>
                    {item.techStack?.length ? (
                      <div className="chip-list experience-tech-list">
                        {item.techStack.map((tech) => (
                          <span className="chip" key={`${item.role}-${tech}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <ul>
                      {item.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <SectionTitle
            eyebrow="Selected Work"
            title="Projects"
            description="A mix of product engineering, applied AI, and frontend development."
          />
          <div className="project-grid">
            {projects.map((project, projectIndex) => {
              const projectLink = project.linkKey ? profile.links[project.linkKey] : null;
              return (
                <article
                  className="panel panel--bordered project-card reveal-on-scroll"
                  key={project.title}
                  style={{ "--reveal-delay": `${projectIndex * 80}ms` }}
                >
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="chip-list">
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {projectLink ? (
                    <a href={projectLink} target="_blank" rel="noreferrer" className="inline-link">
                      View project <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {project.links?.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-link project-link"
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </article>
              );
            })}
          </div>
        </section>

        {oldExperience.length > 0 ? (
          <section className="section">
            <SectionTitle
              eyebrow="Earlier Roles"
              title="Old Experience"
              description="Experience from previous leadership and mentorship roles."
            />
            <div className="grid gap-lg">
              {oldExperience.map((item, oldItemIndex) => (
                <article
                  className="panel panel--bordered reveal-on-scroll"
                  key={`${item.company}-${item.role}`}
                  style={{ "--reveal-delay": `${oldItemIndex * 70}ms` }}
                >
                  <div className="panel__header">
                    <div>
                      <h3>{item.role}</h3>
                      <p>{item.company}</p>
                    </div>
                    <div className="panel__meta">
                      <span>{item.duration}</span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <ul>
                    {item.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="section split-layout" id="skills">
          <article className="panel panel--bordered reveal-on-scroll">
            <SectionTitle
              eyebrow="Core Capabilities"
              title="Skills"
              description="Technology stack used in production and project environments."
            />
            <div className="skill-groups">
              <div>
                <h3>Engineering</h3>
                <div className="chip-list">
                  {skills.engineering.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3>Languages</h3>
                <div className="chip-list">
                  {skills.languages.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3>Tools</h3>
                <div className="chip-list">
                  {skills.tools.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {achievements.length > 0 ? (
            <article className="panel panel--bordered reveal-on-scroll">
              <SectionTitle eyebrow="Recognition" title="Achievements" />
              <ul className="achievement-list">
                {achievements.map((achievement) => (
                  <li key={achievement}>
                    <span aria-hidden="true">🏆</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </article>
          ) : (
            <article className="panel panel--bordered reveal-on-scroll" id="contact">
              <SectionTitle
                eyebrow="Contact"
                title="Let's Connect"
                description="Reach out to discuss software engineering, product ideas, and collaboration."
              />
              <a href={`mailto:${profile.email}`} className="btn btn--small">
                <span aria-hidden="true">✉</span> Connect Me
              </a>
            </article>
          )}
        </section>

        <section className="section section-compact-achievement reveal-on-scroll">
          <article className="panel panel--bordered compact-achievement-card">
            <SectionTitle eyebrow="Recognition" title="Achievements" />
            <div className="compact-achievement-list">
              <div className="compact-achievement-item">1st Runner Up · Kavach 2023</div>
              <div className="compact-achievement-item">Top 5 · House of Hackers, IIIT Ranchi</div>
            </div>
          </article>
        </section>
      </main>

      <footer className="footer">
        <p>Designed and developed by {profile.name}</p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
      {showBackToTop ? (
        <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑
        </button>
      ) : null}
    </div>
  );
}

export default App;
