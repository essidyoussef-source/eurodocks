import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Anchor, Ship, Package, Globe, FileText, Wrench,
  ArrowRight, ChevronRight, Phone, Mail, MapPin
} from "lucide-react";

// ============================================================
// IMAGES CDN
// ============================================================
const HERO_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_hero_bulker_ca1f9bf5.jpg";
const GRAIN_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_grain_loading_eac3a0ec.jpg";
const PORT_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_boulogne_terminal_16129bed.jpg";
const NIGHT_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_stevedoring_night_b390bed9.jpg";
const BRIDGE_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_chartering_bridge_95efca46.jpg";
const TRAMPING_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_tramping_sea_d4613c5f.jpg";
const ROUEN_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_rouen_grain_7edf01b4.jpg";
const DUNKERQUE_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_port_dunkerque_d6951241.jpg";
const SURVEY_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_survey_draught_ed5fb877.jpg";
const HATCH_IMG = "https://eurodocks-qgd8wezm.manus.space/manus-storage/eds2_hatch_inspection_7b9b3cf3.jpg";

// ============================================================
// HOOKS
// ============================================================
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return { count, ref };
}

// ============================================================
// STAT ITEM
// ============================================================
function StatItem({ icon: Icon, value, suffix = "", label }: {
  icon: React.ElementType; value: number; suffix?: string; label: string;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="eds-stat-item">
      <Icon className="eds-stat-icon" strokeWidth={1.5} />
      <div className="eds-stat-number">
        {suffix === "+" ? `+${count.toLocaleString("fr-FR")}` : count.toLocaleString("fr-FR")}{suffix !== "+" ? suffix : ""}
      </div>
      <div className="eds-stat-label">{label}</div>
    </div>
  );
}

// ============================================================
// SERVICE ROW — style Promaritime liste
// ============================================================
function ServiceRow({ icon: Icon, name, desc, to }: {
  icon: React.ElementType; name: string; desc: string; to: string;
}) {
  return (
    <Link href={to} className="eds-service-item" style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1.25rem 0", borderBottom: "1px solid #E8E8E6", textDecoration: "none", transition: "padding-left 0.2s ease", cursor: "pointer" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.paddingLeft = "0.5rem"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
    >
      <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "rgba(201,150,58,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
        <Icon size={16} color="var(--eds-gold)" strokeWidth={2} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "var(--eds-navy)", marginBottom: "0.2rem" }}>{name}</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "var(--eds-text-muted)", lineHeight: 1.5 }}>{desc}</div>
      </div>
      <ChevronRight size={16} color="var(--eds-text-muted)" style={{ marginTop: "0.3rem", flexShrink: 0, transition: "transform 0.2s ease, color 0.2s ease" }} />
    </Link>
  );
}

