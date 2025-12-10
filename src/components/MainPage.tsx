// src/components/MainPage.tsx
import React from "react";
import "./main.css";
import logo from "../images/preview.png";

interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}



const PROJECTS: Project[] = [
  {
    id: "student-connect",
    title: "Student Connect",
    tag: "Full-Stack · React · Spring Boot · MySQL",
    description:
      "A full-stack doubt-clearing platform with secure authentication, RESTful APIs, and persistent data storage — helping students get instant answers and support from peers and mentors.",
    tech: ["React", "Java Spring Boot", "MySQL", "REST API", "JWT/Auth"],
    github: "https://github.com/harshith7002/StudentConnect/tree/main/StudentConnect-Complete-Project/student-connect",
  },
  {
    id: "astro-flashback",
    title: "Astro Flashback",
    tag: "Frontend · React.js · UI/UX",
    description:
      "A responsive, interactive React.js experience for astronomy events, featuring dynamic content updates, smooth CSS animations, and a cinematic scrolling layout.",
    tech: ["React.js", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/harshith7002/Astro-Flashback",
  },
  {
    id: "cifar10-cnn",
    title: "CIFAR-10 Image Classification with CNN",
    tag: "Deep Learning · Computer Vision",
    description:
      "Convolutional Neural Network built with TensorFlow and Keras to classify images from the CIFAR-10 dataset, experimenting with architecture, regularization, and training strategies.",
    tech: ["Python", "TensorFlow", "Keras", "CNN", "CIFAR-10"],
    github: "https://github.com/harshith7002/CIFAR-10-Image-Classification-with-CNN",
  },
  {
    id: "leaf-detector",
    title: "Leaf Disease Detector System",
    tag: "AI · FastAPI · Cloud Deployment",
    description:
      "An AI-powered system that detects leaf diseases from images using CNN models, with a FastAPI backend, HTML-based frontend, and deployment pipelines to Render / Hugging Face Spaces.",
    tech: ["FastAPI", "TensorFlow / PyTorch", "HTML", "Render", "Hugging Face"],
    github: "https://github.com/harshith7002/Leaf_detector-system",
  },
  {
    id: "cuvette-signin",
    title: "Cuvette Tech Sign-in Page",
    tag: "Full-Stack · Node.js · PostgreSQL",
    description:
      "An interactive job application sign-in page with client-side validation, Node.js backend, and PostgreSQL storage for securely handling form data and user sessions.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "PostgreSQL"],
    github: "#",
  },
];
const TECH_BADGES: string[] = [
  // 🔹 Languages
  "https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white",
  "https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white",
  "https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white",
  "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
  "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",

  // 🔹 Web
  "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
  "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
  "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white",
  "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white",
  "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
  "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white",

  // 🔹 Databases
  "https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white",
  "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
  "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white",

  // 🔹 DevOps & Cloud
  "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white",
  "https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white",
  "https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white",
  "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white",
  "https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white",
  "https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black",

  // 🔹 Tools & Libraries
  "https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white",
  "https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white",
  "https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white",
  "https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white",
  "https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white",
  "https://img.shields.io/badge/VS%20Code-0078D4?style=for-the-badge&logo=visualstudiocode&logoColor=white",
  "https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white",
];

const MainPage: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openNewTab = (url: string) => {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="main-root">
      {/* HERO SECTION */}
      <section className="hero-section">
        <video
          className="hero-bg-video"
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-overlay" />

        {/* floating orbs */}
        <div className="hero-orbs">
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
          <div className="hero-orb orb-3" />
        </div>

        {/* NAVBAR */}
        <header className="hero-header">
          <div className="hero-logo-area">
            <img src={logo} alt="Sai Harshith logo" className="hero-logo-img" />
          </div>

          <nav className="hero-nav">
            <button onClick={() => scrollTo("top")}>Home</button>
            

            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={() => scrollTo("projects")}>Projects</button>
            <button onClick={() => scrollTo("achievements")}>
              Achievements
            </button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </nav>

          <div className="hero-header-right">
            <button
              className="social-icon-btn"
              onClick={() => openNewTab("https://github.com/harshith7002")}
            >
              <img src="/images/github.svg" alt="GitHub" />
            </button>
            <button
              className="social-icon-btn"
              onClick={() => openNewTab("https://www.linkedin.com/in/sai-harshith-moluguri-892679324/")}
            >
              <img src="/images/in.png" alt="LinkedIn" />
            </button>
            <button
             
                className="resume-icon-btn"
                 onClick={() =>
                  openNewTab("https://drive.google.com/file/d/1hobY-NPFGGjsDVU7SSY26g7B4Zsl6P7X/view?usp=sharing")
}
            >
              
              <img src="/images/resume.svg" alt="Resume" />
              <span>Resume</span>
            </button>
          </div>
        </header>

        {/* HERO CONTENT */}
        <div id="top" className="hero-content">
          <p className="hero-tag">PORTFOLIO</p>

          <h1 className="hero-name">
            <span>SAI HARSHITH</span>
            <span className="hero-name-last">MOLUGURI</span>
          </h1>

          <p className="hero-role">
            Web Developer · UI Engineer · AI-ML Enthusiast
          </p>

          <p className="hero-meta">
            React · TypeScript · FastAPI · TensorFlow · Cloud · UI/UX
          </p>

          <div className="hero-cta-row">
            <button
              className="hero-cta primary"
              onClick={() => scrollTo("projects")}
            >
              View Projects
            </button>
            <button
              className="hero-cta secondary"
              onClick={() => scrollTo("contact")}
            >
              Contact
            </button>
          </div>
        </div>
      </section>

  {/* -------------- TECH STACK SECTION ---------------- */}
<section id="tech" className="tech-section">
  <h2 className="tech-title">⚡ Tech Stack</h2>

  <div className="tech-strip">
    <div className="tech-marquee">
      <div className="tech-track">
        {TECH_BADGES.map((src, i) => (
          <img key={i} src={src} alt="tech badge" className="tech-badge" />
        ))}
        {TECH_BADGES.map((src, i) => (
          <img key={`dup-${i}`} src={src} alt="tech badge duplicate" className="tech-badge" />
        ))}
      </div>
    </div>
  </div>
</section>


      {/* ABOUT ME SECTION */}
      <section id="about" className="about-section">
        <div className="about-inner">
          <div className="about-bio">
            <div className="about-photo">
              <img
                src="/images/MSH.jpg"
                alt="Sai Harshith portrait"
                className="about-photo-img"
              />
            </div>

            <p className="about-kicker">About Me</p>

            <h2 className="about-title">
              Second-year CS student
              <br />
              <span>building real-world skills fast.</span>
            </h2>

            <p className="about-text">
              I&apos;m a motivated and enthusiastic second-year Computer Science
              student with a deep interest in front-end engineering and modern
              web experiences. I love turning ideas into fast, polished
              interfaces and solving the &quot;why is this broken?&quot; puzzle
              in code.
            </p>

            <p className="about-text">
              Right now, I&apos;m pursuing a{" "}
              <strong>B.Tech in Computer Science &amp; Engineering</strong> at{" "}
              <strong>SRM Institute of Science and Technology</strong>{" "}
              (CGPA: <strong>8.37</strong> in 1st year) while simultaneously
              working towards a{" "}
              <strong>
                B.S. in Data Science &amp; Applications from IIT Madras
              </strong>
             
            </p>

            <div className="about-stats-row">
              <div className="about-stat">
                <span className="about-stat-label">Current CGPA</span>
                <span className="about-stat-value">8.37</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-label">12th Grade</span>
                <span className="about-stat-value">91.3%</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-label">10th Grade</span>
                <span className="about-stat-value">9.3 GPA</span>
              </div>
            </div>
          </div>

          <div className="about-timeline">
        

            <div className="about-card">
              <div className="about-card-tag">2024 – 2028</div>
              <h3>B.Tech – Computer Science &amp; Engineering</h3>
              <p>
                SRM Institute of Science and Technology, Kattankulathur. Strong
                foundation in CS fundamentals, programming, and problem solving.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card-tag">2025 – 2029</div>
              <h3>B.S. – Data Science &amp; Applications</h3>
              <p>
                Indian Institute of Technology Madras (IIT-Madras). Blending
                data science and engineering to build smarter, data-driven
                products.
              </p>
            </div>

            <div className="about-card mini">
              <div className="about-card-tag">2022 – 2024</div>
              <h3>Higher Secondary (M.P.C)</h3>
              <p>
                FIITJEE Jr College, Hyderabad · Telangana State Board (91.3%).
              </p>
            </div>

            <div className="about-card mini">
              <div className="about-card-tag">2022</div>
              <h3>Secondary (10th Grade)</h3>
              <p>
                FIITJEE School, Madhapur · Board of Secondary Education,
                Telangana (9.3 GPA).
              </p>
            </div>
          </div>
        </div>
      </section>

 {/* PROJECTS SECTION */}
<section id="projects" className="projects-section">
  <div className="projects-header">
    <p className="projects-kicker">Featured Projects</p>
    <h2 className="projects-title">
      Work that shows how I think, build,
      <br />
      and ship in the real world.
    </h2>
    <p className="projects-subtitle">
      From full-stack platforms to ML experiments and production-style
      sign-in flows — these are the projects I&apos;m most proud of.
    </p>
  </div>

  <div className="projects-grid">
    {PROJECTS.map((project) => (
      <article key={project.id} className="project-card">
        {/* 🔹 Project image (make sure file exists in public/images/projects/) */}
        <div className="project-thumb">
          <img
            src={`/images/projects/${project.id}.png`}
            alt={project.title}
          />
        </div>

        <div className="project-card-header">
          <span className="project-tag">{project.tag}</span>
          <h3 className="project-title">{project.title}</h3>
        </div>

        <p className="project-description">{project.description}</p>

        <ul className="project-tech-list">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        {/* 🔹 Only GitHub button */}
   <div className="project-actions">
  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="project-btn primary"
  >
    🔗 GitHub
  </a>
</div>


      </article>
    ))}
  </div>
</section>


      {/* ACHIEVEMENTS & CERTIFICATIONS */}
     {/* ACHIEVEMENTS & CERTIFICATIONS */} <section id="achievements" className="achievements-section"> <div className="achievements-header"> <p className="achievements-kicker">Achievements & Certifications</p> <h2 className="achievements-title"> Proof that I&apos;m serious <br /> about learning and shipping. </h2> <p className="achievements-subtitle"> Internships, hackathons, cloud programs, clubs, and courses that shaped how I think about AI, web development, and product building. </p> </div> <div className="achievements-layout"> {/* Left column: programs & certifications */} <div className="achievements-column"> <h3 className="achievements-column-title"> Programs &amp; Certifications </h3> <div className="achievement-card"> <div className="achievement-pill">Virtual Internship · AI &amp; ML</div> <h4> 10-Week AI/ML &amp; GenAI Virtual Internship – Google Cloud &amp; EduSkills </h4> <p> Successfully completed a 10-week virtual internship in AI/ML and Generative AI using Google Cloud, supported by India Edu Program – EduSkills in collaboration with SRM Institute of Science and Technology. </p> </div> <div className="achievement-card"> <div className="achievement-pill">Certification</div> <h4> Fundamentals of Object-Oriented Programming – NPTEL (Jan–Apr 2025) </h4> <p> Completed a 12-week OOP course through NPTEL, strengthening core programming concepts, design principles, and abstraction skills. </p> </div> <div className="achievement-card"> <div className="achievement-pill">Certificate of Appreciation</div> <h4> It&apos;s All in the Prompt – IITM BS Student Society (Pi sq Seminar) </h4> <p> Received an appreciation certificate for actively engaging in the seminar &quot;It&apos;s All in The Prompt: The Secret to Better LLM Outputs&quot;, focused on prompt design and working with large language models. </p> </div> </div> {/* Right column: hackathons, events, clubs */} <div className="achievements-column"> <h3 className="achievements-column-title"> Hackathons, Events &amp; Clubs </h3> <div className="achievement-card"> <div className="achievement-pill">DataSprint Challenge</div> <h4>SRM ACM SIGAI DataSprint</h4> <p> Participated in the SRM ACM SIGAI DataSprint Challenge — worked on data-driven problem-solving in a competitive setting with a focus on AI and analytics. </p> </div> <div className="achievement-card"> <div className="achievement-pill">Cloud &amp; Data</div> <h4> Code to Cloud: Building Data Solutions with Azure &amp; Databricks </h4> <p> Actively participated in a hands-on session on building end-to-end data solutions using Azure and Databricks, organized by Aaruush, SRM University. </p> </div> <div className="achievement-card"> <div className="achievement-pill">Tech Clubs</div> <h4>10X Coding Ninjas &amp; LIFTOFF Club – Web Dev Member</h4> <p> Contributed as a Web Development member in 10X Coding Ninjas and LIFTOFF Club at SRM, collaborating on internal tools, events, and code reviews with other developers. </p> </div> <div className="achievement-card"> <div className="achievement-pill">Competitions</div> <h4>Frontend Competition – AARUUSH SRM</h4> <p> Reached Round 3 of a frontend competition conducted by AARUUSH, SRM — building UI under pressure and tight evaluation criteria. </p> </div> <div className="achievement-card"> <div className="achievement-pill">Product Thinking</div> <h4>Product Management 5.0 – E-Cell, IIT Guwahati</h4> <p> Participated in Product Management 5.0 conducted by E-Cell, IIT Guwahati, exploring product strategy, user-centric design, and roadmap thinking. </p> </div> </div> </div> {/* Licenses & Certifications grid */} <div className="licenses-wrapper"> <h3 className="licenses-title">Licenses &amp; Certifications</h3> <div className="licenses-grid"> <article className="license-card"> <p className="license-org">HackerRank</p> <h4 className="license-name">CSS Certification</h4> <p className="license-meta">Issued · Apr 2025</p> </article> <article className="license-card"> <p className="license-org">Cisco</p> <h4 className="license-name">Endpoint Security</h4> <p className="license-meta">Issued · Mar 2025</p> </article> <article className="license-card"> <p className="license-org">Cisco</p> <h4 className="license-name">Introduction to Cybersecurity</h4> <p className="license-meta">Issued · Mar 2025</p> </article> <article className="license-card"> <p className="license-org">Microsoft &amp; LinkedIn</p> <h4 className="license-name"> Career Essentials in Generative AI </h4> <p className="license-meta">Issued · Jan 2025</p> </article> <article className="license-card"> <p className="license-org">Electronic Arts (EA)</p> <h4 className="license-name"> Software Engineering Job Simulation </h4> <p className="license-meta"> Issued · Jan 2025 · ID: bLbtaqx8ntX8Mw49C </p> </article> <article className="license-card"> <p className="license-org">Goldman Sachs</p> <h4 className="license-name"> Software Engineering Job Simulation </h4> <p className="license-meta"> Issued · Jan 2025 · ID: A23MPCK2wPjSDNbZd </p> </article> <article className="license-card"> <p className="license-org">HP</p> <h4 className="license-name">HP Certified Cybersecurity</h4> <p className="license-meta">Issued · Jan 2025</p> </article> <article className="license-card"> <p className="license-org">IEEE</p> <h4 className="license-name">IEEE Young Professional</h4> <p className="license-meta">Issued · Jan 2025</p> </article> <article className="license-card"> <p className="license-org">JPMorgan Chase &amp; Co</p> <h4 className="license-name"> Software Engineering Job Simulation </h4> <p className="license-meta"> Issued · Jan 2025 · ID: hDt8nZEsrYM7CtcrJ </p> </article> </div> </div> </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <p className="contact-kicker">Let&apos;s Connect</p>
          <h2 className="contact-title">
            Open to collaborations, roles &amp; new opportunities.
          </h2>

          <p className="contact-text">
            Whether it&apos;s internships, freelance work or a hackathon team —
            I&apos;m always excited to work on ambitious ideas with great
            people.
          </p>

          <div className="contact-icons">

  <button className="contact-icon-btn" onClick={() => openNewTab("mailto:saiharshithm2024@gmail.com")}>
    <img src="/images/mail.png" alt="Email" className="contact-icon-img" />
    <span>Email</span>
  </button>

  <button className="contact-icon-btn" onClick={() => openNewTab("https://github.com/harshith7002")}>
    <img src="/images/githubq1.png" alt="GitHub" className="contact-icon-img" />
    <span>GitHub</span>
  </button>

  <button className="contact-icon-btn" onClick={() => openNewTab("https://www.linkedin.com/in/sai-harshith-moluguri-892679324/")}>
    <img src="/images/linke.png" alt="LinkedIn" className="contact-icon-img" />
    <span>LinkedIn</span>
  </button>

  <button className="contact-icon-btn" onClick={() => openNewTab("https://www.instagram.com/saiharshithm07/")}>
    <img src="/images/insta.png" alt="Instagram" className="contact-icon-img" />
    <span>Instagram</span>
  </button>

</div>


          <p className="contact-footer">
            © {new Date().getFullYear()} Sai Harshith Moluguri — All Rights
            Reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
