/*
 * WEBSITE CONTENT
 *
 * Edit this file to add a publication, a course, or a news item.
 * Duplicate an existing object and replace its values.
 */

const SITE_CONTENT = {
  publicationGroups: [
    {
      heading: "Workshops",
      publications: [
        {
          title: "Towards PAC-Bayesian Guarantees for Self-Certified Fair Classification",
          authors: [
            "Julien Bastian",
            "Benjamin Leblanc",
            "Pascal Germain",
            "Amaury Habrard",
            "Christine Largeron",
            "Guillaume Metzler",
            "Emilie Morvant",
            "Paul Viallard"
          ],
          venue: "Learning Theory Summer School & Workshop (LTSS), Copenhagen",
          year: "2026",
          note: "",
          links: []
        }
      ]
    },
    {
      heading: "French conferences",
      publications: [
        {
          title: "Garanties en généralisation PAC-Bayésiennes pour l'équité de prédicteurs stochastiques et déterministes",
          authors: [
            "Julien Bastian",
            "Benjamin Leblanc",
            "Pascal Germain",
            "Amaury Habrard",
            "Christine Largeron",
            "Guillaume Metzler",
            "Emilie Morvant",
            "Paul Viallard"
          ],
          venue: "Conférence sur l'Apprentissage automatique (CAp), PFIA",
          year: "2026",
          note: "",
          links: []
        }
      ]
    },
    {
      heading: "Preprints",
      publications: [
        {
          title: "PAC-Bayesian Generalization Guarantees for Fairness on Stochastic and Deterministic Classifiers",
          authors: [
            "Julien Bastian",
            "Benjamin Leblanc",
            "Pascal Germain",
            "Amaury Habrard",
            "Christine Largeron",
            "Guillaume Metzler",
            "Emilie Morvant",
            "Paul Viallard"
          ],
          venue: "arXiv:2602.11722",
          year: "2026",
          note: "",
          links: [
            { label: "link", url: "https://arxiv.org/abs/2602.11722" }
          ]
        }
      ]
    }
  ],

  teachingYears: [
    {
      year: "2025–2026",
      courses: [
        {
          code: "M4DSM821",
          title: "Information Systems",
          details: "1st-year Master's in Economic Analysis and Policy · 18 h labs",
          description: ""
        },
        {
          code: "S3INF05B",
          title: "Programming",
          details: "2nd-year BSc in Computer Science, apprenticeship track · 14 h labs",
          description: ""
        },
        {
          code: "S8DSC02",
          title: "Machine Learning Fundamentals",
          details: "1st-year Master's in Data and Connected Systems · 5 h lectures and 3 h labs",
          description: ""
        },
        {
          code: "5MLMUT3",
          title: "Machine Learning I",
          details: "2nd-year Master's in Economics, Data and Decision Science · 18 h lectures",
          description: ""
        }
      ]
    },
    {
      year: "2024–2025",
      courses: [
        {
          code: "M4DSM821",
          title: "Information Systems",
          details: "1st-year Master's in Economic Analysis and Policy · 18 h labs",
          description: ""
        },
        {
          code: "S3INF05B",
          title: "Programming",
          details: "2nd-year BSc in Computer Science, apprenticeship track · 14 h labs",
          description: ""
        },
        {
          code: "S8DSC02",
          title: "Machine Learning Fundamentals",
          details: "1st-year Master's in Data and Connected Systems · 5 h lectures and 3 h labs",
          description: ""
        },
        {
          code: "UE33L2IN",
          title: "Computer Science III: Programming",
          details: "2nd-year BSc in Economics · 24 h labs",
          description: ""
        }
      ]
    }
  ],

  news: [
    {
      date: "Juin 2026",
      datetime: "2026-06",
      title: "[Titre de l'actualité]",
      text: "[Annonce courte : nouvel article, conférence, présentation ou déplacement.]",
      link: { label: "En savoir plus", url: "#" }
    },
    {
      date: "Mars 2026",
      datetime: "2026-03",
      title: "[Présentation ou événement]",
      text: "[Quelques mots sur le contexte et le sujet.]",
      link: null
    }
  ]
};
