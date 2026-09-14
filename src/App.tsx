import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  Menu,
  X,
  MessageCircle,
  CalendarDays,
  Clock3,
  Workflow,
  PanelsTopLeft,
  ChartNoAxesCombined,
  Layers3,
  Database,
  Mail,
  FileSpreadsheet,
  Zap,
  Users,
  LockKeyhole,
  Maximize2,
  Code2,
  CheckCheck,
  Monitor,
  Smartphone,
} from "lucide-react";
import { BlurFade } from "./components/ui/blur-fade";
import { BorderBeam } from "./components/ui/border-beam";
import { DotPattern } from "./components/ui/dot-pattern";
import { Marquee } from "./components/ui/marquee";
import { ShimmerButton } from "./components/ui/shimmer-button";
import { HeroFilm } from "./components/hero-film";
import { ParallaxBackdrop } from "./components/parallax-backdrop";
import { contact, whatsappUrl } from "./config";

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="#inicio"
      aria-label="CorteApp, inicio"
    >
      <img src="/brand/logo-mark.svg" width="32" height="32" alt="" />
      <span>
        CORTE<span className="brand-app">.App</span>
      </span>
    </a>
  );
}
function CTA({
  children = "Hablemos de tu proyecto",
  className = "",
  href = "#contacto",
}: {
  children?: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a href={href} className={`button button-primary ${className}`}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <BlurFade
      initial={false}
      inView
      variant={{ hidden: { y: 12 }, visible: { y: 0 } }}
      duration={0.5}
      className={className}
    >
      {children}
    </BlurFade>
  );
}
function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`eyebrow ${dark ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </div>
  );
}
const projects = [
  {
    id: "aenogen",
    name: "Aenogen",
    category: "CRM Y GESTIÓN COMERCIAL",
    title: "Cada oportunidad, en su sitio.",
    description:
      "Un CRM que conecta clientes, oportunidades, campañas y actividad comercial. Para que el equipo sepa qué ocurre y cuál es el siguiente paso.",
    items: [
      "Seguimiento de clientes y oportunidades",
      "Campañas y comunicación en un solo entorno",
      "Visión de la actividad comercial",
    ],
    image: "/projects/aenogen.webp",
    alt: "Aplicación real de Aenogen: creación de campañas, segmentación B2B y B2C y seguimiento de conversaciones.",
    number: "01",
    tags: ["CRM a medida", "Campañas", "Dashboard"],
  },
  {
    id: "edisol",
    name: "Edisol",
    category: "AUTOMATIZACIÓN Y DATOS",
    title: "Lo que automatizas, se puede medir.",
    description:
      "Un panel ejecutivo para consultar ejecuciones, actividad y estimaciones de ahorro de los procesos automatizados, sin consolidar informes a mano.",
    items: [
      "Indicadores por proceso y periodo",
      "Seguimiento de robots y ejecuciones",
      "Estimaciones de horas y ahorro operativo",
    ],
    image: "/projects/edisol.webp",
    alt: "Dashboard real de Edisol con indicadores de actividad, tiempo y ahorro estimado de automatizaciones.",
    number: "02",
    tags: ["Automatización", "RPA", "Reporting"],
  },
  {
    id: "dorado",
    name: "Dorado Telecom",
    category: "SOFTWARE DE OPERACIONES",
    title: "Toda la operación, bajo control.",
    description:
      "Una aplicación interna para coordinar vehículos, prevención, obras y herramientas. Información ordenada por áreas para trabajar con criterios compartidos.",
    items: [
      "Control operativo por áreas",
      "Estados e incidencias visibles",
      "Un punto de acceso para el equipo",
    ],
    image: "/projects/dorado-operaciones.webp",
    alt: "Software real de Dorado Telecom para gestionar vehículos, PRL, obras y herramientas.",
    number: "03",
    tags: ["Operaciones", "Gestión interna", "Trazabilidad"],
  },
];
const faqs = [
  [
    "¿Necesito tener una idea completamente definida?",
    "No. Podemos empezar por un problema concreto: datos duplicados, tareas manuales o falta de visibilidad. En el diagnóstico revisamos cómo trabajáis y qué primera solución tendría sentido.",
  ],
  [
    "¿Desarrolláis un CRM desde cero o adaptáis herramientas?",
    "Depende de tu proceso. Podemos crear un CRM a medida, una aplicación interna o conectar las herramientas que ya utilizas. La propuesta parte de tus necesidades y de lo que merece la pena conservar.",
  ],
  [
    "¿Se puede conectar con mi ERP, Excel u otras aplicaciones?",
    "Estudiamos las integraciones disponibles, las API y la estructura de tus datos antes de definir el alcance. Si una conexión tiene limitaciones, las concretamos en la propuesta.",
  ],
  [
    "¿Cuánto cuesta y cuánto tarda un desarrollo?",
    "El coste y el plazo dependen de los procesos, usuarios, integraciones y módulos necesarios. Tras revisar el caso, definimos una primera fase con alcance, presupuesto y calendario para que puedas decidir con claridad.",
  ],
  [
    "¿El software funcionará en móvil y tablet?",
    "Diseñamos las interfaces según dónde las utilizará tu equipo: ordenador, tablet o móvil. Las necesidades de cada dispositivo se tienen en cuenta desde la definición del proyecto.",
  ],
  [
    "¿Qué pasa después de la puesta en marcha?",
    "El acompañamiento, mantenimiento y evolución se acuerdan en la propuesta. Podemos incorporar nuevas funciones e integraciones a medida que cambien las necesidades de tu equipo.",
  ],
];
function ProjectShowcase() {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const project = projects[selected];
  useEffect(() => {
    if (expanded) dialog.current?.showModal();
    else dialog.current?.close();
  }, [expanded]);
  return (
    <>
      <div
        className="project-tabs"
        role="tablist"
        aria-label="Proyectos de clientes"
      >
        {projects.map((p, i) => (
          <button
            key={p.id}
            id={`tab-${p.id}`}
            role="tab"
            aria-selected={selected === i}
            aria-controls={`panel-${p.id}`}
            tabIndex={selected === i ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 2
                      : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                setSelected(next);
                document.getElementById(`tab-${projects[next].id}`)?.focus();
              }
            }}
          >
            {selected === i && (
              <motion.span
                layoutId="project-tab"
                className="tab-indicator"
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              />
            )}
            <span>{p.name}</span>
            <ArrowUpRight size={15} />
          </button>
        ))}
      </div>
      <div
        className="project-panel"
        role="tabpanel"
        id={`panel-${project.id}`}
        aria-labelledby={`tab-${project.id}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="project-content"
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="project-copy">
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="check-list">
                {project.items.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className="text-link">
                Quiero algo así para mi empresa <ArrowUpRight size={17} />
              </a>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="project-visual">
              <div className="case-browser">
                <div className="window-bar">
                  <span className="window-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>{project.name} / aplicación real</span>
                  <button
                    onClick={() => setExpanded(true)}
                    aria-label={`Ampliar captura de ${project.name}`}
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
                <button
                  className="screenshot-button"
                  onClick={() => setExpanded(true)}
                  aria-label={`Ver captura completa de ${project.name}`}
                >
                  <img
                    src={project.image}
                    alt={project.alt}
                    width="1920"
                    height="1080"
                    loading="lazy"
                  />
                </button>
              </div>
              <span className="image-caption">
                <Code2 size={14} /> Software desarrollado por CORTE.App
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <dialog
        ref={dialog}
        className="image-dialog"
        onCancel={() => setExpanded(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setExpanded(false);
        }}
        aria-label={`Captura de ${project.name}`}
      >
        <div className="dialog-bar">
          <strong>{project.name} · Aplicación real</strong>
          <button
            onClick={() => setExpanded(false)}
            aria-label="Cerrar captura"
          >
            <X />
          </button>
        </div>
        <img src={project.image} alt={project.alt} />
      </dialog>
    </>
  );
}
function SupportingImage({
  src,
  alt,
  label,
  className = "",
  mobile = false,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  mobile?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <figure className={`support-figure ${className}`}>
      <button
        type="button"
        className="support-thumbnail"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Ampliar: ${label}`}
      >
        <img
          src={src}
          alt={alt}
          width={mobile ? 1290 : 1920}
          height={mobile ? 2796 : 1080}
          loading="lazy"
          decoding="async"
        />
        <span className="support-zoom" aria-hidden="true">
          <Maximize2 size={15} />
        </span>
      </button>
      <figcaption>
        {label}
        <span>Aplicación real</span>
      </figcaption>
      <dialog
        ref={dialog}
        className={`image-dialog ${mobile ? "support-dialog-mobile" : ""}`}
        aria-label={label}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-bar">
          <strong>{label}</strong>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Cerrar imagen"
          >
            <X />
          </button>
        </div>
        <img src={src} alt={alt} loading="lazy" />
      </dialog>
    </figure>
  );
}

function ContactForm() {
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = `Hola, soy ${String(data.get("name")).trim()} de ${String(data.get("company")).trim()}. Me interesa un software a medida.\n\n${String(data.get("challenge")).trim() || "Me gustaría comentar mi proyecto con vosotros."}`;
    window.location.assign(whatsappUrl(message));
  }
  return (
    <form onSubmit={submit} className="contact-form">
      <div className="form-heading">
        <MessageCircle size={23} />
        <div>
          <h3>Cuéntanos qué necesitas</h3>
          <p>Empecemos con una conversación.</p>
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="name">
          Tu nombre <span>*</span>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="¿Cómo te llamas?"
            required
            maxLength={80}
            pattern=".*\S.*"
          />
        </label>
        <label htmlFor="company">
          Empresa <span>*</span>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Nombre de tu empresa"
            required
            maxLength={100}
            pattern=".*\S.*"
          />
        </label>
      </div>
      <label htmlFor="challenge">
        ¿Qué te gustaría mejorar? <span className="optional">Opcional</span>
        <textarea
          id="challenge"
          name="challenge"
          rows={3}
          maxLength={1000}
          placeholder="Por ejemplo: gestionar clientes, automatizar tareas o sustituir nuestros Excel…"
        />
      </label>
      <label className="consent">
        <input type="checkbox" required name="privacy" />
        <span>
          He leído la{" "}
          <a
            href={contact.privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            política de privacidad
          </a>{" "}
          y quiero contactar con CORTE.App.
        </span>
      </label>
      <ShimmerButton
        type="submit"
        className="form-submit"
        background="#155eef"
        borderRadius="10px"
      >
        <span>Continuar en WhatsApp</span>
        <ArrowUpRight size={18} />
      </ShimmerButton>
      <p className="form-note">
        <LockKeyhole size={13} /> Se abrirá WhatsApp para que revises y envíes
        tu mensaje.
      </p>
    </form>
  );
}
export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <header className="site-header">
        <motion.div
          className="reading-progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
        <div className="container nav">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#soluciones">Qué hacemos</a>
            <a href="#proyectos">Proyectos reales</a>
            <a href="#proceso">Cómo trabajamos</a>
          </nav>
          <div className="nav-actions">
            <CTA className="nav-cta">Hablemos</CTA>
            <button
              className="menu-toggle"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            className="mobile-nav"
            id="mobile-nav"
            aria-label="Navegación móvil"
            onClick={() => setMenuOpen(false)}
          >
            <a href="#soluciones">Qué hacemos</a>
            <a href="#proyectos">Proyectos reales</a>
            <a href="#proceso">Cómo trabajamos</a>
            <a href="#contacto">Contactar</a>
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero" id="inicio">
          <div className="hero-glow" aria-hidden="true" />
          <DotPattern width={28} height={28} cr={0.75} className="hero-dots" />
          <div className="container hero-inner">
            <div className="hero-badge">
              <span className="badge-icon">
                <Code2 size={14} />
              </span>{" "}
              SOFTWARE A MEDIDA. NEGOCIOS CON VISIÓN.
            </div>
            <h1>
              Tu empresa, a tu manera.
              <br />
              <span>
                Tu software, <em>también.</em>
              </span>
            </h1>
            <p className="hero-description">
              Desarrollamos software y CRM que se adaptan a tu negocio.
              <br className="desktop-break" /> Conecta tu equipo, automatiza
              tareas y vuelve a tener el control.
            </p>
            <div className="hero-buttons">
              <CTA>Hablemos de tu proyecto</CTA>
              <a href="#proyectos" className="button button-secondary">
                <PanelsTopLeft size={17} /> Ver proyectos reales
              </a>
            </div>
            <div className="hero-checks">
              <span>
                <Check size={15} /> CRM a medida
              </span>
              <span>
                <Check size={15} /> Automatización
              </span>
              <span>
                <Check size={15} /> Integraciones
              </span>
            </div>
            <div className="hero-showcase">
              <div className="floating-card float-left">
                <span className="float-icon">
                  <Workflow size={19} />
                </span>
                <div>
                  <strong>Menos tareas repetitivas</strong>
                  <span>Más tiempo para tu negocio</span>
                </div>
                <CheckCheck size={18} className="float-check" />
              </div>
              <div className="hero-browser">
                <div className="window-bar">
                  <span className="window-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="window-address">
                    <LockKeyhole size={11} /> Tu operación. En un solo lugar.
                  </span>
                  <span className="live-label">Aplicación real</span>
                </div>
                <HeroFilm />
                <BorderBeam
                  size={230}
                  duration={12}
                  colorFrom="#155eef"
                  colorTo="#92b8ff"
                  borderWidth={1.5}
                />
              </div>
              <div className="floating-card float-right">
                <span className="float-icon purple">
                  <ChartNoAxesCombined size={20} />
                </span>
                <div>
                  <strong>Decisiones con datos</strong>
                  <span>Todo tu equipo, la misma visión</span>
                </div>
              </div>
              <div className="showcase-caption">
                <span className="caption-line" /> Esto no es una maqueta. Es
                software que hemos construido. <span className="caption-line" />
              </div>
            </div>
          </div>
        </section>
        <section className="client-strip">
          <div className="container">
            <p>TECNOLOGÍA PROPIA PARA EMPRESAS REALES</p>
            <div className="client-logos">
              <span className="client-aenogen">
                <Plus strokeWidth={1.3} /> AENOGEN
              </span>
              <span className="client-edisol">
                <span className="edisol-mark" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                Edisol
              </span>
              <span className="client-dorado">
                DORADO<span>TELECOM</span>
              </span>
            </div>
          </div>
        </section>
        <section className="section solutions" id="soluciones">
          <div className="container">
            <Reveal>
              <div className="section-heading split-heading">
                <div>
                  <Eyebrow>01 / TECNOLOGÍA QUE ENCAJA CONTIGO</Eyebrow>
                  <h2>
                    Tu negocio ha crecido.
                    <br />
                    <em>Tus herramientas deberían hacerlo.</em>
                  </h2>
                </div>
                <p>
                  Cuando los Excel, los correos y las aplicaciones sueltas ya no
                  son suficientes, construimos el siguiente paso.
                </p>
              </div>
            </Reveal>
            <div className="bento-grid visual-bento">
              <Reveal className="bento-card crm-card visual-card">
                <div className="card-icon">
                  <Users size={23} />
                </div>
                <h3>
                  Un CRM que habla
                  <br />
                  el idioma de tu empresa.
                </h3>
                <p>
                  Clientes, oportunidades y seguimiento comercial. Organizados
                  según tu forma de vender.
                </p>
                <SupportingImage
                  src="/projects/aenogen-crm.webp"
                  alt="CRM de Aenogen: tablero de oportunidades por estado, prioridad y siguiente acción. Datos de ejemplo."
                  label="Aenogen · Gestión de oportunidades"
                />
              </Reveal>
              <Reveal className="bento-card automation-card visual-card">
                <div className="card-icon">
                  <Workflow size={23} />
                </div>
                <h3>
                  Las tareas se repiten.
                  <br />
                  Tu equipo no tiene por qué.
                </h3>
                <p>
                  Conectamos pasos, avisos y aprobaciones. Y hacemos visible el
                  impacto de las automatizaciones.
                </p>
                <SupportingImage
                  src="/projects/edisol.webp"
                  alt="Panel de Edisol con seguimiento de robots, actividad y estimaciones de ahorro operativo."
                  label="Edisol · Control de automatizaciones"
                />
              </Reveal>
              <Reveal className="bento-card software-card visual-card">
                <div className="card-icon">
                  <PanelsTopLeft size={23} />
                </div>
                <h3>
                  Tu operación.
                  <br />
                  Una sola plataforma.
                </h3>
                <p>
                  Aplicaciones internas para coordinar personas, procesos y
                  datos con una visión compartida.
                </p>
                <SupportingImage
                  src="/projects/dorado-operaciones.webp"
                  alt="Vista de operaciones de Dorado Telecom con control de vehículos, prevención y obras."
                  label="Dorado Telecom · Gestión operativa"
                />
              </Reveal>
              <Reveal className="bento-card integration-card visual-card">
                <div className="card-icon">
                  <Database size={23} />
                </div>
                <h3>
                  Conecta tus herramientas.
                  <br />
                  Dale continuidad al trabajo.
                </h3>
                <p>
                  Datos, campañas y conversaciones dentro del mismo proceso,
                  conectado con tu forma de trabajar.
                </p>
                <SupportingImage
                  src="/projects/aenogen.webp"
                  alt="Módulo de campañas de Aenogen con selección de audiencia, contenido y tipo de conversación."
                  label="Aenogen · Campañas y comunicación"
                />
              </Reveal>
            </div>
            <div className="solutions-bottom">
              <span>¿No sabes por dónde empezar? Lo vemos contigo.</span>
              <a className="text-link" href="#contacto">
                Cuéntanos tu caso <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section className="section projects-section" id="proyectos">
          <div className="container">
            <Reveal>
              <div className="section-heading">
                <Eyebrow>02 / DEL PROBLEMA A LA PANTALLA</Eyebrow>
                <h2>
                  Menos promesas.
                  <br />
                  <em>Más software funcionando.</em>
                </h2>
                <p>
                  Una selección de sistemas que hemos desarrollado para procesos
                  reales.
                </p>
              </div>
            </Reveal>
            <ProjectShowcase />
            <p className="projects-disclaimer">
              Capturas de aplicaciones reales. Los indicadores mostrados
              corresponden a cada sistema y no son una promesa de resultados.
            </p>
          </div>
        </section>
        <section className="outcome-section">
          <ParallaxBackdrop />
          <div className="container outcome-inner">
            <div>
              <Eyebrow dark>03 / HECHO PARA TU DÍA A DÍA</Eyebrow>
              <h2>
                De herramientas dispersas
                <br />a un equipo <em>conectado.</em>
              </h2>
              <p>
                El cambio no está en tener más pantallas.
                <br />
                Está en que todo el mundo sepa qué hacer.
              </p>
              <CTA>Quiero ordenar mi operación</CTA>
            </div>
            <div className="comparison">
              <div className="before">
                <span className="comparison-label">
                  CUANDO TODO ESTÁ DISPERSO
                </span>
                <div>
                  <FileSpreadsheet size={17} /> ¿Cuál es el Excel actualizado?
                </div>
                <div>
                  <Mail size={17} /> ¿Quién tiene este pendiente?
                </div>
                <div>
                  <Clock3 size={17} /> ¿Cuánto tardamos en hacer el informe?
                </div>
              </div>
              <div className="comparison-divider">
                <ArrowRight size={19} />
              </div>
              <div className="after">
                <span className="comparison-label">
                  CON UN SISTEMA A MEDIDA
                </span>
                <div>
                  <Check size={17} /> Una fuente de información compartida
                </div>
                <div>
                  <Check size={17} /> Responsables y próximos pasos claros
                </div>
                <div>
                  <Check size={17} /> Datos disponibles para decidir
                </div>
              </div>
              <BorderBeam
                size={180}
                duration={14}
                colorFrom="#155eef"
                colorTo="#5ec5fd"
              />
            </div>
          </div>
        </section>
        <section className="device-section" aria-labelledby="device-heading">
          <div className="container device-grid">
            <div className="device-copy">
              <Eyebrow>04 / TU EQUIPO, DENTRO Y FUERA DE LA OFICINA</Eyebrow>
              <h2 id="device-heading">
                En la oficina.
                <br />
                <em>Y donde haga falta.</em>
              </h2>
              <p>
                El mismo negocio, distintas formas de trabajar. Diseñamos cada
                pantalla para el dispositivo desde el que se utiliza.
              </p>
              <div className="device-details">
                <div>
                  <Monitor size={20} />
                  <span>
                    <strong>Una visión completa en escritorio</strong>
                    <small>
                      Clientes, procesos y datos en un solo entorno.
                    </small>
                  </span>
                </div>
                <div>
                  <Smartphone size={20} />
                  <span>
                    <strong>Lo que necesitas, también en móvil</strong>
                    <small>
                      Pantallas adaptadas para consultar y trabajar.
                    </small>
                  </span>
                </div>
              </div>
              <a className="text-link" href="#contacto">
                Hablemos de cómo trabaja tu equipo <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="device-visual">
              <div className="device-halo" aria-hidden="true" />
              <SupportingImage
                src="/projects/edisol-mobile.webp"
                alt="Versión móvil real del panel de Edisol: filtros de periodo e indicadores de ahorro."
                label="Edisol · Dashboard móvil"
                className="phone-preview phone-edisol"
                mobile
              />
              <SupportingImage
                src="/projects/aenogen-mobile.webp"
                alt="Versión móvil real de Aenogen: configuración de una campaña paso a paso."
                label="Aenogen · CRM móvil"
                className="phone-preview phone-aenogen"
                mobile
              />
            </div>
          </div>
        </section>
        <section className="section process-section" id="proceso">
          <div className="container">
            <Reveal>
              <div className="section-heading centered">
                <Eyebrow>05 / CLARIDAD DESDE EL PRIMER PASO</Eyebrow>
                <h2>
                  De «necesitamos algo mejor»
                  <br />
                  <em>a una solución que se usa.</em>
                </h2>
              </div>
            </Reveal>
            <div className="process-grid">
              {[
                {
                  n: "01",
                  icon: MessageCircle,
                  title: "Entendemos tu negocio",
                  text: "Revisamos un proceso concreto, cómo trabaja tu equipo y dónde se pierde tiempo.",
                  note: "Diagnóstico del proceso",
                },
                {
                  n: "02",
                  icon: Layers3,
                  title: "Definimos la solución",
                  text: "Acordamos prioridades, alcance y una primera fase que tenga sentido para tu empresa.",
                  note: "Propuesta y hoja de ruta",
                },
                {
                  n: "03",
                  icon: Code2,
                  title: "Construimos contigo",
                  text: "Desarrollamos y validamos la aplicación con quienes van a utilizarla cada día.",
                  note: "Desarrollo y validación",
                },
                {
                  n: "04",
                  icon: Zap,
                  title: "Ponemos el sistema en marcha",
                  text: "Preparamos el uso real y definimos cómo acompañar su evolución.",
                  note: "Puesta en marcha y evolución",
                },
              ].map((step) => (
                <Reveal className="process-step" key={step.n}>
                  <div className="step-top">
                    <span>{step.n}</span>
                    <step.icon size={21} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <span className="step-note">{step.note}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <div className="capability-strip" aria-hidden="true">
          <Marquee
            repeat={2}
            pauseOnHover
            className={reduceMotion ? "marquee-static" : ""}
          >
            {[
              "SOFTWARE A MEDIDA",
              "CRM",
              "AUTOMATIZACIÓN",
              "INTEGRACIONES",
              "DATOS CON SENTIDO",
            ].map((item) => (
              <span className="marquee-item" key={item}>
                {item}
                <Plus size={22} />
              </span>
            ))}
          </Marquee>
        </div>
        <section className="section faq-section">
          <div className="container faq-grid">
            <div>
              <Eyebrow>06 / ANTES DE DAR EL PASO</Eyebrow>
              <h2>
                Buenas preguntas.
                <br />
                <em>Respuestas claras.</em>
              </h2>
              <p>
                Y si tu caso es diferente,
                <br />
                nos encantará escucharlo.
              </p>
              <a
                className="text-link"
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hablar con el equipo <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="faq-list">
              {faqs.map(([q, a], i) => (
                <details key={q} open={i === 0}>
                  <summary>
                    {q}
                    <Plus className="faq-plus" size={18} />
                    <Minus className="faq-minus" size={18} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="contact-section" id="contacto">
          <div className="container contact-grid">
            <div className="contact-copy">
              <Eyebrow>07 / EL SIGUIENTE PASO ES UNA CONVERSACIÓN</Eyebrow>
              <h2>
                Tu próximo salto
                <br />
                empieza por
                <br />
                <em>«tenemos este problema».</em>
              </h2>
              <p>
                Cuéntanos cómo trabajáis y qué os gustaría cambiar. Te ayudamos
                a valorar por dónde empezar.
              </p>
              <div className="booking-card">
                <span className="booking-icon">
                  <CalendarDays size={24} />
                </span>
                <div>
                  <h3>¿Prefieres agendar un diagnóstico?</h3>
                  <p>30–45 min para revisar un proceso concreto.</p>
                  <a href={contact.bookingUrl} className="text-link">
                    Reservar diagnóstico <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
              <a href={`mailto:${contact.email}`} className="email-link">
                <Mail size={17} />
                {contact.email}
              </a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand />
              <p>Software que se adapta a tu empresa.</p>
            </div>
            <a href="#inicio" className="back-top">
              Volver arriba <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} CORTE.App · Manuel García López
            </span>
            <div>
              <a href={contact.privacyUrl}>Privacidad</a>
              <a href={contact.legalUrl}>Aviso legal</a>
              <span>Diseñado para avanzar.</span>
            </div>
          </div>
        </div>
      </footer>
      <aside aria-label="Contacto rápido">
        <a
          className="floating-whatsapp"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar con CorteApp por WhatsApp"
        >
          <img src="/brand/whatsapp.svg" width="23" height="23" alt="" />
          <span>WhatsApp</span>
        </a>
      </aside>
    </MotionConfig>
  );
}
