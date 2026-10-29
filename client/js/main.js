
/* Logique du portfolio : rendu des données, fiches projet,
   menu mobile, lien actif et formulaire de contact. */
(function () {
  "use strict";

  /* ---------- Utilitaires ---------- */

  // Crée un élément sans innerHTML pour éviter les injections HTML.
  function el(tag, props, children) {
    const node = document.createElement(tag);

    Object.entries(props || {}).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });

    (children || []).forEach(c => {
      if (c) node.appendChild(c);
    });

    return node;
  }

  const tagEl = (label, dark) =>
    el("span", {
      class: "tag" + (dark ? " d" : ""),
      text: label
    });

  const techEl = t =>
    el("span", { class: "tag tech" }, [
      t.logo
        ? el("img", {
            src: "assets/icons/" + t.logo + ".svg",
            alt: "",
            width: "16",
            height: "16"
          })
        : null,
      document.createTextNode(t.nom)
    ]);

  /* ---------- Rendu des compétences ---------- */

  function renderSkills() {
    const grid = document.getElementById("skills-grid");

    if (!grid || typeof SKILLS === "undefined") {
      console.error("Données des compétences introuvables.");
      return;
    }

    grid.replaceChildren();

    SKILLS.forEach(s => {
      grid.appendChild(
        el("div", { class: "card" }, [
          el("h3", { text: s.titre }),
          ...s.tags.map(t => tagEl(t, s.dark))
        ])
      );
    });
  }

  /* ---------- Rendu des projets ---------- */

  function renderProjects() {
    const grid = document.getElementById("projects-grid");

    if (!grid || typeof PROJECTS === "undefined") {
      console.error("Données des projets introuvables.");
      return;
    }

    grid.replaceChildren();

    PROJECTS.forEach(p => {
      const shot = el("div", {
        class: "shot" + (p.sombre ? " k" : "")
      });

      if (p.image) {
        shot.appendChild(
          el("img", {
            src: p.image,
            alt: p.legende,
            loading: "lazy"
          })
        );
      } else {
        shot.textContent = p.legende;
      }

      const links = el("div", { class: "pl" });

      if (p.fiche !== false) {
        const btn = el("button", {
          class: "linkbtn",
          type: "button",
          text: "Voir la fiche"
        });

        btn.addEventListener("click", () => openProject(p));
        links.appendChild(btn);
      }

      if (p.liens.github) {
        links.appendChild(
          el("a", {
            href: p.liens.github,
            target: "_blank",
            rel: "noopener",
            text: "GitHub"
          })
        );
      }

      if (p.liens.demo) {
        links.appendChild(
          el("a", {
            href: p.liens.demo,
            target: "_blank",
            rel: "noopener",
            text: "Démo"
          })
        );
      }

      grid.appendChild(
        el("article", { class: "card proj" }, [
          shot,
          el("div", { class: "pb" }, [
            el("h3", { text: p.titre }),
            el("p", { text: p.description }),
            el("div", { class: "res", text: p.resultat }),
            el("div", {}, p.tags.map(t => tagEl(t))),
            links
          ])
        ])
      );
    });
  }

  /* ---------- Fiche détaillée d'un projet ---------- */

  const dialog = document.getElementById("project-dialog");
  const dialogBody = document.getElementById("dialog-body");
  let lastTrigger = null;

  const section = (titre, ...contenu) =>
    el("section", { class: "fiche-sec" }, [
      el("h4", { text: titre }),
      ...contenu.filter(Boolean)
    ]);

  function openProject(p) {
    if (!dialog || !dialogBody) return;

    lastTrigger = document.activeElement;
    dialogBody.replaceChildren();

    dialogBody.appendChild(
      el("div", { class: "eyebrow", text: "Fiche projet" })
    );

    dialogBody.appendChild(
      el("h3", { id: "dialog-title", text: p.titre })
    );

    dialogBody.appendChild(
      el("p", { class: "fiche-sub", text: p.sousTitre || "" })
    );

    if (p.contexte) {
      dialogBody.appendChild(
        section("Contexte", el("p", { text: p.contexte }))
      );
    }

    if (p.objectifs) {
      dialogBody.appendChild(
        section("Objectifs", el("p", { text: p.objectifs }))
      );
    }

    if (p.technologies && p.technologies.length) {
      dialogBody.appendChild(
        section(
          "Technologies utilisées",
          el("div", {
            class: "tech-row"
          }, p.technologies.map(techEl)),
          p.technoTexte
            ? el("p", { text: p.technoTexte })
            : null
        )
      );
    }

    if (p.competences) {
      dialogBody.appendChild(
        section(
          "Compétences développées",
          el("p", { text: p.competences })
        )
      );
    }

    if (p.resultats) {
      const bloc = [
        el("p", { text: p.resultats })
      ];

      if (p.scores) {
        bloc.push(
          el("div", { class: "scores" },
            p.scores.map(s =>
              el("div", { class: "score" }, [
                el("b", { text: String(s.valeur) }),
                el("span", { text: s.label })
              ])
            )
          )
        );

        bloc.push(
          el("p", {
            class: "note",
            text: "Audit Lighthouse final"
          })
        );
      }

      dialogBody.appendChild(
        section("Résultats et impact", ...bloc)
      );
    }

    if (p.perspectives) {
      dialogBody.appendChild(
        section(
          "Perspectives d'amélioration",
          el("p", { text: p.perspectives })
        )
      );
    }

    const caps = p.captures && p.captures.length
      ? el(
          "div",
          { class: "caps" },
          p.captures.map(src =>
            el("img", {
              src,
              alt: "Capture du projet " + p.titre,
              loading: "lazy"
            })
          )
        )
      : el("p", {
          class: "note",
          text: "Captures d'écran à venir."
        });

    dialogBody.appendChild(
      section("Captures d'écran", caps)
    );

    const liens = el("div", { class: "cta" });

    if (p.liens.github) {
      liens.appendChild(
        el("a", {
          class: "btn p",
          href: p.liens.github,
          target: "_blank",
          rel: "noopener",
          text: "Voir le dépôt GitHub"
        })
      );
    }

    if (p.liens.demo) {
      liens.appendChild(
        el("a", {
          class: "btn s",
          href: p.liens.demo,
          target: "_blank",
          rel: "noopener",
          text: "Voir le projet"
        })
      );
    }

    if (liens.children.length) {
      dialogBody.appendChild(
        section("Liens et ressources", liens)
      );
    }

    dialog.showModal();
    dialog.scrollTop = 0;
  }

  function initDialog() {
    if (!dialog) return;

    const closeButton = document.getElementById("dialog-close");

    if (closeButton) {
      closeButton.addEventListener("click", () => dialog.close());
    }

    dialog.addEventListener("click", e => {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", () => {
      if (lastTrigger && typeof lastTrigger.focus === "function") {
        lastTrigger.focus();
      }
    });
  }

  /* ---------- Menu mobile ---------- */

  function initMenu() {
    const burger = document.getElementById("burger");
    const links = document.getElementById("links");

    if (!burger || !links) return;

    function setOpen(open) {
      links.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    }

    burger.addEventListener("click", () => {
      setOpen(!links.classList.contains("open"));
    });

    links.addEventListener("click", e => {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Navigation active au scroll ---------- */

  function initActiveLink() {
    const navLinks = document.querySelectorAll(
      '.links a[href^="#"]:not(.btn)'
    );

    if (!("IntersectionObserver" in window)) return;

    const sections = [...navLinks]
      .map(a => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(a => {
          a.classList.toggle(
            "on",
            a.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, {
      rootMargin: "-45% 0px -50% 0px"
    });

    sections.forEach(s => obs.observe(s));
  }

  /* ---------- Formulaire de contact avec Node.js ---------- */

  function initForm() {
    const form = document.getElementById("contact-form");
    const msg = document.getElementById("form-msg");

    if (!form || !msg) {
      console.error("Formulaire ou zone de message introuvable.");
      return;
    }

    const submitButton = form.querySelector(
      'button[type="submit"]'
    );

    const fields = [
      {
        id: "n",
        err: "Merci d'indiquer ton nom.",
        ok: v => v.trim().length >= 2
      },
      {
        id: "e",
        err: "Email invalide.",
        ok: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      },
      {
        id: "m",
        err: "Ton message doit contenir au moins 10 caractères.",
        ok: v => v.trim().length >= 10
      }
    ];

    console.log("Gestionnaire du formulaire initialisé.");

    // Un seul gestionnaire submit : il empêche la navigation HTML.
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("Soumission interceptée par JavaScript.");

      // Vérifier les champs avant d'appeler l'API.
      let valid = true;

      fields.forEach(f => {
        const input = document.getElementById(f.id);
        const errorElement = document.getElementById(f.id + "-err");

        if (!input) {
          valid = false;
          return;
        }

        const good = f.ok(input.value);

        input.setAttribute("aria-invalid", String(!good));

        if (errorElement) {
          errorElement.textContent = good ? "" : f.err;
        }

        if (!good) valid = false;
      });

      if (!valid) {
        msg.textContent = "Merci de corriger les champs indiqués.";
        return;
      }

      if (submitButton && submitButton.disabled) return;

      const nom = document.getElementById("n").value.trim();
      const email = document.getElementById("e").value.trim();
      const message = document.getElementById("m").value.trim();

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Envoi en cours...";
      }

      msg.textContent = "Envoi de ton message...";
      msg.setAttribute("role", "status");

      try {
        // IMPORTANT :
        // Le backend doit être démarré sur le port 3000.
        const response = await fetch(
          "https://portfolio-just-for-testing.onrender.com/api/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nom,
              email,
              message
            })
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "L'envoi du message a échoué."
          );
        }

        msg.textContent =
          result.message || "Ton message a bien été envoyé !";

        form.reset();

        fields.forEach(f => {
          const input = document.getElementById(f.id);
          const errorElement = document.getElementById(f.id + "-err");

          if (input) input.setAttribute("aria-invalid", "false");
          if (errorElement) errorElement.textContent = "";
        });

      } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire :", error);

        if (error instanceof TypeError) {
          msg.textContent =
            "Impossible de contacter le serveur. Vérifie que le backend Node.js est démarré.";
        } else {
          msg.textContent =
            error.message || "Une erreur est survenue. Réessaie plus tard.";
        }

      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Envoyer";
        }
      }
    });
  }

  /* ---------- Démarrage du portfolio ---------- */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (typeof SOCIAL !== "undefined") {
    const github = document.getElementById("link-github");
    const linkedin = document.getElementById("link-linkedin");

    if (github) github.href = SOCIAL.github;
    if (linkedin) linkedin.href = SOCIAL.linkedin;
  }

  renderSkills();
  renderProjects();
  initDialog();
  initMenu();
  initActiveLink();
  initForm();

})();
