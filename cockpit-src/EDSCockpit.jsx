import { useState, useMemo } from "react";
import {
  Anchor, Ship, FileText, Bell, Search, ChevronRight, X, Check,
  CalendarClock, MapPin, Package, Plus, Download, LayoutGrid,
  Users, Receipt, AlertTriangle, Waves
} from "lucide-react";

/* ============ TOKENS ============ */
const T = {
  navy: "#0A1B2A",
  navy2: "#10283E",
  navy3: "#1B3550",
  blue: "#3E7FC1",
  sky: "#8FBCE8",
  bg: "#EDF1F5",
  card: "#FFFFFF",
  ink: "#14263A",
  muted: "#5C7386",
  line: "#DCE4EB",
  amber: "#C98A2B",
  green: "#2E8B57",
  red: "#C0452F",
};

const STAGES = [
  { id: "appointment", label: "Appointment", hint: "Nomination reçue" },
  { id: "annonce", label: "Navire annoncé", hint: "ETA confirmé" },
  { id: "nor", label: "NOR tendu", hint: "Prêt à opérer" },
  { id: "ops", label: "Opérations", hint: "Chargement / déchargement" },
  { id: "cloture", label: "Clôture", hint: "SOF · B/L · Facturation" },
];

const DOC_LIST = [
  "Appointment", "Proforma D/A", "Notice of readiness", "Inspection bill",
  "Cargo plan", "Statement of facts", "Cargo manifest", "Bill of lading",
];

const EVENT_TYPES = [
  "Vessel arrived on roads", "NOR tendered", "Anchored", "NOR re-tendered",
  "Anchor up", "Pilot on board", "Vessel entered river with tide", "Berthed",
  "Holds inspection passed", "Loading started", "Loading stopped · rain",
  "Loading resumed", "Loading completed", "Sailed with first tide",
];

