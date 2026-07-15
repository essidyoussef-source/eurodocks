import { useState, useMemo, useRef, useEffect } from "react";
import {
  Anchor, Ship, FileText, Bell, Search, X, Check, CalendarClock, MapPin, Package,
  Plus, Download, LayoutGrid, Users, Receipt, AlertTriangle, Waves, ArrowUpDown,
  Clock, Building2, Table2, ChevronRight, ArrowRight, TrendingUp, Command,
  Phone, Mail, Compass, ClipboardList, GanttChart, Settings, Navigation
} from "lucide-react";

/* ============ TOKENS ============ */
const T = {
  navy: "#0A1B2A", navy2: "#0E2436", navy3: "#16324B",
  blue: "#3E7FC1", blueInk: "#2C5E93", sky: "#8FBCE8", skyDim: "#6E93B4",
  bg: "#EAEEF3", bg2: "#F4F7FA", card: "#FFFFFF",
  ink: "#14263A", ink2: "#2C3E50", muted: "#5C7386", faint: "#8296A6",
  line: "#DCE4EB", lineSoft: "#E7EDF2",
  amber: "#C98A2B", amberInk: "#8A5E12",
  green: "#2E8B57", greenInk: "#1E6E42",
  red: "#C0452F", violet: "#7A5CC0", teal: "#1B7F8C",
  sh1: "0 1px 2px rgba(10,27,42,.05)",
  sh2: "0 8px 24px rgba(10,27,42,.09)",
  sh3: "0 18px 44px rgba(10,27,42,.16)",
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
  appointment: { short: "Appointment", color: T.muted, bg: "#E9EFF4", bar: "#9DB0BF" },
  annonce: { short: "Annoncé", color: T.blueInk, bg: "#E7F0F9", bar: "#5B9BD8" },
  nor: { short: "NOR tendu", color: T.amberInk, bg: "#F7EEDD", bar: "#D5A24A" },
  ops: { short: "Opérations", color: T.greenInk, bg: "#E4F0E9", bar: "#3FA06B" },
  cloture: { short: "Clôture", color: "#2C5E93", bg: "#E2EAF2", bar: "#3E7FC1" },
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
const TIDES = [
  { t: "03h20", type: "haute", h: "8,10 m" },
  { t: "09h34", type: "basse", h: "1,20 m" },
  { t: "15h42", type: "haute", h: "8,25 m" },
  { t: "21h58", type: "basse", h: "1,05 m" },
];
const WEEK = [
  { dow: "Lun", dom: 13 }, { dow: "Mar", dom: 14 }, { dow: "Mer", dom: 15 },
  { dow: "Jeu", dom: 16 }, { dow: "Ven", dom: 17 }, { dow: "Sam", dom: 18 }, { dow: "Dim", dom: 19 },
];
const TODAY_DOM = 15;

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
const CURRENT_USER = MEMBER.yannick;

/* ============ DONNÉES DÉMO ============ */
const INITIAL = [
  { id: "eds-2607-114", assignee: "yannick", vessel: "BTG MATTERHORN", voyage: "Voyage 5 · CRG-214788", agency: "Rouen", quai: "Socomac", sens: "C", cargo: "Orge fourragère en vrac", tonnage: 29800, client: "Cargill / Soufflet", dest: "Nantong, Chine", eta: "Mar 14 juil · 16h42", stage: "ops",
    specs: { LOA: "229 m", Beam: "32,26 m", DWT: "81 060", Draft: "14,48 m", GT: "43 229", NT: "27 278", Flag: "Bahamas", IMO: "9731822" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": true, "Inspection bill": true, "Cargo plan": true, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [
      { t: "Lun 13 juil · 16h42", e: "Vessel arrived on roads" }, { t: "Lun 13 juil · 16h42", e: "NOR tendered" },
      { t: "Lun 13 juil · 16h55", e: "Anchored" }, { t: "Mar 14 juil · 00h01", e: "NOR re-tendered" },
      { t: "Mar 14 juil · 16h33", e: "Pilot on board" }, { t: "Mer 15 juil · 00h12", e: "Berthed · loading berth Socomac" },
      { t: "Mer 15 juil · 01h15", e: "Loading started" },
    ], alerts: [{ sev: "warn", t: "Pluie annoncée 13h30 – 14h30 · arrêt chargement probable" }],
  },
  { id: "eds-2607-118", assignee: "hugo", vessel: "GENCO VIGILANT", voyage: "Voyage 12 · GNC-88231", agency: "Rouen", quai: "Beuzelin", sens: "C", cargo: "Blé meunier en vrac", tonnage: 44000, client: "Louis Dreyfus", dest: "Casablanca, Maroc", eta: "Jeu 16 juil · 12h00", stage: "nor",
    specs: { LOA: "190 m", Beam: "32,3 m", DWT: "58 018", Draft: "12,80 m", GT: "33 044", NT: "19 762", Flag: "Marshall Is.", IMO: "9459220" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": true, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [{ t: "Mer 15 juil · 09h20", e: "Vessel arrived on roads" }, { t: "Mer 15 juil · 09h25", e: "NOR tendered" }],
    alerts: [{ sev: "crit", t: "Quai Beuzelin occupé par M/V PNOI jusqu'à jeudi 10h00" }],
  },
  { id: "eds-2607-111", assignee: "camille", vessel: "LORD NELSON", voyage: "Voyage 3 · NRD-55102", agency: "Rouen", quai: "Senalia 2 & 3", sens: "C", cargo: "Blé tendre en vrac", tonnage: 27700, client: "Norden / MillCop", dest: "Agadir, Maroc", eta: "À quai", stage: "cloture",
    specs: { LOA: "180 m", Beam: "30 m", DWT: "56 720", Draft: "12,50 m", GT: "31 236", NT: "18 486", Flag: "Panama", IMO: "9614871" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": true, "Inspection bill": true, "Cargo plan": true, "Statement of facts": true, "Cargo manifest": true, "Bill of lading": false },
    events: [{ t: "Ven 10 juil · 07h05", e: "Berthed · Senalia" }, { t: "Ven 10 juil · 09h00", e: "Loading started" }, { t: "Mar 14 juil · 18h40", e: "Loading completed" }],
    alerts: [],
  },
  { id: "eds-2607-121", assignee: null, vessel: "BALD EAGLE", voyage: "Voyage 8 · CLF-30419", agency: "Rouen", quai: "Simarres", sens: "C", cargo: "Blé meunier en vrac", tonnage: 30000, client: "Cliffer / Lecureur", dest: "Safi, Maroc", eta: "Ven 17 juil · 06h00", stage: "annonce",
    specs: { LOA: "177 m", Beam: "28,4 m", DWT: "50 326", Draft: "11,92 m", GT: "27 986", NT: "15 442", Flag: "Liberia", IMO: "9483516" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [], alerts: [{ sev: "warn", t: "ETA repoussé de 12h · marée du soir visée" }],
  },
  { id: "eds-2607-123", assignee: "lea", vessel: "HENDRIKA MARGARETTA", voyage: "Voyage 2 · HMG-71005", agency: "Rouen", quai: "Beuzelin", sens: "D", cargo: "Pois protéagineux", tonnage: 3000, client: "Roquette", dest: "Origine : Gand, Belgique", eta: "Sam 18 juil · 14h00", stage: "annonce",
    specs: { LOA: "110 m", Beam: "14 m", DWT: "6 050", Draft: "5,90 m", GT: "4 102", NT: "2 218", Flag: "Belgique", IMO: "926832" },
    docs: { "Appointment": true, "Proforma D/A": false, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [], alerts: [],
  },
  { id: "eds-2607-125", assignee: null, vessel: "OSTERMARSCH", voyage: "Voyage 4 · ELF-90218", agency: "Rouen", quai: "Radicatel", sens: "D", cargo: "Éoliennes · project cargo", tonnage: 1800, client: "El Ferro", dest: "Origine : Esbjerg, Danemark", eta: "Lun 20 juil · 08h00", stage: "appointment",
    specs: { LOA: "138 m", Beam: "21 m", DWT: "12 744", Draft: "8,00 m", GT: "9 611", NT: "4 862", Flag: "Antigua", IMO: "9504178" },
    docs: { "Appointment": true, "Proforma D/A": false, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [], alerts: [],
  },
  { id: "eds-2607-119", assignee: "nicolas", vessel: "FEDERAL BALTIC", voyage: "Voyage 9 · GLC-44872", agency: "Dunkerque", quai: "Terminal de Grande Bretagne", sens: "C", cargo: "Blé fourrager en vrac", tonnage: 32000, client: "Glencore", dest: "Alger, Algérie", eta: "Mer 15 juil · 20h00", stage: "nor",
    specs: { LOA: "186 m", Beam: "28,6 m", DWT: "49 460", Draft: "11,70 m", GT: "27 401", NT: "14 858", Flag: "Chypre", IMO: "9697040" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": true, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [{ t: "Mer 15 juil · 06h10", e: "Vessel arrived on roads" }, { t: "Mer 15 juil · 06h15", e: "NOR tendered" }], alerts: [],
  },
  { id: "eds-2607-120", assignee: "sophie", vessel: "ATLANTIC ROSE", voyage: "Voyage 6 · CBL-20991", agency: "Boulogne-sur-Mer", quai: "Terminal céréales & vrac", sens: "C", cargo: "Orge brassicole en vrac", tonnage: 8500, client: "Soufflet", dest: "Anvers, Belgique", eta: "Jeu 16 juil · 05h30", stage: "ops",
    specs: { LOA: "119 m", Beam: "17 m", DWT: "8 999", Draft: "7,10 m", GT: "6 312", NT: "3 402", Flag: "Pays-Bas", IMO: "9421301" },
    docs: { "Appointment": true, "Proforma D/A": true, "Notice of readiness": true, "Inspection bill": true, "Cargo plan": true, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false },
    events: [{ t: "Mar 14 juil · 22h05", e: "Berthed" }, { t: "Mer 15 juil · 04h30", e: "Loading started" }], alerts: [],
  },
];

/* ============ HELPERS MÉTIER ============ */
const euro = (n) => n.toLocaleString("fr-FR") + " €";
function docPct(docs) { return Object.values(docs).filter(Boolean).length / DOC_LIST.length; }
function etaDom(eta) { const m = /(\d{1,2})\s+juil/.exec(eta || ""); return m ? parseInt(m[1]) : TODAY_DOM; }
function proformaFor(esc) {
  const t = esc.tonnage || 0;
  const loaN = parseInt(esc.specs.LOA) || 120;
  const items = [
    { k: "Droits de port", v: Math.round(t * 0.42) + 1200 },
    { k: "Pilotage (entrée + sortie)", v: Math.round(1400 + loaN * 9) },
    { k: "Remorquage", v: Math.round(2200 + loaN * 11) },
    { k: "Lamanage", v: 940 },
    { k: "Honoraires d'agence", v: Math.round(1800 + t * 0.06) },
    { k: "Débours divers & administratifs", v: 640 },
  ];
  return { items, total: items.reduce((s, i) => s + i.v, 0) };
}
function contactsFor(esc) {
  const parts = esc.client.split("/").map(s => s.trim());
  const dom = (esc.client.toLowerCase().replace(/[^a-z]/g, "") || "client").slice(0, 8);
  return [
    { role: "Affréteur", name: parts[0], mail: `chartering@${dom}.com`, icon: Compass },
    { role: "Armateur", name: parts[1] || parts[0], mail: "ops@owners.com", icon: Ship },
    { role: "Consignataire", name: "Euro Docks Services · " + esc.agency, mail: "ops@eurodocks.com", icon: Anchor },
  ];
}
function laytimeFor(esc) {
  const proj = /project|éolienne/i.test(esc.cargo);
  const cadence = proj ? 1500 : esc.sens === "C" ? 9000 : 6500;
  const allowed = esc.tonnage / cadence;
  const state = esc.stage === "cloture" ? { t: "Décompte clôturé", c: T.green, bg: "#E4F0E9" }
    : esc.stage === "ops" ? { t: "Staries en cours", c: T.amberInk, bg: "#F7EEDD" }
      : { t: "À venir", c: T.blueInk, bg: "#E7F0F9" };
  return { cadence, allowed, state };
}

/* ============ GÉNÉRATION DU STATEMENT OF FACTS (document légal) ============ */
const AGENCY_ADDR = {
  "Rouen": "Port de Rouen · 76000 Rouen · France",
  "Dunkerque": "Terminal de Grande Bretagne · 59140 Dunkerque · France",
  "Boulogne-sur-Mer": "Port de Commerce · 62200 Boulogne-sur-Mer · France",
};
function splitEv(t) { const p = (t || "").split("·").map(s => s.trim()); return { date: p[0] || "", time: p[1] || "" }; }
function esc_(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function sofBody(esc) {
  const parts = (esc.client || "").split("/").map(s => s.trim());
  const charterers = parts[0] || "—";
  const owners = parts[1] || parts[0] || "—";
  const addr = AGENCY_ADDR[esc.agency] || esc.agency;
  const nor = esc.events.find(e => /nor tendered/i.test(e.e));
  const P = [
    ["Vessel", esc.vessel], ["IMO No.", esc.specs.IMO],
    ["Flag", esc.specs.Flag], ["Master", "Capt. —"],
    ["GRT / NRT", `${esc.specs.GT} / ${esc.specs.NT}`], ["LOA / Beam", `${esc.specs.LOA} / ${esc.specs.Beam}`],
    ["DWT", esc.specs.DWT], ["Draft on arrival", esc.specs.Draft],
    ["Port", esc.agency], ["Berth", esc.quai],
    ["Voyage", esc.voyage], ["Operation", esc.sens === "C" ? "Loading" : "Discharging"],
    ["Cargo", esc.cargo], ["Quantity", `${esc.tonnage.toLocaleString("fr-FR")} MT`],
    ["Charterers", charterers], ["Owners", owners],
    ["Agents", `Euro Docks Services · ${esc.agency}`], ["Destination / Origin", esc.dest],
  ];
  let prows = "";
  for (let i = 0; i < P.length; i += 2) {
    const a = P[i], b = P[i + 1] || ["", ""];
    prows += `<tr>
      <td style="border:1px solid #DCE4EB;padding:5px 9px;background:#F4F7FA;font-weight:700;width:16%;">${esc_(a[0])}</td>
      <td style="border:1px solid #DCE4EB;padding:5px 9px;width:34%;">${esc_(a[1])}</td>
      <td style="border:1px solid #DCE4EB;padding:5px 9px;background:#F4F7FA;font-weight:700;width:16%;">${esc_(b[0])}</td>
      <td style="border:1px solid #DCE4EB;padding:5px 9px;width:34%;">${esc_(b[1])}</td></tr>`;
  }
  let erows = esc.events.map(x => {
    const { date, time } = splitEv(x.t);
    const rem = /rain/i.test(x.e) ? "Pluie · stoppage" : /re-tendered/i.test(x.e) ? "Re-tender" : "";
    return `<tr>
      <td style="border:1px solid #C2D0DB;padding:4px 8px;white-space:nowrap;">${esc_(date)}</td>
      <td style="border:1px solid #C2D0DB;padding:4px 8px;white-space:nowrap;">${esc_(time)}</td>
      <td style="border:1px solid #C2D0DB;padding:4px 8px;">${esc_(x.e)}</td>
      <td style="border:1px solid #C2D0DB;padding:4px 8px;color:#5C7386;">${esc_(rem)}</td></tr>`;
  }).join("");
  if (!esc.events.length) erows = `<tr><td colspan="4" style="border:1px solid #C2D0DB;padding:12px;text-align:center;color:#8296A6;">Aucun événement enregistré</td></tr>`;
  return `<div style="width:100%;padding:26px 30px;font-family:Arial,Helvetica,sans-serif;color:#14263A;font-size:12.5px;line-height:1.5;background:#fff;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #0A1B2A;padding-bottom:12px;">
      <div style="display:flex;gap:12px;align-items:center;">
        <img src="/assets/eds-emblem.png" alt="" style="height:50px;width:auto;" />
        <div>
          <div style="font-weight:800;font-size:17px;letter-spacing:.02em;color:#0A1B2A;text-transform:uppercase;">Euro Docks Services</div>
          <div style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#3E7FC1;font-weight:600;">Ship Agents · Agents maritimes</div>
          <div style="font-size:10px;color:#5C7386;margin-top:2px;">${esc_(addr)}</div>
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <div style="border:2px solid #0A1B2A;padding:6px 14px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;font-size:14px;">Statement of Facts</div>
        <div style="font-size:10px;color:#5C7386;margin-top:6px;">Réf. ${esc_(esc.id.toUpperCase())}</div>
        <div style="font-size:10px;color:#5C7386;">Établi le 15 juillet 2026</div>
      </div>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:14px;font-size:12px;">${prows}</table>
    <div style="font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin:16px 0 6px;font-size:12px;color:#0A1B2A;">Chronology of events · Statement of facts</div>
    <table style="width:100%;border-collapse:collapse;font-size:11.5px;">
      <thead><tr style="background:#0A1B2A;color:#fff;">
        <th style="border:1px solid #0A1B2A;padding:6px 8px;text-align:left;">Date</th>
        <th style="border:1px solid #0A1B2A;padding:6px 8px;text-align:left;">Time (LT)</th>
        <th style="border:1px solid #0A1B2A;padding:6px 8px;text-align:left;">Description of events</th>
        <th style="border:1px solid #0A1B2A;padding:6px 8px;text-align:left;">Remarks</th>
      </tr></thead><tbody>${erows}</tbody></table>
    <div style="font-size:10px;color:#5C7386;margin-top:8px;">Notice of Readiness tendered ${nor ? esc_(nor.t) : "—"}. All times local (Europe/Paris). This Statement of Facts is issued without prejudice and subject to the Charter Party terms and conditions.</div>
    <table style="width:100%;margin-top:30px;border-collapse:collapse;">
      <tr>
        <td style="width:31%;padding-top:36px;border-top:1px solid #14263A;text-align:center;font-size:11px;vertical-align:top;">For and on behalf of<br><b>the Master</b><br><span style="color:#8296A6;">Capt. ______________</span></td>
        <td style="width:3.5%;"></td>
        <td style="width:31%;padding-top:36px;border-top:1px solid #14263A;text-align:center;font-size:11px;vertical-align:top;">For and on behalf of<br><b>the Agents</b><br><span style="color:#8296A6;">Euro Docks Services</span></td>
        <td style="width:3.5%;"></td>
        <td style="width:31%;padding-top:36px;border-top:1px solid #14263A;text-align:center;font-size:11px;vertical-align:top;">For and on behalf of<br><b>Charterers / Stevedores</b><br><span style="color:#8296A6;">______________</span></td>
      </tr>
    </table>
    <div style="text-align:center;font-size:9px;color:#8296A6;margin-top:24px;border-top:1px solid #DCE4EB;padding-top:8px;">Euro Docks Services · Ship Agents · ${esc_(addr)} · ops@eurodocks.com · Document généré par le Cockpit Escales</div>
  </div>`;
}
/* --- moteur générique de documents imprimables --- */
function printPage(title, body) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc_(title)}</title>
  <style>@page{size:A4;margin:12mm}*{box-sizing:border-box}html,body{margin:0;padding:0;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}</style>
  </head><body>${body}</body></html>`;
}
function sofPage(esc) { return printPage(`SOF · ${esc.vessel}`, sofBody(esc)); }
function letterhead(esc, title) {
  const addr = AGENCY_ADDR[esc.agency] || esc.agency;
  return `<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #0A1B2A;padding-bottom:12px;">
    <div style="display:flex;gap:12px;align-items:center;"><img src="/assets/eds-emblem.png" alt="" style="height:50px;width:auto;" />
      <div><div style="font-weight:800;font-size:17px;color:#0A1B2A;text-transform:uppercase;">Euro Docks Services</div>
        <div style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#3E7FC1;font-weight:600;">Ship Agents · Agents maritimes</div>
        <div style="font-size:10px;color:#5C7386;margin-top:2px;">${esc_(addr)}</div></div></div>
    <div style="text-align:right;flex-shrink:0;"><div style="border:2px solid #0A1B2A;padding:6px 14px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;font-size:14px;">${esc_(title)}</div>
      <div style="font-size:10px;color:#5C7386;margin-top:6px;">Réf. ${esc_(esc.id.toUpperCase())}</div>
      <div style="font-size:10px;color:#5C7386;">Établi le 15 juillet 2026</div></div></div>`;
}
function row2(l1, v1, l2, v2) {
  return `<tr><td style="border:1px solid #DCE4EB;padding:5px 9px;background:#F4F7FA;font-weight:700;width:16%;">${esc_(l1)}</td>
    <td style="border:1px solid #DCE4EB;padding:5px 9px;width:34%;">${esc_(v1)}</td>
    <td style="border:1px solid #DCE4EB;padding:5px 9px;background:#F4F7FA;font-weight:700;width:16%;">${esc_(l2)}</td>
    <td style="border:1px solid #DCE4EB;padding:5px 9px;width:34%;">${esc_(v2)}</td></tr>`;
}
function sig3(a, b, c) {
  const cell = (x) => `<td style="width:31%;padding-top:36px;border-top:1px solid #14263A;text-align:center;font-size:11px;vertical-align:top;">${x}</td>`;
  return `<table style="width:100%;margin-top:30px;border-collapse:collapse;"><tr>${cell(a)}<td style="width:3.5%;"></td>${cell(b)}<td style="width:3.5%;"></td>${cell(c)}</tr></table>`;
}
function docFooter(esc) {
  const addr = AGENCY_ADDR[esc.agency] || esc.agency;
  return `<div style="text-align:center;font-size:9px;color:#8296A6;margin-top:24px;border-top:1px solid #DCE4EB;padding-top:8px;">Euro Docks Services · Ship Agents · ${esc_(addr)} · ops@eurodocks.com · Document généré par le Cockpit Escales</div>`;
}
const wrap = (inner) => `<div style="width:100%;padding:26px 30px;font-family:Arial,Helvetica,sans-serif;color:#14263A;font-size:12.5px;line-height:1.6;background:#fff;">${inner}</div>`;

function norBody(esc) {
  const op = esc.sens === "C" ? "load" : "discharge";
  const nor = esc.events.find(e => /nor tendered/i.test(e.e));
  const arr = esc.events[0];
  return wrap(`${letterhead(esc, "Notice of Readiness")}
    <div style="margin-top:16px;font-size:11.5px;color:#5C7386;">To: The Master, Owners, Charterers, Shippers / Receivers and all parties concerned</div>
    <p style="margin:14px 0 12px;">Dear Sirs,</p>
    <p style="margin:0 0 12px;">We hereby tender you <b>NOTICE OF READINESS</b> on behalf of the vessel <b>${esc_(esc.vessel)}</b> (IMO ${esc_(esc.specs.IMO)}, ${esc_(esc.specs.Flag)} flag) that the said vessel arrived at the port of <b>${esc_(esc.agency)}</b>${arr ? ` on ${esc_(arr.t)}` : ""} and is in all respects ready to ${op} her cargo of <b>${esc_(esc.cargo)}</b> (${esc_(esc.tonnage.toLocaleString("fr-FR"))} MT) at berth <b>${esc_(esc.quai)}</b>, in accordance with the terms and conditions of the governing Charter Party.</p>
    <p style="margin:0 0 12px;">This Notice of Readiness is tendered${nor ? ` at <b>${esc_(nor.t)}</b>` : ""}; laytime to count as per Charter Party.</p>
    <table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:12px;">
      ${row2("Vessel", esc.vessel, "IMO", esc.specs.IMO)}${row2("Port / Berth", `${esc.agency} · ${esc.quai}`, "Operation", esc.sens === "C" ? "Loading" : "Discharging")}${row2("Cargo", esc.cargo, "Quantity", `${esc.tonnage.toLocaleString("fr-FR")} MT`)}
    </table>
    ${sig3("For and on behalf of<br><b>the Master</b><br><span style='color:#8296A6;'>Capt. ____________</span>", "Tendered by<br><b>the Agents</b><br><span style='color:#8296A6;'>Euro Docks Services</span>", "Accepted by<br><b>Charterers / Receivers</b><br><span style='color:#8296A6;'>Date / Time: _______</span>")}
    ${docFooter(esc)}`);
}
function protestBody(esc) {
  const reason = (esc.alerts[0] && esc.alerts[0].t) || "les retards et interruptions d'opérations indépendants de la volonté du navire et de ses agents";
  return wrap(`${letterhead(esc, "Letter of Protest")}
    <div style="margin-top:16px;font-size:11.5px;color:#5C7386;">To: Charterers / Shippers / Receivers / Terminal and all parties concerned</div>
    <p style="margin:14px 0 12px;">Dear Sirs,</p>
    <p style="margin:0 0 10px;">We, <b>Euro Docks Services</b>, acting solely as agents for and on behalf of the Master and Owners of the vessel <b>${esc_(esc.vessel)}</b> (IMO ${esc_(esc.specs.IMO)}) currently at <b>${esc_(esc.quai)}, ${esc_(esc.agency)}</b>, hereby lodge on their behalf the present <b>LETTER OF PROTEST</b> concerning:</p>
    <div style="border:1px solid #EAD9B4;background:#FBF3E4;padding:12px 14px;margin:8px 0 12px;font-weight:600;color:#7A5A1E;">${esc_(reason)}</div>
    <p style="margin:0 0 12px;">All resulting time losses, costs and consequences are to be for account of whom it may concern and shall be taken into account in the laytime / demurrage calculation. This protest is issued without prejudice to the Owners' and Master's rights under the Charter Party.</p>
    <table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:12px;">${row2("Vessel", esc.vessel, "Berth", esc.quai)}${row2("Cargo", esc.cargo, "Quantity", `${esc.tonnage.toLocaleString("fr-FR")} MT`)}</table>
    ${sig3("For and on behalf of<br><b>the Master</b><br><span style='color:#8296A6;'>Capt. ____________</span>", "For and on behalf of<br><b>the Agents</b><br><span style='color:#8296A6;'>Euro Docks Services</span>", "Acknowledged by<br><b>Charterers / Terminal</b>")}
    ${docFooter(esc)}`);
}
function proformaBody(esc) {
  const pf = proformaFor(esc);
  const rows = pf.items.map(it => `<tr><td style="border:1px solid #DCE4EB;padding:8px 12px;">${esc_(it.k)}</td><td style="border:1px solid #DCE4EB;padding:8px 12px;text-align:right;font-weight:600;">${esc_(euro(it.v))}</td></tr>`).join("");
  return wrap(`${letterhead(esc, "Proforma D/A")}
    <table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:12px;">${row2("Vessel", esc.vessel, "IMO", esc.specs.IMO)}${row2("Port / Berth", `${esc.agency} · ${esc.quai}`, "Operation", esc.sens === "C" ? "Loading" : "Discharging")}${row2("Cargo", esc.cargo, "Quantity", `${esc.tonnage.toLocaleString("fr-FR")} MT`)}</table>
    <div style="font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin:10px 0 6px;font-size:12px;color:#0A1B2A;">Estimated disbursements</div>
    <table style="width:100%;border-collapse:collapse;font-size:12.5px;">
      <thead><tr style="background:#0A1B2A;color:#fff;"><th style="border:1px solid #0A1B2A;padding:7px 12px;text-align:left;">Description</th><th style="border:1px solid #0A1B2A;padding:7px 12px;text-align:right;">Amount (EUR)</th></tr></thead>
      <tbody>${rows}<tr><td style="border:1px solid #0A1B2A;padding:9px 12px;background:#0A1B2A;color:#fff;font-weight:800;text-transform:uppercase;">Total estimated D/A</td><td style="border:1px solid #0A1B2A;padding:9px 12px;background:#0A1B2A;color:#8FBCE8;text-align:right;font-weight:800;font-size:15px;">${esc_(euro(pf.total))}</td></tr></tbody></table>
    <p style="font-size:11px;color:#5C7386;margin:12px 0;">Barème estimatif établi sur le tonnage et le gabarit du navire. Fonds en avance (funds in advance) requis avant l'arrivée. Le décompte final (Final D/A) intégrera les débours réels justifiés.</p>
    ${sig3("Prepared by<br><b>the Agents</b><br><span style='color:#8296A6;'>Euro Docks Services</span>", "For<br><b>the Owners / Charterers</b>", "Date<br><span style='color:#8296A6;'>15 / 07 / 2026</span>")}
    ${docFooter(esc)}`);
}
function trackUrl(esc, provider) {
  const imo = (esc.specs.IMO || "").replace(/\D/g, "");
  if (provider === "vf") return imo ? `https://www.vesselfinder.com/vessels/details/${imo}` : "https://www.vesselfinder.com";
  return imo ? `https://www.marinetraffic.com/en/ais/details/ships/imo:${imo}` : "https://www.marinetraffic.com";
}

/* ============ STYLES ============ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
*{box-sizing:border-box}
.eds-root{font-family:'Inter',system-ui,sans-serif;color:${T.ink};background:${T.bg};min-height:100vh;display:flex}
.eds-root{background:linear-gradient(180deg,#EEF2F6 0%,${T.bg} 240px)}
.dsp{font-family:'Barlow Condensed','Inter',sans-serif;text-transform:uppercase;letter-spacing:.02em}
.num{font-variant-numeric:tabular-nums}
::selection{background:${T.blue};color:#fff}

.side{width:232px;min-width:232px;background:${T.navy};color:#fff;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;box-shadow:2px 0 24px rgba(10,27,42,.18)}
.side-sec{font-family:'Inter';font-size:9.5px;letter-spacing:.16em;color:${T.skyDim};text-transform:uppercase;font-weight:600;padding:16px 20px 6px}
.nav-item{display:flex;align-items:center;gap:11px;padding:9px 20px;font-size:13.5px;color:#9FB4C6;cursor:pointer;border-left:3px solid transparent;transition:.15s;background:none;border-top:none;border-right:none;border-bottom:none;width:100%;text-align:left;font-family:'Inter'}
.nav-item:hover{color:#fff;background:rgba(255,255,255,.05)}
.nav-item.on{color:#fff;border-left-color:${T.blue};background:linear-gradient(90deg,rgba(62,127,193,.22),rgba(62,127,193,.04))}
.nav-item .cnt{margin-left:auto;font-size:11px;font-weight:700;background:rgba(255,255,255,.1);border-radius:7px;padding:1px 7px;color:#CFE0EE}
.nav-item.on .cnt{background:${T.blue};color:#fff}

.main{flex:1;min-width:0;display:flex;flex-direction:column}
.top{background:rgba(255,255,255,.85);backdrop-filter:blur(12px);border-bottom:1px solid ${T.line};padding:13px 24px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;position:sticky;top:0;z-index:30}
.searchbox{display:flex;align-items:center;gap:8px;border:1px solid ${T.line};border-radius:10px;padding:8px 11px;background:#fff;transition:border-color .15s, box-shadow .15s}
.searchbox:focus-within{border-color:${T.blue};box-shadow:0 0 0 3px rgba(62,127,193,.14)}
.searchbox input{border:none;outline:none;font-size:13px;font-family:'Inter';width:150px;background:transparent;color:${T.ink}}
.kbd{font-family:'Inter';font-size:10px;font-weight:600;color:${T.faint};border:1px solid ${T.line};border-radius:5px;padding:1px 5px;background:${T.bg2}}
.sel{border:1px solid ${T.line};border-radius:10px;padding:9px 11px;font-size:13px;font-weight:600;color:${T.navy};background:#fff;font-family:'Inter';cursor:pointer;transition:border-color .15s}
.sel:hover{border-color:${T.blueSoft,T.blue}}
.iconbtn{position:relative;border:1px solid ${T.line};border-radius:10px;padding:9px;background:#fff;cursor:pointer;display:flex;transition:.15s}
.iconbtn:hover{border-color:#C4D3E0;background:${T.bg2}}
.btn{display:inline-flex;align-items:center;gap:7px;border:none;cursor:pointer;border-radius:9px;font-weight:600;font-size:13px;padding:9px 15px;transition:transform .12s,filter .15s,box-shadow .15s;font-family:'Inter'}
.btn:active{transform:scale(.97)}
.btn.pri{background:${T.blue};color:#fff;box-shadow:0 4px 12px rgba(62,127,193,.28)}
.btn.pri:hover{filter:brightness(1.06);box-shadow:0 6px 16px rgba(62,127,193,.34)}
.btn.dark{background:${T.navy};color:#fff}
.btn.ghost{background:${T.bg2};color:${T.ink};border:1px solid ${T.line}}
.btn.ghost:hover{background:#fff;border-color:#C4D3E0}

.card{background:#fff;border:1px solid ${T.line};border-radius:14px}
.kpi{background:#fff;border:1px solid ${T.line};border-radius:14px;padding:15px 17px;box-shadow:${T.sh1};transition:transform .18s,box-shadow .18s}
.kpi:hover{transform:translateY(-2px);box-shadow:${T.sh2}}

.kan{display:flex;gap:14px;padding:4px 24px 26px;overflow-x:auto;align-items:flex-start}
.kan::-webkit-scrollbar{height:9px}.kan::-webkit-scrollbar-thumb{background:#C7D3DD;border-radius:9px}
.col{min-width:272px;width:272px;flex:0 0 auto}
.ecard{background:#fff;border:1px solid ${T.line};border-radius:12px;cursor:pointer;overflow:hidden;display:flex;opacity:0;transform:translateY(8px);
  animation:in .32s cubic-bezier(.23,1,.32,1) forwards;transition:transform .18s cubic-bezier(.23,1,.32,1),box-shadow .18s,border-color .18s;box-shadow:${T.sh1}}
.ecard:hover{transform:translateY(-3px);box-shadow:${T.sh2};border-color:#C4D3E0}
.ecard:active{transform:scale(.99)}
@keyframes in{to{opacity:1;transform:translateY(0)}}

.tw{overflow-x:auto;border:1px solid ${T.line};border-radius:14px;background:#fff;box-shadow:${T.sh1}}
.tw::-webkit-scrollbar{height:9px}.tw::-webkit-scrollbar-thumb{background:#C7D3DD;border-radius:9px}
table.tab{width:100%;border-collapse:collapse;font-size:13px;min-width:1000px}
table.tab thead th{position:sticky;top:0;background:${T.navy};color:#DCE7F1;font-family:'Barlow Condensed';text-transform:uppercase;letter-spacing:.03em;font-weight:700;font-size:12px;text-align:left;padding:11px 13px;white-space:nowrap;z-index:2}
table.tab thead th.s{cursor:pointer;user-select:none}
table.tab thead th.s:hover{color:#fff}
table.tab thead th.rt{text-align:right}
table.tab tbody td{padding:11px 13px;border-bottom:1px solid ${T.lineSoft};vertical-align:middle}
table.tab tbody tr.clk{cursor:pointer;transition:background .12s}
table.tab tbody tr.clk:hover{background:#F1F6FB}
table.tab tbody tr:last-child td{border-bottom:none}

.drv{position:fixed;inset:0;background:rgba(10,27,42,.5);z-index:40;backdrop-filter:blur(2px);animation:fade .2s ease-out forwards}
@keyframes fade{from{opacity:0}to{opacity:1}}
.drw{position:fixed;top:0;right:0;height:100vh;width:560px;max-width:100vw;background:${T.bg2};z-index:50;box-shadow:-18px 0 60px rgba(10,27,42,.3);display:flex;flex-direction:column;transform:translateX(30px);opacity:0;animation:slide .28s cubic-bezier(.32,.72,0,1) forwards}
@keyframes slide{to{transform:translateX(0);opacity:1}}
.tabs{display:flex;gap:2px;padding:0 20px;background:${T.navy};border-top:1px solid rgba(255,255,255,.06)}
.tab-b{padding:11px 13px;font-size:12.5px;font-weight:600;color:#8FA6B8;cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;font-family:'Inter';transition:.15s}
.tab-b:hover{color:#DCE7F1}
.tab-b.on{color:#fff;border-bottom-color:${T.blue}}
.scroll::-webkit-scrollbar{width:9px}.scroll::-webkit-scrollbar-thumb{background:#C7D3DD;border-radius:9px}
.doc{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;cursor:pointer;transition:background .15s}
.doc:hover{background:#EEF3F8}

.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(8px);background:${T.navy};color:#fff;padding:12px 18px;border-radius:11px;font-size:13.5px;z-index:90;display:flex;gap:9px;align-items:center;opacity:0;animation:tst .25s cubic-bezier(.23,1,.32,1) forwards;box-shadow:${T.sh3}}
@keyframes tst{to{opacity:1;transform:translateX(-50%) translateY(0)}}
.pop{position:absolute;top:48px;right:0;width:340px;background:#fff;border:1px solid ${T.line};border-radius:14px;box-shadow:${T.sh3};z-index:60;overflow:hidden;animation:pin .18s ease-out forwards;transform-origin:top right}
@keyframes pin{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}

.modv{position:fixed;inset:0;background:rgba(10,27,42,.52);z-index:70;display:flex;align-items:flex-start;justify-content:center;padding:44px 16px;overflow-y:auto;backdrop-filter:blur(2px);animation:fade .18s ease-out forwards}
.mod{background:#fff;width:600px;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:${T.sh3};transform:translateY(12px);opacity:0;animation:up .24s cubic-bezier(.23,1,.32,1) forwards}
@keyframes up{to{transform:translateY(0);opacity:1}}
.fld label{display:block;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:${T.blueInk};margin-bottom:5px}
.inp{width:100%;border:1px solid ${T.line};border-radius:9px;padding:9px 11px;font-size:13.5px;font-family:'Inter';color:${T.ink};background:#fff;outline:none;transition:border-color .15s,box-shadow .15s}
.inp:focus{border-color:${T.blue};box-shadow:0 0 0 3px rgba(62,127,193,.14)}

.gantt{overflow-x:auto;border:1px solid ${T.line};border-radius:14px;background:#fff;box-shadow:${T.sh1}}
.gbar{position:absolute;height:26px;border-radius:7px;display:flex;align-items:center;padding:0 8px;color:#fff;font-size:11px;font-weight:600;overflow:hidden;white-space:nowrap;cursor:pointer;box-shadow:0 2px 6px rgba(10,27,42,.18);transition:transform .15s,box-shadow .15s}
.gbar:hover{transform:translateY(-1px);box-shadow:0 6px 14px rgba(10,27,42,.28)}

:focus-visible{outline:2px solid ${T.blue};outline-offset:2px;border-radius:5px}
@media (max-width:960px){.side{display:none}.drw{width:100vw}}
@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition:none!important}}
`;

/* ============ PETITS COMPOSANTS ============ */
function Avatar({ id, size = 22 }) {
  const m = id ? MEMBER[id] : null;
  if (!m) return <span title="Non attribué" style={{ width: size, height: size, borderRadius: size, border: "1.5px dashed #B9C7D3", color: "#9DB0BF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.5, flexShrink: 0 }}>?</span>;
  return <span className="dsp" title={`${m.name} · ${m.role}`} style={{ width: size, height: size, borderRadius: size, background: m.color, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.44, fontWeight: 700, flexShrink: 0, letterSpacing: 0, boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.18)" }}>{m.initials}</span>;
}
function StagePill({ stage }) {
  const m = STAGE_META[stage];
  return <span className="dsp" style={{ display: "inline-block", fontWeight: 700, fontSize: 12, padding: "2px 9px", borderRadius: 999, color: m.color, background: m.bg, whiteSpace: "nowrap" }}>{m.short}</span>;
}
function DocsMini({ docs }) {
  const done = Object.values(docs).filter(Boolean).length, pct = done / DOC_LIST.length;
  return <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
    <div style={{ width: 48, height: 6, borderRadius: 4, background: "#E3EAF0", overflow: "hidden", flexShrink: 0 }}>
      <div style={{ width: `${pct * 100}%`, height: "100%", background: pct === 1 ? T.green : T.blue, transition: "width .3s" }} /></div>
    <span className="num" style={{ fontSize: 12, color: T.muted }}>{done}/8</span>
  </div>;
}
function DraftGauge({ pct }) {
  const marks = 7;
  return <div style={{ width: 24, background: T.navy, position: "relative", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }} title={`Avancement doc. · ${Math.round(pct * 100)}%`}>
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "6px 0" }}>
      {Array.from({ length: marks }).map((_, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 3, paddingLeft: 4 }}>
        <div style={{ width: i % 2 === 0 ? 7 : 4, height: 1.5, background: "rgba(255,255,255,.5)" }} />
        {i % 2 === 0 && <span style={{ fontSize: 6, color: "rgba(255,255,255,.5)", fontFamily: "'Barlow Condensed'", lineHeight: 1 }}>{(marks - i) * 2}</span>}
      </div>)}
    </div>
    <div style={{ height: `${Math.max(pct * 100, 6)}%`, background: `linear-gradient(180deg,${T.blue},#2C5E93)`, transition: "height .4s cubic-bezier(.23,1,.32,1)", opacity: .92 }} />
  </div>;
}
function Spark({ data, color }) {
  const max = Math.max(...data, 1), w = 62, h = 22, step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - (v / max) * (h - 3) - 1}`).join(" ");
  return <svg width={w} height={h} style={{ display: "block" }} aria-hidden="true">
    <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={(data.length - 1) * step} cy={h - (data[data.length - 1] / max) * (h - 3) - 1} r="2.4" fill={color} />
  </svg>;
}

/* ============ CARTE KANBAN ============ */
function EscaleCard({ esc, onOpen, delay }) {
  return <div className="ecard" style={{ animationDelay: `${delay * 45}ms` }} onClick={() => onOpen(esc.id)}>
    <DraftGauge pct={docPct(esc.docs)} />
    <div style={{ padding: "11px 13px", flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div className="dsp" style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.05 }}>{esc.vessel}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          {esc.alerts.length > 0 && <AlertTriangle size={14} color={esc.alerts.some(a => a.sev === "crit") ? T.red : T.amber} style={{ marginTop: 1 }} />}
          <Avatar id={esc.assignee} size={22} />
        </div>
      </div>
      <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{esc.voyage}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8, fontSize: 12 }}><MapPin size={12} color={T.blue} /><span style={{ fontWeight: 600 }}>{esc.quai}</span><span style={{ color: T.muted }}>· {esc.agency}</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4, fontSize: 12, color: T.ink }}><Package size={12} color={T.blue} /><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><b>{esc.sens} :</b> {esc.tonnage.toLocaleString("fr-FR")} t · {esc.cargo}</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 9, paddingTop: 8, borderTop: `1px solid ${T.lineSoft}` }}>
        <span style={{ fontSize: 11, color: T.muted }}>{esc.client}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: esc.eta === "À quai" ? T.green : T.ink, display: "flex", alignItems: "center", gap: 4 }}><CalendarClock size={11} /> {esc.eta}</span>
      </div>
    </div>
  </div>;
}

/* ============ GRAND TABLEAU ============ */
function BoardTable({ list, onOpen, sort, setSort }) {
  const cols = [
    { k: "vessel", label: "Navire", s: true }, { k: "agency", label: "Agence", s: true },
    { k: "quai", label: "Quai", s: true }, { k: "cargo", label: "Sens · Cargaison" },
    { k: "tonnage", label: "Tonnage", s: true, rt: true }, { k: "client", label: "Client / Armateur", s: true },
    { k: "eta", label: "ETA / ETB" }, { k: "assignee", label: "Attribué à", s: true },
    { k: "stage", label: "Étape", s: true }, { k: "docs", label: "Documents" },
  ];
  const onS = (k) => setSort(s => ({ key: k, dir: s.key === k && s.dir === "asc" ? "desc" : "asc" }));
  return <div className="tw"><table className="tab"><thead><tr>
    {cols.map(c => <th key={c.k} className={`${c.s ? "s" : ""} ${c.rt ? "rt" : ""}`} onClick={c.s ? () => onS(c.k) : undefined}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{c.label}{c.s && <ArrowUpDown size={11} style={{ opacity: sort.key === c.k ? 1 : .4 }} />}</span></th>)}
  </tr></thead><tbody>
    {list.map(esc => <tr key={esc.id} className="clk" onClick={() => onOpen(esc.id)}>
      <td><div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ width: 4, height: 30, borderRadius: 3, background: STAGE_META[esc.stage].bar, flexShrink: 0 }} />
        {esc.alerts.length > 0 && <AlertTriangle size={13} color={esc.alerts.some(a => a.sev === "crit") ? T.red : T.amber} style={{ flexShrink: 0 }} />}
        <div><div className="dsp" style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.05 }}>{esc.vessel}</div><div style={{ fontSize: 10.5, color: T.muted }}>{esc.voyage}</div></div>
      </div></td>
      <td style={{ color: T.ink }}>{esc.agency}</td>
      <td><span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600 }}><MapPin size={12} color={T.blue} />{esc.quai}</span></td>
      <td style={{ maxWidth: 220 }}><span style={{ display: "inline-block", fontSize: 10.5, fontWeight: 700, color: esc.sens === "C" ? T.blue : T.amberInk, background: esc.sens === "C" ? "#E7F0F9" : "#F7EEDD", borderRadius: 5, padding: "1px 6px", marginRight: 6 }}>{esc.sens === "C" ? "CHARGT" : "DÉCHARGT"}</span><span style={{ color: T.ink }}>{esc.cargo}</span></td>
      <td className="rt num" style={{ textAlign: "right", fontWeight: 600 }}>{esc.tonnage.toLocaleString("fr-FR")} t</td>
      <td style={{ color: T.muted }}>{esc.client}</td>
      <td><span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: esc.eta === "À quai" ? T.green : T.ink, fontWeight: esc.eta === "À quai" ? 700 : 500 }}><Clock size={12} />{esc.eta}</span></td>
      <td>{esc.assignee ? <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Avatar id={esc.assignee} size={22} /><span style={{ color: T.ink, fontWeight: 500 }}>{MEMBER[esc.assignee].name}</span></span> : <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><Avatar id={null} size={22} /><span style={{ color: "#9DB0BF" }}>Non attribué</span></span>}</td>
      <td><StagePill stage={esc.stage} /></td>
      <td><DocsMini docs={esc.docs} /></td>
    </tr>)}
    {list.length === 0 && <tr><td colSpan={10} style={{ textAlign: "center", color: T.muted, padding: "26px 0" }}>Aucune escale ne correspond au filtre.</td></tr>}
  </tbody></table></div>;
}

/* ============ PLANNING (GANTT) ============ */
function PlanningView({ list, onOpen }) {
  const rows = [];
  Object.entries(QUAIS).forEach(([agency, quais]) => quais.forEach(q => {
    const here = list.filter(e => e.agency === agency && e.quai === q);
    rows.push({ agency, quai: q, here });
  }));
  const barFor = (e) => {
    const start = etaDom(e.eta === "À quai" ? "" : e.eta);
    const s = Math.max(WEEK[0].dom, Math.min(start, WEEK[WEEK.length - 1].dom));
    const dur = /project|éolienne/i.test(e.cargo) ? 1 : e.stage === "ops" ? 3 : e.sens === "C" ? 2 : 1;
    const left = ((s - WEEK[0].dom) / WEEK.length) * 100;
    const width = Math.min((dur / WEEK.length) * 100, 100 - left);
    return { left, width };
  };
  const todayLeft = ((TODAY_DOM - WEEK[0].dom + 0.5) / WEEK.length) * 100;
  return <div style={{ padding: "6px 24px 26px" }}>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
      <div style={{ flex: "1 1 320px", background: T.navy, borderRadius: 14, padding: "16px 20px", color: "#fff", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}><Waves size={19} color={T.sky} /><div><div className="dsp" style={{ fontWeight: 700, fontSize: 15 }}>Marées · Rouen</div><div style={{ fontSize: 11, color: T.sky }}>Mer 15 juillet 2026</div></div></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{TIDES.map(t => <div key={t.t} style={{ background: "rgba(255,255,255,.07)", borderRadius: 9, padding: "7px 11px" }}>
          <div style={{ fontSize: 9, color: t.type === "haute" ? T.sky : "#9FB6C8", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 600 }}>{t.type}</div>
          <div className="dsp num" style={{ fontSize: 18, fontWeight: 800 }}>{t.t}</div></div>)}</div>
      </div>
    </div>
    <div className="gantt">
      <div style={{ minWidth: 820 }}>
        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderBottom: `1px solid ${T.line}`, background: T.navy, color: "#DCE7F1" }}>
          <div className="dsp" style={{ padding: "10px 14px", fontSize: 12, fontWeight: 700, letterSpacing: ".03em" }}>Quai</div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${WEEK.length},1fr)` }}>
            {WEEK.map(d => <div key={d.dom} className="dsp" style={{ padding: "10px 6px", fontSize: 12, fontWeight: 700, textAlign: "center", borderLeft: "1px solid rgba(255,255,255,.08)", background: d.dom === TODAY_DOM ? "rgba(62,127,193,.28)" : "transparent" }}>{d.dow} {d.dom}</div>)}
          </div>
        </div>
        {rows.map((r, ri) => <div key={r.quai} style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderBottom: `1px solid ${T.lineSoft}`, background: ri % 2 ? "#FAFCFE" : "#fff" }}>
          <div style={{ padding: "12px 14px" }}><div style={{ fontWeight: 600, fontSize: 13, color: T.ink }}>{r.quai}</div><div style={{ fontSize: 10.5, color: T.muted }}>{r.agency}</div></div>
          <div style={{ position: "relative", minHeight: 46, borderLeft: `1px solid ${T.lineSoft}` }}>
            <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: `repeat(${WEEK.length},1fr)` }}>{WEEK.map(d => <div key={d.dom} style={{ borderLeft: `1px solid ${T.lineSoft}`, background: d.dom === TODAY_DOM ? "rgba(62,127,193,.06)" : "transparent" }} />)}</div>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: `${todayLeft}%`, width: 2, background: "rgba(192,69,47,.5)" }} />
            {r.here.map((e, i) => { const b = barFor(e); return <div key={e.id} className="gbar" onClick={() => onOpen(e.id)} title={`${e.vessel} · ${e.eta}`} style={{ top: 10 + i * 30, left: `${b.left}%`, width: `${b.width}%`, background: STAGE_META[e.stage].bar }}>{e.vessel}</div>; })}
          </div>
        </div>)}
      </div>
    </div>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12, fontSize: 11.5, color: T.muted }}>
      {STAGES.map(s => <span key={s.id} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 8, borderRadius: 3, background: STAGE_META[s.id].bar }} />{s.label}</span>)}
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 2, height: 12, background: "rgba(192,69,47,.6)" }} />Aujourd'hui</span>
    </div>
  </div>;
}

