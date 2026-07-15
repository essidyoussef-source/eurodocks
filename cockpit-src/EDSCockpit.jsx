import { useState, useMemo } from "react";
import {
  Anchor, Ship, FileText, Bell, Search, X, Check,
  CalendarClock, MapPin, Package, Plus, Download, LayoutGrid,
  Users, Receipt, AlertTriangle, Waves, ArrowUpDown, Clock, Building2, Table2
} from "lucide-react";

/* ============ TOKENS ============ */
const T = {
  navy: "#0A1B2A", navy2: "#10283E", navy3: "#1B3550",
  blue: "#3E7FC1", blueInk: "#2C5E93", sky: "#8FBCE8",
  bg: "#EDF1F5", card: "#FFFFFF", ink: "#14263A", muted: "#5C7386",
  line: "#DCE4EB", amber: "#C98A2B", amberInk: "#8A5E12",
  green: "#2E8B57", red: "#C0452F",
};

const STAGES = [
  { id: "appointment", label: "Appointment", hint: "Nomination reçue" },
  { id: "annonce", label: "Navire annoncé", hint: "ETA confirmé" },
  { id: "nor", label: "NOR tendu", hint: "Prêt à opérer" },
  { id: "ops", label: "Opérations", hint: "Chargement / déchargement" },
  { id: "cloture", label: "Clôture", hint: "SOF · B/L · Facturation" },
];
const STAGE_ORDER = STAGES.map(s => s.id);
const STAGE_META = {
  appointment: { short: "Appointment", color: T.muted, bg: "#E9EFF4" },
  annonce: { short: "Annoncé", color: T.blueInk, bg: "#E7F0F9" },
  nor: { short: "NOR tendu", color: T.amberInk, bg: "#F7EEDD" },
  ops: { short: "Opérations", color: T.green, bg: "#E4F0E9" },
  cloture: { short: "Clôture", color: "#2C5E93", bg: "#E2EAF2" },
};

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

const AGENCIES = ["Toutes agences", "Rouen", "Dunkerque", "Boulogne-sur-Mer"];
const QUAIS = {
  Rouen: ["Socomac", "Beuzelin", "Senalia 2 & 3", "Simarres", "Radicatel"],
  Dunkerque: ["Terminal de Grande Bretagne"],
  "Boulogne-sur-Mer": ["Terminal céréales & vrac"],
};

/* marées Rouen (indicatif démo) */
const TIDES = [
  { t: "03h20", type: "haute", h: "8,10 m" },
  { t: "09h34", type: "basse", h: "1,20 m" },
  { t: "15h42", type: "haute", h: "8,25 m" },
  { t: "21h58", type: "basse", h: "1,05 m" },
];

/* ============ ÉQUIPE ============ */
const TEAM = [
  { id: "yannick", name: "Yannick M.", role: "Consignation", initials: "YM", color: "#3E7FC1", agency: "Rouen" },
  { id: "hugo", name: "Hugo L.", role: "Affrètement", initials: "HL", color: "#2E8B57", agency: "Rouen" },
  { id: "camille", name: "Camille R.", role: "Consignation", initials: "CR", color: "#C98A2B", agency: "Rouen" },
  { id: "nicolas", name: "Nicolas B.", role: "Affrètement", initials: "NB", color: "#7A5CC0", agency: "Rouen" },
  { id: "lea", name: "Léa D.", role: "Manutention", initials: "LD", color: "#C0452F", agency: "Rouen" },
  { id: "sophie", name: "Sophie V.", role: "Comptabilité", initials: "SV", color: "#1B7F8C", agency: "Rouen" },
];
const MEMBER = Object.fromEntries(TEAM.map(m => [m.id, m]));

