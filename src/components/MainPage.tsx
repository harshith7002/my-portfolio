import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Types ─── */
interface Project {
  title: string;
  desc: string;
  tags: string[];
  year: string;
}
interface Achievement {
  title: string;
  org: string;
  year: string;
}

/* ─── Data ─── */
const PROJECTS: Project[] = [
  { title: "StockSim — Monte Carlo Stock Market Simulator", desc: "GBM-based price simulation using S(t+1)=S(t)·exp((μ−½σ²)dt+σ√dt·Z). Full-stack trading engine with Flask, normalized MySQL schema, portfolio P&L tracking.", tags: ["Python", "Flask", "MySQL"], year: "2026" },
  { title: "AI Fraud & Phishing Detection System", desc: "Multi-modal fraud detection using Hugging Face Transformers (BERT) for NLP-based phishing classification. Production FastAPI backend deployed on Render.", tags: ["PyTorch", "FastAPI", "React"], year: "2026" },
  { title: "Gemini Multi-Function AI Agent", desc: "Agentic AI system deployed on Google Cloud Run with multi-function tool calling, autonomous task execution, and structured JSON responses.", tags: ["Python", "Gemini API", "GCP"], year: "2026" },
  { title: "Antera — Anxiety Management iOS App", desc: "SwiftUI app submitted to Apple Swift Student Challenge 2026. Guided breathing sessions with haptic feedback, calming visuals, and sound cues.", tags: ["Swift", "SwiftUI", "Xcode"], year: "2026" },
];

const ACHIEVEMENTS: Achievement[] = [
  { title: "HP Power Lab 2.0 — Top 323 / 1.3L+", org: "Hindustan Petroleum Corporation", year: "2026" },
  { title: "3SVK National Hackathon — Top 150 / 1400+", org: "3SVK Infinite Excellence", year: "2026" },
  { title: "Make-A-Thon 2026 — Top 10 Finalist", org: "ACM-W SRMIST", year: "2026" },
  { title: "Apple Swift Student Challenge — Submitted", org: "Apple Inc.", year: "2026" },
];