/* ============ VUES SIMPLES ============ */
function DocsView({ list, onOpen }) {
  const rows = [...list].sort((a, b) => docPct(a.docs) - docPct(b.docs));
  return <div style={{ padding: "6px 24px 26px" }}>
    <p style={{ fontSize: 13.5, color: T.muted, margin: "0 0 14px", maxWidth: 620 }}>Suivi documentaire de chaque escale, du moins complet au plus complet. Les pièces manquantes sont signalées — plus aucune ne passe entre les mailles.</p>
    <div className="tw"><table className="tab"><thead><tr><th>Navire</th><th>Étape</th><th>Avancement</th><th>Pièces manquantes</th></tr></thead><tbody>
      {rows.map(esc => { const miss = DOC_LIST.filter(d => !esc.docs[d]); return <tr key={esc.id} className="clk" onClick={() => onOpen(esc.id)}>
        <td><div className="dsp" style={{ fontWeight: 700, fontSize: 14.5 }}>{esc.vessel}</div><div style={{ fontSize: 10.5, color: T.muted }}>{esc.agency} · {esc.quai}</div></td>
        <td><StagePill stage={esc.stage} /></td><td><DocsMini docs={esc.docs} /></td>
        <td>{miss.length === 0 ? <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: T.green, fontWeight: 600, fontSize: 12 }}><Check size={13} />Dossier complet</span> : <span style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{miss.map(d => <span key={d} style={{ fontSize: 10.5, color: T.red, background: "#F6E3DF", borderRadius: 5, padding: "1px 7px" }}>{d}</span>)}</span>}</td>
      </tr>; })}
    </tbody></table></div></div>;
}
function ClientsView({ list }) {
  const map = {};
  list.forEach(e => { if (!map[e.client]) map[e.client] = { client: e.client, count: 0, tonnage: 0, vessels: [] }; map[e.client].count++; map[e.client].tonnage += e.tonnage; map[e.client].vessels.push(e.vessel); });
  const rows = Object.values(map).sort((a, b) => b.tonnage - a.tonnage);
  return <div style={{ padding: "6px 24px 26px" }}>
    <p style={{ fontSize: 13.5, color: T.muted, margin: "0 0 14px", maxWidth: 620 }}>Vos armateurs et affréteurs, classés par tonnage engagé. La mémoire commerciale que le tableau de bureau ne garde jamais.</p>
    <div className="tw"><table className="tab"><thead><tr><th>Client / Armateur</th><th className="rt">Escales</th><th className="rt">Tonnage engagé</th><th>Navires</th></tr></thead><tbody>
      {rows.map(r => <tr key={r.client}><td><span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 600 }}><Building2 size={14} color={T.blue} />{r.client}</span></td>
        <td className="rt num" style={{ textAlign: "right" }}>{r.count}</td><td className="rt num" style={{ textAlign: "right", fontWeight: 700 }}>{r.tonnage.toLocaleString("fr-FR")} t</td>
        <td style={{ color: T.muted, fontSize: 12 }}>{r.vessels.join(" · ")}</td></tr>)}
    </tbody></table></div></div>;
}
function FactuView({ list, onOpen }) {
  const rows = list.filter(e => e.stage === "ops" || e.stage === "cloture");
  const bill = (e) => e.docs["Bill of lading"] && e.docs["Statement of facts"] ? { t: "À facturer", c: T.green, bg: "#E4F0E9" } : e.stage === "cloture" ? { t: "Docs en attente", c: T.amberInk, bg: "#F7EEDD" } : { t: "En opération", c: T.blueInk, bg: "#E7F0F9" };
  const yn = (v) => v ? <Check size={15} color={T.green} /> : <X size={14} color="#C4D3E0" />;
  return <div style={{ padding: "6px 24px 26px" }}>
    <p style={{ fontSize: 13.5, color: T.muted, margin: "0 0 14px", maxWidth: 620 }}>Escales en fin de cycle et leur état de facturation D/A. SOF + B/L émis → la facturation part, la trésorerie n'attend plus.</p>
    <div className="tw"><table className="tab"><thead><tr><th>Navire</th><th>Agence</th><th className="rt">Tonnage</th><th className="rt">Proforma D/A</th><th>SOF</th><th>B/L</th><th>Statut</th></tr></thead><tbody>
      {rows.map(esc => { const st = bill(esc), pf = proformaFor(esc); return <tr key={esc.id} className="clk" onClick={() => onOpen(esc.id)}>
        <td><div className="dsp" style={{ fontWeight: 700, fontSize: 14.5 }}>{esc.vessel}</div><div style={{ fontSize: 10.5, color: T.muted }}>{esc.client}</div></td>
        <td style={{ color: T.muted }}>{esc.agency}</td><td className="rt num" style={{ textAlign: "right", fontWeight: 600 }}>{esc.tonnage.toLocaleString("fr-FR")} t</td>
        <td className="rt num" style={{ textAlign: "right", fontWeight: 700, color: T.navy }}>{euro(pf.total)}</td>
        <td>{yn(esc.docs["Statement of facts"])}</td><td>{yn(esc.docs["Bill of lading"])}</td>
        <td><span className="dsp" style={{ fontWeight: 700, fontSize: 12, padding: "2px 9px", borderRadius: 999, color: st.c, background: st.bg }}>{st.t}</span></td>
      </tr>; })}
      {rows.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", color: T.muted, padding: "26px 0" }}>Aucune escale en fin de cycle.</td></tr>}
    </tbody></table></div></div>;
}

/* ============ MODALE NOUVELLE ESCALE ============ */
function NewEscaleModal({ onClose, onCreate, notify }) {
  const [f, setF] = useState({ vessel: "", agency: "Rouen", quai: "Socomac", sens: "C", cargo: "", tonnage: "", client: "", dest: "", eta: "", stage: "appointment", assignee: "", LOA: "", DWT: "", Draft: "" });
  const up = (k, v) => setF(s => ({ ...s, [k]: v }));
  const submit = (e) => {
    e.preventDefault(); if (!f.vessel.trim()) return;
    onCreate({ id: "eds-new-" + Math.round(performance.now()), vessel: f.vessel.toUpperCase(), voyage: "Nouvelle escale", agency: f.agency, quai: f.quai, sens: f.sens, cargo: f.cargo || "À préciser", tonnage: Number(f.tonnage) || 0, client: f.client || "À préciser", dest: f.dest || "—", eta: f.eta || "À planifier", stage: f.stage, assignee: f.assignee || null,
      specs: { LOA: f.LOA || "—", Beam: "—", DWT: f.DWT || "—", Draft: f.Draft || "—", GT: "—", NT: "—", Flag: "—", IMO: "—" },
      docs: { "Appointment": true, "Proforma D/A": false, "Notice of readiness": false, "Inspection bill": false, "Cargo plan": false, "Statement of facts": false, "Cargo manifest": false, "Bill of lading": false }, events: [], alerts: [] });
    notify("Nouvelle escale créée"); onClose();
  };
  return <div className="modv" onClick={onClose}><div className="mod" onClick={e => e.stopPropagation()}>
    <div style={{ background: T.navy, color: "#fff", padding: "16px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div><div style={{ fontSize: 11, color: T.sky, letterSpacing: ".08em", fontWeight: 600 }}>CRÉER UNE ESCALE</div><div className="dsp" style={{ fontSize: 22, fontWeight: 800, lineHeight: 1, marginTop: 3 }}>Nouvelle escale</div></div>
      <button onClick={onClose} className="btn" style={{ background: "rgba(255,255,255,.1)", color: "#fff", padding: 8 }} aria-label="Fermer"><X size={16} /></button>
    </div>
    <form onSubmit={submit} style={{ padding: "18px 22px 22px", display: "flex", flexDirection: "column", gap: 13 }}>
      <div className="fld"><label>Nom du navire *</label><input className="inp" value={f.vessel} onChange={e => up("vessel", e.target.value)} placeholder="ex. Federal Rhine" required autoFocus /></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
        <div className="fld"><label>Agence</label><select className="inp" value={f.agency} onChange={e => { const a = e.target.value; up("agency", a); up("quai", (QUAIS[a] || [""])[0]); }}>{AGENCIES.slice(1).map(a => <option key={a}>{a}</option>)}</select></div>
        <div className="fld"><label>Quai</label><select className="inp" value={f.quai} onChange={e => up("quai", e.target.value)}>{(QUAIS[f.agency] || []).map(q => <option key={q}>{q}</option>)}</select></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 13 }}>
        <div className="fld"><label>Sens</label><select className="inp" value={f.sens} onChange={e => up("sens", e.target.value)}><option value="C">Chargement</option><option value="D">Déchargement</option></select></div>
        <div className="fld"><label>Cargaison</label><input className="inp" value={f.cargo} onChange={e => up("cargo", e.target.value)} placeholder="ex. Blé meunier en vrac" /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 13 }}>
        <div className="fld"><label>Tonnage (t)</label><input className="inp num" type="number" value={f.tonnage} onChange={e => up("tonnage", e.target.value)} placeholder="30000" /></div>
        <div className="fld"><label>Client / Armateur</label><input className="inp" value={f.client} onChange={e => up("client", e.target.value)} placeholder="ex. Cargill" /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 13 }}>
        <div className="fld"><label>Destination / Origine</label><input className="inp" value={f.dest} onChange={e => up("dest", e.target.value)} placeholder="ex. Casablanca, Maroc" /></div>
        <div className="fld"><label>ETA</label><input className="inp" value={f.eta} onChange={e => up("eta", e.target.value)} placeholder="Ven 18 juil · 06h00" /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>
        <div className="fld"><label>Étape initiale</label><select className="inp" value={f.stage} onChange={e => up("stage", e.target.value)}>{STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
        <div className="fld"><label>Attribué à</label><select className="inp" value={f.assignee} onChange={e => up("assignee", e.target.value)}><option value="">Non attribué</option>{TEAM.map(m => <option key={m.id} value={m.id}>{m.name} — {m.role}</option>)}</select></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 13 }}>
        <div className="fld"><label>LOA</label><input className="inp" value={f.LOA} onChange={e => up("LOA", e.target.value)} placeholder="180 m" /></div>
        <div className="fld"><label>DWT</label><input className="inp num" value={f.DWT} onChange={e => up("DWT", e.target.value)} placeholder="50 000" /></div>
        <div className="fld"><label>Tirant d'eau</label><input className="inp" value={f.Draft} onChange={e => up("Draft", e.target.value)} placeholder="11,9 m" /></div>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
        <button type="button" onClick={onClose} className="btn ghost">Annuler</button>
        <button type="submit" className="btn pri"><Plus size={15} /> Créer l'escale</button>
      </div>
    </form>
  </div></div>;
}

