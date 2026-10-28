/* Contenu du portfolio : modifie ici, pas dans le HTML.
   - "logo" (dans technologies) = nom d'un fichier de assets/icons/ sans .svg (optionnel)
   - "captures" = chemins d'images, ex. "assets/images/kasa/accueil.png" */

const SKILLS = [
  { titre: "Frontend", dark: false, tags: ["HTML", "CSS", "JavaScript", "React", "React Router", "Sass", "jQuery"] },
  { titre: "Backend",  dark: false, tags: ["Node.js", "Express", "JWT", "bcrypt", "Multer", "Sharp"] },
  { titre: "Données",  dark: false, tags: ["MongoDB", "Mongoose", "SQLite"] },
  { titre: "Outils",   dark: true,  tags: ["Git", "GitHub", "Figma", "Lighthouse", "Chrome DevTools", "Kanban"] }
];

const PROJECTS = [
  {
    id: "booki",
    titre: "Booki",
    sousTitre: "Site de réservation d'hébergements",
    description: "Intégration responsive d'un site de réservation d'hébergements.",
    resultat: "Résultat : à compléter",
    fiche: false, // pas encore de fiche projet : le bouton « Voir la fiche » est masqué
    tags: ["HTML", "CSS"],
    legende: "Capture Booki",
    image: "",
    liens: { github: "", demo: "" }
  },
  {
    id: "sophie-bluel",
    titre: "Sophie Bluel",
    sousTitre: "Portfolio interactif avec interface d'administration",
    description: "Portfolio d'architecte d'intérieur dynamique, avec galerie filtrable et espace d'administration sécurisé.",
    resultat: "Interface d'administration avec connexion",
    tags: ["JavaScript", "Node.js", "SQLite"],
    legende: "Capture Sophie Bluel",
   image: "images/portfolio.png",
    contexte: "Dans le cadre de ma formation chez OpenClassrooms, j'ai développé un portfolio web pour une architecte d'intérieur. Le projet comprend une interface publique présentant ses réalisations et une interface d'administration permettant de gérer les projets de la galerie.",
    objectifs: "Rendre la galerie dynamique, permettre le filtrage des réalisations par catégories et développer un espace d'administration sécurisé pour ajouter et supprimer des projets.",
    technologies: [
      { nom: "HTML5", logo: "html5" }, { nom: "CSS3", logo: "css" }, { nom: "JavaScript natif", logo: "javascript" },
      { nom: "API REST (fetch)" }, { nom: "Node.js", logo: "nodejs" }, { nom: "Express", logo: "express" }, { nom: "SQLite", logo: "sqlite" }
    ],
    technoTexte: "Le frontend repose sur HTML5, CSS3 et JavaScript natif. Les échanges avec l'API REST sont réalisés avec fetch. Le backend utilise Node.js, Express et SQLite pour gérer les données et les opérations liées aux projets et à l'authentification.",
    competences: "J'ai travaillé sur la manipulation du DOM, les événements JavaScript, les requêtes HTTP et la gestion des réponses de l'API. J'ai également développé la connexion utilisateur, l'affichage conditionnel des fonctionnalités d'administration, le filtrage des projets, la prévisualisation des images et l'envoi de fichiers avec FormData.",
    resultats: "Le site permet de consulter les réalisations de l'architecte, de filtrer les projets par catégorie et d'accéder à une interface d'administration après connexion. Cette interface permet d'ajouter des projets avec une image, un titre et une catégorie, ainsi que de supprimer des réalisations existantes.",
    perspectives: "Le projet pourrait être amélioré par l'ajout de tests automatisés, une validation plus complète des formulaires et une meilleure gestion des erreurs réseau.",
    captures: [],
    liens: { github: "https://github.com/Elyse234/Projet3", demo: "" }
  },
  {
    id: "nina-carducci",
    titre: "Nina Carducci",
    sousTitre: "Optimisation SEO, performance et accessibilité",
    description: "Audit et optimisation du site vitrine d'une photographe : performance, SEO et accessibilité.",
    resultat: "Lighthouse performance : 35 → 64",
    tags: ["SEO", "Lighthouse", "jQuery"],
    legende: "Capture Nina Carducci",
    image: "",
    contexte: "Dans le cadre de ma formation chez OpenClassrooms, j'ai travaillé sur l'optimisation du site vitrine d'une photographe professionnelle. La mission consistait à analyser le site existant, identifier les problèmes techniques et améliorer ses performances, son référencement naturel et son accessibilité.",
    objectifs: "Réduire le temps de chargement, optimiser les ressources, corriger les problèmes d'accessibilité et améliorer le SEO. Il fallait également corriger les dysfonctionnements de la galerie photo afin de garantir une navigation fluide.",
    technologies: [
      { nom: "HTML", logo: "html5" }, { nom: "CSS", logo: "css" }, { nom: "JavaScript", logo: "javascript" }, { nom: "jQuery", logo: "jquery" },
      { nom: "MauGallery" }, { nom: "Lighthouse", logo: "lighthouse" }, { nom: "Chrome DevTools" }, { nom: "Squoosh" }
    ],
    technoTexte: "Le projet utilise HTML, CSS, JavaScript, jQuery ainsi que le plugin MauGallery. Lighthouse, Chrome DevTools et Squoosh ont servi à auditer le site, analyser son fonctionnement et optimiser les images.",
    competences: "J'ai appris à analyser les performances web avec Lighthouse, à compresser et convertir des images au format WebP et à corriger des problèmes JavaScript liés à la galerie. J'ai également travaillé sur le SEO technique, la structure HTML et les bonnes pratiques d'accessibilité.",
    resultats: "Le score Lighthouse de performance est passé de 35 à 52 après la première optimisation des images, puis a atteint 64 lors de l'audit final. Les corrections JavaScript ont également amélioré la navigation dans la galerie, le filtrage par catégories et l'état actif des boutons.",
    scores: [ // audit final
      { label: "Performance", valeur: 64 },
      { label: "Accessibilité", valeur: 65 },
      { label: "Bonnes pratiques", valeur: 92 },
      { label: "SEO", valeur: 92 }
      // « 73 en SO » dans la fiche : à préciser avant de l'ajouter
    ],
    perspectives: "Poursuivre l'optimisation des performances, traiter les problèmes d'accessibilité restants et améliorer les éléments SEO. De nouveaux audits et des tests sur différents appareils permettraient de vérifier les progrès et de maintenir la qualité du site.",
    captures: [],
    liens: { github: "https://github.com/Elyse234/Projet4", demo: "" }
  },
  {
    id: "kasa",
    titre: "Kasa",
    sousTitre: "Application web de location d'hébergements",
    description: "Application React responsive pour consulter des logements, leurs photos, équipements et descriptions.",
    resultat: "Application monopage responsive",
    tags: ["React", "Sass", "React Router"],
    legende: "Capture Kasa",
    image: "",
    contexte: "Kasa est un projet réalisé dans le cadre de ma formation en développement web chez OpenClassrooms. Il consiste à développer une application web permettant de consulter des logements à louer et de découvrir leurs caractéristiques à travers une interface moderne et intuitive.",
    objectifs: "Créer une application React responsive, reproduire les maquettes fournies et faciliter la navigation entre les différentes pages. Le projet m'a également permis de structurer l'interface à l'aide de composants réutilisables et de gérer les interactions utilisateur.",
    technologies: [
      { nom: "HTML", logo: "html5" }, { nom: "CSS", logo: "css" }, { nom: "JavaScript", logo: "javascript" },
      { nom: "React", logo: "react" }, { nom: "React Router", logo: "reactrouter" }, { nom: "Sass / SCSS", logo: "sass" }
    ],
    technoTexte: "Le projet repose sur React, JavaScript, JSX, React Router et Sass/SCSS. Les informations des logements sont chargées depuis un fichier JSON local.",
    competences: "J'ai développé des composants réutilisables pour afficher les logements, les bannières, les accordéons et les diaporamas d'images. J'ai également mis en place la navigation entre les pages, l'affichage dynamique des données, les interactions d'ouverture et de fermeture des accordéons ainsi que la gestion des logements introuvables.",
    resultats: "Une application web monopage permettant de consulter les logements, d'accéder à leurs détails, de parcourir leurs photos et de découvrir les équipements et descriptions. L'interface comprend également une page « À propos », une navigation visuellement active, une page d'erreur et une mise en page responsive.",
    perspectives: "Ajouter une recherche multicritère, des filtres par type de logement ou par équipement, ainsi qu'un système de favoris. Une connexion à une API permettrait aussi de récupérer les données depuis un service externe plutôt que depuis un fichier JSON local.",
    captures: [],
    // À VÉRIFIER : ce lien est identique à celui de Mon Vieux Grimoire dans la fiche
    liens: { github: "https://github.com/Elyse234/Projet6", demo: "" }
  },
  {
    id: "mon-vieux-grimoire",
    titre: "Mon Vieux Grimoire",
    sousTitre: "Une API REST pour gérer et noter des livres",
    description: "Back-end d'une application de référencement et de notation de livres, avec authentification et traitement d'images.",
    resultat: "API sécurisée + top 3 des livres",
    tags: ["Node.js", "Express", "MongoDB"],
    legende: "Capture Mon Vieux Grimoire",
    image: "",
    contexte: "Dans le cadre de ma formation OpenClassrooms, j'ai développé le back-end de Mon Vieux Grimoire, une application de référencement et de notation de livres.",
    objectifs: "Créer une API REST permettant de gérer les livres et les utilisateurs, de sécuriser les opérations et de traiter les images envoyées par les utilisateurs.",
    technologies: [
      { nom: "Node.js", logo: "nodejs" }, { nom: "Express", logo: "express" }, { nom: "MongoDB", logo: "mongodb" },
      { nom: "Mongoose", logo: "mongoose" }, { nom: "JWT", logo: "jwt" }, { nom: "bcrypt" }, { nom: "Multer" }, { nom: "Sharp" }
    ],
    technoTexte: "Le projet utilise Node.js, Express, MongoDB et Mongoose, ainsi que JWT, bcrypt, Multer et Sharp pour l'authentification, la sécurité et le traitement des images.",
    competences: "",
    resultats: "Une API REST connectée à MongoDB, intégrant l'authentification, la gestion des livres, les notations et un classement des trois livres les mieux notés.",
    perspectives: "Le projet pourrait être enrichi par des tests automatisés, une documentation interactive de l'API et une gestion centralisée des erreurs.",
    captures: [],
    liens: { github: "https://github.com/Elyse234/Projet6", demo: "" }
  },
  {
    id: "menu-maker",
    titre: "Menu Maker / Qwenta",
    sousTitre: "Préparation et gestion d'un projet",
    description: "Préparation d'un projet web : spécifications techniques, suivi Kanban, planification et veille technologique.",
    resultat: "Livrables de gestion de projet",
    tags: ["Kanban", "Planification", "Veille"],
    legende: "Tableau Kanban",
    sombre: true,
    image: "",
    contexte: "Dans le cadre de ma formation chez OpenClassrooms, j'ai travaillé sur la préparation d'un projet web pour Qwenta, autour de la solution Menu Maker. Le projet m'a permis d'aborder les étapes d'organisation et de planification nécessaires avant le développement d'une application.",
    objectifs: "Transformer les besoins fonctionnels en spécifications techniques, planifier les tâches et mettre en place des outils de suivi afin d'organiser efficacement le travail et de suivre l'avancement du projet.",
    technologies: [
      { nom: "Spécifications techniques" }, { nom: "Tableau Kanban" }, { nom: "Outils de planification" }, { nom: "Veille technologique" }
    ],
    technoTexte: "Le projet s'appuie sur la rédaction de spécifications techniques, un tableau de suivi des tâches de type Kanban et des outils de planification. Une démarche de veille technologique permet également d'identifier et de suivre les technologies et solutions pertinentes pour le projet.",
    competences: "J'ai travaillé sur l'analyse des besoins fonctionnels, la rédaction des spécifications techniques, la décomposition du projet en tâches et la planification des étapes de réalisation. J'ai également développé mes compétences en gestion de projet agile et en organisation d'une veille technologique.",
    resultats: "Les livrables de préparation du projet : spécifications techniques, tableau de suivi et outils de planification, ainsi qu'un tableau de veille technologique. Ces éléments constituent une base de travail pour organiser le développement et suivre les tâches à réaliser.",
    perspectives: "Enrichir la démarche par des points de suivi réguliers, une mise à jour continue et une veille documentée et périodiquement actualisée. Un bilan final permettrait aussi de comparer la planification initiale avec l'avancement réel du projet.",
    captures: [],
    liens: { github: "", demo: "" }
  }
];

const SOCIAL = {
  github: "#",    // ex. "https://github.com/ton-pseudo"
  linkedin: "#"   // ex. "https://linkedin.com/in/ton-profil"
};