const SKILLS = ["Python", "Java", "C++", "Swift", "React", "TypeScript", "Node.js", "FastAPI", "PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "MySQL", "PostgreSQL", "MongoDB", "Google Cloud"];

const VERT = `
  attribute vec2 a_pos;
  void main(){ gl_Position = vec4(a_pos,0,1); }
`;

const FRAG = `
  precision highp float;
  uniform vec2  u_res;
  uniform float u_time;
  uniform vec2  u_mouse;

  float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
               mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
  }
  float fbm(vec2 p){
    float v=0.,a=.5;
    for(int i=0;i<5;i++){v+=a*noise(p);p*=2.1;a*=.5;}
    return v;
  }
  float sdSphere(vec3 p,float r){ return length(p)-r; }

  vec3 rayOrb(vec2 uv,vec2 off,float sz){
    vec3 ro=vec3(0,0,3.),rd=normalize(vec3(uv+off,-1.5));
    float d=0.; vec3 col=vec3(0);
    for(int i=0;i<56;i++){
      vec3 p=ro+rd*d;
      float s=sdSphere(p-vec3(off*.6,0.),sz);
      if(s<0.001){
        vec3 n=normalize(p-vec3(off*.6,0.));
        float diff=max(0.,dot(n,normalize(vec3(1,1,2))));
        float rim=pow(1.-max(0.,dot(n,-rd)),3.);
        col=vec3(.05,.42,.38)*diff+vec3(.35,.95,.85)*rim*.9;
        break;
      }
      if(d>8.) break; d+=s*.75;
    }
    return col;
  }

  void main(){
    vec2 uv=(gl_FragCoord.xy-u_res*.5)/u_res.y;
    float t=u_time; vec2 m=u_mouse*.28;
    vec3 col=vec3(0);

    for(int l=0;l<3;l++){
      float depth=float(l)*.4+.5;
      vec2 sp=uv*(8.+float(l)*6.)+vec2(t*.007*depth,t*.003*depth)-m*depth*.5;
      float star=hash(floor(sp)+float(l)*17.3);
      if(star>.92){
        float sz=(star-.92)/.08;
        float dd=length(fract(sp)-.5);
        col+=vec3(.8,.95,1.)*exp(-dd*dd*80.)*sz*(.3+.7/depth)*(.7+.3*sin(t*2.+star*43.7))/depth;
      }
    }

    float neb=fbm(uv*2.5+vec2(t*.014,t*.007)-m*.8);
    float neb2=fbm(uv*3.5-vec2(t*.009,t*.011)+m*.4);
    vec3 nebC=mix(vec3(.018,.07,.11),vec3(.035,.13,.16),neb);
    nebC=mix(nebC,vec3(.01,.055,.085)*2.,neb2*neb2);
    col=mix(col,nebC,.62);

    vec2 o1=vec2(sin(t*.22)*.42+.48,cos(t*.17)*.24)+m*.06;
    vec2 o2=vec2(-sin(t*.16)*.5-.44,sin(t*.20)*.28)+m*.04;
    vec2 o3=vec2(cos(t*.12)*.22,-.38+sin(t*.24)*.14)+m*.08;
    col+=rayOrb(uv,o1,.52)*.7;
    col+=rayOrb(uv,o2,.40)*.52;
    col+=rayOrb(uv,o3,.30)*.38;
    col+=vec3(.28,.88,.78)*exp(-length(uv-o1*.8)*length(uv-o1*.8)*2.8)*.09;
    col+=vec3(.18,.68,.68)*exp(-length(uv-o2*.8)*length(uv-o2*.8)*3.5)*.07;

    float hy=uv.y+.38+m.y*.1;
    col+=vec3(.04,.28,.28)*exp(-abs(hy)*11.)*(.5+.5*sin(t*.28+uv.x*1.4))*.55;

    vec2 grid=fract(uv*18.-vec2(t*.04,0.));
    col+=vec3(.18,.68,.58)*(exp(-abs(grid.x-.5)*20.)*.024+exp(-abs(grid.y-.5)*20.)*.017);

    vec2 fd=normalize(vec2(1,1));
    float fw=exp(-abs(dot(uv-vec2(.58,.38),vec2(-fd.y,fd.x)))*200.);
    col+=vec3(.38,.98,.88)*max(0.,dot(uv-vec2(.58,.38),fd))*fw*.11;

    col*=1.-smoothstep(.5,1.4,length(uv)*1.3)*.88;
    col=col/(col+.5);
    col=pow(col,vec3(.45));
    gl_FragColor=vec4(col,1);
  }
`;
function useWebGL(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = (
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    ) as WebGLRenderingContext | null;
    if (!gl) return;

    const makeShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, makeShader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const frame = (ts: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, ts * 0.001);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [canvasRef, mouseRef]);
}

/* ═══════════════════════════════════════
   SCROLL-REVEAL HOOK
═══════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "translateY(0) translateX(0)";
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ═══════════════════════════════════════
   TYPING HOOK
═══════════════════════════════════════ */
function useTyping(text: string, speed = 42, startDelay = 1400) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return displayed;
}

