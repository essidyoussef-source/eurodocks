/**
 * Contact — Euro Docks Service
 * DA : Maritime Prestige — Ivoire chaud, navy profond, or ambre
 * Typographie : Cormorant Garamond (display) + Inter (corps)
 */

import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useReveal();
  return <div ref={ref} className="eds-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const IMG_HERO  = "/manus-storage/sonar_s3_quay_e4f5a6b7.jpg";
const IMG_NIGHT = "/manus-storage/sonar_s3_crane_f6a7b8c9.jpg";

const OFFICES = [
  {
    city: "Boulogne-sur-Mer",
    role: "Siège social & Terminal principal",
    address: "Quai Gambetta, 62200 Boulogne-sur-Mer",
    phone: "+33 (0)3 21 30 XX XX",
    email: "boulogne@eurodocks.fr",
    services: ["Agence maritime", "Consignation", "Stevedoring"],
  },
  {
    city: "Dunkerque",
    role: "Agence maritime Nord",
    address: "Port de Dunkerque, 59140 Dunkerque",
    phone: "+33 (0)3 28 XX XX XX",
    email: "dunkerque@eurodocks.fr",
    services: ["Shipping Agency", "Tramping", "Courtage douane"],
  },
  {
    city: "Rouen",
    role: "Terminal céréales & agrobulk",
    address: "Port de Rouen, 76000 Rouen",
    phone: "+33 (0)2 35 XX XX XX",
    email: "rouen@eurodocks.fr",
    services: ["Grain Terminal", "Freight Forwarding", "Expertise maritime"],
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.9rem",
  color: "var(--eds-navy)",
  background: "var(--eds-white)",
  border: "1px solid var(--border)",
  borderRadius: 0,
  padding: "0.85rem 1rem",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.65rem",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--eds-steel)",
  display: "block",
  marginBottom: "0.4rem",
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
    <div style={{ background: "var(--eds-ivory)" }}>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", height: "55vh", minHeight: "420px",
        overflow: "hidden", display: "flex", alignItems: "flex-end",
        paddingBottom: "5rem", paddingTop: "94px",
      }}>
        <img src={IMG_HERO} alt="Contact Euro Docks Service" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, oklch(0.10 0.03 240 / 0.95) 0%, oklch(0.10 0.03 240 / 0.5) 55%, oklch(0.10 0.03 240 / 0.15) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, oklch(0.10 0.03 240 / 0.75) 0%, transparent 55%)",
        }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem", width: "100%" }}>
          <div className="eds-gold-rule">
            <span className="eds-label" style={{ color: "var(--eds-gold)" }}>Contact</span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700, fontSize: "clamp(2.8rem, 6vw, 5rem)",
            letterSpacing: "-0.03em", lineHeight: 1.0,
            color: "var(--eds-white)", marginBottom: "1rem",
          }}>
            Parlons de<br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--eds-gold)" }}>
              votre prochaine escale.
            </span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem", lineHeight: 1.7,
            color: "oklch(1 0 0 / 0.65)", maxWidth: "440px",
          }}>
            Réponse garantie sous 2 heures. Disponibles 24h/24 pour les urgences opérationnelles.
          </p>
        </div>
      </section>

      {/* ── FORMULAIRE + INFOS ── */}
      <section style={{ padding: "6rem 0", background: "var(--eds-cream)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">

            {/* Formulaire */}
            <RevealBlock>
              <div className="eds-gold-rule"><span className="eds-label">Demande de contact</span></div>
              <h2 className="eds-h2" style={{ marginBottom: "2.5rem" }}>
                Votre demande<br />
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>en détail.</span>
              </h2>

              {submitted ? (
                <div style={{ padding: "3rem", background: "var(--eds-navy)", textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "2rem", fontWeight: 600,
                    color: "var(--eds-gold)", marginBottom: "1rem",
                  }}>Message envoyé</div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem", color: "oklch(1 0 0 / 0.65)",
                  }}>Notre équipe vous répondra dans les 2 heures.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={labelStyle}>Nom *</label>
                      <input type="text" placeholder="Jean Dupont" required
                        value={formData.name}
                        onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = "var(--eds-gold)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Société *</label>
                      <input type="text" placeholder="Armement SA" required
                        value={formData.company}
                        onChange={e => setFormData(f => ({ ...f, company: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = "var(--eds-gold)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" placeholder="contact@armement.fr" required
                        value={formData.email}
                        onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = "var(--eds-gold)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Téléphone</label>
                      <input type="tel" placeholder="+33 6 XX XX XX XX"
                        value={formData.phone}
                        onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = "var(--eds-gold)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Service *</label>
                    <select required value={formData.service}
                      onChange={e => setFormData(f => ({ ...f, service: e.target.value }))}
                      style={{ ...inputStyle, appearance: "none" as const }}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--eds-gold)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                    >
                      <option value="" disabled>Sélectionner...</option>
                      <option value="agency">Agence maritime / Consignation</option>
                      <option value="charter">Affrètement tramping</option>
                      <option value="customs">Transit & douane</option>
                      <option value="survey">Expertise maritime</option>
                      <option value="freight">Freight forwarding</option>
                      <option value="terminal">Terminal portuaire</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea rows={5} required
                      placeholder="Décrivez votre besoin : type de navire, cargaison, ports, tonnage, période..."
                      value={formData.message}
                      onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--eds-gold)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  </div>
                  <button type="submit" className="eds-btn eds-btn-gold" style={{ alignSelf: "flex-start" }}>
                    Envoyer la demande <Send size={14} />
                  </button>
                </form>
              )}
            </RevealBlock>

            {/* Infos de contact */}
            <RevealBlock delay={150}>
              <div className="eds-gold-rule"><span className="eds-label">Nos agences</span></div>
              <h2 className="eds-h2" style={{ marginBottom: "2.5rem" }}>
                3 agences<br />
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>à votre service.</span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {OFFICES.map(({ city, role, address, phone, email, services }, i) => (
                  <div key={i} style={{
                    padding: "2rem",
                    borderLeft: i === 0 ? "3px solid var(--eds-gold)" : "1px solid var(--border)",
                    borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                    background: i === 0 ? "var(--eds-white)" : "transparent",
                    marginLeft: i === 0 ? 0 : "2px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <MapPin size={14} color="var(--eds-gold)" />
                      <span style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 700, fontSize: "1.2rem", color: "var(--eds-navy)",
                      }}>{city}</span>
                    </div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem", fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "var(--eds-gold)", marginBottom: "1rem",
                    }}>{role}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.75rem" }}>
                      {[
                        { icon: <MapPin size={12} />, text: address },
                        { icon: <Phone size={12} />, text: phone },
                        { icon: <Mail size={12} />, text: email },
                      ].map(({ icon, text }, j) => (
                        <div key={j} style={{
                          display: "flex", alignItems: "flex-start", gap: "0.5rem",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.82rem", color: "var(--eds-steel)",
                        }}>
                          <span style={{ color: "var(--eds-steel)", marginTop: "2px", flexShrink: 0 }}>{icon}</span>
                          {text}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {services.map((s, j) => (
                        <span key={j} style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.65rem", letterSpacing: "0.06em",
                          color: "var(--eds-steel)",
                          border: "1px solid var(--border)",
                          padding: "0.2rem 0.5rem",
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Urgences */}
              <div style={{
                marginTop: "2rem", padding: "1.5rem 2rem",
                background: "var(--eds-navy)", borderLeft: "3px solid var(--eds-gold)",
              }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "var(--eds-gold)", marginBottom: "0.5rem",
                }}>Urgences opérationnelles 24h/24</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700, fontSize: "1.5rem", color: "var(--eds-white)",
                }}>+33 (0)6 XX XX XX XX</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem", color: "oklch(1 0 0 / 0.5)", marginTop: "0.25rem",
                }}>Astreinte permanente — 365 jours / an</div>
              </div>

              {/* Photo nuit */}
              <div style={{ position: "relative", height: "220px", overflow: "hidden", marginTop: "2rem" }}>
                <img src={IMG_NIGHT} alt="Opérations nocturnes" style={{
                  width: "100%", height: "100%", objectFit: "cover",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, oklch(0.10 0.03 240 / 0.8) 0%, transparent 60%)",
                }} />
                <div style={{
                  position: "absolute", bottom: "1rem", left: "1rem",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem", fontStyle: "italic",
                  color: "oklch(1 0 0 / 0.6)",
                }}>
                  Opérations 24h/24 — Dunkerque, Boulogne, Rouen
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── DÉLAI DE RÉPONSE ── */}
      <section style={{ padding: "4rem 0", background: "var(--eds-navy)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }} className="grid-cols-1 sm:grid-cols-3">
            {[
              { v: "< 2h", l: "Délai de réponse", sub: "Garanti en heures ouvrées" },
              { v: "24h/24", l: "Astreinte urgences", sub: "365 jours par an" },
              { v: "3", l: "Agences en France", sub: "Boulogne · Dunkerque · Rouen" },
            ].map(({ v, l, sub }, i) => (
              <div key={i} style={{
                padding: "2.5rem 2rem",
                borderRight: i < 2 ? "1px solid oklch(1 0 0 / 0.08)" : "none",
                borderLeft: i === 0 ? "3px solid var(--eds-gold)" : "none",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700, fontSize: "2.5rem",
                  color: "var(--eds-gold)", lineHeight: 1, letterSpacing: "-0.03em",
                }}>{v}</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem", fontWeight: 600,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "var(--eds-white)", marginTop: "0.5rem",
                }}>{l}</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem", color: "oklch(1 0 0 / 0.4)", marginTop: "0.2rem",
                }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
