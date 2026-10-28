# Portfolio — Ameni Hajri

Site statique en HTML, CSS et JavaScript (sans framework, sans build).

## Structure
```
portfolio-ameni-hajri/
├── index.html          # Structure de la page
├── css/
│   └── style.css       # Styles (thème clair/sombre, responsive)
├── js/
│   ├── data.js         # Contenu : compétences, projets, liens (à modifier ici)
│   └── main.js         # Rendu, menu mobile, lien actif, formulaire
└── assets/
    ├── icons/          # Logos des technologies (SVG)
    ├── images/         # Captures des projets, photo (un sous-dossier par projet)
    └── cv/             # CV_Ameni_Hajri.pdf (à ajouter)
```

## Lancer
Ouvrir `index.html` dans le navigateur (ou « Live Server » dans VS Code).

## À compléter
- `js/data.js` : fiches projet (déjà remplies), liens démo, `SOCIAL`, et `captures` de chaque projet
- `assets/images/` : captures, puis renseigner `image: "assets/images/booki.png"`
- `assets/cv/CV_Ameni_Hajri.pdf`
- Formulaire : brancher un service d'envoi (voir TODO dans `js/main.js`)
