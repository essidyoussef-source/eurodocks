import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, Send } from "lucide-react";

const HERO_IMG = "/manus-storage/eds2_port_dunkerque_d6951241.jpg";
const PORT_IMG = "/manus-storage/sonar_s3_quay_08f8f2bf.jpg";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}

const OFFICES = [
  {
    city: "Boulogne-sur-Mer",
    role: "Siege social - Port principal",
    address: "Quai Gambetta, 62200 Boulogne-sur-Mer",
    phone: "+33 3 21 31 XX XX",
    email: "boulogne@eurodocks.fr",
    hours: "24h/24 - 7j/7",
  },
  {
    city: "Dunkerque",
    role: "Grand port maritime",
    address: "Port Ouest, 59140 Dunkerque",
    phone: "+33 3 28 XX XX XX",
    email: "dunkerque@eurodocks.fr",
    hours: "24h/24 - 7j/7",
  },
  {
    city: "Rouen",
    role: "Terminal cerealier",
    address: "Port de Rouen, 76000 Rouen",
    phone: "+33 2 35 XX XX XX",
    email: "rouen@eurodocks.fr",
    hours: "Lun-Ven 08h-18h",
  },
];

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm] = useState({
    nom: "", societe: "", email: "", telephone: "", sujet: "", message: ""
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    color: "var(--eds-navy)",
    background: "#fff",
    border: "1px solid #d8d4cc",
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ position: "relative", height: "55vh", minHeight: "380px", overflow: "hidden" }}>
        <img
          src={HERO_IMG}
          alt="Port de Dunkerque"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.6) 60%, rgba(11,31,58,0.25) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 0 4rem 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", width: "100%" }}>
            <Reveal>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>
                Contact
              </div>
              <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", lineHeight: 1.05, margin: "0 0 1rem 0" }}>
                Contactez nos<br />
                <em style={{ fontStyle: "italic", color: "var(--eds-gold)" }}>agents portuaires.</em>
              </h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.7)", maxWidth: "480px", lineHeight: 1.7, margin: 0 }}>
                Disponibles 24h/24, 7j/7. Reponse garantie en moins de 2 heures pour toute demande operationnelle.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AGENCES BAR */}
      <section style={{ background: "var(--eds-navy)", padding: "0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
            {OFFICES.map((office, i) => (
              <div key={office.city} style={{
                padding: "2.5rem 2rem",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                borderLeft: i === 0 ? "3px solid var(--eds-gold)" : "none"
              }}>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff", marginBottom: "0.25rem" }}>
                  {office.city}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
                  {office.role}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <MapPin size={13} color="rgba(255,255,255,0.4)" style={{ marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{office.address}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Phone size={13} color="rgba(255,255,255,0.4)" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.65)" }}>{office.phone}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Mail size={13} color="rgba(255,255,255,0.4)" />
                    <a href={`mailto:${office.email}`} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "var(--eds-gold)", textDecoration: "none" }}>{office.email}</a>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Clock size={13} color="rgba(255,255,255,0.4)" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.65)" }}>{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE + INFO */}
      <section style={{ padding: "6rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

            {/* Formulaire */}
            <Reveal>
              <div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--eds-gold)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600, marginBottom: "0.75rem" }}>
                  Demande de contact
                </div>
                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: "var(--eds-navy)", lineHeight: 1.1, margin: "0 0 2rem 0" }}>
                  Envoyez-nous<br />votre demande
                </h2>

                {sent ? (
                  <div style={{ background: "rgba(201,150,58,0.08)", border: "1px solid var(--eds-gold)", borderRadius: "0.75rem", padding: "2rem", textAlign: "center" }}>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--eds-navy)", marginBottom: "0.5rem" }}>Message envoye !</div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "var(--eds-slate)", margin: 0 }}>Nos equipes vous repondront dans les 2 heures.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "var(--eds-navy)", textTransform: "uppercase" as const, letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Nom *</label>
                        <input type="text" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Votre nom" style={inputStyle}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--eds-gold)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#d8d4cc"; }}
                        />
                      </div>
                      <div>
                        <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "var(--eds-navy)", textTransform: "uppercase" as const, letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Societe</label>
                        <input type="text" value={form.societe} onChange={(e) => setForm({ ...form, societe: e.target.value })} placeholder="Votre societe" style={inputStyle}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--eds-gold)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#d8d4cc"; }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "var(--eds-navy)", textTransform: "uppercase" as const, letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Email *</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="votre@email.com" style={inputStyle}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--eds-gold)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#d8d4cc"; }}
                        />
                      </div>
                      <div>
                        <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "var(--eds-navy)", textTransform: "uppercase" as const, letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Telephone</label>
                        <input type="tel" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} placeholder="+33 X XX XX XX XX" style={inputStyle}
                          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--eds-gold)"; }}
                          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#d8d4cc"; }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "var(--eds-navy)", textTransform: "uppercase" as const, letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Sujet *</label>
                      <select required value={form.sujet} onChange={(e) => setForm({ ...form, sujet: e.target.value })} style={{ ...inputStyle, appearance: "none" as const }}
                        onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = "var(--eds-gold)"; }}
                        onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = "#d8d4cc"; }}
                      >
                        <option value="">Selectionnez un sujet</option>
                        <option value="consignation">Consignation de navire</option>
                        <option value="affretement">Affretement tramping</option>
                        <option value="manutention">Manutention et stevedoring</option>
                        <option value="transit">Transit douanier</option>
                        <option value="freight">Freight forwarding</option>
                        <option value="autre">Autre demande</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "var(--eds-navy)", textTransform: "uppercase" as const, letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Message *</label>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Decrivez votre besoin operationnel..." style={{ ...inputStyle, resize: "vertical" as const, minHeight: "120px" }}
                        onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--eds-gold)"; }}
                        onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "#d8d4cc"; }}
                      />
                    </div>
                    <button type="submit" className="eds-btn-primary" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      Envoyer la demande <Send size={15} />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Info + photo */}
            <Reveal delay={120}>
              <div>
                <div style={{ borderRadius: "1rem", overflow: "hidden", aspectRatio: "4/3", marginBottom: "2rem" }}>
                  <img src={PORT_IMG} alt="Port EDS" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ background: "#f8f6f2", borderRadius: "1rem", padding: "2rem", border: "1px solid #e8e4dc" }}>
                  <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--eds-navy)", margin: "0 0 1.25rem 0" }}>
                    Urgence operationnelle ?
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "var(--eds-slate)", lineHeight: 1.7, margin: "0 0 1.5rem 0" }}>
                    Pour toute urgence portuaire, escale imminente ou incident de cargaison, appelez directement notre permanence 24h/24.
                  </p>
                  <a href="tel:+33321310000" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--eds-navy)", textDecoration: "none" }}>
                    <Phone size={18} color="var(--eds-gold)" />
                    +33 3 21 31 XX XX
                  </a>
                  <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e8e4dc" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <Clock size={14} color="var(--eds-gold)" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--eds-slate)" }}>Permanence 24h/24 - 7j/7</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <ArrowRight size={14} color="var(--eds-gold)" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--eds-slate)" }}>Reponse garantie en moins de 2h</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
