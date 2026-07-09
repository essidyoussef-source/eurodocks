/**
 * Contact — Euro Docks Service v3 SONAR
 * DA : "SONAR / Instrument de bord" — Ink abyssal + Signal vert-lime
 */

import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, Clock } from "lucide-react";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0, dir = "up" }: {
  children: React.ReactNode; className?: string; delay?: number; dir?: "up" | "left" | "right";
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const t = dir === "left" ? "translateX(-28px)" : dir === "right" ? "translateX(28px)" : "translateY(24px)";
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : t,
      transition: `opacity 0.65s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.65s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const IMGS = {
  hero:  "/manus-storage/sonar_s3_quay_1898dc53.jpg",
  night: "/manus-storage/sonar_s3_crane_89d5c612.jpg",
};

const offices = [
  {
    city: "Dunkerque",
    role: "Siège social",
    address: "Port de Dunkerque, France",
    phone: "+33 (0)3 28 63 00 00",
    email: "commercial@eurodocks.com",
    services: ["Shipping Agency", "Chartering & Tramping", "Customs Brokerage"],
  },
  {
    city: "Boulogne-sur-Mer",
    role: "Terminal dédié",
    address: "Port de Boulogne-sur-Mer, France",
    phone: "+33 (0)3 21 99 00 00",
    email: "boulogne@eurodocks.com",
    services: ["Port Terminal", "Stevedoring", "Maritime Survey"],
  },
  {
    city: "Rouen",
    role: "Terminaux grain",
    address: "Port de Rouen, France",
    phone: "+33 (0)2 35 52 00 00",
    email: "rouen@eurodocks.com",
    services: ["Grain Terminal", "Freight Forwarding", "Shipping Agency"],
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "oklch(0.12 0.03 200)",
  border: "1px solid oklch(1 0 0 / 0.10)",
  borderBottom: "1px solid oklch(0.82 0.18 145 / 0.25)",
  padding: "0.875rem 1rem",
  color: "oklch(0.90 0.005 200)",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "0.75rem",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "0.58rem", letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "oklch(0.82 0.18 145)",
  display: "block", marginBottom: "0.4rem",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "var(--sonar-abyss)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "480px" }}>
        <img src={IMGS.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 40%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, oklch(0.08 0.025 200 / 0.60) 0%, oklch(0.08 0.025 200 / 0.95) 100%)",
        }} />
        <div className="sonar-bathymetric" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.62rem", letterSpacing: "0.15em",
            color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1.5rem",
          }}>
            <span style={{ width: "24px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
            Contact
          </div>
          <h1 style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 900, fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.03em", textTransform: "uppercase",
            color: "oklch(0.97 0.005 200)", lineHeight: 0.92,
            marginBottom: "1.5rem",
          }}>
            PARLONS<br />
            <span style={{ color: "oklch(0.82 0.18 145)" }}>DE VOTRE PROJET.</span>
          </h1>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.80rem", color: "oklch(0.60 0.025 200)",
            lineHeight: 1.7, maxWidth: "480px",
          }}>
            Affrètement, agence maritime, transit multimodal ou terminal portuaire —
            notre équipe répond sous 24 heures.
          </p>
        </div>
      </section>

      {/* ── Formulaire + Infos ── */}
      <section style={{ background: "var(--sonar-deep)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{
            display: "grid", gridTemplateColumns: "1.4fr 1fr",
            gap: "4rem", alignItems: "start",
          }} className="grid-cols-1 lg:grid-cols-2">

            {/* Formulaire */}
            <Reveal dir="left">
              <div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.60rem", letterSpacing: "0.15em",
                  color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  marginBottom: "1rem",
                }}>
                  <span style={{ width: "20px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
                  Envoyer un message
                </div>
                <h2 style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.025em", textTransform: "uppercase",
                  color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
                  marginBottom: "2rem",
                }}>
                  DEMANDE<br />
                  <span style={{ color: "oklch(0.82 0.18 145)" }}>DE DEVIS.</span>
                </h2>

                {submitted ? (
                  <div style={{
                    border: "1px solid oklch(0.82 0.18 145 / 0.30)",
                    borderTop: "1.5px solid oklch(0.82 0.18 145)",
                    padding: "2rem",
                    background: "oklch(0.82 0.18 145 / 0.05)",
                  }}>
                    <div style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800, fontSize: "1.2rem",
                      textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                      marginBottom: "0.5rem",
                    }}>MESSAGE ENVOYÉ</div>
                    <p style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.72rem", color: "oklch(0.58 0.025 200)",
                      lineHeight: 1.7,
                    }}>
                      Notre équipe commerciale vous répondra sous 24 heures ouvrées.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={labelStyle}>NOM *</label>
                        <input
                          type="text" placeholder="Jean Dupont" required
                          value={formData.name}
                          onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                          style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145)")}
                          onBlur={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145 / 0.25)")}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>SOCIÉTÉ *</label>
                        <input
                          type="text" placeholder="Armateur SA" required
                          value={formData.company}
                          onChange={e => setFormData(f => ({ ...f, company: e.target.value }))}
                          style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145)")}
                          onBlur={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145 / 0.25)")}
                        />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={labelStyle}>EMAIL *</label>
                        <input
                          type="email" placeholder="contact@armateur.com" required
                          value={formData.email}
                          onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                          style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145)")}
                          onBlur={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145 / 0.25)")}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>TÉLÉPHONE</label>
                        <input
                          type="tel" placeholder="+33 6 00 00 00 00"
                          value={formData.phone}
                          onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                          style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145)")}
                          onBlur={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145 / 0.25)")}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>SERVICE *</label>
                      <select
                        required
                        value={formData.service}
                        onChange={e => setFormData(f => ({ ...f, service: e.target.value }))}
                        style={{ ...inputStyle, cursor: "pointer" }}
                        onFocus={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145)")}
                        onBlur={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145 / 0.25)")}
                      >
                        <option value="" disabled>Sélectionner un service</option>
                        <option value="agency">Agence Maritime</option>
                        <option value="charter">Affrètement Tramping</option>
                        <option value="customs">Courtage en Douane</option>
                        <option value="survey">Expertise Maritime</option>
                        <option value="freight">Freight Forwarding</option>
                        <option value="terminal">Port Terminal</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>MESSAGE *</label>
                      <textarea
                        rows={5} required
                        placeholder="Décrivez votre projet : type de cargaison, port de chargement/déchargement, tonnage, période..."
                        value={formData.message}
                        onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                        style={{ ...inputStyle, resize: "vertical" }}
                        onFocus={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145)")}
                        onBlur={e => (e.currentTarget.style.borderBottomColor = "oklch(0.82 0.18 145 / 0.25)")}
                      />
                    </div>
                    <button type="submit" className="sonar-btn sonar-btn-signal" style={{ alignSelf: "flex-start" }}>
                      ENVOYER LA DEMANDE <ArrowRight size={13} />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Infos de contact */}
            <Reveal dir="right" delay={100}>
              <div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.60rem", letterSpacing: "0.15em",
                  color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  marginBottom: "1rem",
                }}>
                  <span style={{ width: "20px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
                  Réponse rapide
                </div>
                <h2 style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900, fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  letterSpacing: "-0.02em", textTransform: "uppercase",
                  color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
                  marginBottom: "0.75rem",
                }}>DISPONIBLES<br />24H/24.</h2>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.70rem", color: "oklch(0.55 0.025 200)",
                  lineHeight: 1.7, marginBottom: "1.75rem",
                }}>
                  Notre équipe opérationnelle est disponible 24h/24 pour les urgences portuaires.
                  Les demandes commerciales sont traitées sous 24 heures ouvrées.
                </p>

                {/* Infos clés */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                  {[
                    { icon: <Clock size={14} />, label: "Réponse sous 24 heures", sub: "Jours ouvrés — urgences traitées immédiatement" },
                    { icon: <Phone size={14} />, label: "+33 (0)3 28 63 00 00", sub: "TÉLÉPHONE" },
                    { icon: <Mail size={14} />, label: "commercial@eurodocks.com", sub: "EMAIL COMMERCIAL" },
                  ].map(({ icon, label, sub }) => (
                    <div key={label} style={{
                      display: "flex", alignItems: "flex-start", gap: "0.75rem",
                      padding: "0.875rem 1rem",
                      background: "oklch(1 0 0 / 0.03)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      borderLeft: "2px solid oklch(0.82 0.18 145 / 0.40)",
                    }}>
                      <span style={{ color: "oklch(0.82 0.18 145)", marginTop: "1px", flexShrink: 0 }}>{icon}</span>
                      <div>
                        <div style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.62rem", letterSpacing: "0.08em",
                          textTransform: "uppercase", color: "oklch(0.45 0.025 200)",
                          marginBottom: "0.2rem",
                        }}>{sub}</div>
                        <div style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.72rem", fontWeight: 500,
                          color: "oklch(0.85 0.01 200)",
                        }}>{label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Photo nuit */}
                <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                  <img src={IMGS.night} alt="Opérations nocturnes" style={{
                    width: "100%", height: "100%", objectFit: "cover",
                  }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, oklch(0.08 0.025 200 / 0.80) 0%, transparent 60%)",
                  }} />
                  <div style={{
                    position: "absolute", bottom: "1rem", left: "1rem",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.60rem", color: "oklch(0.65 0.025 200)",
                    fontStyle: "italic",
                  }}>
                    Opérations 24h/24 — Dunkerque, Boulogne, Rouen, Bayonne, Calais
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Agences ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "5rem 0" }}>
        <img src={IMGS.hero} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 70%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "oklch(0.08 0.025 200 / 0.92)",
        }} />
        <div className="sonar-bathymetric" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal className="mb-10">
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.60rem", letterSpacing: "0.15em",
              color: "oklch(0.82 0.18 145)", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ width: "20px", height: "1px", background: "oklch(0.82 0.18 145)" }} />
              Nos agences
            </div>
            <h2 style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              letterSpacing: "-0.025em", textTransform: "uppercase",
              color: "oklch(0.97 0.005 200)", lineHeight: 0.95,
            }}>
              PRÉSENTS DANS<br />
              <span style={{ color: "oklch(0.82 0.18 145)" }}>5 PORTS FRANÇAIS.</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px" }} className="grid-cols-1 md:grid-cols-3">
            {offices.map((office, i) => (
              <Reveal key={office.city} delay={i * 80}>
                <div style={{
                  background: "oklch(0 0 0 / 0.55)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  borderTop: "1.5px solid oklch(0.82 0.18 145 / 0.40)",
                  padding: "2rem",
                  height: "100%",
                }}>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.58rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "oklch(0.82 0.18 145)",
                    marginBottom: "0.5rem",
                  }}>{office.role}</div>
                  <h3 style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800, fontSize: "1.4rem",
                    textTransform: "uppercase", letterSpacing: "-0.01em",
                    color: "oklch(0.97 0.005 200)", marginBottom: "1.25rem",
                  }}>{office.city}</h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    {[
                      { icon: <MapPin size={11} />, text: office.address },
                      { icon: <Phone size={11} />, text: office.phone },
                      { icon: <Mail size={11} />, text: office.email },
                    ].map(({ icon, text }) => (
                      <div key={text} style={{
                        display: "flex", alignItems: "center", gap: "0.5rem",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.62rem", color: "oklch(0.52 0.025 200)",
                      }}>
                        <span style={{ color: "oklch(0.82 0.18 145)", flexShrink: 0 }}>{icon}</span>
                        {text}
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)", paddingTop: "1rem" }}>
                    {office.services.map(s => (
                      <div key={s} style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "0.60rem", color: "oklch(0.45 0.025 200)",
                        padding: "0.2rem 0",
                        display: "flex", alignItems: "center", gap: "0.4rem",
                      }}>
                        <span style={{ width: "10px", height: "1px", background: "oklch(0.82 0.18 145 / 0.40)", flexShrink: 0 }} />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
