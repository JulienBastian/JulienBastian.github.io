# Modifier le contenu du site

Toutes les listes sont dans `content.js`. Il n'est pas nécessaire de modifier
`index.html`, `style.css` ou `render-content.js` pour ajouter du contenu.

## Ajouter le CV

Placer le CV au format PDF dans `documents/CV-Julien-Bastian.pdf`. Le bouton
`CV` de la section About le proposera alors directement au téléchargement.

## Add a publication

1. Open `content.js`.
2. Select a category in `publicationGroups`.
3. Duplicate an object from the corresponding `publications` list.
4. Replace its fields:

```js
{
  title: "Exact paper title",
  authors: ["Julien Bastian", "First name Last name"],
  venue: "Workshop, conference, or arXiv name",
  year: "2026",
  note: "Optional short note, or an empty string.",
  links: [
    { label: "Article", url: "https://arxiv.org/abs/..." },
    { label: "Code", url: "https://github.com/..." }
  ]
}
```

A comma must separate two publications. Use `note: ""` for no note and
`links: []` for no publication links.

## Add a publication category

Duplicate a complete group in `publicationGroups`:

```js
{
  heading: "International conferences",
  publications: [
    // Add publications from this category here.
  ]
}
```

## Add a course

In `teachingYears`, add a course to the relevant academic year:

```js
{
  code: "COURSE01",
  title: "Introduction to Machine Learning",
  details: "1st-year Master's in Computer Science · Semester 1 · 8 h lectures and 12 h labs",
  description: "Optional short description of the course."
}
```

For a new academic year, duplicate a block containing `year` and `courses`.

## Ajouter une actualité

Ajouter l'actualité la plus récente au début de la liste `news` :

```js
{
  date: "Octobre 2026",
  datetime: "2026-10",
  title: "Présentation au séminaire X",
  text: "Présentation de mes travaux sur l'équité en apprentissage.",
  link: { label: "Slides", url: "https://..." }
}
```

Utiliser `link: null` lorsqu'il n'y a pas de lien.
