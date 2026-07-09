/**
 * Services — Euro Docks Service v2
 * Design: Opérateur Maritime — photo-driven, B2B technique
 * Chaque service = image plein fond + données techniques superposées
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";

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
  hero:    "/manus-storage/eds2_hero_bulker_fe8bd601.jpg",
  agency:  "/manus-storage/eds_hero_ship_5b197371.jpg",
  charter: "/manus-storage/eds2_tramping_sea_fd8a56f5.jpg",
  survey:  "/manus-storage/eds2_hatch_inspection_5a8b030b.jpg",
  customs: "/manus-storage/eds2_grain_loading_6553e85f.jpg",
  bridge:  "/manus-storage/eds2_chartering_bridge_e11c603a.jpg",
};

const services = [
  {
    id: "agency",
    img: IMGS.agency,
    imgPos: "center 40%",
    tag: "Shipping Agency",
    title: "Agence Maritime",
    stat: "800+",
    statLabel: "Escales / an",
    description: "Représentation et assistance complète pour les navires en escale dans les ports français. Notre équipe assure la coordination entre le navire, les autorités portuaires, les chargeurs et les prestataires locaux 24h/24.",
    ports: ["Dunkerque", "Boulogne-sur-Mer", "Calais", "Rouen", "Bayonne"],
    prestations: [
      "Husbandry & Protective services",
      "Dry and liquid bulk",
      "Liner & Container ship",
      "Breakbulk & Heavy lift",
      "Project cargo",
      "Coordination douanière",
    ],
    data: [
      { k: "Escales traitées / an", v: "800+" },
      { k: "Ports couverts", v: "5 ports français" },
      { k: "Types de navires", v: "Bulk · Liner · Breakbulk · Tanker" },
      { k: "Disponibilité", v: "24h/24 — 7j/7" },
    ],
  },
  {
    id: "charter",
    img: IMGS.charter,
    imgPos: "center 50%",
    tag: "Chartering & Tramping",
    title: "Affrètement Tramping",
    stat: "200+",
    statLabel: "Navires / an",
    description: "Affrètement de navires sur les marchés Baltique, Continent, Méditerranée et Mer Noire. Du coaster au Panamax, nous négocions et gérons chaque opération avec la précision d'un partenaire de confiance.",
    ports: ["Baltic", "Continent", "Méditerranée", "Mer Noire"],
    prestations: [
      "Coaster à Panamax vessels",
      "Dry bulk, Breakbulk",
      "Heavy lift & Project cargo",
      "Négociation charter-parties",
      "Suivi opérationnel complet",
      "Propositions créatives d'affrètement",
    ],
    data: [
      { k: "Navires affrétés / an", v: "200+" },
      { k: "Marchés couverts", v: "Baltic · Continent · Med · Black Sea" },
      { k: "Types de navires", v: "Coaster · Handysize · Supramax · Panamax" },
      { k: "Cargaisons", v: "Dry Bulk · Breakbulk · Heavy Lift" },
    ],
  },
  {
    id: "customs",
    img: IMGS.customs,
    imgPos: "center 60%",
    tag: "Customs Ship Brokerage",
    title: "Courtage en Douane",
    stat: "1975",
    statLabel: "Année d'enregistrement",
    description: "Courtage en douane maritime, enregistré dans les principaux ports français depuis 1975. Notre staff expérimenté gère l'ensemble des formalités douanières avec dépôt et garantie.",
    ports: ["Dunkerque", "Boulogne-sur-Mer", "Calais", "Rouen", "Le Havre"],
    prestations: [
      "Registered customs broker",
      "Deposit & Garantee",
      "Formalités d'entrée/sortie",
      "Régimes douaniers spéciaux",
      "Staff expérimenté depuis 1975",
      "Assistance en cas de litige",
    ],
    data: [
      { k: "Enregistrement", v: "Depuis 1975" },
      { k: "Ports couverts", v: "Dunkerque · Boulogne · Calais · Rouen · Le Havre" },
      { k: "Régimes", v: "Import · Export · Transit · Entrepôt" },
      { k: "Garantie", v: "Deposit & Garantee inclus" },
    ],
  },
  {
    id: "survey",
    img: IMGS.survey,
    imgPos: "center 50%",
    tag: "Maritime Survey",
    title: "Expertise Maritime",
    stat: "P&I",
    statLabel: "Rapports certifiés",
    description: "Expertise maritime complète couvrant le tirant d'eau, les tests d'étanchéité, les expertises de chargement/déchargement et les rapports d'assurance P&I pour armateurs et affréteurs.",
    ports: ["Dunkerque", "Boulogne-sur-Mer", "Calais", "Rouen"],
    prestations: [
      "Draught surveying",
      "Ultrasonic leak test (Hose test)",
      "Loading / unloading follow-up",
      "Consulting breakbulk",
      "On / Off-hire survey",
      "Bunkers & condition survey",
      "Holds cleaning",
      "Insurance / P&I report",
    ],
    data: [
      { k: "Spécialité", v: "Draught · Hose test · On/Off-hire" },
      { k: "Ports couverts", v: "Dunkerque · Boulogne · Calais · Rouen" },
      { k: "Assurance", v: "P&I reports certifiés" },
      { k: "Délai rapport", v: "Sous 48 heures" },
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.08 0.015 240)" }}>

      {/* ── Hero plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "440px", paddingTop: "7rem" }}>
        <img src={IMGS.hero} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, oklch(0.08 0.015 240 / 0.75) 0%, oklch(0.08 0.015 240 / 0.92) 100%)"
        }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 pb-16">
          <div className="eds-tag mb-4">Nos expertises</div>
          <h1 className="eds-h1 mb-4" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
            Shipping<br />
            <span className="eds-accent">Services</span>
          </h1>
          <p className="text-base max-w-xl" style={{ color: "oklch(0.68 0.015 240)", lineHeight: 1.7 }}>
            Agence maritime, affrètement tramping, courtage en douane et expertise maritime — une gamme complète de services opérés par des experts reconnus dans les ports français.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { v: "800+", l: "Escales / an" },
              { v: "200+", l: "Navires affrétés" },
              { v: "7 M€", l: "Chiffre d'affaires" },
              { v: "1975", l: "Année de création" },
            ].map(({ v, l }) => (
              <div key={l} className="eds-stat-pill">
                <span className="eds-stat-pill-value" style={{ fontSize: "1.5rem" }}>{v}</span>
                <span className="eds-stat-pill-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services : alternance image/contenu ── */}
      {services.map((svc, i) => (
        <section key={svc.id} style={{ background: i % 2 === 0 ? "oklch(0.10 0.015 240)" : "oklch(0.08 0.015 240)" }}>
          <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-14 lg:py-20">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start`}>

              {/* Image — alterne gauche/droite */}
              <Reveal dir={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative" style={{ height: "520px", borderRadius: "2px", overflow: "hidden" }}>
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: svc.imgPos,
                      transition: "transform 6s ease-out",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to top, oklch(0.06 0.015 240 / 0.70) 0%, oklch(0.06 0.015 240 / 0.20) 60%, transparent 100%)"
                  }} />
                  {/* Tag */}
                  <div className="absolute top-4 left-4 eds-badge-amber eds-badge">{svc.tag}</div>
                  {/* Stat */}
                  <div className="absolute top-4 right-4 eds-stat-pill">
                    <span className="eds-stat-pill-value" style={{ fontSize: "1.3rem" }}>{svc.stat}</span>
                    <span className="eds-stat-pill-label">{svc.statLabel}</span>
                  </div>
                  {/* Ports */}
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                    {svc.ports.map((p) => (
                      <span key={p} className="eds-badge" style={{ fontSize: "0.55rem" }}>
                        <MapPin size={8} className="mr-1" />{p}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Contenu */}
              <Reveal delay={80} dir={i % 2 === 0 ? "right" : "left"} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="eds-tag mb-4">{svc.tag}</div>
                <h2 className="eds-h2 mb-4">{svc.title}</h2>
                <p className="text-base mb-6" style={{ color: "oklch(0.62 0.015 240)", lineHeight: 1.7 }}>
                  {svc.description}
                </p>

                {/* Tableau données techniques */}
                <div className="mb-6" style={{
                  background: "oklch(0.14 0.03 240)",
                  padding: "1rem 1.25rem",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  borderLeft: "2px solid oklch(0.72 0.14 65)",
                }}>
                  {svc.data.map(({ k, v }) => (
                    <div key={k} className="eds-data-row">
                      <span className="eds-data-key">{k}</span>
                      <span className="eds-data-value" style={{ fontSize: "0.78rem" }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Prestations */}
                <div className="mb-6">
                  <div className="eds-tag mb-3" style={{ fontSize: "0.58rem" }}>Prestations incluses</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {svc.prestations.map((p) => (
                      <div key={p} className="flex items-start gap-2 text-xs" style={{ color: "oklch(0.68 0.015 240)" }}>
                        <ChevronRight size={11} className="mt-0.5 shrink-0" style={{ color: "oklch(0.72 0.14 65)" }} />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                <a href="/contact" className="eds-btn eds-btn-amber">
                  Demander un devis <ArrowRight size={14} />
                </a>
              </Reveal>
            </div>
          </div>

          {/* Séparateur */}
          {i < services.length - 1 && (
            <div style={{ height: "1px", background: "oklch(1 0 0 / 0.05)", margin: "0 2rem" }} />
          )}
        </section>
      ))}

      {/* ── Break éditorial : image passerelle plein fond ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "360px" }}>
        <img src={IMGS.bridge} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.88)" }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <Reveal className="lg:col-span-2">
              <div className="eds-tag mb-4">Prise de contact</div>
              <h2 className="eds-h2 mb-4">
                Un projet d'affrètement<br />
                <span className="eds-accent">ou d'agence maritime ?</span>
              </h2>
              <p className="text-base mb-6 max-w-md" style={{ color: "oklch(0.68 0.015 240)", lineHeight: 1.7 }}>
                Contactez notre équipe commerciale pour un devis personnalisé sous 24 heures.
              </p>
              <a href="/contact" className="eds-btn eds-btn-amber">
                Nous contacter <ArrowRight size={14} />
              </a>
            </Reveal>
            <Reveal delay={120} dir="right">
              <div className="flex flex-col gap-4">
                {[
                  { stat: "24h", label: "Délai de réponse" },
                  { stat: "50 ans", label: "D'expertise maritime" },
                  { stat: "5 ports", label: "De présence directe" },
                ].map(({ stat, label }) => (
                  <div key={stat} className="eds-stat-pill flex-row items-center gap-4" style={{ display: "flex" }}>
                    <span className="eds-stat-pill-value" style={{ fontSize: "1.5rem", minWidth: "4rem" }}>{stat}</span>
                    <span className="eds-stat-pill-label">{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
