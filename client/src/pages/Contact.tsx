/**
 * Contact — Euro Docks Service
 * Design: Deep Navy Editorial
 */

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Phone, MapPin, Send, Clock, ArrowRight } from "lucide-react";

function RevealSection({ children, className, style }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    }}>
      {children}
    </div>
  );
}

const offices = [
  {
    city: "Dunkerque",
    role: "Siège social — Agence maritime principale",
    address: "Port de Dunkerque, France",
    phone: "+33 (0)3 28 63 00 00",
    email: "commercial@eurodocks.com",
  },
  {
    city: "Boulogne-sur-Mer",
    role: "Terminal dédié — Agence maritime",
    address: "Port de Boulogne-sur-Mer, France",
    phone: "+33 (0)3 21 00 00 00",
    email: "boulogne@eurodocks.com",
  },
  {
    city: "Rouen",
    role: "Terminaux grain — Agence maritime",
    address: "Port de Rouen, France",
    phone: "+33 (0)2 35 00 00 00",
    email: "rouen@eurodocks.com",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi (pas de backend)
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "oklch(1 0 0 / 0.05)",
    border: "1px solid oklch(1 0 0 / 0.12)",
    borderRadius: "2px",
    padding: "0.875rem 1rem",
    color: "oklch(0.975 0.005 80)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 200ms ease-out",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "oklch(0.62 0.025 240)",
    marginBottom: "0.5rem",
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.04 240)" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="eds-label mb-4" style={{ color: "oklch(0.65 0.12 65)" }}>Prise de contact</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "oklch(0.975 0.005 80)",
            letterSpacing: "-0.025em",
            marginBottom: "1.25rem",
          }}>
            Parlons de votre projet.
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "oklch(0.72 0.02 240)" }}>
            Notre équipe commerciale répond sous 24 heures pour tout projet d'affrètement, d'agence maritime, de transit ou de terminal portuaire.
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Formulaire — 3 colonnes */}
            <RevealSection className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full mb-6"
                    style={{ background: "oklch(0.65 0.12 65 / 0.15)" }}>
                    <Send size={24} style={{ color: "oklch(0.65 0.12 65)" }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.75rem",
                    color: "oklch(0.975 0.005 80)",
                    marginBottom: "1rem",
                  }}>
                    Message envoyé.
                  </h3>
                  <p style={{ color: "oklch(0.72 0.02 240)" }}>
                    Notre équipe vous répondra sous 24 heures ouvrées.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Nom complet *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={inputStyle}
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Société</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        style={inputStyle}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={inputStyle}
                        placeholder="jean@societe.com"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Téléphone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={inputStyle}
                        placeholder="+33 6 00 00 00 00"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Service concerné</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="" style={{ background: "oklch(0.14 0.04 240)" }}>Sélectionner un service</option>
                      <option value="shipping" style={{ background: "oklch(0.14 0.04 240)" }}>Shipping Agency</option>
                      <option value="chartering" style={{ background: "oklch(0.14 0.04 240)" }}>Chartering & Tramping</option>
                      <option value="customs" style={{ background: "oklch(0.14 0.04 240)" }}>Customs Ship Brokerage</option>
                      <option value="survey" style={{ background: "oklch(0.14 0.04 240)" }}>Maritime Survey</option>
                      <option value="freight" style={{ background: "oklch(0.14 0.04 240)" }}>Freight Forwarding</option>
                      <option value="terminal" style={{ background: "oklch(0.14 0.04 240)" }}>Port Terminal</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical" }}
                      placeholder="Décrivez votre projet, vos besoins, les ports concernés, les types de marchandises..."
                    />
                  </div>

                  <button type="submit" className="eds-btn-primary self-start mt-2">
                    Envoyer le message <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </RevealSection>

            {/* Informations de contact — 2 colonnes */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <RevealSection>
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={16} style={{ color: "oklch(0.65 0.12 65)" }} />
                  <div className="eds-label" style={{ color: "oklch(0.65 0.12 65)" }}>
                    Délai de réponse
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.02 240)" }}>
                  Notre équipe commerciale répond sous <strong style={{ color: "oklch(0.975 0.005 80)" }}>24 heures ouvrées</strong> pour toute demande de devis ou d'information.
                </p>
              </RevealSection>

              <div style={{ height: "1px", background: "oklch(1 0 0 / 0.08)" }} />

              {offices.map((office) => (
                <RevealSection key={office.city}>
                  <div className="flex items-start gap-3 mb-2">
                    <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "oklch(0.65 0.12 65)" }} />
                    <div>
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        color: "oklch(0.975 0.005 80)",
                      }}>
                        {office.city}
                      </div>
                      <div className="text-xs mb-3" style={{ color: "oklch(0.52 0.02 240)" }}>
                        {office.role}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <a href={`tel:${office.phone}`}
                          className="flex items-center gap-2 text-sm hover:text-white transition-colors duration-200"
                          style={{ color: "oklch(0.62 0.025 240)" }}>
                          <Phone size={12} />
                          {office.phone}
                        </a>
                        <a href={`mailto:${office.email}`}
                          className="flex items-center gap-2 text-sm hover:text-white transition-colors duration-200"
                          style={{ color: "oklch(0.62 0.025 240)" }}>
                          <Mail size={12} />
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
