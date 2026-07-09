/**
 * Contact — Euro Docks Service v2
 * Design: Opérateur Maritime — photo-driven, B2B maritime
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
      { threshold: 0.10 }
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
      transition: `opacity 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const IMGS = {
  hero:  "/manus-storage/eds2_port_dunkerque_9fea8573.jpg",
  night: "/manus-storage/eds2_stevedoring_night_f14f419a.jpg",
  hatch: "/manus-storage/eds2_hatch_inspection_5a8b030b.jpg",
};

const offices = [
  {
    city: "Dunkerque",
    role: "Siège social",
    address: "Port de Dunkerque, France",
    phone: "+33 (0)3 28 63 00 00",
    email: "commercial@eurodocks.fr",
    services: ["Shipping Agency", "Chartering & Tramping", "Customs Brokerage"],
  },
  {
    city: "Boulogne-sur-Mer",
    role: "Terminal dédié",
    address: "Port de Boulogne-sur-Mer, France",
    phone: "+33 (0)3 21 99 00 00",
    email: "boulogne@eurodocks.fr",
    services: ["Port Terminal", "Stevedoring", "Maritime Survey"],
  },
  {
    city: "Rouen",
    role: "Terminaux grain",
    address: "Port de Rouen, France",
    phone: "+33 (0)2 35 52 00 00",
    email: "rouen@eurodocks.fr",
    services: ["Grain Terminal", "Freight Forwarding", "Shipping Agency"],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCss: React.CSSProperties = {
    width: "100%",
    background: "oklch(0.14 0.03 240)",
    border: "1px solid oklch(1 0 0 / 0.12)",
    padding: "0.875rem 1rem",
    color: "oklch(0.90 0.01 240)",
    fontFamily: "'Barlow', sans-serif",
    fontSize: "0.88rem",
    outline: "none",
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.08 0.015 240)" }}>

      {/* ── Hero : port Dunkerque plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "440px", paddingTop: "7rem" }}>
        <img src={IMGS.hero} alt="Port de Dunkerque" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, oklch(0.08 0.015 240 / 0.60) 0%, oklch(0.08 0.015 240 / 0.92) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, oklch(0.08 0.015 240 / 0.85) 0%, transparent 65%)"
        }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 pb-14 flex flex-col justify-end" style={{ minHeight: "440px" }}>
          <div className="max-w-2xl">
            <div className="eds-tag mb-4">Contact</div>
            <h1 className="eds-h1 mb-4" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
              Parlons<br />
              <span className="eds-accent">de votre</span><br />
              projet.
            </h1>
            <p className="text-base max-w-xl" style={{ color: "oklch(0.68 0.015 240)", lineHeight: 1.7 }}>
              Affrètement, agence maritime, transit multimodal ou terminal portuaire — notre équipe répond sous 24 heures.
            </p>
          </div>
        </div>
      </section>

      {/* ── Formulaire + infos ── */}
      <section style={{ background: "oklch(0.10 0.015 240)" }}>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* Formulaire — 3 colonnes */}
            <Reveal dir="left" className="lg:col-span-3">
              <div className="eds-tag mb-4">Envoyer un message</div>
              <h2 className="eds-h2 mb-8">
                Demande<br />
                <span className="eds-accent">de devis.</span>
              </h2>

              {submitted ? (
                <div className="p-8 text-center" style={{
                  background: "oklch(0.14 0.03 240)",
                  border: "1px solid oklch(0.72 0.14 65 / 0.30)",
                  borderTop: "2px solid oklch(0.72 0.14 65)",
                }}>
                  <div className="eds-tag mb-4 justify-center">Message envoyé</div>
                  <h3 className="eds-h3 mb-3">Votre demande a été transmise.</h3>
                  <p className="text-sm" style={{ color: "oklch(0.62 0.015 240)" }}>
                    Notre équipe commerciale vous répondra sous 24 heures ouvrées.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.72 0.14 65)" }}>Nom *</label>
                      <input type="text" required value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={inputCss} placeholder="Jean Dupont" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.72 0.14 65)" }}>Société *</label>
                      <input type="text" required value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={inputCss} placeholder="Armateur SA" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.72 0.14 65)" }}>Email *</label>
                      <input type="email" required value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={inputCss} placeholder="contact@armateur.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.72 0.14 65)" }}>Téléphone</label>
                      <input type="tel" value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={inputCss} placeholder="+33 6 00 00 00 00" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.72 0.14 65)" }}>Service *</label>
                    <select required value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{ ...inputCss, cursor: "pointer" }}>
                      <option value="" disabled style={{ background: "oklch(0.14 0.03 240)" }}>Sélectionner un service</option>
                      <option value="shipping" style={{ background: "oklch(0.14 0.03 240)" }}>Shipping Agency</option>
                      <option value="chartering" style={{ background: "oklch(0.14 0.03 240)" }}>Chartering & Tramping</option>
                      <option value="customs" style={{ background: "oklch(0.14 0.03 240)" }}>Customs Brokerage</option>
                      <option value="survey" style={{ background: "oklch(0.14 0.03 240)" }}>Maritime Survey</option>
                      <option value="freight" style={{ background: "oklch(0.14 0.03 240)" }}>Freight Forwarding</option>
                      <option value="terminal" style={{ background: "oklch(0.14 0.03 240)" }}>Port Terminal</option>
                      <option value="other" style={{ background: "oklch(0.14 0.03 240)" }}>Autre demande</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "oklch(0.72 0.14 65)" }}>Message *</label>
                    <textarea required rows={5} value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ ...inputCss, resize: "none" }}
                      placeholder="Décrivez votre projet : type de cargaison, port de chargement/déchargement, tonnage, période..." />
                  </div>
                  <button type="submit" className="eds-btn eds-btn-amber self-start">
                    Envoyer la demande <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </Reveal>

            {/* Infos — 2 colonnes */}
            <Reveal delay={80} dir="right" className="lg:col-span-2">
              <div className="eds-tag mb-4">Réponse rapide</div>
              <h2 className="eds-h2 mb-6">
                Disponibles<br />
                <span className="eds-accent">24h/24.</span>
              </h2>

              <div className="flex items-center gap-4 p-4 mb-6" style={{
                background: "oklch(0.14 0.03 240)",
                border: "1px solid oklch(0.72 0.14 65 / 0.25)",
                borderLeft: "2px solid oklch(0.72 0.14 65)",
              }}>
                <Clock size={20} style={{ color: "oklch(0.72 0.14 65)", flexShrink: 0 }} />
                <div>
                  <div className="text-sm font-bold" style={{ color: "oklch(0.90 0.01 240)" }}>Réponse sous 24 heures</div>
                  <div className="text-xs" style={{ color: "oklch(0.55 0.015 240)" }}>Jours ouvrés — urgences traitées immédiatement</div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                <a href="tel:+33328630000" className="flex items-center gap-3 p-4 transition-colors" style={{
                  background: "oklch(0.14 0.03 240)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                }}>
                  <Phone size={16} style={{ color: "oklch(0.72 0.14 65)", flexShrink: 0 }} />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "oklch(0.72 0.14 65)" }}>Téléphone</div>
                    <div className="text-sm" style={{ color: "oklch(0.88 0.01 240)" }}>+33 (0)3 28 63 00 00</div>
                  </div>
                </a>
                <a href="mailto:commercial@eurodocks.fr" className="flex items-center gap-3 p-4 transition-colors" style={{
                  background: "oklch(0.14 0.03 240)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                }}>
                  <Mail size={16} style={{ color: "oklch(0.72 0.14 65)", flexShrink: 0 }} />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "oklch(0.72 0.14 65)" }}>Email commercial</div>
                    <div className="text-sm" style={{ color: "oklch(0.88 0.01 240)" }}>commercial@eurodocks.fr</div>
                  </div>
                </a>
              </div>

              {/* Image nuit */}
              <div className="relative" style={{ height: "220px", borderRadius: "2px", overflow: "hidden" }}>
                <img src={IMGS.night} alt="Opérations nocturnes" className="w-full h-full object-cover" style={{ objectPosition: "center 60%" }} />
                <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.40)" }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs italic" style={{ color: "oklch(0.88 0.01 240)" }}>
                    Opérations 24h/24 — Dunkerque, Boulogne, Rouen, Bayonne, Calais
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3 agences : image hatch plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "500px" }}>
        <img src={IMGS.hatch} alt="Inspection cale" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.88)" }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <Reveal className="mb-10">
            <div className="eds-tag mb-4">Nos agences</div>
            <h2 className="eds-h2">
              Présents dans<br />
              <span className="eds-accent">5 ports français.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offices.map((office, i) => (
              <Reveal key={office.city} delay={i * 80}>
                <div className="p-6" style={{
                  background: "oklch(0 0 0 / 0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid oklch(1 0 0 / 0.10)",
                  borderTop: "2px solid oklch(0.72 0.14 65)",
                }}>
                  <div className="eds-badge-amber eds-badge mb-4 self-start inline-flex">{office.role}</div>
                  <h3 className="eds-h3 mb-1">{office.city}</h3>
                  <div className="flex items-center gap-1.5 mb-4" style={{ color: "oklch(0.55 0.015 240)" }}>
                    <MapPin size={10} />
                    <span className="text-xs">{office.address}</span>
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-xs hover:text-amber-400 transition-colors" style={{ color: "oklch(0.62 0.015 240)" }}>
                      <Phone size={10} /> {office.phone}
                    </a>
                    <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-xs hover:text-amber-400 transition-colors" style={{ color: "oklch(0.62 0.015 240)" }}>
                      <Mail size={10} /> {office.email}
                    </a>
                  </div>
                  <div style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)", paddingTop: "0.75rem" }}>
                    {office.services.map((s) => (
                      <div key={s} className="text-xs mb-1" style={{ color: "oklch(0.55 0.015 240)" }}>
                        — {s}
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