/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
export default function MainPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);

  const [shown,     setShown]     = useState(false);
  const [time,      setTime]      = useState("");
  const [activeNav, setActiveNav] = useState("home");
  const [hovBtn,    setHovBtn]    = useState<string | null>(null);
  const [hovName,   setHovName]   = useState(false);
  const [trail,     setTrail]     = useState<{x:number;y:number;id:number}[]>([]);
  const [scanY,     setScanY]     = useState<number | null>(null);
  const trailId  = useRef(0);
  const lastScan = useRef(0);

  const roleText   = useTyping("Web Developer · App Developer · AI/ML Enthusiast", 42, 1400);
  const showCursor = roleText.length < "Web Developer · App Developer · AI/ML Enthusiast".length;

  useWebGL(canvasRef, mouseRef);
  useReveal();

  /* Mouse tracking + particle trail */
  useEffect(() => {
    let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x:   (e.clientX / window.innerWidth)  * 2 - 1,
        y: -(( e.clientY / window.innerHeight) * 2 - 1),
      };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top  = e.clientY + "px";
      }
      rx += (e.clientX - rx) * 0.12;
      ry += (e.clientY - ry) * 0.12;
      setTrail(prev => {
        const next = [{ x: e.clientX, y: e.clientY, id: ++trailId.current }, ...prev].slice(0, 5);
        return next;
      });
    };
    const interval = setInterval(() => {
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top  = ry + "px";
      }
    }, 16);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); clearInterval(interval); };
  }, []);

  /* Section scan line on scroll */
  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      if (now - lastScan.current < 800) return;
      lastScan.current = now;
      setScanY(window.innerHeight / 2);
      setTimeout(() => setScanY(null), 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Clock */
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-IN", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* Hero reveal */
  useEffect(() => { const id = setTimeout(() => setShown(true), 300); return () => clearTimeout(id); }, []);

  /* Smooth scroll */
  const scrollTo = useCallback((id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ── render ── */
  return (
    <div style={S.root}>
      {/* Cursor */}
      <div ref={cursorRef} style={S.cursor} />
      <div ref={ringRef}   style={S.cursorRing} />

      {/* Particle trail */}
      {trail.map((pt, i) => (
        <div key={pt.id} style={{
          position: "fixed", left: pt.x, top: pt.y,
          width: 5 - i * 0.6, height: 5 - i * 0.6,
          borderRadius: "50%",
          background: `rgba(100,220,200,${0.55 - i * 0.1})`,
          pointerEvents: "none", zIndex: 9997,
          transform: "translate(-50%,-50%)",
          transition: "all 0.12s ease",
        }} />
      ))}

      {/* Section scan line */}
      {scanY !== null && (
        <div style={{
          position: "fixed", left: 0, top: scanY, width: "100%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(100,220,200,0.4), transparent)",
          pointerEvents: "none", zIndex: 20,
          animation: "scanSweep 0.6s ease-out forwards",
        }} />
      )}

      {/* WebGL */}
      <canvas ref={canvasRef} style={S.canvas} />

      {/* Overlays */}
      <div style={S.vignette} />
      <div style={S.scanline} />
      {(["tl","tr","bl","br"] as const).map(p => (
        <div key={p} style={{ ...S.corner, ...corners[p] }} />
      ))}
      <div style={{ ...S.sideLine, left: 22 }} />
      <div style={{ ...S.sideLine, right: 22 }} />

      {/* ── NAV ── */}
      <nav style={{
        ...S.nav,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(-20px)",
      }}>
        <button onClick={() => scrollTo("home")} style={S.navLogo}>SH</button>

        <ul style={S.navLinks}>
          {["home","about","projects","achievements","contact"].map(id => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} style={{
                ...S.navLink,
                color: activeNav === id ? "rgba(100,220,200,0.9)" : "rgba(255,255,255,0.42)",
              }}>
                {id.toUpperCase()}
                {activeNav === id && <span style={S.navUnderline} />}
              </button>
            </li>
          ))}
        </ul>

        <div style={S.navRight}>
          
          <a href="https://drive.google.com/file/d/1F350VhTyFlj1Oi4tYNQlJc6wxJFKr9Tk/view?usp=sharing" target="_blank" rel="noreferrer" style={{ ...S.resumeBtn, textDecoration: "none", display: "inline-block" }}>⬡ RESUME</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={S.hero}>
        <span style={{
          ...S.labelTag,
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(14px)",
        }}>
          Portfolio
        </span>

        <h1
          style={S.heroName}
          onMouseEnter={() => setHovName(true)}
          onMouseLeave={() => setHovName(false)}
        >
          <span
            className={hovName ? "glitch-text" : ""}
            style={{
              ...S.nameSolid,
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(-50px)",
            }}
            data-text="Sai Harshith"
          >
            Sai Harshith
          </span>
          <span
            className={hovName ? "glitch-text" : ""}
            style={{
              ...S.nameOutline,
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(50px)",
            }}
            data-text="Moluguri"
          >
            Moluguri
          </span>
        </h1>

        <p style={{
          ...S.heroRole,
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(16px)",
          transitionDelay: "0.4s",
        }}>
          {roleText}
          {showCursor && <span className="typing-cursor">|</span>}
        </p>

        <p style={{
          ...S.heroTech,
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(16px)",
          transitionDelay: "0.55s",
        }}>
          React · TypeScript · FastAPI · TensorFlow · Cloud · Swift
        </p>

        <div style={{
          ...S.heroBtns,
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(24px)",
          transitionDelay: "0.7s",
        }}>
          <button
            onClick={() => scrollTo("projects")}
            onMouseEnter={() => setHovBtn("vp")}
            onMouseLeave={() => setHovBtn(null)}
            style={{
              ...S.btnPrimary,
              background: hovBtn === "vp" ? "rgba(100,220,200,0.22)" : "rgba(100,220,200,0.08)",
              borderColor: hovBtn === "vp" ? "rgba(100,220,200,0.8)" : "rgba(100,220,200,0.28)",
              color: hovBtn === "vp" ? "#fff" : "rgba(100,220,200,0.9)",
              transform: hovBtn === "vp" ? "translateY(-3px)" : "translateY(0)",
            }}
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            onMouseEnter={() => setHovBtn("ct")}
            onMouseLeave={() => setHovBtn(null)}
            style={{
              ...S.btnSecondary,
              color: hovBtn === "ct" ? "#fff" : "rgba(255,255,255,0.45)",
              borderColor: hovBtn === "ct" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.13)",
              transform: hovBtn === "ct" ? "translateY(-3px)" : "translateY(0)",
            }}
          >
            Contact
          </button>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={S.section}>
        <div style={S.sectionInner}>
          <SectionLabel>About</SectionLabel>
          <h2 data-reveal style={S.sectionTitle}>
            Crafting digital<br />
            <em style={{ color: "rgba(100,220,200,0.75)", fontStyle: "italic" }}>experiences</em>
          </h2>
          <div style={S.aboutGrid}>
            <div data-reveal style={{ ...S.revealBase, transitionDelay: "0.1s" }}>
              <p style={S.aboutText}>
                I'm a full-stack developer and AI/ML enthusiast based in Hyderabad, passionate about
                building products at the intersection of beautiful UI and intelligent systems.
              </p>
              <p style={{ ...S.aboutText, marginTop: "1.2rem" }}>
                Currently pursuing B.Tech in Computer Science at SRM Institute of Science and Technology
                (CGPA: 8.51), with a deep love for React ecosystems, Python backends, and cloud-native architectures.
              </p>
            </div>
            <div data-reveal style={{ ...S.revealBase, transitionDelay: "0.25s" }}>
              <p style={S.skillsLabel}>TECHNICAL SKILLS</p>
              <div style={S.skillsGrid}>
                {SKILLS.map((s, i) => (
                  <span
                    key={s}
                    style={{
                      ...S.skillPill,
                      animationDelay: `${i * 0.05}s`,
                    }}
                    className="skill-pill-anim"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={S.section}>
        <div style={S.sectionInner}>
          <SectionLabel>Projects</SectionLabel>
          <h2 data-reveal style={S.sectionTitle}>Selected work</h2>
          <div style={S.projectsGrid}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" style={S.section}>
        <div style={S.sectionInner}>
          <SectionLabel>Achievements</SectionLabel>
          <h2 data-reveal style={S.sectionTitle}>Recognition</h2>
          <div style={S.achList}>
            {ACHIEVEMENTS.map((a, i) => <AchRow key={a.title} ach={a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ ...S.section, minHeight: "80vh" }}>
        <div style={S.sectionInner}>
          <SectionLabel>Contact</SectionLabel>
          <h2 data-reveal style={S.sectionTitle}>
            Let's build<br />something
          </h2>
          <div data-reveal style={{ ...S.revealBase, maxWidth: 540, marginTop: "2.5rem", transitionDelay: "0.15s" }}>
            <p style={S.aboutText}>
              Open to internships, research collaborations, and exciting projects.
              Drop a message and I'll get back within 24 hours.
            </p>
            <a
              href="mailto:saiharshithm2024@gmail.com"
              style={{ ...S.btnPrimary, display: "inline-block", marginTop: "2rem", textDecoration: "none" }}
            >
              Say Hello →
            </a>
          </div>
        </div>
      </section>

      {/* ── HUD BAR ── */}
      <footer style={S.hudBar}>
        <span style={S.hudText}>12.8231°N · 80.0444°E · Kattankulathur</span>

        {/* Social Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="https://github.com/harshith7002" target="_blank" rel="noreferrer" style={S.socialLink} title="GitHub">
            <GithubIcon />
          </a>
          <a href="https://linkedin.com/in/sai-harshith-moluguri-892679324" target="_blank" rel="noreferrer" style={S.socialLink} title="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://www.instagram.com/its_saiharshith.exe/" target="_blank" rel="noreferrer" style={S.socialLink} title="Instagram">
            <InstaIcon />
          </a>
          <a href="mailto:saiharshithm2024@gmail.com" style={S.socialLink} title="Email">
            <MailIcon />
          </a>
        </div>

        <span style={S.hudText}>{time} IST</span>
      </footer>
    </div>
  );
}

/* ─── Sub-components ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontStyle: "italic", fontWeight: 300,
      fontSize: "clamp(11px,1.3vw,14px)",
      letterSpacing: "0.4em",
      color: "rgba(100,220,200,0.5)",
      marginBottom: "1rem",
      textTransform: "uppercase" as const,
    }}>
      {children}
    </p>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    setTilt({
      x: ((e.clientX - cx) / (rect.width  / 2)) * 6,
      y: ((e.clientY - cy) / (rect.height / 2)) * 6,
    });
  };

  return (
    <div
      ref={cardRef}
      data-reveal
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      style={{
        ...S.revealBase,
        ...S.projectCard,
        transitionDelay: `${index * 0.1}s`,
        borderColor: hov ? "rgba(100,220,200,0.32)" : "rgba(100,220,200,0.08)",
        background:   hov ? "rgba(100,220,200,0.04)" : "rgba(255,255,255,0.015)",
        transform: hov
          ? `translateY(-6px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`
          : "translateY(0) rotateX(0) rotateY(0)",
        transformStyle: "preserve-3d",
      }}
    >
      <div style={S.projectYear}>{project.year}</div>
      <h3 style={S.projectTitle}>{project.title}</h3>
      <p  style={S.projectDesc}>{project.desc}</p>
      <div style={S.tagRow}>
        {project.tags.map(t => <span key={t} style={S.tag}>{t}</span>)}
      </div>
    </div>
  );
}

function AchRow({ ach, index }: { ach: Achievement; index: number }) {
  const [hov, setHov] = useState(false);
  const [visible, setVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      data-reveal
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...S.revealBase,
        ...S.achRow,
        transitionDelay: `${index * 0.1}s`,
        background: hov ? "rgba(100,220,200,0.03)" : "transparent",
        paddingLeft: hov ? "8px" : "0px",
        position: "relative",
      }}
    >
      {/* progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, height: 1,
        width: visible ? "100%" : "0%",
        background: "linear-gradient(90deg, rgba(100,220,200,0.6), transparent)",
        transition: `width ${0.6 + index * 0.1}s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
      }} />
      <div style={S.achLeft}>
        <span style={S.achYear}>{ach.year}</span>
        <span style={S.achTitle}>{ach.title}</span>
      </div>
      <span style={S.achOrg}>{ach.org}</span>
    </div>
  );
}

/* ─── Icons ─── */
const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.5 11.5 0 0112 6.8c1.02.005 2.047.138 3 .404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

/* ─── Corner position map ─── */
const corners: Record<string, React.CSSProperties> = {
  tl: { top: 20, left: 20,  borderWidth: "1px 0 0 1px" },
  tr: { top: 20, right: 20, borderWidth: "1px 1px 0 0" },
  bl: { bottom: 20, left: 20,  borderWidth: "0 0 1px 1px" },
  br: { bottom: 20, right: 20, borderWidth: "0 1px 1px 0" },
};

/* ═══════════════════════════════════════
   STYLES
═══════════════════════════════════════ */
const S: Record<string, React.CSSProperties> = {
  root: {
    background: "#000",
    color: "#fff",
    fontFamily: "'Cormorant Garamond', serif",
    cursor: "none",
    overflowX: "hidden",
    scrollBehavior: "smooth",
    minHeight: "100vh",
  },
  cursor: {
    position: "fixed", top: 0, left: 0,
    width: 9, height: 9, borderRadius: "50%",
    background: "#64dcc8",
    pointerEvents: "none", zIndex: 9999,
    transform: "translate(-50%,-50%)",
    mixBlendMode: "screen",
  },
  cursorRing: {
    position: "fixed", top: 0, left: 0,
    width: 36, height: 36, borderRadius: "50%",
    border: "1px solid rgba(100,220,200,0.5)",
    pointerEvents: "none", zIndex: 9998,
    transform: "translate(-50%,-50%)",
    transition: "left 0.18s cubic-bezier(0.16,1,0.3,1), top 0.18s cubic-bezier(0.16,1,0.3,1)",
  },
  canvas: {
    position: "fixed", top: 0, left: 0,
    width: "100%", height: "100%",
    display: "block", zIndex: 0,
  },
  vignette: {
    position: "fixed", inset: 0,
    background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.85) 100%)",
    pointerEvents: "none", zIndex: 1,
  },
  scanline: {
    position: "fixed", left: 0, top: -2,
    width: "100%", height: 2,
    background: "linear-gradient(90deg, transparent, rgba(100,220,200,0.22), transparent)",
    pointerEvents: "none", zIndex: 2,
    animation: "scanDown 8s ease-in-out infinite",
  },
  corner: {
    position: "fixed", width: 40, height: 40,
    borderColor: "rgba(100,220,200,0.18)", borderStyle: "solid",
    zIndex: 3,
  },
  sideLine: {
    position: "fixed", top: "50%", transform: "translateY(-50%)",
    width: 1, height: 180,
    background: "linear-gradient(to bottom, transparent, rgba(100,220,200,0.15), transparent)",
    zIndex: 3,
  },
  nav: {
    position: "fixed", top: 0, left: 0, width: "100%",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "22px 24px 22px 40px", zIndex: 10,
    boxSizing: "border-box",
    transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
  },
  navLogo: {
    width: 40, height: 40, border: "1px solid rgba(100,220,200,0.2)",
    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 14,
    color: "rgba(100,220,200,0.6)", letterSpacing: "0.05em",
    background: "none", cursor: "none",
  },
  navLinks: {
    display: "flex", gap: 36, listStyle: "none",
    position: "absolute", left: "50%", transform: "translateX(-50%)",
  },
  navLink: {
    background: "none", border: "none",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 13, letterSpacing: "0.28em",
    cursor: "none", position: "relative",
    transition: "color 0.3s", padding: "2px 0",
  },
  navUnderline: {
    position: "absolute", bottom: -4, left: 0,
    width: "100%", height: 1,
    background: "rgba(100,220,200,0.7)", display: "block",
  },
  navRight: { display: "flex", alignItems: "center", gap: 10 },
  iconBtn: {
    width: 36, height: 36, border: "1px solid rgba(100,220,200,0.18)",
    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
    color: "rgba(255,255,255,0.45)", textDecoration: "none",
    transition: "all 0.3s", cursor: "none",
  },
  resumeBtn: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 12, letterSpacing: "0.22em",
    color: "rgba(100,220,200,0.8)",
    background: "rgba(100,220,200,0.08)",
    border: "1px solid rgba(100,220,200,0.2)",
    padding: "8px 20px", cursor: "none", transition: "all 0.3s",
  },
  hero: {
    position: "relative", zIndex: 5,
    minHeight: "100vh",
    display: "flex", flexDirection: "column", justifyContent: "center",
    padding: "0 8%",
  },
  labelTag: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic", fontWeight: 300,
    fontSize: "clamp(12px,1.4vw,15px)", letterSpacing: "0.42em",
    color: "rgba(100,220,200,0.6)", textTransform: "uppercase",
    marginBottom: "0.6rem",
    transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.9s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.9s",
  },
  heroName: { lineHeight: 0.88, marginBottom: "1.8rem" },
  nameSolid: {
    display: "block",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(4.5rem,12vw,10rem)", color: "#fff",
    letterSpacing: "0.06em",
    transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 1.1s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 1.1s",
  },
  nameOutline: {
    display: "block",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(4.5rem,12vw,10rem)",
    color: "transparent",
    WebkitTextStroke: "1.5px rgba(100,220,200,0.55)",
    letterSpacing: "0.06em",
    transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 1.25s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 1.25s",
  },
  heroRole: {
    fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
    fontSize: "clamp(13px,1.7vw,18px)", letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem",
    transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
  },
  heroTech: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic", fontWeight: 300,
    fontSize: "clamp(11px,1.2vw,14px)", letterSpacing: "0.18em",
    color: "rgba(100,220,200,0.38)", marginBottom: "2.8rem",
    transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
  },
  heroBtns: {
    display: "flex", gap: 16,
    transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
  },
  btnPrimary: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(12px,1.3vw,14px)", letterSpacing: "0.28em",
    padding: "13px 40px",
    background: "rgba(100,220,200,0.08)",
    color: "rgba(100,220,200,0.9)",
    border: "1px solid rgba(100,220,200,0.28)",
    cursor: "none", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
    backdropFilter: "blur(12px)",
  },
  btnSecondary: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(12px,1.3vw,14px)", letterSpacing: "0.28em",
    padding: "13px 40px",
    background: "transparent", color: "rgba(255,255,255,0.45)",
    border: "1px solid rgba(255,255,255,0.13)",
    cursor: "none", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  },
  section: {
    position: "relative", zIndex: 5,
    minHeight: "100vh", display: "flex", alignItems: "center",
    borderTop: "1px solid rgba(100,220,200,0.05)",
  },
  sectionInner: {
    width: "100%", maxWidth: 1100,
    margin: "0 auto", padding: "80px 8%",
  },
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(3rem,7vw,6rem)", color: "#fff",
    letterSpacing: "0.04em", lineHeight: 0.92,
    marginBottom: "3rem",
    opacity: 0, transform: "translateY(30px)",
    transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
  },
  aboutGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
  },
  aboutText: {
    fontSize: "clamp(14px,1.5vw,17px)", lineHeight: 1.75,
    color: "rgba(255,255,255,0.52)", fontWeight: 300,
  },
  skillsLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 11, letterSpacing: "0.3em",
    color: "rgba(100,220,200,0.42)", marginBottom: "1.2rem",
  },
  skillsGrid: { display: "flex", flexWrap: "wrap", gap: 8 },
  skillPill: {
    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
    fontSize: 13, letterSpacing: "0.1em",
    color: "rgba(100,220,200,0.68)",
    border: "1px solid rgba(100,220,200,0.14)",
    padding: "4px 14px", background: "rgba(100,220,200,0.03)",
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
    gap: "1.4rem",
  },
  projectCard: {
    padding: "2rem",
    border: "1px solid rgba(100,220,200,0.08)",
    background: "rgba(255,255,255,0.015)",
    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    backdropFilter: "blur(8px)",
  },
  projectYear: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 11, letterSpacing: "0.3em",
    color: "rgba(100,220,200,0.38)", marginBottom: "1rem",
  },
  projectTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(1.25rem,2vw,1.65rem)", letterSpacing: "0.05em",
    color: "#fff", marginBottom: "0.8rem",
  },
  projectDesc: {
    fontSize: 14, lineHeight: 1.7,
    color: "rgba(255,255,255,0.42)", fontWeight: 300, marginBottom: "1.5rem",
  },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  tag: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic", fontSize: 11,
    color: "rgba(100,220,200,0.52)",
    border: "1px solid rgba(100,220,200,0.1)",
    padding: "2px 10px", letterSpacing: "0.08em",
  },
  achList: { display: "flex", flexDirection: "column", gap: 0 },
  achRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "1.4rem 0",
    borderBottom: "1px solid rgba(100,220,200,0.06)",
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  },
  achLeft: { display: "flex", alignItems: "center", gap: "1.5rem" },
  achYear: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 12, letterSpacing: "0.2em",
    color: "rgba(100,220,200,0.38)", minWidth: 42,
  },
  achTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(1rem,1.8vw,1.4rem)", letterSpacing: "0.05em", color: "#fff",
  },
  achOrg: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic", fontWeight: 300,
    fontSize: "clamp(12px,1.3vw,15px)",
    color: "rgba(255,255,255,0.32)", letterSpacing: "0.1em",
  },
  hudBar: {
    position: "fixed", bottom: 0, left: 0, width: "100%",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 40px",
    borderTop: "1px solid rgba(100,220,200,0.06)",
    zIndex: 8, backdropFilter: "blur(6px)",
  },
  hudText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic", fontWeight: 300,
    fontSize: 11, letterSpacing: "0.15em",
    color: "rgba(100,220,200,0.28)",
  },
  socialLink: {
    width: 28, height: 28,
    border: "1px solid rgba(100,220,200,0.15)",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "rgba(100,220,200,0.4)",
    textDecoration: "none",
    transition: "all 0.3s",
    cursor: "none",
  },
  scrollHint: {
    display: "flex", alignItems: "center", gap: 8,
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic", fontSize: 11,
    letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)",
  },
  scrollArrow: {
    width: 13, height: 13,
    borderRight: "1px solid rgba(100,220,200,0.28)",
    borderBottom: "1px solid rgba(100,220,200,0.28)",
    transform: "rotate(45deg)",
    animation: "bounce 2s ease-in-out infinite",
  },
  revealBase: {
    opacity: 0, transform: "translateY(28px)",
    transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
  },
};