// ============================================================
// PHOTO CARD
// ============================================================
function PhotoCard({ img, title, sub, height = "260px" }: { img: string; title: string; sub?: string; height?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal eds-photo-card" style={{ height }}>
      <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      />
      <div className="eds-photo-overlay">
        <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</div>
        {sub && <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", marginTop: "0.25rem" }}>{sub}</div>}
      </div>
    </div>
  );
}

// ============================================================
// MAIN HOME
// ============================================================
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();
  const r5 = useReveal();
  const r6 = useReveal();

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>

      {/* ====================================================
          HERO — Plein écran avec image et overlay
          ==================================================== */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transform: "scale(1.03)",
          transition: "transform 8s ease-out",
        }} />
        {/* Overlay gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(11,31,58,0.95) 0%, rgba(11,31,58,0.55) 45%, rgba(11,31,58,0.15) 100%)"
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 5rem", width: "100%" }}>
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "2.5rem", height: "2px", background: "var(--eds-gold)" }} />
            <span className="eds-label">Agence Maritime · Tramping Dry Bulk</span>
          </div>

          {/* Titre principal */}
          <h1 className="eds-h1" style={{ maxWidth: "800px", marginBottom: "1.5rem" }}>
            L'expertise du<br />
            <span style={{ color: "var(--eds-gold)" }}>tramping</span><br />
            maritime intégré
          </h1>

          {/* Sous-titre */}
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", maxWidth: "520px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Depuis 1975, Euro Docks Service coordonne les escales, l'affrètement et la manutention des vraquiers sur les ports français du Nord et de Normandie.
          </p>

          {/* CTA */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="eds-btn-primary">
              Demander un devis <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="eds-btn-outline">
              Nos services
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", zIndex: 2 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)", animation: "fadeInDown 1.5s ease infinite" }} />
        </div>
      </section>

      {/* ====================================================
          STATS BAR — Style Promaritime modernisé
          ==================================================== */}
      <section className="eds-stats-bar">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            <StatItem icon={Ship} value={1750} suffix="+" label="Escales / an" />
            <StatItem icon={Anchor} value={200} suffix="+" label="Navires affrétés" />
            <StatItem icon={Package} value={4500000} label="Tonnes de vrac / an" />
            <StatItem icon={Globe} value={50} label="Années d'expertise" />
          </div>
        </div>
      </section>

      {/* ====================================================
          EXPERTISE — Texte gauche + Services liste droite
          Style Promaritime
          ==================================================== */}
      <section className="eds-section-white">
        <div className="container">
          <div ref={r1} className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

            {/* Texte gauche */}
            <div>
              <div className="eds-gold-line" />
              <div className="eds-label" style={{ marginBottom: "0.75rem" }}>Notre expertise</div>
              <h2 className="eds-h2" style={{ marginBottom: "1.5rem" }}>
                Une expertise<br />complète du tramping
              </h2>
              <p className="eds-body" style={{ marginBottom: "1.25rem" }}>
                Euro Docks Service vous accompagne dans la gestion complète de vos escales et l'acheminement de vos cargaisons en vrac. Forte de ses <strong>50 années d'expérience</strong>, notre équipe vous offre réactivité, précision et conseil sur chaque opération.
              </p>
              <p className="eds-body" style={{ marginBottom: "2rem" }}>
                Nos équipes planifient, organisent et suivent vos navires et marchandises — céréales, engrais, acier, project cargo — avec une rigueur et un professionnalisme à la hauteur de vos attentes. Nous maîtrisons l'ensemble de la chaîne du transport maritime.
              </p>
              <Link href="/about" className="eds-btn-navy">
                Le groupe <ArrowRight size={16} />
              </Link>
            </div>

            {/* Services liste droite */}
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--eds-text-muted)", marginBottom: "0.5rem" }}>
                Nos Services
              </div>
              <ServiceRow icon={Anchor} name="Consignation / Agent Navire" desc="Coordination et gestion complète des escales de vraquiers dans les ports français." to="/services" />
              <ServiceRow icon={Ship} name="Affrètement Tramping" desc="Affrètement de navires adaptés à vos besoins, service porte-à-porte dry bulk." to="/services" />
              <ServiceRow icon={Package} name="Manutention & Stevedoring" desc="Opérations de chargement et déchargement, surveillance et sécurité des cargaisons." to="/services" />
              <ServiceRow icon={Globe} name="Transit & Douane" desc="Gestion du transit de vos marchandises et formalités douanières import/export." to="/freight" />
              <ServiceRow icon={FileText} name="Freight Forwarding" desc="Solutions multimodales pour le transport de vrac sec en France et à l'international." to="/freight" />
              <ServiceRow icon={Wrench} name="Survey & Inspection" desc="Inspection de cales, tirant d'eau, pesage et certification de cargaisons." to="/services" />
              <div style={{ marginTop: "1.5rem" }}>
                <Link href="/services" className="eds-btn-primary">
                  Tous nos services <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          PHOTOS GRID — 4 photos en mosaïque
          ==================================================== */}
      <section className="eds-section-offwhite">
        <div className="container">
          <div ref={r2} className="reveal" style={{ marginBottom: "2.5rem" }}>
            <div className="eds-gold-line" />
            <div className="eds-label" style={{ marginBottom: "0.75rem" }}>Nos opérations</div>
            <h2 className="eds-h2">Du quai à la cale,<br />chaque tonne compte</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "260px 260px", gap: "1rem" }}>
            <div style={{ gridRow: "1 / 3" }}>
              <PhotoCard img={NIGHT_IMG} title="Opérations nocturnes" sub="Terminal de Boulogne-sur-Mer" height="100%" />
            </div>
            <PhotoCard img={GRAIN_IMG} title="Chargement céréales" sub="45 000 T de blé" height="260px" />
            <PhotoCard img={BRIDGE_IMG} title="Affrètement" sub="Passerelle de commandement" height="260px" />
            <PhotoCard img={PORT_IMG} title="Terminal portuaire" sub="Boulogne-sur-Mer" height="260px" />
            <PhotoCard img={SURVEY_IMG} title="Survey & Inspection" sub="Tirant d'eau certifié" height="260px" />
          </div>
        </div>
      </section>

      {/* ====================================================
          RÉSEAU PORTUAIRE — Image gauche + texte droite
          Style Promaritime
          ==================================================== */}
      <section className="eds-section-white">
        <div className="container">
          <div ref={r3} className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            {/* Image */}
            <div className="eds-photo-card" style={{ height: "420px", borderRadius: "1rem", overflow: "hidden" }}>
              <img src={DUNKERQUE_IMG} alt="Port de Dunkerque" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,31,58,0.7) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", textTransform: "uppercase" }}>Réseau portuaire</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>5 ports couverts en France</div>
              </div>
            </div>

            {/* Texte */}
            <div>
              <div className="eds-gold-line" />
              <div className="eds-label" style={{ marginBottom: "0.75rem" }}>Présence nationale</div>
              <h2 className="eds-h2" style={{ marginBottom: "1.5rem" }}>
                Un réseau<br />
                <span style={{ color: "var(--eds-gold)" }}>portuaire</span> national
              </h2>
              <p className="eds-body" style={{ marginBottom: "1.5rem" }}>
                Grâce à nos agences et à notre réseau de partenaires, nous couvrons les principaux ports français du tramping dry bulk. Notre savoir-faire nous permet de gérer efficacement chaque escale, de maîtriser les délais et d'optimiser les rotations.
              </p>

              {/* Ports list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                {[
                  { port: "Boulogne-sur-Mer", detail: "Siège social — Terminal céréales & vrac" },
                  { port: "Dunkerque", detail: "Grand port maritime — Vracs industriels" },
                  { port: "Rouen", detail: "1er port céréalier d'Europe de l'Ouest" },
                  { port: "Bayonne", detail: "Terminal agro-industriel" },
                  { port: "Calais", detail: "Trafic transmanche & vrac" },
                ].map((p) => (
                  <div key={p.port} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <MapPin size={14} color="var(--eds-gold)" strokeWidth={2} />
                    <div>
                      <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--eds-navy)" }}>{p.port}</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "var(--eds-text-muted)", marginLeft: "0.5rem" }}>— {p.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/terminal" className="eds-btn-navy">
                Nos terminaux <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          MANIFESTE — Fond image sombre, titre fort
          Style "Promaritime : une idée forte"
          ==================================================== */}
      <section style={{
        position: "relative", padding: "7rem 0",
        backgroundImage: `url(${TRAMPING_IMG})`,
        backgroundSize: "cover", backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(11,31,58,0.82)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div ref={r4} className="reveal" style={{ maxWidth: "720px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "2.5rem", height: "2px", background: "var(--eds-gold)" }} />
              <span className="eds-label">Euro Docks Service</span>
            </div>
            <h2 className="eds-h2-light" style={{ marginBottom: "1.5rem" }}>
              EDS : une idée forte
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "1rem" }}>
              Euro Docks Service, c'est la proximité d'une société humaine reposant sur une expérience solide. Afin de vous garantir une approche sur mesure et un résultat à la hauteur de vos attentes, nos équipes sont qualifiées, stables et parlent les principales langues du commerce maritime.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Nous sommes convaincus que la qualité de service dans le tramping repose avant tout sur des relations durables, une disponibilité 24h/24 et une connaissance intime des contraintes opérationnelles de chaque port.
            </p>
            <Link href="/about" className="eds-btn-primary">
              Découvrir le groupe <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECOND PHOTOS GRID — 3 photos horizontales
          ==================================================== */}
      <section className="eds-section-offwhite">
        <div className="container">
          <div ref={r5} className="reveal" style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div className="eds-gold-line" />
              <div className="eds-label" style={{ marginBottom: "0.75rem" }}>Spécialités</div>
              <h2 className="eds-h2">Nos domaines<br />d'excellence</h2>
            </div>
            <Link href="/freight" className="eds-btn-navy" style={{ marginBottom: "0.5rem" }}>
              Freight & Transit <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <PhotoCard img={HATCH_IMG} title="Inspection de cales" sub="Survey & certification" height="280px" />
            <PhotoCard img={ROUEN_IMG} title="Port de Rouen" sub="1er port céréalier européen" height="280px" />
            <PhotoCard img={GRAIN_IMG} title="Vrac céréalier" sub="Blé, maïs, colza, orge" height="280px" />
          </div>
        </div>
      </section>

      {/* ====================================================
          CLIENTS & CHIFFRES
          ==================================================== */}
      <section className="eds-section-navy">
        <div className="container">
          <div ref={r6} className="reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="eds-gold-line-center" />
            <div className="eds-label" style={{ marginBottom: "0.75rem" }}>Ils nous font confiance</div>
            <h2 className="eds-h2-light" style={{ marginBottom: "1rem" }}>
              +15 armateurs & chargeurs<br />partenaires
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
              Des relations durables avec les principaux acteurs du tramping dry bulk en Europe du Nord et Atlantique.
            </p>
          </div>

          {/* Clients grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem", marginBottom: "3rem" }}>
            {["CARGILL", "LOUIS DREYFUS", "BUNGE", "SOUFFLET", "INVIVO", "DREYFUS", "TOEPFER", "ADM", "GLENCORE", "VITERRA"].map((c) => (
              <div key={c} style={{
                padding: "1.25rem 1rem", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem",
                textAlign: "center",
                fontFamily: "Outfit, sans-serif", fontWeight: 700,
                fontSize: "0.75rem", letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.6)", textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,150,58,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,150,58,0.3)"; (e.currentTarget as HTMLElement).style.color = "var(--eds-gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          CTA FINAL — Contact
          ==================================================== */}
      <section className="eds-section-white">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <div className="eds-gold-line" />
              <div className="eds-label" style={{ marginBottom: "0.75rem" }}>Contactez-nous</div>
              <h2 className="eds-h2" style={{ marginBottom: "1.25rem" }}>
                Votre prochaine<br />escale commence ici
              </h2>
              <p className="eds-body" style={{ marginBottom: "2rem" }}>
                Armateurs, affréteurs, chargeurs — contactez nos équipes pour une prise en charge rapide de votre opération. Disponibles 24h/24, 7j/7.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Phone size={16} color="var(--eds-gold)" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "var(--eds-navy)" }}>+33 (0)3 21 31 74 00</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Mail size={16} color="var(--eds-gold)" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "var(--eds-navy)" }}>contact@eurodocks.fr</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <MapPin size={16} color="var(--eds-gold)" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "var(--eds-navy)" }}>Boulogne-sur-Mer, France</span>
                </div>
              </div>
              <Link href="/contact" className="eds-btn-primary">
                Demander un devis <ArrowRight size={16} />
              </Link>
            </div>

            {/* Photo contact */}
            <div className="eds-photo-card" style={{ height: "380px", borderRadius: "1rem" }}>
              <img src={PORT_IMG} alt="Port de Boulogne" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,31,58,0.7) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", textTransform: "uppercase" }}>Boulogne-sur-Mer</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>Siege social - Port principal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInDown {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(8px); }
        }
      `}</style>
    </div>
  );
}
