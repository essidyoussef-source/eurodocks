# Euro Docks Service — Direction Artistique

## Approches envisagées

### Approche A — "Meridian Dark" (Probabilité : 0.07)
Univers sombre et industriel, inspiré des grandes agences de communication maritime nordiques. Fond presque noir, typographie serif condensée, accents cuivrés. Très premium, très sérieux.

### Approche B — "Atlantic Precision" (Probabilité : 0.06)
Minimalisme chirurgical façon cabinet de conseil de haut vol. Blanc cassé, grille asymétrique, une seule couleur signature (bleu marine profond), typographie sans-serif ultra-fine. Sobre, stratégique, élitiste.

### Approche C — "Deep Navy Editorial" (Probabilité : 0.08)
**→ APPROCHE RETENUE**
Direction éditoriale inspirée des grandes publications industrielles et des rapports annuels des groupes CAC40. Bleu marine profond comme couleur structurante, blanc pur pour l'espace, or/ambre comme accent de prestige. Typographie mixte : serif display (Playfair Display) pour les titres de section, sans-serif géométrique (DM Sans) pour le corps. Asymétrie maîtrisée, données chiffrées mises en scène comme des éléments graphiques.

---

## Direction Artistique Retenue : "Deep Navy Editorial"

### Design Movement
**New Luxury Industrial** — Fusion entre l'esthétique des rapports annuels des grands groupes industriels français (TotalEnergies, CMA CGM, Bolloré) et l'éditorial premium des magazines économiques (Les Échos, Capital). Chaque section est pensée comme une double-page de magazine de prestige.

### Core Principles
1. **Données comme design** — Les chiffres clés (800 escales/an, 4,5 Mt de vrac, 7M€ de CA) sont traités comme des éléments graphiques monumentaux, pas comme du texte.
2. **Asymétrie maîtrisée** — Jamais de mise en page centrée symétrique. Toujours un décalage, une tension, un mouvement directionnel.
3. **Profondeur atmosphérique** — Superposition de calques (image, gradient, texte, ligne) pour créer une sensation de profondeur cinématographique.
4. **Économie de couleur** — Trois couleurs maximum par section. La retenue est le luxe.

### Color Philosophy
- **Bleu marine profond** `#0A1628` — La couleur de la nuit en mer. Fond principal, autorité, profondeur.
- **Or ambre** `#C8922A` — L'accent de prestige. Utilisé avec parcimonie pour les chiffres clés, les traits de séparation, les CTA.
- **Blanc pur** `#F8F6F1` — Espace négatif, lisibilité, élégance.
- **Gris acier** `#8B9BAE` — Textes secondaires, sous-titres, légendes.
- **Bleu horizon** `#1E3A5F` — Fond des sections intermédiaires, cartes de services.

**Couleur signature de marque : Or ambre `#C8922A`** — Inimitable, évoque le prestige maritime, les instruments de navigation, le laiton des bossoirs.

### Layout Paradigm
- **Grille éditoriale 12 colonnes** avec ruptures volontaires (éléments qui débordent sur 14 colonnes).
- **Hero pleine hauteur** avec image cinématographique et texte positionné en bas-gauche, jamais centré.
- **Sections alternées** : fond sombre / fond clair, avec transitions en biseau (clip-path diagonal).
- **Chiffres monumentaux** en typographie display 120px+ qui servent de fond graphique aux sections de stats.
- **Navigation latérale verticale** sur desktop (position fixe gauche), hamburger sur mobile.

### Signature Elements
1. **La ligne dorée** — Un trait horizontal `1px` couleur or ambre qui précède chaque titre de section, comme une règle de typographe.
2. **Les chiffres fantômes** — Grands chiffres en arrière-plan, très faible opacité (5-8%), qui créent une texture typographique.
3. **Le biseau de transition** — `clip-path: polygon(0 0, 100% 5%, 100% 100%, 0 95%)` entre les sections pour casser la rigidité horizontale.

### Interaction Philosophy
- **Curseur personnalisé** — Petit cercle blanc avec croix, qui se transforme en cercle plein sur les éléments cliquables.
- **Reveal au scroll** — Chaque section entre avec un léger `translateY(30px) → 0` + `opacity: 0 → 1` sur 600ms ease-out.
- **Hover sur les cartes de service** — La carte s'élève légèrement (`translateY(-4px)`), une fine bordure dorée apparaît en bas.
- **Navigation** — Les liens de nav ont un soulignement qui se déploie de gauche à droite au hover.

### Animation
- Entrées au scroll : `translateY(30px) opacity:0 → translateY(0) opacity:1`, durée 600ms, `cubic-bezier(0.23, 1, 0.32, 1)`.
- Compteurs de chiffres : animation count-up au premier scroll dans la section stats.
- Parallaxe légère sur les images hero (déplacement vertical 20% à la vitesse du scroll).
- Stagger de 80ms entre les éléments d'une même liste/grille.
- Pas d'animations sur les actions clavier (accessibilité).

### Typography System
- **Display / Titres H1-H2** : `Playfair Display`, Bold 700, tracking -0.02em — Autorité, héritage, prestige.
- **Corps / Titres H3-H4** : `DM Sans`, Regular 400 / Medium 500 — Lisibilité, modernité, clarté.
- **Chiffres monumentaux** : `Playfair Display`, ExtraBold 900 — Impact visuel maximal.
- **Labels / Caps** : `DM Sans`, SemiBold 600, `letter-spacing: 0.15em`, `text-transform: uppercase` — Hiérarchie, structure.
- **Taille de base** : 17px (légèrement supérieure à la norme pour le confort de lecture sur les contenus techniques).

### Brand Essence
**"Euro Docks Service — L'intelligence maritime au service de votre cargo."**
Personnalité : Expert. Discret. Fiable.

### Brand Voice
- Headlines : Directes, techniques, sans fioritures. Ex : *"800 escales. Une seule promesse : zéro surprise."*
- CTAs : Actifs et précis. Ex : *"Demander un devis d'affrètement"*, *"Consulter nos capacités portuaires"*.
- Interdit : "Bienvenue sur notre site", "Nous sommes fiers de", "Solutions innovantes".

### Wordmark & Logo
Monogramme **EDS** en Playfair Display Bold, avec le **D** légèrement agrandi et une fine ligne dorée horizontale traversant les trois lettres. Fond transparent, déclinable en blanc sur fond sombre et en marine sur fond clair.

---

## Style Decisions
- Fond hero : image cinématographique de navire bulk carrier en mer, avec overlay gradient `linear-gradient(to bottom right, rgba(10,22,40,0.85), rgba(10,22,40,0.4))`.
- Section stats : fond `#0A1628`, chiffres en Playfair Display 900, couleur or ambre pour les valeurs, blanc pour les labels.
- Section services : fond blanc cassé `#F8F6F1`, cartes avec bordure gauche `4px solid #C8922A`.
- Footer : fond `#060E1A` (plus sombre que le hero), texte `#8B9BAE`.
- Radius : `0` sur les cartes de service (angulaire = industriel), `4px` sur les boutons.
