/**
 * Footer — Euro Docks Service
 * Design: Deep Navy Editorial
 * Fond: #060E1A (plus sombre que le hero)
 */

import { Link } from "wouter";
import { MapPin, Phone, Mail, Anchor, ArrowUpRight } from "lucide-react";

const ports = [
  { name: "Dunkerque", role: "Port principal — Agence & Tramping" },
  { name: "Boulogne-sur-Mer", role: "Terminal dédié — 800m de quai" },
  { name: "Rouen", role: "Terminal grain — 3,6 Mt/an" },
  { name: "Bayonne", role: "Agence maritime & Transit" },
  { name: "Calais", role: "Agence maritime" },
];

const services = [
  { label: "Shipping Agency", href: "/services" },
  { label: "Chartering & Tramping", href: "/services" },
  { label: "Customs Ship Brokerage", href: "/services" },
  { label: "Maritime Survey", href: "/services" },
  { label: "Freight Forwarding", href: "/freight" },
  { label: "Port Terminal", href: "/terminal" },
];

const clients = [
  "Glencore", "Bunge", "Soufflet", "Dreyfus", "Cargill",
  "ArcelorMittal", "Lafarge", "Roquette", "Tereos", "Eqiom",
];

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.07 0.025 240)", color: "oklch(0.62 0.025 240)" }}>
      {/* Bande supérieure */}
      <div style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Colonne 1 — Identité */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {/* Monogramme SVG EDS — Footer */}
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40" style={{ flexShrink: 0 }}>
                <rect width="44" height="44" fill="oklch(0.14 0.04 240)" rx="2" />
                <line x1="6" y1="22" x2="38" y2="22" stroke="oklch(0.65 0.12 65)" strokeWidth="0.75" />
                <text x="22" y="18" textAnchor="middle" dominantBaseline="middle"
                  fontFamily="Georgia, serif" fontWeight="700" fontSize="10"
                  fill="oklch(0.975 0.005 80)" letterSpacing="2">EDS</text>
                <text x="22" y="30" textAnchor="middle" dominantBaseline="middle"
                  fontFamily="Arial, sans-serif" fontWeight="400" fontSize="5.5"
                  fill="oklch(0.65 0.12 65)" letterSpacing="3">MARITIME</text>
              </svg>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "oklch(0.975 0.005 80)" }}>
                  Euro Docks Service
                </div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.65 0.12 65)" }}>
                  Maritime Excellence
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.55 0.02 240)" }}>
              Spécialiste du tramping, de l'agence maritime et des terminaux portuaires sur les principaux ports français depuis 1975.
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:commercial@eurodocks.com"
                className="flex items-center gap-2 text-sm hover:text-amber-400 transition-colors duration-200"
                style={{ color: "oklch(0.55 0.02 240)" }}>
                <Mail size={13} />
                commercial@eurodocks.com
              </a>
              <a href="tel:+33328630000"
                className="flex items-center gap-2 text-sm hover:text-amber-400 transition-colors duration-200"
                style={{ color: "oklch(0.55 0.02 240)" }}>
                <Phone size={13} />
                +33 (0)3 28 63 00 00
              </a>
            </div>
          </div>

          {/* Colonne 2 — Services */}
          <div>
            <div className="eds-label mb-5" style={{ color: "oklch(0.65 0.12 65)" }}>Services</div>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href}
                    className="text-sm flex items-center gap-1.5 group hover:text-white transition-colors duration-200"
                    style={{ color: "oklch(0.55 0.02 240)" }}>
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {s.label}
                    </span>
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Ports */}
          <div>
            <div className="eds-label mb-5" style={{ color: "oklch(0.65 0.12 65)" }}>Zones d'opération</div>
            <ul className="flex flex-col gap-3">
              {ports.map((p) => (
                <li key={p.name} className="flex items-start gap-2">
                  <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: "oklch(0.65 0.12 65)" }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: "oklch(0.85 0.01 240)" }}>{p.name}</div>
                    <div className="text-xs" style={{ color: "oklch(0.48 0.018 240)" }}>{p.role}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Clients de référence */}
          <div>
            <div className="eds-label mb-5" style={{ color: "oklch(0.65 0.12 65)" }}>Clients de référence</div>
            <div className="flex flex-wrap gap-2">
              {clients.map((c) => (
                <span key={c}
                  className="text-xs px-2.5 py-1 rounded-sm"
                  style={{
                    background: "oklch(1 0 0 / 0.05)",
                    color: "oklch(0.62 0.025 240)",
                    border: "1px solid oklch(1 0 0 / 0.08)",
                  }}>
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Anchor size={13} style={{ color: "oklch(0.65 0.12 65)" }} />
                <span className="text-xs font-semibold" style={{ color: "oklch(0.85 0.01 240)" }}>Certifications</span>
              </div>
              <div className="text-xs leading-relaxed" style={{ color: "oklch(0.48 0.018 240)" }}>
                GMP+ (Feed Safety) · Customs Broker Registered · OVAM · OWD · NIWO · IBG
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs" style={{ color: "oklch(0.42 0.015 240)" }}>
          © {new Date().getFullYear()} Euro Docks Service. Tous droits réservés.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/mentions-legales" className="text-xs hover:text-white transition-colors duration-200" style={{ color: "oklch(0.42 0.015 240)" }}>
            Mentions légales
          </Link>
          <Link href="/confidentialite" className="text-xs hover:text-white transition-colors duration-200" style={{ color: "oklch(0.42 0.015 240)" }}>
            Confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
