/*!
 * Euro Docks Service — avis de propriété intellectuelle
 * Conception & développement : VISION'HER. Affiché une fois par session.
 */
(function () {
  "use strict";

  // Mémoire distincte site / cockpit : chacun affiche l'avis une fois par session
  var KEY = (location.pathname.indexOf("/cockpit") === 0)
    ? "eds_ip_ack_cockpit_v1"
    : "eds_ip_ack_site_v1";
  try {
    if (window.sessionStorage && sessionStorage.getItem(KEY)) return;
  } catch (e) {}

  function build() {
    if (document.getElementById("eds-ip-overlay")) return;

    var css = ""
      + "#eds-ip-overlay{position:fixed;inset:0;z-index:2147483647;display:flex;"
      + "align-items:center;justify-content:center;padding:20px;"
      + "background:rgba(6,17,29,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);"
      + "font-family:'Inter',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;"
      + "opacity:0;transition:opacity .28s ease}"
      + "#eds-ip-overlay.eds-in{opacity:1}"
      + "#eds-ip-card{width:100%;max-width:440px;background:#fff;color:#14263A;"
      + "border-radius:16px;box-shadow:0 24px 70px rgba(6,17,29,.5);overflow:hidden;"
      + "transform:translateY(14px) scale(.98);transition:transform .28s ease}"
      + "#eds-ip-overlay.eds-in #eds-ip-card{transform:none}"
      + "#eds-ip-head{background:linear-gradient(135deg,#0A1B2A,#123456);"
      + "padding:22px 26px 18px;color:#fff;display:flex;align-items:center;gap:13px}"
      + "#eds-ip-head img{width:38px;height:38px;object-fit:contain;flex:none}"
      + "#eds-ip-head .eds-badge{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;"
      + "color:#8FB4D6;font-weight:700;margin-bottom:3px}"
      + "#eds-ip-head h2{margin:0;font-size:17px;font-weight:700;line-height:1.25}"
      + "#eds-ip-body{padding:20px 26px 8px;font-size:13.5px;line-height:1.6;color:#3A4E63}"
      + "#eds-ip-body p{margin:0 0 12px}"
      + "#eds-ip-body strong{color:#14263A}"
      + "#eds-ip-copy{font-size:11.5px;color:#7387A0;padding:0 26px 4px}"
      + "#eds-ip-foot{padding:14px 26px 22px;display:flex;flex-direction:column;gap:9px}"
      + "#eds-ip-ok{width:100%;border:0;cursor:pointer;background:#3E7FC1;color:#fff;"
      + "font-weight:700;font-size:14px;padding:13px 16px;border-radius:10px;"
      + "font-family:inherit;transition:background .15s,transform .05s}"
      + "#eds-ip-ok:hover{background:#356FAB}#eds-ip-ok:active{transform:translateY(1px)}"
      + "#eds-ip-note{text-align:center;font-size:11px;color:#94A3B5;margin:0}";

    var style = document.createElement("style");
    style.id = "eds-ip-style";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    // Chemin de l'emblème : absolu, valable depuis la racine et depuis /cockpit/
    var emblem = "/assets/eds-emblem.png";

    var ov = document.createElement("div");
    ov.id = "eds-ip-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-labelledby", "eds-ip-title");
    ov.innerHTML =
        '<div id="eds-ip-card">'
      +   '<div id="eds-ip-head">'
      +     '<img src="' + emblem + '" alt="Euro Docks Service" onerror="this.style.display=\'none\'">'
      +     '<div>'
      +       '<div class="eds-badge">Propriété intellectuelle</div>'
      +       '<h2 id="eds-ip-title">Droits d\'auteur &amp; confidentialité</h2>'
      +     '</div>'
      +   '</div>'
      +   '<div id="eds-ip-body">'
      +     '<p>Ce site et l\'application qui l\'accompagne, ainsi que leur <strong>conception, '
      +       'leur design, leur code source et le concept fonctionnel</strong>, constituent une '
      +       'œuvre originale, protégée par le droit d\'auteur.</p>'
      +     '<p>Toute <strong>reproduction, copie, extraction, adaptation ou réutilisation</strong>, '
      +       'totale ou partielle, par quelque moyen que ce soit, est interdite sans autorisation '
      +       'écrite préalable de son auteur.</p>'
      +     '<p style="margin-bottom:4px">Ces éléments vous sont présentés à titre de démonstration '
      +       'confidentielle et restent la propriété exclusive de leur créateur.</p>'
      +   '</div>'
      +   '<div id="eds-ip-copy">© 2026 VISION’HER. Tous droits réservés.</div>'
      +   '<div id="eds-ip-foot">'
      +     '<button id="eds-ip-ok" type="button">J\'ai lu et compris</button>'
      +     '<p id="eds-ip-note">En continuant, vous acceptez ces conditions.</p>'
      +   '</div>'
      + '</div>';

    document.body.appendChild(ov);
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // animation d'entrée
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { ov.classList.add("eds-in"); });
    });

    function close() {
      try { if (window.sessionStorage) sessionStorage.setItem(KEY, "1"); } catch (e) {}
      ov.classList.remove("eds-in");
      document.body.style.overflow = prevOverflow;
      setTimeout(function () { if (ov && ov.parentNode) ov.parentNode.removeChild(ov); }, 300);
    }

    ov.querySelector("#eds-ip-ok").addEventListener("click", close);
    document.addEventListener("keydown", function onKey(ev) {
      if (ev.key === "Escape") { close(); document.removeEventListener("keydown", onKey); }
    });
    ov.querySelector("#eds-ip-ok").focus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