/* ============ DONNÉES DÉMO (issues du terrain) ============ */
const INITIAL = [
  {
    id: "eds-2607-114", assignee: "yannick", vessel: "BTG MATTERHORN", voyage: "Voyage 5 · CRG-214788",
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
    id: "eds-2607-118", assignee: "hugo", vessel: "GENCO VIGILANT", voyage: "Voyage 12 · GNC-88231",
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
    id: "eds-2607-111", assignee: "camille", vessel: "LORD NELSON", voyage: "Voyage 3 · NRD-55102",
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
    id: "eds-2607-121", assignee: null, vessel: "BALD EAGLE", voyage: "Voyage 8 · CLF-30419",
    agency: "Rouen", quai: "Simarres", sens: "C", cargo: "Blé meunier en vrac",
    tonnage: 30000, client: "Cliffer / Lecureur", dest: "Safi, Maroc",
    eta: "Ven 17 juil · 06h00", stage: "annonce",
    specs: { LOA: "177 m", Beam: "28,4 m", DWT: "50 326", Draft: "11,92 m", GT: "27 986", NT: "15 442", Flag: "Liberia", IMO: "9483516" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [],
    alerts: ["ETA repoussé de 12h · marée du soir visée"],
  },
  {
    id: "eds-2607-123", assignee: "lea", vessel: "HENDRIKA MARGARETTA", voyage: "Voyage 2 · HMG-71005",
    agency: "Rouen", quai: "Beuzelin", sens: "D", cargo: "Pois protéagineux",
    tonnage: 3000, client: "Roquette", dest: "Origine : Gand, Belgique",
    eta: "Sam 18 juil · 14h00", stage: "annonce",
    specs: { LOA: "110 m", Beam: "14 m", DWT: "6 050", Draft: "5,90 m", GT: "4 102", NT: "2 218", Flag: "Belgique", IMO: "926832" },
    docs: { "Appointment": true, "Proforma D/A": false, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [],
    alerts: [],
  },
  {
    id: "eds-2607-125", assignee: null, vessel: "OSTERMARSCH", voyage: "Voyage 4 · ELF-90218",
    agency: "Rouen", quai: "Radicatel", sens: "D", cargo: "Éoliennes · project cargo",
    tonnage: 1800, client: "El Ferro", dest: "Origine : Esbjerg, Danemark",
    eta: "Lun 20 juil · 08h00", stage: "appointment",
    specs: { LOA: "138 m", Beam: "21 m", DWT: "12 744", Draft: "8,00 m", GT: "9 611", NT: "4 862", Flag: "Antigua", IMO: "9504178" },
    docs: { "Appointment": true, "Proforma D/A": false, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [],
    alerts: [],
  },
  {
    id: "eds-2607-119", assignee: "nicolas", vessel: "FEDERAL BALTIC", voyage: "Voyage 9 · GLC-44872",
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
    id: "eds-2607-120", assignee: "sophie", vessel: "ATLANTIC ROSE", voyage: "Voyage 6 · CBL-20991",
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

/* ============ STYLES GLOBAUX ============ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
.eds-root { font-family:'Inter',system-ui,sans-serif; color:${T.ink}; background:${T.bg}; min-height:100vh; display:flex; }
.eds-display { font-family:'Barlow Condensed','Inter',sans-serif; text-transform:uppercase; letter-spacing:.02em; }
.eds-side { width:216px; min-width:216px; background:${T.navy}; color:#fff; display:flex; flex-direction:column; position:sticky; top:0; height:100vh; }
.eds-main { flex:1; min-width:0; display:flex; flex-direction:column; }
.eds-nav-item { display:flex; align-items:center; gap:10px; padding:10px 18px; font-size:13.5px; color:#9FB4C6; cursor:pointer; border-left:3px solid transparent; transition:color .15s ease, background .15s ease; background:none; border-top:none; border-right:none; border-bottom:none; width:100%; text-align:left; font-family:'Inter',sans-serif; }
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
  padding:11px 18px; border-radius:9px; font-size:13.5px; z-index:80; display:flex; gap:9px; align-items:center;
  opacity:0; animation:edsToast .25s cubic-bezier(.23,1,.32,1) forwards; box-shadow:0 10px 30px rgba(10,27,42,.35); }
@keyframes edsToast { to { opacity:1; transform:translateX(-50%) translateY(0); } }
.eds-kanban::-webkit-scrollbar { height:9px; } .eds-kanban::-webkit-scrollbar-thumb { background:#C7D3DD; border-radius:9px; }
.eds-scroll::-webkit-scrollbar { width:9px; } .eds-scroll::-webkit-scrollbar-thumb { background:#C7D3DD; border-radius:9px; }
.eds-tablewrap { overflow-x:auto; border:1px solid ${T.line}; border-radius:12px; background:#fff; }
.eds-tablewrap::-webkit-scrollbar { height:9px; } .eds-tablewrap::-webkit-scrollbar-thumb { background:#C7D3DD; border-radius:9px; }
table.eds-tab { width:100%; border-collapse:collapse; font-size:13px; min-width:900px; }
table.eds-tab thead th { position:sticky; top:0; background:${T.navy}; color:#DCE7F1; font-family:'Barlow Condensed'; text-transform:uppercase;
  letter-spacing:.03em; font-weight:700; font-size:12px; text-align:left; padding:10px 13px; white-space:nowrap; z-index:2; }
table.eds-tab thead th.sortable { cursor:pointer; user-select:none; }
table.eds-tab thead th.sortable:hover { color:#fff; }
table.eds-tab thead th.rt { text-align:right; }
table.eds-tab tbody td { padding:10px 13px; border-bottom:1px solid ${T.line}; vertical-align:middle; }
table.eds-tab tbody tr.clk { cursor:pointer; transition:background .12s ease; }
table.eds-tab tbody tr.clk:hover { background:#F3F7FB; }
table.eds-tab tbody tr:last-child td { border-bottom:none; }
.num { font-variant-numeric:tabular-nums; }
.eds-modal-veil { position:fixed; inset:0; background:rgba(10,27,42,.5); z-index:70; display:flex; align-items:flex-start; justify-content:center;
  padding:40px 16px; overflow-y:auto; animation:edsFade .18s ease-out forwards; }
.eds-modal { background:#fff; width:560px; max-width:100%; border-radius:14px; overflow:hidden; box-shadow:0 30px 70px rgba(10,27,42,.4);
  transform:translateY(10px); opacity:0; animation:edsSlideUp .24s cubic-bezier(.23,1,.32,1) forwards; }
@keyframes edsSlideUp { to { transform:translateY(0); opacity:1; } }
.eds-field label { display:block; font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:${T.blueInk}; margin-bottom:5px; }
.eds-input { width:100%; border:1px solid ${T.line}; border-radius:8px; padding:9px 11px; font-size:13.5px; font-family:'Inter',sans-serif; color:${T.ink}; background:#fff; outline:none; transition:border-color .15s ease; }
.eds-input:focus { border-color:${T.blue}; }
:focus-visible { outline:2px solid ${T.blue}; outline-offset:2px; }
@media (max-width: 900px) { .eds-side { display:none; } .eds-drawer { width:100vw; } }
@media (prefers-reduced-motion: reduce) {
  .eds-card, .eds-drawer, .eds-toast, .eds-modal { animation-duration:.01ms !important; transform:none !important; opacity:1 !important; }
}
`;

/* ============ SIGNATURE : JAUGE TIRANT D'EAU ============ */
function DraftGauge({ pct }) {
  const marks = 7;
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

function StagePill({ stage }) {
  const m = STAGE_META[stage];
  return (
    <span className="eds-display" style={{ display: "inline-block", fontWeight: 700, fontSize: 12, padding: "2px 9px", borderRadius: 999, color: m.color, background: m.bg, whiteSpace: "nowrap" }}>
      {m.short}
    </span>
  );
}
function docPct(docs) { return Object.values(docs).filter(Boolean).length / DOC_LIST.length; }
function DocsMini({ docs }) {
  const done = Object.values(docs).filter(Boolean).length;
  const pct = done / DOC_LIST.length;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{ width: 46, height: 6, borderRadius: 4, background: "#E3EAF0", overflow: "hidden", flexShrink: 0 }}>
        <div style={{ width: `${pct * 100}%`, height: "100%", background: pct === 1 ? T.green : T.blue, transition: "width .3s ease" }} />
      </div>
      <span className="num" style={{ fontSize: 12, color: T.muted }}>{done}/8</span>
    </div>
  );
}

function Avatar({ id, size = 22 }) {
  const m = id ? MEMBER[id] : null;
  if (!m) return (
    <span title="Non attribué" style={{ width: size, height: size, borderRadius: size, border: "1.5px dashed #B9C7D3", color: "#9DB0BF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.5, flexShrink: 0 }}>?</span>
  );
  return (
    <span className="eds-display" title={`${m.name} · ${m.role}`} style={{ width: size, height: size, borderRadius: size, background: m.color, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.44, fontWeight: 700, flexShrink: 0, letterSpacing: 0 }}>{m.initials}</span>
  );
}

/* ============ CARTE ESCALE (kanban) ============ */
function EscaleCard({ esc, onOpen, delay }) {
  const pct = docPct(esc.docs);
  return (
    <div className="eds-card" style={{ animationDelay: `${delay * 45}ms` }} onClick={() => onOpen(esc.id)}>
      <DraftGauge pct={pct} />
      <div style={{ padding: "11px 13px", flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div className="eds-display" style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.05 }}>{esc.vessel}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            {esc.alerts.length > 0 && <AlertTriangle size={14} color={T.amber} style={{ marginTop: 1 }} />}
            <Avatar id={esc.assignee} size={22} />
          </div>
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

/* ============ GRAND TABLEAU ============ */
function BoardTable({ list, onOpen, sort, setSort }) {
  const cols = [
    { k: "vessel", label: "Navire", sortable: true },
    { k: "agency", label: "Agence", sortable: true },
    { k: "quai", label: "Quai", sortable: true },
    { k: "cargo", label: "Sens · Cargaison", sortable: false },
    { k: "tonnage", label: "Tonnage", sortable: true, rt: true },
    { k: "client", label: "Client / Armateur", sortable: true },
    { k: "eta", label: "ETA / ETB", sortable: false },
    { k: "assignee", label: "Attribué à", sortable: true },
    { k: "stage", label: "Étape", sortable: true },
    { k: "docs", label: "Documents", sortable: false },
  ];
  const onSort = (k) => setSort(s => ({ key: k, dir: s.key === k && s.dir === "asc" ? "desc" : "asc" }));
  return (
    <div className="eds-tablewrap">
      <table className="eds-tab">
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c.k} className={`${c.sortable ? "sortable" : ""} ${c.rt ? "rt" : ""}`}
                onClick={c.sortable ? () => onSort(c.k) : undefined}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  {c.label}
                  {c.sortable && <ArrowUpDown size={11} style={{ opacity: sort.key === c.k ? 1 : .4 }} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map(esc => (
            <tr key={esc.id} className="clk" onClick={() => onOpen(esc.id)}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  {esc.alerts.length > 0 && <AlertTriangle size={13} color={T.amber} style={{ flexShrink: 0 }} />}
                  <div>
                    <div className="eds-display" style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.05 }}>{esc.vessel}</div>
                    <div style={{ fontSize: 10.5, color: T.muted }}>{esc.voyage}</div>
                  </div>
                </div>
              </td>
              <td style={{ color: T.ink }}>{esc.agency}</td>
              <td><span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600 }}><MapPin size={12} color={T.blue} />{esc.quai}</span></td>
              <td style={{ maxWidth: 220 }}>
                <span style={{ display: "inline-block", fontSize: 10.5, fontWeight: 700, color: esc.sens === "C" ? T.blue : T.amberInk, background: esc.sens === "C" ? "#E7F0F9" : "#F7EEDD", borderRadius: 5, padding: "1px 6px", marginRight: 6 }}>
                  {esc.sens === "C" ? "CHARGT" : "DÉCHARGT"}
                </span>
                <span style={{ color: T.ink }}>{esc.cargo}</span>
              </td>
              <td className="rt num" style={{ textAlign: "right", fontWeight: 600 }}>{esc.tonnage.toLocaleString("fr-FR")} t</td>
              <td style={{ color: T.muted }}>{esc.client}</td>
              <td>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: esc.eta === "À quai" ? T.green : T.ink, fontWeight: esc.eta === "À quai" ? 700 : 500 }}>
                  <Clock size={12} />{esc.eta}
                </span>
              </td>
              <td>
                {esc.assignee
                  ? <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Avatar id={esc.assignee} size={22} /><span style={{ color: T.ink, fontWeight: 500 }}>{MEMBER[esc.assignee].name}</span></span>
                  : <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Avatar id={null} size={22} /><span style={{ color: "#9DB0BF" }}>Non attribué</span></span>}
              </td>
              <td><StagePill stage={esc.stage} /></td>
              <td><DocsMini docs={esc.docs} /></td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr><td colSpan={10} style={{ textAlign: "center", color: T.muted, padding: "26px 0" }}>Aucune escale ne correspond au filtre.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ============ VUE QUAIS & MARÉES ============ */
function QuaisView({ list }) {
  const rows = [];
  Object.entries(QUAIS).forEach(([agency, quais]) => {
    quais.forEach(q => {
      const here = list.filter(e => e.agency === agency && e.quai === q);
      const current = here.find(e => e.stage === "ops" || e.stage === "cloture");
      const next = here.filter(e => e.stage === "annonce" || e.stage === "nor").sort((a, b) => a.eta.localeCompare(b.eta))[0];
      rows.push({ agency, quai: q, current, next });
    });
  });
  return (
    <div style={{ padding: "6px 22px 26px" }}>
      <div style={{ background: T.navy, borderRadius: 12, padding: "16px 20px", marginBottom: 18, color: "#fff", display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Waves size={20} color={T.sky} />
          <div>
            <div className="eds-display" style={{ fontWeight: 700, fontSize: 16 }}>Marées · Rouen</div>
            <div style={{ fontSize: 11, color: T.sky }}>Mercredi 15 juillet 2026</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {TIDES.map(t => (
            <div key={t.t} style={{ background: "rgba(255,255,255,.07)", borderRadius: 9, padding: "8px 13px", minWidth: 96 }}>
              <div style={{ fontSize: 10, color: t.type === "haute" ? T.sky : "#9FB6C8", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 600 }}>Marée {t.type}</div>
              <div className="eds-display num" style={{ fontSize: 20, fontWeight: 800 }}>{t.t}</div>
              <div style={{ fontSize: 10.5, color: "#9FB6C8" }}>{t.h}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="eds-tablewrap">
        <table className="eds-tab">
          <thead><tr><th>Quai</th><th>Agence</th><th>Navire à quai</th><th>État</th><th>Prochaine arrivée</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.agency + r.quai}>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 600 }}><MapPin size={12} color={T.blue} />{r.quai}</span></td>
                <td style={{ color: T.muted }}>{r.agency}</td>
                <td>{r.current ? <span className="eds-display" style={{ fontWeight: 700, fontSize: 14 }}>{r.current.vessel}</span> : <span style={{ color: "#9DB0BF" }}>—</span>}</td>
                <td>{r.current
                  ? <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: T.green, fontWeight: 600, fontSize: 12 }}><span style={{ width: 7, height: 7, borderRadius: 7, background: T.green }} />Occupé</span>
                  : <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: T.muted, fontSize: 12 }}><span style={{ width: 7, height: 7, borderRadius: 7, background: "#C4D3E0" }} />Libre</span>}
                </td>
                <td>{r.next ? <span style={{ color: T.ink }}>{r.next.vessel} · <span className="num" style={{ color: T.muted }}>{r.next.eta}</span></span> : <span style={{ color: "#9DB0BF" }}>—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============ VUE DOCUMENTS ============ */
function DocsView({ list, onOpen }) {
  const rows = [...list].sort((a, b) => docPct(a.docs) - docPct(b.docs));
  return (
    <div style={{ padding: "6px 22px 26px" }}>
      <p style={{ fontSize: 13.5, color: T.muted, margin: "0 0 14px", maxWidth: 620 }}>
        Suivi documentaire de chaque escale, du moins complet au plus complet. Les pièces manquantes sont signalées — plus aucune ne passe entre les mailles.
      </p>
      <div className="eds-tablewrap">
        <table className="eds-tab">
          <thead><tr><th>Navire</th><th>Étape</th><th>Avancement</th><th>Pièces manquantes</th></tr></thead>
          <tbody>
            {rows.map(esc => {
              const missing = DOC_LIST.filter(d => !esc.docs[d]);
              return (
                <tr key={esc.id} className="clk" onClick={() => onOpen(esc.id)}>
                  <td><div className="eds-display" style={{ fontWeight: 700, fontSize: 14.5 }}>{esc.vessel}</div><div style={{ fontSize: 10.5, color: T.muted }}>{esc.agency} · {esc.quai}</div></td>
                  <td><StagePill stage={esc.stage} /></td>
                  <td><DocsMini docs={esc.docs} /></td>
                  <td>
                    {missing.length === 0
                      ? <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: T.green, fontWeight: 600, fontSize: 12 }}><Check size={13} />Dossier complet</span>
                      : <span style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {missing.map(d => <span key={d} style={{ fontSize: 10.5, color: T.red, background: "#F6E3DF", borderRadius: 5, padding: "1px 7px" }}>{d}</span>)}
                      </span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============ VUE ARMATEURS & CLIENTS ============ */
function ClientsView({ list }) {
  const map = {};
  list.forEach(e => {
    if (!map[e.client]) map[e.client] = { client: e.client, count: 0, tonnage: 0, vessels: [] };
    map[e.client].count++; map[e.client].tonnage += e.tonnage; map[e.client].vessels.push(e.vessel);
  });
  const rows = Object.values(map).sort((a, b) => b.tonnage - a.tonnage);
  return (
    <div style={{ padding: "6px 22px 26px" }}>
      <p style={{ fontSize: 13.5, color: T.muted, margin: "0 0 14px", maxWidth: 620 }}>
        Vos armateurs et affréteurs, classés par tonnage engagé sur la période. La mémoire commerciale que le tableau de bureau ne garde jamais.
      </p>
      <div className="eds-tablewrap">
        <table className="eds-tab">
          <thead><tr><th>Client / Armateur</th><th className="rt">Escales</th><th className="rt">Tonnage engagé</th><th>Navires</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.client}>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 600 }}><Building2 size={14} color={T.blue} />{r.client}</span></td>
                <td className="rt num" style={{ textAlign: "right" }}>{r.count}</td>
                <td className="rt num" style={{ textAlign: "right", fontWeight: 700 }}>{r.tonnage.toLocaleString("fr-FR")} t</td>
                <td style={{ color: T.muted, fontSize: 12 }}>{r.vessels.join(" · ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============ VUE FACTURATION ============ */
function FactuView({ list, onOpen }) {
  const rows = list.filter(e => e.stage === "ops" || e.stage === "cloture");
  const billStatus = (e) => {
    if (e.docs["Bill of lading"] && e.docs["Statement of facts"]) return { t: "À facturer", c: T.green, bg: "#E4F0E9" };
    if (e.stage === "cloture") return { t: "Docs en attente", c: T.amberInk, bg: "#F7EEDD" };
    return { t: "En opération", c: T.blueInk, bg: "#E7F0F9" };
  };
  const yn = (v) => v ? <Check size={15} color={T.green} /> : <X size={14} color="#C4D3E0" />;
  return (
    <div style={{ padding: "6px 22px 26px" }}>
      <p style={{ fontSize: 13.5, color: T.muted, margin: "0 0 14px", maxWidth: 620 }}>
        Les escales en fin de cycle et leur état de facturation D/A. Dès que le SOF et le B/L sont émis, la facturation peut partir — la trésorerie n'attend plus.
      </p>
      <div className="eds-tablewrap">
        <table className="eds-tab">
          <thead><tr><th>Navire</th><th>Agence</th><th className="rt">Tonnage</th><th>SOF</th><th>B/L</th><th>Facturation D/A</th></tr></thead>
          <tbody>
            {rows.map(esc => {
              const st = billStatus(esc);
              return (
                <tr key={esc.id} className="clk" onClick={() => onOpen(esc.id)}>
                  <td><div className="eds-display" style={{ fontWeight: 700, fontSize: 14.5 }}>{esc.vessel}</div><div style={{ fontSize: 10.5, color: T.muted }}>{esc.client}</div></td>
                  <td style={{ color: T.muted }}>{esc.agency}</td>
                  <td className="rt num" style={{ textAlign: "right", fontWeight: 600 }}>{esc.tonnage.toLocaleString("fr-FR")} t</td>
                  <td>{yn(esc.docs["Statement of facts"])}</td>
                  <td>{yn(esc.docs["Bill of lading"])}</td>
                  <td><span className="eds-display" style={{ fontWeight: 700, fontSize: 12, padding: "2px 9px", borderRadius: 999, color: st.c, background: st.bg }}>{st.t}</span></td>
                </tr>
              );
            })}
            {rows.length === 0 && <tr><td colSpan={6} style={{ textAlign: "center", color: T.muted, padding: "26px 0" }}>Aucune escale en fin de cycle.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============ MODALE NOUVELLE ESCALE ============ */
function NewEscaleModal({ onClose, onCreate, notify }) {
  const [f, setF] = useState({
    vessel: "", agency: "Rouen", quai: "Socomac", sens: "C", cargo: "",
    tonnage: "", client: "", dest: "", eta: "", stage: "appointment",
    assignee: "", LOA: "", DWT: "", Draft: "",
  });
  const up = (k, v) => setF(s => ({ ...s, [k]: v }));
  const quaiOptions = QUAIS[f.agency] || [];
  const submit = (e) => {
    e.preventDefault();
    if (!f.vessel.trim()) return;
    onCreate({
      id: "eds-new-" + Math.round(performance.now()),
      vessel: f.vessel.toUpperCase(), voyage: "Nouvelle escale",
      agency: f.agency, quai: f.quai, sens: f.sens, cargo: f.cargo || "À préciser",
      tonnage: Number(f.tonnage) || 0, client: f.client || "À préciser", dest: f.dest || "—",
      eta: f.eta || "À planifier", stage: f.stage, assignee: f.assignee || null,
      specs: { LOA: f.LOA || "—", Beam: "—", DWT: f.DWT || "—", Draft: f.Draft || "—", GT: "—", NT: "—", Flag: "—", IMO: "—" },
      docs: { "Appointment": true, "Proforma D/A": false, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
      events: [], alerts: [],
    });
    notify("Nouvelle escale créée");
    onClose();
  };
  return (
    <div className="eds-modal-veil" onClick={onClose}>
      <div className="eds-modal" onClick={e => e.stopPropagation()}>
        <div style={{ background: T.navy, color: "#fff", padding: "16px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: T.sky, letterSpacing: ".08em", fontWeight: 600 }}>CRÉER UNE ESCALE</div>
            <div className="eds-display" style={{ fontSize: 22, fontWeight: 800, lineHeight: 1, marginTop: 3 }}>Nouvelle escale</div>
          </div>
          <button onClick={onClose} className="eds-btn" style={{ background: "rgba(255,255,255,.1)", color: "#fff", padding: 8 }} aria-label="Fermer"><X size={16} /></button>
        </div>
        <form onSubmit={submit} style={{ padding: "18px 22px 22px", display: "flex", flexDirection: "column", gap: 13 }}>
          <div className="eds-field"><label>Nom du navire *</label>
            <input className="eds-input" value={f.vessel} onChange={e => up("vessel", e.target.value)} placeholder="ex. Federal Rhine" required autoFocus />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
            <div className="eds-field"><label>Agence</label>
              <select className="eds-input" value={f.agency} onChange={e => { const a = e.target.value; up("agency", a); up("quai", (QUAIS[a] || [""])[0]); }}>
                {AGENCIES.slice(1).map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div className="eds-field"><label>Quai</label>
              <select className="eds-input" value={f.quai} onChange={e => up("quai", e.target.value)}>
                {quaiOptions.map(q => <option key={q}>{q}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 13 }}>
            <div className="eds-field"><label>Sens</label>
              <select className="eds-input" value={f.sens} onChange={e => up("sens", e.target.value)}>
                <option value="C">Chargement</option>
                <option value="D">Déchargement</option>
              </select>
            </div>
            <div className="eds-field"><label>Cargaison</label>
              <input className="eds-input" value={f.cargo} onChange={e => up("cargo", e.target.value)} placeholder="ex. Blé meunier en vrac" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 13 }}>
            <div className="eds-field"><label>Tonnage (t)</label>
              <input className="eds-input num" type="number" value={f.tonnage} onChange={e => up("tonnage", e.target.value)} placeholder="30000" />
            </div>
            <div className="eds-field"><label>Client / Armateur</label>
              <input className="eds-input" value={f.client} onChange={e => up("client", e.target.value)} placeholder="ex. Cargill" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 13 }}>
            <div className="eds-field"><label>Destination / Origine</label>
              <input className="eds-input" value={f.dest} onChange={e => up("dest", e.target.value)} placeholder="ex. Casablanca, Maroc" />
            </div>
            <div className="eds-field"><label>ETA</label>
              <input className="eds-input" value={f.eta} onChange={e => up("eta", e.target.value)} placeholder="Ven 18 juil · 06h00" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
            <div className="eds-field"><label>Étape initiale</label>
              <select className="eds-input" value={f.stage} onChange={e => up("stage", e.target.value)}>
                {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div className="eds-field"><label>Attribué à</label>
              <select className="eds-input" value={f.assignee} onChange={e => up("assignee", e.target.value)}>
                <option value="">Non attribué</option>
                {TEAM.map(m => <option key={m.id} value={m.id}>{m.name} — {m.role}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 13 }}>
            <div className="eds-field"><label>LOA</label><input className="eds-input" value={f.LOA} onChange={e => up("LOA", e.target.value)} placeholder="180 m" /></div>
            <div className="eds-field"><label>DWT</label><input className="eds-input num" value={f.DWT} onChange={e => up("DWT", e.target.value)} placeholder="50 000" /></div>
            <div className="eds-field"><label>Tirant d'eau</label><input className="eds-input" value={f.Draft} onChange={e => up("Draft", e.target.value)} placeholder="11,9 m" /></div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
            <button type="button" onClick={onClose} className="eds-btn" style={{ background: "#EDF1F5", color: T.ink }}>Annuler</button>
            <button type="submit" className="eds-btn" style={{ background: T.blue, color: "#fff" }}><Plus size={15} /> Créer l'escale</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============ FICHE ESCALE (DRAWER) ============ */
function EscaleDrawer({ esc, onClose, onToggleDoc, onAddEvent, onAssign, notify }) {
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
${lines || "  (journal vide)"}
------------------------------------------------------------
Établi automatiquement le Mer 15 juil 2026 · en attente signatures
Master / Agents / Charterers`;
  }, [esc]);

  return (
    <>
      <div className="eds-drawer-veil" onClick={onClose} />
      <div className="eds-drawer">
        <div style={{ background: T.navy, color: "#fff", padding: "18px 22px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, color: T.sky, letterSpacing: ".08em", fontWeight: 600 }}>FICHE ESCALE · {esc.id.toUpperCase()}</div>
              <div className="eds-display" style={{ fontSize: 30, fontWeight: 800, lineHeight: 1, marginTop: 4 }}>{esc.vessel}</div>
              <div style={{ fontSize: 12.5, color: "#B9CBDA", marginTop: 4 }}>{esc.voyage} · {esc.quai} · {esc.agency}</div>
            </div>
            <button onClick={onClose} className="eds-btn" style={{ background: "rgba(255,255,255,.1)", color: "#fff", padding: 8 }} aria-label="Fermer la fiche"><X size={16} /></button>
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
          {esc.alerts.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: "#FBF3E4", border: `1px solid #EAD9B4`, borderRadius: 9, padding: "10px 12px", marginBottom: 14 }}>
              <AlertTriangle size={15} color={T.amber} style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12.5, color: "#7A5A1E", lineHeight: 1.45 }}>{a}</span>
            </div>
          ))}

          <div style={{ fontSize: 13, color: T.ink, background: "#F4F7FA", borderRadius: 9, padding: "11px 13px", marginBottom: 18, lineHeight: 1.5 }}>
            <b>{esc.sens === "C" ? "Chargement" : "Déchargement"}</b> · {esc.tonnage.toLocaleString("fr-FR")} t · {esc.cargo}<br />
            <span style={{ color: T.muted }}>{esc.client} · {esc.dest}</span>
          </div>

          {/* attribution */}
          <div style={{ display: "flex", alignItems: "center", gap: 11, border: `1px solid ${T.line}`, borderRadius: 10, padding: "11px 13px", marginBottom: 18 }}>
            <Avatar id={esc.assignee} size={34} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, color: T.blueInk, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 600 }}>Attribué à</div>
              <div style={{ fontSize: 13.5, color: esc.assignee ? T.ink : "#9DB0BF", fontWeight: 600 }}>
                {esc.assignee ? `${MEMBER[esc.assignee].name} · ${MEMBER[esc.assignee].role}` : "Non attribué"}
              </div>
            </div>
            <select value={esc.assignee || ""} onChange={e => { onAssign(esc.id, e.target.value || null); notify(e.target.value ? `Escale attribuée à ${MEMBER[e.target.value].name}` : "Attribution retirée"); }}
              style={{ border: `1px solid ${T.line}`, borderRadius: 8, padding: "8px 10px", fontSize: 12.5, fontFamily: "'Inter'", color: T.ink, background: "#fff", cursor: "pointer" }}
              aria-label="Attribuer l'escale">
              <option value="">Non attribué</option>
              {TEAM.map(m => <option key={m.id} value={m.id}>{m.name} — {m.role}</option>)}
            </select>
          </div>

          <div className="eds-display" style={{ fontSize: 15, fontWeight: 700, color: T.navy, marginBottom: 8 }}>
            Documents d'escale · {done}/{DOC_LIST.length}
          </div>
          <div style={{ border: `1px solid ${T.line}`, borderRadius: 10, padding: 6, marginBottom: 20 }}>
            {DOC_LIST.map(d => (
              <div key={d} className="eds-doc" onClick={() => onToggleDoc(esc.id, d)} role="checkbox" aria-checked={esc.docs[d]} tabIndex={0}
                onKeyDown={e => e.key === "Enter" && onToggleDoc(esc.id, d)}>
                <div style={{
                  width: 18, height: 18, borderRadius: 5, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  background: esc.docs[d] ? T.green : "#fff", border: esc.docs[d] ? `1px solid ${T.green}` : `1.5px solid #B9C7D3`, transition: "background .15s ease, border-color .15s ease"
                }}>
                  {esc.docs[d] && <Check size={12} color="#fff" strokeWidth={3} />}
                </div>
                <span style={{ fontSize: 13, color: esc.docs[d] ? T.muted : T.ink, fontWeight: esc.docs[d] ? 400 : 500 }}>{d}</span>
                <FileText size={13} color="#AEBFCB" style={{ marginLeft: "auto" }} />
              </div>
            ))}
          </div>

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

          <div style={{ display: "flex", gap: 7, marginBottom: 18 }}>
            <select value={evType} onChange={e => setEvType(e.target.value)}
              style={{ flex: 1, minWidth: 0, border: `1px solid ${T.line}`, borderRadius: 8, padding: "8px 9px", fontSize: 12.5, fontFamily: "'Inter'", color: T.ink, background: "#fff" }}>
              {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <input value={evTime} onChange={e => setEvTime(e.target.value)} placeholder="Mer 15 juil · 14h05"
              style={{ width: 140, border: `1px solid ${T.line}`, borderRadius: 8, padding: "8px 9px", fontSize: 12.5, fontFamily: "'Inter'" }} />
            <button className="eds-btn" style={{ background: T.blue, color: "#fff", padding: "8px 11px" }}
              onClick={() => { onAddEvent(esc.id, { t: evTime || "Mer 15 juil", e: evType }); notify("Événement ajouté au journal"); }}
              aria-label="Ajouter l'événement"><Plus size={15} /></button>
          </div>

          {sof && (
            <div>
              <div style={{ fontSize: 11.5, color: T.muted, marginBottom: 6, fontWeight: 600, letterSpacing: ".04em" }}>APERÇU · STATEMENT OF FACTS</div>
              <pre style={{ background: T.navy, color: "#D7E4EF", borderRadius: 10, padding: "14px 16px", fontSize: 10.8, lineHeight: 1.55, overflowX: "auto", fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", whiteSpace: "pre" }}>{sofText}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ============ NAV & VUES ============ */
const NAV = [
  { id: "dashboard", icon: LayoutGrid, label: "Tableau de bord" },
  { id: "escales", icon: Ship, label: "Escales" },
  { id: "quais", icon: Waves, label: "Quais & marées" },
  { id: "docs", icon: FileText, label: "Documents" },
  { id: "clients", icon: Users, label: "Armateurs & clients" },
  { id: "factu", icon: Receipt, label: "Proformas & facturation" },
];
const VIEW_META = {
  dashboard: { title: "Tableau de bord des escales", sub: "Mercredi 15 juillet 2026 · marée haute Rouen 15h42" },
  escales: { title: "Toutes les escales", sub: "Le grand tableau, trié et filtrable" },
  quais: { title: "Quais & marées", sub: "Occupation des postes et fenêtres de marée" },
  docs: { title: "Suivi documentaire", sub: "Ce qui est reçu, ce qui manque" },
  clients: { title: "Armateurs & clients", sub: "Tonnage engagé par partenaire" },
  factu: { title: "Proformas & facturation", sub: "Escales en fin de cycle" },
};

/* ============ APP ============ */
export default function EDSCockpit() {
  const [escales, setEscales] = useState(INITIAL);
  const [view, setView] = useState("dashboard");
  const [agency, setAgency] = useState("Toutes agences");
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [sort, setSort] = useState({ key: "stage", dir: "asc" });
  const [newOpen, setNewOpen] = useState(false);
  const [member, setMember] = useState("all");

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };

  const filtered = useMemo(() => escales.filter(e =>
    (agency === "Toutes agences" || e.agency === agency) &&
    (member === "all" || (member === "none" ? !e.assignee : e.assignee === member)) &&
    (query.trim() === "" || (e.vessel + e.quai + e.client + e.cargo).toLowerCase().includes(query.toLowerCase()))
  ), [escales, agency, member, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const s = sort.dir === "asc" ? 1 : -1;
    arr.sort((a, b) => {
      let av, bv;
      if (sort.key === "tonnage") { av = a.tonnage; bv = b.tonnage; }
      else if (sort.key === "stage") { av = STAGE_ORDER.indexOf(a.stage); bv = STAGE_ORDER.indexOf(b.stage); }
      else { av = (a[sort.key] || "").toString().toLowerCase(); bv = (b[sort.key] || "").toString().toLowerCase(); }
      return av < bv ? -1 * s : av > bv ? 1 * s : 0;
    });
    return arr;
  }, [filtered, sort]);

  const kpis = useMemo(() => ({
    total: filtered.length,
    nor: filtered.filter(e => e.stage === "nor").length,
    ops: filtered.filter(e => e.stage === "ops").length,
    tonnage: filtered.reduce((s, e) => s + e.tonnage, 0),
    alerts: filtered.reduce((s, e) => s + e.alerts.length, 0),
  }), [filtered]);

  const toggleDoc = (id, doc) => setEscales(prev => prev.map(e => e.id === id ? { ...e, docs: { ...e.docs, [doc]: !e.docs[doc] } } : e));
  const addEvent = (id, ev) => setEscales(prev => prev.map(e => e.id === id ? { ...e, events: [...e.events, ev] } : e));
  const createEscale = (esc) => { setEscales(prev => [esc, ...prev]); setView("dashboard"); };
  const assign = (id, mid) => setEscales(prev => prev.map(e => e.id === id ? { ...e, assignee: mid } : e));

  const open = escales.find(e => e.id === openId);
  const meta = VIEW_META[view];

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
          {NAV.map(n => {
            const Icon = n.icon;
            return (
              <button key={n.id} className={`eds-nav-item${view === n.id ? " on" : ""}`} onClick={() => setView(n.id)}>
                <Icon size={15} /> {n.label}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,.08)", fontSize: 10.5, color: "#7E94A7", lineHeight: 1.6 }}>
          Prototype VISION'HER<br />pour Euro Docks Services · 2026
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="eds-main">
        <header style={{ background: "#fff", borderBottom: `1px solid ${T.line}`, padding: "14px 22px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div>
            <h1 className="eds-display" style={{ margin: 0, fontSize: 24, fontWeight: 800, color: T.navy, lineHeight: 1 }}>{meta.title}</h1>
            <div style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>{meta.sub}</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap" }}>
            <button className="eds-btn" style={{ background: T.blue, color: "#fff" }} onClick={() => setNewOpen(true)}>
              <Plus size={15} /> Nouvelle escale
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 7, border: `1px solid ${T.line}`, borderRadius: 9, padding: "8px 11px", background: "#fff" }}>
              <Search size={14} color={T.muted} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Navire, quai, client…"
                style={{ border: "none", outline: "none", fontSize: 13, fontFamily: "'Inter'", width: 140, background: "transparent" }} aria-label="Rechercher une escale" />
            </div>
            <select value={agency} onChange={e => setAgency(e.target.value)}
              style={{ border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 11px", fontSize: 13, fontWeight: 600, color: T.navy, background: "#fff", fontFamily: "'Inter'" }}
              aria-label="Filtrer par agence">
              {AGENCIES.map(a => <option key={a}>{a}</option>)}
            </select>
            <select value={member} onChange={e => setMember(e.target.value)}
              style={{ border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 11px", fontSize: 13, fontWeight: 600, color: T.navy, background: "#fff", fontFamily: "'Inter'" }}
              aria-label="Filtrer par personne">
              <option value="all">Toute l'équipe</option>
              {TEAM.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              <option value="none">Non attribuées</option>
            </select>
            <div style={{ position: "relative", border: `1px solid ${T.line}`, borderRadius: 9, padding: 9, background: "#fff", cursor: "pointer" }} title={`${kpis.alerts} alerte(s) active(s)`}>
              <Bell size={16} color={T.navy} />
              {kpis.alerts > 0 && (
                <span style={{ position: "absolute", top: -5, right: -5, background: T.red, color: "#fff", fontSize: 9.5, fontWeight: 700, borderRadius: 9, minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>{kpis.alerts}</span>
              )}
            </div>
          </div>
        </header>

        {/* ===== DASHBOARD ===== */}
        {view === "dashboard" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, padding: "18px 22px 14px" }}>
              {[
                { k: "Escales en cours", v: kpis.total, icon: <Ship size={15} color={T.blue} /> },
                { k: "NOR en attente d'acceptation", v: kpis.nor, icon: <Anchor size={15} color={T.amber} /> },
                { k: "Opérations actives", v: kpis.ops, icon: <Package size={15} color={T.green} /> },
                { k: "Tonnage engagé", v: `${(kpis.tonnage / 1000).toLocaleString("fr-FR")} kt`, icon: <Waves size={15} color={T.blue} /> },
              ].map(x => (
                <div key={x.k} style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 10, padding: "13px 15px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: T.muted, fontWeight: 600, letterSpacing: ".02em" }}>{x.icon} {x.k}</div>
                  <div className="eds-display num" style={{ fontSize: 30, fontWeight: 800, color: T.navy, marginTop: 4, lineHeight: 1 }}>{x.v}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: "6px 22px 4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 2px 11px" }}>
                <Table2 size={16} color={T.blue} />
                <span className="eds-display" style={{ fontWeight: 700, fontSize: 16, color: T.navy }}>Le grand tableau</span>
                <span style={{ fontSize: 11.5, color: T.muted }}>· vue d'ensemble de toutes les escales, comme au bureau</span>
              </div>
              <BoardTable list={sorted} onOpen={setOpenId} sort={sort} setSort={setSort} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "22px 24px 4px" }}>
              <LayoutGrid size={16} color={T.blue} />
              <span className="eds-display" style={{ fontWeight: 700, fontSize: 16, color: T.navy }}>Pipeline des escales</span>
              <span style={{ fontSize: 11.5, color: T.muted }}>· chaque pôle suit son étape</span>
            </div>
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
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: items.length ? T.blue : "#AEBFCB", background: items.length ? "#E8F0F9" : "#EDF1F5", borderRadius: 7, padding: "2px 8px" }}>{items.length}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 60 }}>
                      {items.map((esc, i) => <EscaleCard key={esc.id} esc={esc} onOpen={setOpenId} delay={i} />)}
                      {items.length === 0 && (
                        <div style={{ border: `1.5px dashed ${T.line}`, borderRadius: 10, padding: "16px 12px", fontSize: 12, color: "#9DB0BF", textAlign: "center" }}>Aucune escale à cette étape</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === "escales" && (
          <div style={{ padding: "18px 22px 26px" }}><BoardTable list={sorted} onOpen={setOpenId} sort={sort} setSort={setSort} /></div>
        )}
        {view === "quais" && <QuaisView list={filtered} />}
        {view === "docs" && <DocsView list={filtered} onOpen={setOpenId} />}
        {view === "clients" && <ClientsView list={filtered} />}
        {view === "factu" && <FactuView list={filtered} onOpen={setOpenId} />}
      </main>

      {open && <EscaleDrawer esc={open} onClose={() => setOpenId(null)} onToggleDoc={toggleDoc} onAddEvent={addEvent} onAssign={assign} notify={notify} />}
      {newOpen && <NewEscaleModal onClose={() => setNewOpen(false)} onCreate={createEscale} notify={notify} />}
      {toast && <div className="eds-toast"><Check size={15} color="#7BE0A2" /> {toast}</div>}
    </div>
  );
}