/* ============ DONNÉES DÉMO (issues du terrain) ============ */
const INITIAL = [
  {
    id: "eds-2607-114", vessel: "BTG MATTERHORN", voyage: "Voyage 5 · CRG-214788",
    agency: "Rouen", quai: "Socomac", sens: "C", cargo: "Orge fourragère en vrac",
    tonnage: 29800, client: "Cargill / Soufflet", dest: "Nantong, Chine",
    eta: "Mar 14 juil · 16h42", stage: "ops",
    specs: { LOA: "229 m", Beam: "32,26 m", DWT: "81 060", Draft: "14,48 m", GT: "43 229", NT: "27 278", Flag: "Bahamas", IMO: "9731822" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": true, "Inspection bill": true, "Cargo plan": true, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [
      { t: "Lun 13 juil · 16h42", e: "Vessel arrived on roads" },
      { t: "Lun 13 juil · 16h42", e: "NOR tendered" },
      { t: "Lun 13 juil · 16h55", e: "Anchored" },
      { t: "Mar 14 juil · 00h01", e: "NOR re-tendered" },
      { t: "Mar 14 juil · 16h33", e: "Pilot on board" },
      { t: "Mer 15 juil · 00h12", e: "Berthed · loading berth Socomac" },
      { t: "Mer 15 juil · 01h15", e: "Loading started" },
    ],
    alerts: ["Pluie annoncée 13h30 – 14h30 · arrêt chargement probable"],
  },
  {
    id: "eds-2607-118", vessel: "GENCO VIGILANT", voyage: "Voyage 12 · GNC-88231",
    agency: "Rouen", quai: "Beuzelin", sens: "C", cargo: "Blé meunier en vrac",
    tonnage: 44000, client: "Louis Dreyfus", dest: "Casablanca, Maroc",
    eta: "Jeu 16 juil · 12h00", stage: "nor",
    specs: { LOA: "190 m", Beam: "32,3 m", DWT: "58 018", Draft: "12,80 m", GT: "33 044", NT: "19 762", Flag: "Marshall Is.", IMO: "9459220" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": true, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [
      { t: "Mer 15 juil · 09h20", e: "Vessel arrived on roads" },
      { t: "Mer 15 juil · 09h25", e: "NOR tendered" },
    ],
    alerts: ["Quai Beuzelin occupé par M/V PNOI jusqu'à jeudi 10h00"],
  },
  {
    id: "eds-2607-111", vessel: "LORD NELSON", voyage: "Voyage 3 · NRD-55102",
    agency: "Rouen", quai: "Senalia 2 & 3", sens: "C", cargo: "Blé tendre en vrac",
    tonnage: 27700, client: "Norden / MillCop", dest: "Agadir, Maroc",
    eta: "À quai", stage: "cloture",
    specs: { LOA: "180 m", Beam: "30 m", DWT: "56 720", Draft: "12,50 m", GT: "31 236", NT: "18 486", Flag: "Panama", IMO: "9614871" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": true, "Inspection bill": true, "Cargo plan": true, "Statement of facts": true, "Cargo manifest": true, "Bill of lading": false },
    events: [
      { t: "Ven 10 juil · 07h05", e: "Berthed · Senalia" },
      { t: "Ven 10 juil · 09h00", e: "Loading started" },
      { t: "Mar 14 juil · 18h40", e: "Loading completed" },
    ],
    alerts: [],
  },
  {
    id: "eds-2607-121", vessel: "BALD EAGLE", voyage: "Voyage 8 · CLF-30419",
    agency: "Rouen", quai: "Simarres", sens: "C", cargo: "Blé meunier en vrac",
    tonnage: 30000, client: "Cliffer / Lecureur", dest: "Safi, Maroc",
    eta: "Ven 17 juil · 06h00", stage: "annonce",
    specs: { LOA: "177 m", Beam: "28,4 m", DWT: "50 326", Draft: "11,92 m", GT: "27 986", NT: "15 442", Flag: "Liberia", IMO: "9483516" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [],
    alerts: ["ETA repoussé de 12h · marée du soir visée"],
  },
  {
    id: "eds-2607-123", vessel: "HENDRIKA MARGARETTA", voyage: "Voyage 2 · HMG-71005",
    agency: "Rouen", quai: "Beuzelin", sens: "D", cargo: "Pois protéagineux",
    tonnage: 3000, client: "Roquette", dest: "Origine : Gand, Belgique",
    eta: "Sam 18 juil · 14h00", stage: "annonce",
    specs: { LOA: "110 m", Beam: "14 m", DWT: "6 050", Draft: "5,90 m", GT: "4 102", NT: "2 218", Flag: "Belgique", IMO: "926832" },
    docs: { "Appointment": true, "Proforma D/A": false, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [],
    alerts: [],
  },
  {
    id: "eds-2607-125", vessel: "OSTERMARSCH", voyage: "Voyage 4 · ELF-90218",
    agency: "Rouen", quai: "Radicatel", sens: "D", cargo: "Éoliennes · project cargo",
    tonnage: 1800, client: "El Ferro", dest: "Origine : Esbjerg, Danemark",
    eta: "Lun 20 juil · 08h00", stage: "appointment",
    specs: { LOA: "138 m", Beam: "21 m", DWT: "12 744", Draft: "8,00 m", GT: "9 611", NT: "4 862", Flag: "Antigua", IMO: "9504178" },
    docs: { "Appointment": true, "Proforma D/A": false, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [],
    alerts: [],
  },
  {
    id: "eds-2607-119", vessel: "FEDERAL BALTIC", voyage: "Voyage 9 · GLC-44872",
    agency: "Dunkerque", quai: "Terminal de Grande Bretagne", sens: "C", cargo: "Blé fourrager en vrac",
    tonnage: 32000, client: "Glencore", dest: "Alger, Algérie",
    eta: "Mer 15 juil · 20h00", stage: "nor",
    specs: { LOA: "186 m", Beam: "28,6 m", DWT: "49 460", Draft: "11,70 m", GT: "27 401", NT: "14 858", Flag: "Chypre", IMO: "9697040" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": true, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [
      { t: "Mer 15 juil · 06h10", e: "Vessel arrived on roads" },
      { t: "Mer 15 juil · 06h15", e: "NOR tendered" },
    ],
    alerts: [],
  },
  {
    id: "eds-2607-120", vessel: "ATLANTIC ROSE", voyage: "Voyage 6 · CBL-20991",
    agency: "Boulogne-sur-Mer", quai: "Terminal céréales & vrac", sens: "C", cargo: "Orge brassicole en vrac",
    tonnage: 8500, client: "Soufflet", dest: "Anvers, Belgique",
    eta: "Jeu 16 juil · 05h30", stage: "ops",
    specs: { LOA: "119 m", Beam: "17 m", DWT: "8 999", Draft: "7,10 m", GT: "6 312", NT: "3 402", Flag: "Pays-Bas", IMO: "9421301" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": true, "Inspection bill": true, "Cargo plan": true, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [
      { t: "Mar 14 juil · 22h05", e: "Berthed" },
      { t: "Mer 15 juil · 04h30", e: "Loading started" },
    ],
    alerts: [],
  },
];

const AGENCIES = ["Toutes agences", "Rouen", "Dunkerque", "Boulogne-sur-Mer"];

/* ============ STYLES GLOBAUX ============ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

.eds-root { font-family:'Inter',system-ui,sans-serif; color:${T.ink}; background:${T.bg}; min-height:100vh; display:flex; }
.eds-display { font-family:'Barlow Condensed','Inter',sans-serif; text-transform:uppercase; letter-spacing:.02em; }

.eds-side { width:216px; min-width:216px; background:${T.navy}; color:#fff; display:flex; flex-direction:column; position:sticky; top:0; height:100vh; }
.eds-main { flex:1; min-width:0; display:flex; flex-direction:column; }

.eds-nav-item { display:flex; align-items:center; gap:10px; padding:10px 18px; font-size:13.5px; color:#9FB4C6; cursor:pointer; border-left:3px solid transparent; transition:color .15s ease, background .15s ease; }
.eds-nav-item:hover { color:#fff; background:rgba(255,255,255,.04); }
.eds-nav-item.on { color:#fff; border-left-color:${T.blue}; background:rgba(62,127,193,.14); }

.eds-kanban { display:flex; gap:14px; padding:4px 22px 26px; overflow-x:auto; align-items:flex-start; }
.eds-col { min-width:264px; width:264px; flex:0 0 auto; }

.eds-card { background:${T.card}; border:1px solid ${T.line}; border-radius:10px; cursor:pointer; overflow:hidden; display:flex;
  opacity:0; transform:translateY(8px); animation:edsIn .3s cubic-bezier(.23,1,.32,1) forwards;
  transition:transform .18s cubic-bezier(.23,1,.32,1), box-shadow .18s ease, border-color .18s ease; }
.eds-card:hover { transform:translateY(-2px); box-shadow:0 8px 22px rgba(10,27,42,.10); border-color:#C4D3E0; }
.eds-card:active { transform:scale(.985); }
@keyframes edsIn { to { opacity:1; transform:translateY(0); } }

.eds-drawer-veil { position:fixed; inset:0; background:rgba(10,27,42,.44); z-index:40; animation:edsFade .2s ease-out forwards; }
@keyframes edsFade { from { opacity:0; } to { opacity:1; } }
.eds-drawer { position:fixed; top:0; right:0; height:100vh; width:520px; max-width:100vw; background:#fff; z-index:50;
  box-shadow:-18px 0 50px rgba(10,27,42,.25); display:flex; flex-direction:column;
  transform:translateX(24px); opacity:0; animation:edsSlide .26s cubic-bezier(.32,.72,0,1) forwards; }
@keyframes edsSlide { to { transform:translateX(0); opacity:1; } }

.eds-btn { display:inline-flex; align-items:center; gap:7px; border:none; cursor:pointer; border-radius:8px; font-weight:600; font-size:13px;
  padding:9px 14px; transition:transform .12s ease, filter .15s ease; font-family:'Inter',sans-serif; }
.eds-btn:active { transform:scale(.97); }
.eds-btn:hover { filter:brightness(1.06); }

.eds-doc { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:8px; cursor:pointer; transition:background .15s ease; }
.eds-doc:hover { background:#F1F5F9; }

.eds-toast { position:fixed; bottom:22px; left:50%; transform:translateX(-50%) translateY(8px); background:${T.navy}; color:#fff;
  padding:11px 18px; border-radius:9px; font-size:13.5px; z-index:60; display:flex; gap:9px; align-items:center;
  opacity:0; animation:edsToast .25s cubic-bezier(.23,1,.32,1) forwards; box-shadow:0 10px 30px rgba(10,27,42,.35); }
@keyframes edsToast { to { opacity:1; transform:translateX(-50%) translateY(0); } }

.eds-kanban::-webkit-scrollbar { height:9px; } .eds-kanban::-webkit-scrollbar-thumb { background:#C7D3DD; border-radius:9px; }
.eds-scroll::-webkit-scrollbar { width:9px; } .eds-scroll::-webkit-scrollbar-thumb { background:#C7D3DD; border-radius:9px; }

@media (max-width: 900px) { .eds-side { display:none; } .eds-drawer { width:100vw; } }
@media (prefers-reduced-motion: reduce) {
  .eds-card, .eds-drawer, .eds-toast { animation-duration:.01ms !important; transform:none !important; opacity:1 !important; }
}
`;

/* ============ SIGNATURE : JAUGE TIRANT D'EAU ============ */
function DraftGauge({ pct, tall }) {
  const marks = tall ? 9 : 7;
  return (
    <div style={{ width: 26, background: T.navy, position: "relative", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
      title={`Avancement documentaire · ${Math.round(pct * 100)}%`}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "6px 0" }}>
        {Array.from({ length: marks }).map((_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 3, paddingLeft: 5 }}>
            <div style={{ width: i % 2 === 0 ? 8 : 5, height: 1.5, background: "rgba(255,255,255,.55)" }} />
            {i % 2 === 0 && <span style={{ fontSize: 6.5, color: "rgba(255,255,255,.55)", fontFamily: "'Barlow Condensed'", lineHeight: 1 }}>{(marks - i) * 2}</span>}
          </div>
        ))}
      </div>
      <div style={{ height: `${Math.max(pct * 100, 6)}%`, background: `linear-gradient(180deg, ${T.blue}, #2C5E93)`, transition: "height .4s cubic-bezier(.23,1,.32,1)", opacity: .92 }} />
    </div>
  );
}

/* ============ CARTE ESCALE ============ */
function EscaleCard({ esc, onOpen, delay }) {
  const done = Object.values(esc.docs).filter(Boolean).length;
  const pct = done / DOC_LIST.length;
  return (
    <div className="eds-card" style={{ animationDelay: `${delay * 45}ms` }} onClick={() => onOpen(esc.id)}>
      <DraftGauge pct={pct} />
      <div style={{ padding: "11px 13px", flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div className="eds-display" style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.05 }}>{esc.vessel}</div>
          {esc.alerts.length > 0 && <AlertTriangle size={14} color={T.amber} style={{ flexShrink: 0, marginTop: 2 }} />}
        </div>
        <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{esc.voyage}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8, fontSize: 12 }}>
          <MapPin size={12} color={T.blue} />
          <span style={{ fontWeight: 600 }}>{esc.quai}</span>
          <span style={{ color: T.muted }}>· {esc.agency}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4, fontSize: 12, color: T.ink }}>
          <Package size={12} color={T.blue} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            <b>{esc.sens} :</b> {esc.tonnage.toLocaleString("fr-FR")} t · {esc.cargo}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 9, paddingTop: 8, borderTop: `1px solid ${T.line}` }}>
          <span style={{ fontSize: 11, color: T.muted }}>{esc.client}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: esc.eta === "À quai" ? T.green : T.ink, display: "flex", alignItems: "center", gap: 4 }}>
            <CalendarClock size={11} /> {esc.eta}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============ FICHE ESCALE (DRAWER) ============ */