/* ============ FICHE ESCALE (DRAWER À ONGLETS) ============ */
function EscaleDrawer({ esc, onClose, onToggleDoc, onAddEvent, onAssign, onAdvance, notify }) {
  const [tab, setTab] = useState("apercu");
  const [evType, setEvType] = useState(EVENT_TYPES[0]);
  const [evTime, setEvTime] = useState("Mer 15 juil · ");
  const [sof, setSof] = useState(false);
  const done = Object.values(esc.docs).filter(Boolean).length;
  const pf = proformaFor(esc), lay = laytimeFor(esc), contacts = contactsFor(esc);
  const nextStage = STAGE_ORDER[STAGE_ORDER.indexOf(esc.stage) + 1];

  const emit = (body, title) => {
    const w = window.open("", "_blank");
    if (!w) { notify("Autorisez les pop-ups pour le PDF"); return; }
    w.document.write(printPage(title, body));
    w.document.close(); w.focus();
    w.onafterprint = () => { try { w.close(); } catch (e) { /* noop */ } };
    setTimeout(() => { try { w.print(); } catch (e) { /* noop */ } }, 500);
    notify(`${title} · aperçu PDF ouvert`);
  };
  const downloadSof = () => emit(sofBody(esc), `SOF · ${esc.vessel}`);
  const DOCS_GEN = [
    ["Statement of Facts", () => emit(sofBody(esc), `SOF · ${esc.vessel}`)],
    ["Notice of Readiness", () => emit(norBody(esc), `NOR · ${esc.vessel}`)],
    ["Letter of Protest", () => emit(protestBody(esc), `LOP · ${esc.vessel}`)],
    ["Proforma D/A", () => emit(proformaBody(esc), `Proforma DA · ${esc.vessel}`)],
  ];

  const Section = ({ title, children, right }) => <div style={{ marginBottom: 18 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <div className="dsp" style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{title}</div>{right}</div>{children}</div>;

  return <>
    <div className="drv" onClick={onClose} />
    <div className="drw">
      <div style={{ background: `linear-gradient(160deg,${T.navy2},${T.navy})`, color: "#fff", padding: "18px 22px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div><div style={{ fontSize: 11, color: T.sky, letterSpacing: ".08em", fontWeight: 600 }}>FICHE ESCALE · {esc.id.toUpperCase()}</div>
            <div className="dsp" style={{ fontSize: 30, fontWeight: 800, lineHeight: 1, marginTop: 4 }}>{esc.vessel}</div>
            <div style={{ fontSize: 12.5, color: "#B9CBDA", marginTop: 4, display: "flex", alignItems: "center", gap: 7 }}><StagePill stage={esc.stage} /> {esc.voyage} · {esc.quai}</div></div>
          <button onClick={onClose} className="btn" style={{ background: "rgba(255,255,255,.1)", color: "#fff", padding: 8 }} aria-label="Fermer"><X size={16} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, margin: "14px 0" }}>
          {[["LOA", esc.specs.LOA], ["DWT", esc.specs.DWT], ["Tirant d'eau", esc.specs.Draft], ["GT / NT", `${esc.specs.GT} / ${esc.specs.NT}`]].map(([k, v]) => <div key={k} style={{ background: "rgba(255,255,255,.07)", borderRadius: 8, padding: "7px 10px" }}>
            <div style={{ fontSize: 9.5, color: "#8FA6B8", letterSpacing: ".06em", textTransform: "uppercase" }}>{k}</div><div className="dsp" style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{v}</div></div>)}
        </div>
        <div className="tabs" style={{ margin: "0 -22px" }}>
          {[["apercu", "Aperçu"], ["docs", `Documents ${done}/8`], ["journal", "Journal · SOF"], ["factu", "Facturation"]].map(([id, lb]) =>
            <button key={id} className={`tab-b${tab === id ? " on" : ""}`} onClick={() => setTab(id)}>{lb}</button>)}
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, overflowY: "auto", padding: "18px 22px 30px" }}>
        {/* ===== APERÇU ===== */}
        {tab === "apercu" && <>
          {esc.alerts.map((a, i) => <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: a.sev === "crit" ? "#F9E7E2" : "#FBF3E4", border: `1px solid ${a.sev === "crit" ? "#E7C3B9" : "#EAD9B4"}`, borderRadius: 10, padding: "10px 12px", marginBottom: 12 }}>
            <AlertTriangle size={15} color={a.sev === "crit" ? T.red : T.amber} style={{ flexShrink: 0, marginTop: 1 }} /><span style={{ fontSize: 12.5, color: a.sev === "crit" ? "#7A2A1C" : "#7A5A1E", lineHeight: 1.45 }}>{a.t}</span></div>)}

          <div style={{ fontSize: 13, color: T.ink, background: "#fff", border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px", marginBottom: 16, lineHeight: 1.5 }}>
            <b>{esc.sens === "C" ? "Chargement" : "Déchargement"}</b> · {esc.tonnage.toLocaleString("fr-FR")} t · {esc.cargo}<br /><span style={{ color: T.muted }}>{esc.client} · {esc.dest}</span></div>

          <Section title="Attribution">
            <div style={{ display: "flex", alignItems: "center", gap: 11, background: "#fff", border: `1px solid ${T.line}`, borderRadius: 11, padding: "11px 13px" }}>
              <Avatar id={esc.assignee} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 10.5, color: T.blueInk, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 600 }}>Responsable</div>
                <div style={{ fontSize: 13.5, color: esc.assignee ? T.ink : "#9DB0BF", fontWeight: 600 }}>{esc.assignee ? `${MEMBER[esc.assignee].name} · ${MEMBER[esc.assignee].role}` : "Non attribué"}</div></div>
              <select value={esc.assignee || ""} onChange={e => { onAssign(esc.id, e.target.value || null); notify(e.target.value ? `Attribué à ${MEMBER[e.target.value].name}` : "Attribution retirée"); }} className="inp" style={{ width: "auto", cursor: "pointer" }} aria-label="Attribuer">
                <option value="">Non attribué</option>{TEAM.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select>
            </div>
          </Section>

          <Section title="Intervenants">
            <div style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 11, overflow: "hidden" }}>
              {contacts.map((c, i) => { const Icon = c.icon; return <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 13px", borderBottom: i < contacts.length - 1 ? `1px solid ${T.lineSoft}` : "none" }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: T.bg2, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon size={15} color={T.blue} /></span>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 10, color: T.faint, textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 600 }}>{c.role}</div><div style={{ fontSize: 13, fontWeight: 600, color: T.ink }}>{c.name}</div></div>
                <a href={`mailto:${c.mail}`} onClick={e => e.stopPropagation()} title={c.mail} style={{ color: T.blue, display: "flex" }}><Mail size={15} /></a></div>; })}
            </div>
          </Section>

          <Section title="Position du navire · AIS">
            <div style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 11, padding: "13px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
                <span style={{ width: 32, height: 32, borderRadius: 9, background: T.bg2, display: "grid", placeItems: "center", flexShrink: 0 }}><Navigation size={16} color={T.blue} /></span>
                <div style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.4 }}>Suivi temps réel via source officielle AIS · IMO <b className="num" style={{ color: T.ink }}>{esc.specs.IMO}</b></div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a className="btn pri" href={trackUrl(esc, "mt")} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>MarineTraffic <ArrowRight size={14} /></a>
                <a className="btn ghost" href={trackUrl(esc, "vf")} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>VesselFinder</a>
              </div>
              <div style={{ fontSize: 11, color: T.faint, marginTop: 9 }}>Position réelle sur le site officiel. La carte live intégrée s'active avec une clé API AIS (module optionnel).</div>
            </div>
          </Section>

          <Section title="Laytime & staries" right={<span className="dsp" style={{ fontWeight: 700, fontSize: 11.5, padding: "2px 9px", borderRadius: 999, color: lay.state.c, background: lay.state.bg }}>{lay.state.t}</span>}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[["Cadence contractuelle", `${lay.cadence.toLocaleString("fr-FR")} t/j`], ["Temps alloué", `${lay.allowed.toFixed(1)} j`], ["Événements saisis", `${esc.events.length}`]].map(([k, v]) =>
                <div key={k} style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 10, padding: "10px 12px" }}><div style={{ fontSize: 10, color: T.faint, textTransform: "uppercase", letterSpacing: ".05em" }}>{k}</div><div className="dsp num" style={{ fontSize: 19, fontWeight: 800, color: T.navy, marginTop: 3 }}>{v}</div></div>)}
            </div>
            <div style={{ fontSize: 11, color: T.faint, marginTop: 6 }}>Estimation indicative · le décompte définitif est établi à partir du SOF signé.</div>
          </Section>

          <Section title="Caractéristiques navire">
            <div style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 11, padding: "6px 14px" }}>
              {Object.entries(esc.specs).map(([k, v], i, arr) => <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.lineSoft}` : "none", fontSize: 13 }}>
                <span style={{ color: T.muted }}>{k}</span><span className="num" style={{ fontWeight: 600, color: T.ink }}>{v}</span></div>)}
            </div>
          </Section>

          {nextStage && <button className="btn pri" style={{ width: "100%", justifyContent: "center" }} onClick={() => { onAdvance(esc.id); notify(`Escale avancée → ${STAGE_META[nextStage].short}`); }}>
            Faire avancer l'étape → {STAGE_META[nextStage].short} <ArrowRight size={15} /></button>}
        </>}

        {/* ===== DOCUMENTS ===== */}
        {tab === "docs" && <>
          <div className="dsp" style={{ fontSize: 15, fontWeight: 700, color: T.navy, marginBottom: 8 }}>Générer un document</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            {DOCS_GEN.map(([lb, fn]) => <button key={lb} className="btn ghost" style={{ justifyContent: "space-between" }} onClick={fn}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><FileText size={15} color={T.blue} />{lb}</span><Download size={14} color={T.muted} /></button>)}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div className="dsp" style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>Pièces reçues · {done}/{DOC_LIST.length}</div>
            <div style={{ width: 90, height: 7, borderRadius: 4, background: "#E3EAF0", overflow: "hidden" }}><div style={{ width: `${docPct(esc.docs) * 100}%`, height: "100%", background: docPct(esc.docs) === 1 ? T.green : T.blue }} /></div>
          </div>
          <div style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 12, padding: 6 }}>
            {DOC_LIST.map(d => <div key={d} className="doc" onClick={() => onToggleDoc(esc.id, d)} role="checkbox" aria-checked={esc.docs[d]} tabIndex={0} onKeyDown={e => e.key === "Enter" && onToggleDoc(esc.id, d)}>
              <div style={{ width: 19, height: 19, borderRadius: 6, flexShrink: 0, display: "grid", placeItems: "center", background: esc.docs[d] ? T.green : "#fff", border: esc.docs[d] ? `1px solid ${T.green}` : "1.5px solid #B9C7D3", transition: ".15s" }}>{esc.docs[d] && <Check size={12} color="#fff" strokeWidth={3} />}</div>
              <span style={{ fontSize: 13, color: esc.docs[d] ? T.muted : T.ink, fontWeight: esc.docs[d] ? 400 : 500 }}>{d}</span>
              <FileText size={13} color="#AEBFCB" style={{ marginLeft: "auto" }} /></div>)}
          </div>
          <div style={{ fontSize: 12, color: T.faint, marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}><ClipboardList size={14} /> Chaque pièce cochée alimente la jauge de tirant d'eau de la carte.</div>
        </>}

        {/* ===== JOURNAL / SOF ===== */}
        {tab === "journal" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div className="dsp" style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>Journal d'escale</div>
            <button className="btn dark" style={{ fontSize: 12, padding: "8px 12px" }} onClick={() => { setSof(true); notify("Statement of facts généré"); }}><Download size={13} /> Générer le SOF</button>
          </div>
          <div style={{ borderLeft: `2px solid ${T.line}`, marginLeft: 7, paddingLeft: 16, marginBottom: 14 }}>
            {esc.events.length === 0 && <div style={{ fontSize: 12.5, color: T.muted, padding: "6px 0 10px" }}>Aucun événement. Le journal démarre à l'arrivée sur rade : chaque saisie alimente le SOF final.</div>}
            {esc.events.map((ev, i) => <div key={i} style={{ position: "relative", padding: "5px 0 11px" }}>
              <div style={{ position: "absolute", left: -21.5, top: 10, width: 9, height: 9, borderRadius: 9, background: i === esc.events.length - 1 ? T.blue : "#B9C7D3", border: "2px solid #fff", boxShadow: `0 0 0 1px ${T.line}` }} />
              <div className="num" style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{ev.t}</div><div style={{ fontSize: 13, color: T.ink, marginTop: 1 }}>{ev.e}</div></div>)}
          </div>
          <div style={{ display: "flex", gap: 7, marginBottom: 18 }}>
            <select value={evType} onChange={e => setEvType(e.target.value)} className="inp" style={{ flex: 1, minWidth: 0 }}>{EVENT_TYPES.map(t => <option key={t}>{t}</option>)}</select>
            <input value={evTime} onChange={e => setEvTime(e.target.value)} className="inp" style={{ width: 140 }} placeholder="Mer 15 juil · 14h05" />
            <button className="btn pri" style={{ padding: "8px 11px" }} onClick={() => { onAddEvent(esc.id, { t: evTime || "Mer 15 juil", e: evType }); notify("Événement ajouté"); }} aria-label="Ajouter"><Plus size={15} /></button>
          </div>
          {sof && <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "6px 0 8px" }}>
              <div style={{ fontSize: 11.5, color: T.muted, fontWeight: 600, letterSpacing: ".04em" }}>DOCUMENT · STATEMENT OF FACTS</div>
              <button className="btn pri" onClick={downloadSof}><Download size={14} /> Télécharger en PDF</button>
            </div>
            <div style={{ border: `1px solid ${T.line}`, borderRadius: 11, overflow: "auto", background: "#fff", boxShadow: T.sh1, maxHeight: 560 }} dangerouslySetInnerHTML={{ __html: sofBody(esc) }} />
            <div style={{ fontSize: 11, color: T.faint, marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}><FileText size={13} /> « Télécharger en PDF » ouvre l'aperçu d'impression : choisissez « Enregistrer au format PDF ». Format A4, prêt à signer.</div>
          </div>}
        </>}

        {/* ===== FACTURATION ===== */}
        {tab === "factu" && <>
          <div className="dsp" style={{ fontSize: 15, fontWeight: 700, color: T.navy, marginBottom: 4 }}>Proforma Disbursement Account</div>
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>Estimation des débours d'escale · {esc.vessel} · {esc.quai}</div>
          <div style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 12, overflow: "hidden" }}>
            {pf.items.map((it, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 15px", borderBottom: `1px solid ${T.lineSoft}`, fontSize: 13.5 }}>
              <span style={{ color: T.ink2 }}>{it.k}</span><span className="num" style={{ fontWeight: 600, color: T.ink }}>{euro(it.v)}</span></div>)}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 15px", background: T.navy, color: "#fff" }}>
              <span className="dsp" style={{ fontWeight: 700, fontSize: 15 }}>Total estimé D/A</span><span className="dsp num" style={{ fontWeight: 800, fontSize: 20, color: T.sky }}>{euro(pf.total)}</span></div>
          </div>
          <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
            <button className="btn pri" style={{ flex: 1, justifyContent: "center" }} onClick={() => notify("Proforma D/A émise vers la comptabilité")}><Receipt size={15} /> Émettre la proforma</button>
            <button className="btn ghost" onClick={() => emit(proformaBody(esc), `Proforma DA · ${esc.vessel}`)}><Download size={15} /> PDF</button>
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginTop: 10 }}>Barème indicatif calculé sur le tonnage et le gabarit du navire. Le décompte final intègre les débours réels et le SOF.</div>
        </>}
      </div>
    </div>
  </>;
}

/* ============ NAV & VUES ============ */
const NAV = [
  { sec: "Pilotage", items: [
    { id: "dashboard", icon: LayoutGrid, label: "Tableau de bord" },
    { id: "escales", icon: Ship, label: "Escales" },
    { id: "planning", icon: GanttChart, label: "Planning & quais" },
  ] },
  { sec: "Suivi & référentiel", items: [
    { id: "docs", icon: FileText, label: "Documents" },
    { id: "clients", icon: Users, label: "Armateurs & clients" },
    { id: "factu", icon: Receipt, label: "Proformas & facturation" },
  ] },
];
const VIEW_META = {
  dashboard: { title: "Tableau de bord des escales", sub: "Mercredi 15 juillet 2026 · marée haute Rouen 15h42" },
  escales: { title: "Toutes les escales", sub: "Le grand tableau, trié et filtrable" },
  planning: { title: "Planning & quais", sub: "Occupation des postes sur la semaine" },
  docs: { title: "Suivi documentaire", sub: "Ce qui est reçu, ce qui manque" },
  clients: { title: "Armateurs & clients", sub: "Tonnage engagé par partenaire" },
  factu: { title: "Proformas & facturation", sub: "Escales en fin de cycle" },
};

/* ============ APP ============ */
export default function EDSCockpit() {
  const [escales, setEscales] = useState(INITIAL);
  const [view, setView] = useState("dashboard");
  const [agency, setAgency] = useState("Toutes agences");
  const [member, setMember] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [sort, setSort] = useState({ key: "stage", dir: "asc" });
  const [newOpen, setNewOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const searchRef = useRef(null);

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };
  useEffect(() => {
    const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); searchRef.current?.focus(); } };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, []);

  const filtered = useMemo(() => escales.filter(e =>
    (agency === "Toutes agences" || e.agency === agency) &&
    (member === "all" || (member === "none" ? !e.assignee : e.assignee === member)) &&
    (query.trim() === "" || (e.vessel + e.quai + e.client + e.cargo).toLowerCase().includes(query.toLowerCase()))
  ), [escales, agency, member, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered], s = sort.dir === "asc" ? 1 : -1;
    arr.sort((a, b) => { let av, bv;
      if (sort.key === "tonnage") { av = a.tonnage; bv = b.tonnage; }
      else if (sort.key === "stage") { av = STAGE_ORDER.indexOf(a.stage); bv = STAGE_ORDER.indexOf(b.stage); }
      else { av = (a[sort.key] || "").toString().toLowerCase(); bv = (b[sort.key] || "").toString().toLowerCase(); }
      return av < bv ? -s : av > bv ? s : 0; });
    return arr;
  }, [filtered, sort]);

  const kpis = useMemo(() => ({
    total: filtered.length, nor: filtered.filter(e => e.stage === "nor").length,
    ops: filtered.filter(e => e.stage === "ops").length,
    tonnage: filtered.reduce((s, e) => s + e.tonnage, 0),
    alerts: filtered.reduce((s, e) => s + e.alerts.length, 0),
  }), [filtered]);
  const notifs = useMemo(() => escales.flatMap(e => e.alerts.map(a => ({ vessel: e.vessel, id: e.id, ...a }))), [escales]);
  const teamLoad = useMemo(() => TEAM.map(m => ({ ...m, escs: filtered.filter(e => e.assignee === m.id), tonnage: filtered.filter(e => e.assignee === m.id).reduce((s, e) => s + e.tonnage, 0) })), [filtered]);

  const toggleDoc = (id, doc) => setEscales(p => p.map(e => e.id === id ? { ...e, docs: { ...e.docs, [doc]: !e.docs[doc] } } : e));
  const addEvent = (id, ev) => setEscales(p => p.map(e => e.id === id ? { ...e, events: [...e.events, ev] } : e));
  const createEscale = (esc) => { setEscales(p => [esc, ...p]); setView("dashboard"); };
  const assign = (id, mid) => setEscales(p => p.map(e => e.id === id ? { ...e, assignee: mid } : e));
  const advance = (id) => setEscales(p => p.map(e => e.id === id ? { ...e, stage: STAGE_ORDER[Math.min(STAGE_ORDER.indexOf(e.stage) + 1, STAGE_ORDER.length - 1)] } : e));

  const open = escales.find(e => e.id === openId);
  const meta = VIEW_META[view];
  const KPI_SPARKS = { total: [5, 6, 6, 7, 7, 8, kpis.total], nor: [1, 2, 1, 3, 2, 2, kpis.nor], ops: [1, 1, 2, 2, 3, 2, kpis.ops], tonnage: [120, 140, 150, 160, 168, 172, kpis.tonnage / 1000] };

  return <div className="eds-root">
    <style>{CSS}</style>

    {/* SIDEBAR */}
    <aside className="side">
      <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(150deg,${T.blue},#2C5E93)`, display: "grid", placeItems: "center", boxShadow: "0 4px 12px rgba(62,127,193,.4)" }}><Anchor size={18} color="#fff" /></div>
          <div><div className="dsp" style={{ fontWeight: 800, fontSize: 17, lineHeight: 1 }}>Euro-Docks</div><div style={{ fontSize: 9.5, color: T.sky, letterSpacing: ".14em", marginTop: 2 }}>COCKPIT ESCALES</div></div>
        </div>
      </div>
      <nav style={{ padding: "8px 0", flex: 1, overflowY: "auto" }}>
        {NAV.map(g => <div key={g.sec}>
          <div className="side-sec">{g.sec}</div>
          {g.items.map(n => { const Icon = n.icon; const cnt = n.id === "dashboard" ? kpis.total : n.id === "factu" ? escales.filter(e => e.stage === "cloture").length : null;
            return <button key={n.id} className={`nav-item${view === n.id ? " on" : ""}`} onClick={() => setView(n.id)}>
              <Icon size={16} /> {n.label} {cnt ? <span className="cnt num">{cnt}</span> : null}</button>; })}
        </div>)}
      </nav>
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ position: "relative" }}><Avatar id={CURRENT_USER.id} size={34} /><span style={{ position: "absolute", right: -1, bottom: -1, width: 10, height: 10, borderRadius: 10, background: "#3FA06B", border: `2px solid ${T.navy}` }} /></div>
        <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{CURRENT_USER.name}</div><div style={{ fontSize: 10.5, color: T.skyDim }}>{CURRENT_USER.role} · {CURRENT_USER.agency}</div></div>
        <Settings size={15} color="#7E94A7" style={{ cursor: "pointer" }} />
      </div>
    </aside>

    {/* MAIN */}
    <main className="main">
      <header className="top">
        <div><h1 className="dsp" style={{ margin: 0, fontSize: 24, fontWeight: 800, color: T.navy, lineHeight: 1 }}>{meta.title}</h1>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>{meta.sub}</div></div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap" }}>
          <button className="btn pri" onClick={() => setNewOpen(true)}><Plus size={15} /> Nouvelle escale</button>
          <div className="searchbox"><Search size={14} color={T.muted} /><input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher…" aria-label="Rechercher" /><span className="kbd">⌘K</span></div>
          <select value={agency} onChange={e => setAgency(e.target.value)} className="sel" aria-label="Filtrer par agence">{AGENCIES.map(a => <option key={a}>{a}</option>)}</select>
          <select value={member} onChange={e => setMember(e.target.value)} className="sel" aria-label="Filtrer par personne"><option value="all">Toute l'équipe</option>{TEAM.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}<option value="none">Non attribuées</option></select>
          <div style={{ position: "relative" }}>
            <button className="iconbtn" onClick={() => setNotifOpen(o => !o)} title={`${kpis.alerts} alerte(s)`} aria-label="Notifications"><Bell size={16} color={T.navy} />
              {kpis.alerts > 0 && <span style={{ position: "absolute", top: -5, right: -5, background: T.red, color: "#fff", fontSize: 9.5, fontWeight: 700, borderRadius: 9, minWidth: 16, height: 16, display: "grid", placeItems: "center", padding: "0 4px" }}>{kpis.alerts}</span>}</button>
            {notifOpen && <div className="pop">
              <div style={{ padding: "12px 15px", borderBottom: `1px solid ${T.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className="dsp" style={{ fontWeight: 700, fontSize: 14, color: T.navy }}>Alertes</span><span style={{ fontSize: 11, color: T.muted }}>{notifs.length} active(s)</span></div>
              <div style={{ maxHeight: 320, overflowY: "auto" }}>
                {notifs.length === 0 && <div style={{ padding: "20px 15px", fontSize: 13, color: T.muted, textAlign: "center" }}>Aucune alerte 🎉</div>}
                {notifs.map((n, i) => <div key={i} onClick={() => { setOpenId(n.id); setNotifOpen(false); }} style={{ display: "flex", gap: 10, padding: "11px 15px", borderBottom: `1px solid ${T.lineSoft}`, cursor: "pointer" }}>
                  <AlertTriangle size={15} color={n.sev === "crit" ? T.red : T.amber} style={{ flexShrink: 0, marginTop: 1 }} />
                  <div><div className="dsp" style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{n.vessel}</div><div style={{ fontSize: 12, color: T.muted, lineHeight: 1.4 }}>{n.t}</div></div></div>)}
              </div>
            </div>}
          </div>
        </div>
      </header>

      {view === "dashboard" && <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 13, padding: "18px 24px 6px" }}>
          {[
            { k: "Escales en cours", v: kpis.total, ic: <Ship size={15} color={T.blue} />, sp: KPI_SPARKS.total, c: T.blue, d: "+2 vs hier" },
            { k: "NOR en attente", v: kpis.nor, ic: <Anchor size={15} color={T.amber} />, sp: KPI_SPARKS.nor, c: T.amber, d: "à accepter" },
            { k: "Opérations actives", v: kpis.ops, ic: <Package size={15} color={T.green} />, sp: KPI_SPARKS.ops, c: T.green, d: "en cours" },
            { k: "Tonnage engagé", v: `${(kpis.tonnage / 1000).toLocaleString("fr-FR")} kt`, ic: <Waves size={15} color={T.blue} />, sp: KPI_SPARKS.tonnage, c: T.blue, d: "cette semaine" },
          ].map(x => <div key={x.k} className="kpi">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: T.muted, fontWeight: 600 }}>{x.ic} {x.k}</div>
              <Spark data={x.sp} color={x.c} /></div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
              <div className="dsp num" style={{ fontSize: 32, fontWeight: 800, color: T.navy, lineHeight: 1 }}>{x.v}</div>
              <span style={{ fontSize: 11, color: T.faint, display: "inline-flex", alignItems: "center", gap: 3 }}><TrendingUp size={11} color={T.green} />{x.d}</span></div>
          </div>)}
        </div>

        {/* charge équipe */}
        <div style={{ padding: "10px 24px 4px" }}>
          <div className="card" style={{ padding: "13px 16px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", boxShadow: T.sh1 }}>
            <div className="dsp" style={{ fontSize: 13, fontWeight: 700, color: T.navy, letterSpacing: ".03em" }}>Charge de l'équipe</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", flex: 1 }}>
              {teamLoad.map(m => <div key={m.id} onClick={() => setMember(m.id)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", opacity: member === "all" || member === m.id ? 1 : .4, transition: "opacity .15s" }} title={`Voir les escales de ${m.name}`}>
                <Avatar id={m.id} size={30} />
                <div><div style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{m.name}</div><div className="num" style={{ fontSize: 10.5, color: T.muted }}>{m.escs.length} escale{m.escs.length > 1 ? "s" : ""} · {(m.tonnage / 1000).toFixed(0)} kt</div></div>
              </div>)}
            </div>
            {member !== "all" && <button className="btn ghost" style={{ fontSize: 12, padding: "6px 11px" }} onClick={() => setMember("all")}>Tout voir</button>}
          </div>
        </div>

        <div style={{ padding: "12px 24px 4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 2px 11px" }}><Table2 size={16} color={T.blue} /><span className="dsp" style={{ fontWeight: 700, fontSize: 16, color: T.navy }}>Le grand tableau</span><span style={{ fontSize: 11.5, color: T.muted }}>· vue d'ensemble, comme au bureau</span></div>
          <BoardTable list={sorted} onOpen={setOpenId} sort={sort} setSort={setSort} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "22px 26px 4px" }}><LayoutGrid size={16} color={T.blue} /><span className="dsp" style={{ fontWeight: 700, fontSize: 16, color: T.navy }}>Pipeline des escales</span><span style={{ fontSize: 11.5, color: T.muted }}>· chaque pôle suit son étape</span></div>
        <div className="kan">
          {STAGES.map(stage => { const items = filtered.filter(e => e.stage === stage.id); return <div className="col" key={stage.id}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "2px 4px 9px" }}>
              <div><span style={{ width: 8, height: 8, borderRadius: 3, background: STAGE_META[stage.id].bar, display: "inline-block", marginRight: 7 }} /><span className="dsp" style={{ fontWeight: 700, fontSize: 15, color: T.navy }}>{stage.label}</span></div>
              <span className="num" style={{ fontSize: 11.5, fontWeight: 700, color: items.length ? T.blue : "#AEBFCB", background: items.length ? "#E8F0F9" : "#EDF1F5", borderRadius: 7, padding: "2px 8px" }}>{items.length}</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 60 }}>
              {items.map((esc, i) => <EscaleCard key={esc.id} esc={esc} onOpen={setOpenId} delay={i} />)}
              {items.length === 0 && <div style={{ border: `1.5px dashed ${T.line}`, borderRadius: 11, padding: "16px 12px", fontSize: 12, color: "#9DB0BF", textAlign: "center" }}>Aucune escale</div>}
            </div>
          </div>; })}
        </div>
      </>}

      {view === "escales" && <div style={{ padding: "18px 24px 26px" }}><BoardTable list={sorted} onOpen={setOpenId} sort={sort} setSort={setSort} /></div>}
      {view === "planning" && <PlanningView list={filtered} onOpen={setOpenId} />}
      {view === "docs" && <DocsView list={filtered} onOpen={setOpenId} />}
      {view === "clients" && <ClientsView list={filtered} />}
      {view === "factu" && <FactuView list={filtered} onOpen={setOpenId} />}
    </main>

    {open && <EscaleDrawer esc={open} onClose={() => setOpenId(null)} onToggleDoc={toggleDoc} onAddEvent={addEvent} onAssign={assign} onAdvance={advance} notify={notify} />}
    {newOpen && <NewEscaleModal onClose={() => setNewOpen(false)} onCreate={createEscale} notify={notify} />}
    {toast && <div className="toast"><Check size={15} color="#7BE0A2" /> {toast}</div>}
  </div>;
}
