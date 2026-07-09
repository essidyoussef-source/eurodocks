# EDS — Scroll-Driven Cinematic Homepage
## Architecture des 3 actes narratifs

### Principe technique
- `position: sticky` sur un conteneur de 600vh
- `scrollY` mappé en progress [0→1] via `useScrollProgress`
- Chaque acte = plage de progress + interpolations CSS/SVG
- Framer Motion `useTransform` + `useSpring` pour les transitions fluides
- Canvas 2D pour les particules de grain dans l'acte 2
- SVG animé pour la carte mondiale dans l'acte 3

---

### ACTE 1 — Zoom-in cargo (progress: 0 → 0.33)
**Concept:** On commence sur un plan large — ciel, mer, horizon. Un cargo apparaît au loin, minuscule. En scrollant, on se rapproche inexorablement. Le navire grossit, la caméra plonge vers lui. Les stats apparaissent en overlay.

**Animations:**
- `scale`: 1 → 4 (zoom progressif sur l'image cargo)
- `y`: 0 → -15% (légère translation verticale pour simuler le mouvement)
- Texte hero : fade-out à progress 0.15
- Stats overlay : fade-in à progress 0.20, fade-out à 0.30
- Vignette : s'intensifie avec le zoom
- Son optionnel : ambiance maritime (désactivé par défaut)

**Images:**
- `eds_scroll_wide.jpg` — plan large, cargo à l'horizon (1:1 ratio)
- `eds_scroll_mid.jpg` — plan moyen, cargo tribord
- `eds_scroll_close.jpg` — plan rapproché, flanc du navire

**Transition vers acte 2:**
- Cross-dissolve entre flanc navire et intérieur cale
- Overlay noir qui s'ouvre comme une écoutille

---

### ACTE 2 — Intérieur cale (progress: 0.33 → 0.66)
**Concept:** On est maintenant DANS le navire. Vue en plongée sur la cale ouverte, remplie de grain. Des données techniques flottent dans l'espace comme des hologrammes. L'atmosphère est industrielle, technique, précise.

**Animations:**
- Entrée : scale 2 → 1 (on "tombe" dans la cale)
- Particules de grain : canvas animé, 200 particules flottantes
- Data cards : apparition séquentielle avec stagger 80ms
- Lignes de scan : animation horizontale répétitive (effet HUD)
- Chiffres : count-up déclenché à l'entrée dans l'acte

**Données affichées:**
- Type: Dry Bulk — Céréales & Grains
- Volume: 45 000 tonnes
- Certification: GMP+ Feed Safety
- Température: 18°C / Humidité: 12%
- Port de départ: Rouen → Port d'arrivée: Casablanca
- Navire: MV Baltic Grain (Panamax, 75 000 DWT)

**Images:**
- `eds_hatch_open.jpg` — vue plongée cale ouverte avec grain
- `eds_grain_close.jpg` — grain en gros plan, texture

---

### ACTE 3 — Dézoom carte mondiale (progress: 0.66 → 1.0)
**Concept:** La caméra remonte, sort du navire, monte dans le ciel, puis dans l'espace. On voit apparaître une carte du monde avec les routes maritimes d'EDS tracées en or. Les ports s'allument un par un. Les flux de cargo apparaissent comme des lignes lumineuses animées.

**Animations:**
- Scale 3 → 1 sur la carte (dézoom depuis la France)
- Ports : cercles pulsants qui s'allument séquentiellement
- Routes : lignes SVG avec `stroke-dashoffset` animé (tracé progressif)
- Labels ports : fade-in avec délai
- Flux cargo : particules animées le long des routes

**Ports affichés:**
- Dunkerque ●, Boulogne-sur-Mer ●, Rouen ●, Bayonne ●, Calais ●
- Casablanca ●, Dakar ●, Rotterdam ●, Hambourg ●, Anvers ●

**Routes tracées:**
- Dunkerque → Rotterdam → Hambourg (Mer du Nord)
- Rouen → Casablanca → Dakar (Atlantique)
- Boulogne → Anvers → Baltique
- Bayonne → Méditerranée

---

### Post-scroll — Sections classiques
Après les 600vh de scroll cinématique, les sections habituelles reprennent :
- Services grid
- Clients de référence  
- CTA contact

---

### Stack technique
- React 19 + Framer Motion 12 (useScroll, useTransform, useSpring)
- Canvas 2D pour particules grain
- SVG inline pour carte mondiale
- CSS custom properties animées
- Intersection Observer pour les sections post-scroll
- `will-change: transform` sur tous les éléments animés