function EscaleDrawer({ esc, onClose, onToggleDoc, onAddEvent, notify }) {
  const [evType, setEvType] = useState(EVENT_TYPES[0]);
  const [evTime, setEvTime] = useState("Mer 15 juil · ");
  const [sof, setSof] = useState(false);
  const done = Object.values(esc.docs).filter(Boolean).length;

  const sofText = useMemo(() => {
    const lines = esc.events.map(ev => `  ${ev.t.padEnd(24, " ")} ${ev.e}`).join("\n");
    return `EURO DOCKS SERVICES · AGENTS MARITIMES
STATEMENT OF FACTS · ${esc.vessel} · ${esc.voyage}
Berth: ${esc.quai} · Cargo: ${esc.cargo} · ${esc.tonnage.toLocaleString("fr-FR")} MT
Agents: EURO DOCKS SERVICES / ${esc.agency.toUpperCase()}
------------------------------------------------------------
${lines}
------------------------------------------------------------
Établi automatiquement le Mer 15 juil 2026 · en attente signatures
Master / Agents / Charterers`;
  }, [esc]);

  return (
    <>
      <div className="eds-drawer-veil" onClick={onClose} />
      <div className="eds-drawer">
        {/* entête */}
        <div style={{ background: T.navy, color: "#fff", padding: "18px 22px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, color: T.sky, letterSpacing: ".08em", fontWeight: 600 }}>FICHE ESCALE · {esc.id.toUpperCase()}</div>
              <div className="eds-display" style={{ fontSize: 30, fontWeight: 800, lineHeight: 1, marginTop: 4 }}>{esc.vessel}</div>
              <div style={{ fontSize: 12.5, color: "#B9CBDA", marginTop: 4 }}>{esc.voyage} · {esc.quai} · {esc.agency}</div>
            </div>
            <button onClick={onClose} className="eds-btn" style={{ background: "rgba(255,255,255,.1)", color: "#fff", padding: 8 }} aria-label="Fermer la fiche">
              <X size={16} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 14 }}>
            {[["LOA", esc.specs.LOA], ["DWT", esc.specs.DWT], ["Tirant d'eau", esc.specs.Draft], ["GT / NT", `${esc.specs.GT} / ${esc.specs.NT}`]].map(([k, v]) => (
              <div key={k} style={{ background: "rgba(255,255,255,.07)", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 9.5, color: "#8FA6B8", letterSpacing: ".06em", textTransform: "uppercase" }}>{k}</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 2, fontFamily: "'Barlow Condensed'" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="eds-scroll" style={{ flex: 1, overflowY: "auto", padding: "18px 22px 26px" }}>
          {/* alertes */}
          {esc.alerts.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "#FBF3E4", border: `1px solid #EAD9B4`, borderRadius: 9, padding: "10px 12px", marginBottom: 14 }}>
              <AlertTriangle size={15} color={T.amber} style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12.5, color: "#7A5A1E", lineHeight: 1.45 }}>{a}</span>
            </div>
          ))}

          {/* cargo */}
          <div style={{ fontSize: 13, color: T.ink, background: "#F4F7FA", borderRadius: 9, padding: "11px 13px", marginBottom: 18, lineHeight: 1.5 }}>
            <b>{esc.sens === "C" ? "Chargement" : "Déchargement"}</b> · {esc.tonnage.toLocaleString("fr-FR")} t · {esc.cargo}<br />
            <span style={{ color: T.muted }}>{esc.client} · {esc.dest}</span>
          </div>

          {/* documents */}
          <div className="eds-display" style={{ fontSize: 15, fontWeight: 700, color: T.navy, marginBottom: 8 }}>
            Documents d'escale · {done}/{DOC_LIST.length}
          </div>
          <div style={{ border: `1px solid ${T.line}`, borderRadius: 10, padding: 6, marginBottom: 20 }}>
            {DOC_LIST.map(d => (
              <div key={d} className="eds-doc" onClick={() => onToggleDoc(esc.id, d)} role="checkbox" aria-checked={esc.docs[d]} tabIndex={0}
                onKeyDown={e => e.key === "Enter" && onToggleDoc(esc.id, d)}>
                <div style={{
                  width: 18, height: 18, borderRadius: 5, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  background: esc.docs[d] ? T.green : "#fff", border: esc.docs[d] ? `1px solid ${T.green}` : `1.5px solid #B9C7D3`,
                  transition: "background .15s ease, border-color .15s ease"
                }}>
                  {esc.docs[d] && <Check size={12} color="#fff" strokeWidth={3} />}
                </div>
                <span style={{ fontSize: 13, color: esc.docs[d] ? T.muted : T.ink, textDecoration: esc.docs[d] ? "none" : "none", fontWeight: esc.docs[d] ? 400 : 500 }}>{d}</span>
                <FileText size={13} color="#AEBFCB" style={{ marginLeft: "auto" }} />
              </div>
            ))}
          </div>

          {/* timeline SOF */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div className="eds-display" style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>Journal d'escale · SOF</div>
            <button className="eds-btn" style={{ background: T.navy, color: "#fff", fontSize: 12, padding: "7px 11px" }}
              onClick={() => { setSof(true); notify("Statement of facts généré depuis le journal"); }}>
              <Download size={13} /> Générer le SOF
            </button>
          </div>

          <div style={{ borderLeft: `2px solid ${T.line}`, marginLeft: 7, paddingLeft: 16, marginBottom: 14 }}>
            {esc.events.length === 0 && (
              <div style={{ fontSize: 12.5, color: T.muted, padding: "6px 0 10px" }}>
                Aucun événement saisi. Le journal démarre à l'arrivée sur rade : chaque saisie alimente le SOF final.
              </div>
            )}
            {esc.events.map((ev, i) => (
              <div key={i} style={{ position: "relative", padding: "5px 0 11px" }}>
                <div style={{ position: "absolute", left: -21.5, top: 10, width: 9, height: 9, borderRadius: 9, background: i === esc.events.length - 1 ? T.blue : "#B9C7D3", border: "2px solid #fff", boxShadow: `0 0 0 1px ${T.line}` }} />
                <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{ev.t}</div>
                <div style={{ fontSize: 13, color: T.ink, marginTop: 1 }}>{ev.e}</div>
              </div>
            ))}
          </div>

          {/* ajout événement */}
          <div style={{ display: "flex", gap: 7, marginBottom: 18 }}>
            <select value={evType} onChange={e => setEvType(e.target.value)}
              style={{ flex: 1, minWidth: 0, border: `1px solid ${T.line}`, borderRadius: 8, padding: "8px 9px", fontSize: 12.5, fontFamily: "'Inter'", color: T.ink, background: "#fff" }}>
              {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <input value={evTime} onChange={e => setEvTime(e.target.value)} placeholder="Mer 15 juil · 14h05"
              style={{ width: 140, border: `1px solid ${T.line}`, borderRadius: 8, padding: "8px 9px", fontSize: 12.5, fontFamily: "'Inter'" }} />
            <button className="eds-btn" style={{ background: T.blue, color: "#fff", padding: "8px 11px" }}
              onClick={() => { onAddEvent(esc.id, { t: evTime || "Mer 15 juil", e: evType }); notify("Événement ajouté au journal"); }}
              aria-label="Ajouter l'événement">
              <Plus size={15} />
            </button>
          </div>

          {/* aperçu SOF */}
          {sof && (
            <div>
              <div style={{ fontSize: 11.5, color: T.muted, marginBottom: 6, fontWeight: 600, letterSpacing: ".04em" }}>APERÇU · STATEMENT OF FACTS</div>
              <pre style={{
                background: T.navy, color: "#D7E4EF", borderRadius: 10, padding: "14px 16px", fontSize: 10.8,
                lineHeight: 1.55, overflowX: "auto", fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", whiteSpace: "pre"
              }}>{sofText}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ============ APP ============ */
export default function EDSCockpit() {
  const [escales, setEscales] = useState(INITIAL);
  const [agency, setAgency] = useState("Toutes agences");
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(null);

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };

  const filtered = useMemo(() => escales.filter(e =>
    (agency === "Toutes agences" || e.agency === agency) &&
    (query.trim() === "" || (e.vessel + e.quai + e.client + e.cargo).toLowerCase().includes(query.toLowerCase()))
  ), [escales, agency, query]);

  const kpis = useMemo(() => ({
    total: filtered.length,
    nor: filtered.filter(e => e.stage === "nor").length,
    ops: filtered.filter(e => e.stage === "ops").length,
    tonnage: filtered.reduce((s, e) => s + e.tonnage, 0),
    alerts: filtered.reduce((s, e) => s + e.alerts.length, 0),
  }), [filtered]);

  const toggleDoc = (id, doc) => setEscales(prev => prev.map(e =>
    e.id === id ? { ...e, docs: { ...e.docs, [doc]: !e.docs[doc] } } : e));

  const addEvent = (id, ev) => setEscales(prev => prev.map(e =>
    e.id === id ? { ...e, events: [...e.events, ev] } : e));

  const open = escales.find(e => e.id === openId);

  return (
    <div className="eds-root">
      <style>{CSS}</style>

      {/* ===== SIDEBAR ===== */}
      <aside className="eds-side">
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: T.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Anchor size={17} color="#fff" />
            </div>
            <div>
              <div className="eds-display" style={{ fontWeight: 800, fontSize: 16, lineHeight: 1 }}>Euro-Docks</div>
              <div style={{ fontSize: 9.5, color: T.sky, letterSpacing: ".14em", marginTop: 2 }}>COCKPIT ESCALES</div>
            </div>
          </div>
        </div>
        <nav style={{ padding: "12px 0", flex: 1 }}>
          <div className="eds-nav-item on"><LayoutGrid size={15} /> Tableau de bord</div>
          <div className="eds-nav-item"><Ship size={15} /> Escales</div>
          <div className="eds-nav-item"><Waves size={15} /> Quais & marées</div>
          <div className="eds-nav-item"><FileText size={15} /> Documents</div>
          <div className="eds-nav-item"><Users size={15} /> Armateurs & clients</div>
          <div className="eds-nav-item"><Receipt size={15} /> Proformas & facturation</div>
        </nav>
        <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,.08)", fontSize: 10.5, color: "#7E94A7", lineHeight: 1.6 }}>
          Prototype VISION'HER<br />pour Euro Docks Services · 2026
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="eds-main">
        {/* header */}
        <header style={{ background: "#fff", borderBottom: `1px solid ${T.line}`, padding: "14px 22px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div>
            <h1 className="eds-display" style={{ margin: 0, fontSize: 24, fontWeight: 800, color: T.navy, lineHeight: 1 }}>Tableau de bord des escales</h1>
            <div style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>Mercredi 15 juillet 2026 · marée haute Rouen 15h42</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, border: `1px solid ${T.line}`, borderRadius: 9, padding: "8px 11px", background: "#fff" }}>
              <Search size={14} color={T.muted} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Navire, quai, client…"
                style={{ border: "none", outline: "none", fontSize: 13, fontFamily: "'Inter'", width: 150 }} aria-label="Rechercher une escale" />
            </div>
            <select value={agency} onChange={e => setAgency(e.target.value)}
              style={{ border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 11px", fontSize: 13, fontWeight: 600, color: T.navy, background: "#fff", fontFamily: "'Inter'" }}
              aria-label="Filtrer par agence">
              {AGENCIES.map(a => <option key={a}>{a}</option>)}
            </select>
            <div style={{ position: "relative", border: `1px solid ${T.line}`, borderRadius: 9, padding: 9, background: "#fff", cursor: "pointer" }} title={`${kpis.alerts} alerte(s) active(s)`}>
              <Bell size={16} color={T.navy} />
              {kpis.alerts > 0 && (
                <span style={{ position: "absolute", top: -5, right: -5, background: T.red, color: "#fff", fontSize: 9.5, fontWeight: 700, borderRadius: 9, minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
                  {kpis.alerts}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, padding: "18px 22px 14px" }}>
          {[
            { k: "Escales en cours", v: kpis.total, icon: <Ship size={15} color={T.blue} /> },
            { k: "NOR en attente d'acceptation", v: kpis.nor, icon: <Anchor size={15} color={T.amber} /> },
            { k: "Opérations actives", v: kpis.ops, icon: <Package size={15} color={T.green} /> },
            { k: "Tonnage engagé", v: `${(kpis.tonnage / 1000).toLocaleString("fr-FR")} kt`, icon: <Waves size={15} color={T.blue} /> },
          ].map(x => (
            <div key={x.k} style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 10, padding: "13px 15px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: T.muted, fontWeight: 600, letterSpacing: ".02em" }}>{x.icon} {x.k}</div>
              <div className="eds-display" style={{ fontSize: 30, fontWeight: 800, color: T.navy, marginTop: 4, lineHeight: 1 }}>{x.v}</div>
            </div>
          ))}
        </div>

        {/* pipeline */}
        <div className="eds-kanban">
          {STAGES.map(stage => {
            const items = filtered.filter(e => e.stage === stage.id);
            return (
              <div className="eds-col" key={stage.id}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "2px 4px 9px" }}>
                  <div>
                    <span className="eds-display" style={{ fontWeight: 700, fontSize: 15, color: T.navy }}>{stage.label}</span>
                    <span style={{ fontSize: 10.5, color: T.muted, marginLeft: 7 }}>{stage.hint}</span>
                  </div>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: items.length ? T.blue : "#AEBFCB", background: items.length ? "#E8F0F9" : "#EDF1F5", borderRadius: 7, padding: "2px 8px" }}>
                    {items.length}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 60 }}>
                  {items.map((esc, i) => <EscaleCard key={esc.id} esc={esc} onOpen={setOpenId} delay={i} />)}
                  {items.length === 0 && (
                    <div style={{ border: `1.5px dashed ${T.line}`, borderRadius: 10, padding: "16px 12px", fontSize: 12, color: "#9DB0BF", textAlign: "center" }}>
                      Aucune escale à cette étape
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {open && (
        <EscaleDrawer esc={open} onClose={() => setOpenId(null)} onToggleDoc={toggleDoc} onAddEvent={addEvent} notify={notify} />
      )}

      {toast && (
        <div className="eds-toast"><Check size={15} color="#7BE0A2" /> {toast}</div>
      )}
    </div>
  );
}
