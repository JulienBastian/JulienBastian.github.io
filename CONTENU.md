# Modifier le contenu du site

Les listes de publications, séminaires et enseignements se trouvent dans
`content.json`. Le fichier `index.html` est généré automatiquement : il ne faut
pas modifier directement ses sections Research, Seminars et Teaching.

Après chaque modification de `content.json`, régénérer la page avec :

```bash
python3 build.py
```

Pour vérifier le résultat localement :

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://127.0.0.1:8000/>. Le fichier `index.html` généré doit être
commité avec les autres changements afin que GitHub Pages publie la nouvelle
version pré-rendue.

## Modifier la présentation générale

Modifier `index.template.html`, puis exécuter `python3 build.py`. Le texte de la
section About, la navigation et les scripts visuels sont définis dans ce modèle.

## Ajouter le CV

Placer le CV au format PDF dans `documents/CV-Julien-Bastian.pdf`. Ajouter
ensuite son lien dans `index.template.html`, puis régénérer la page.

## Ajouter une publication

Dans `content.json`, sélectionner une catégorie de `publicationGroups`, puis
ajouter un objet dans sa liste `publications` :

```json
{
  "title": "Exact paper title",
  "authors": ["Julien Bastian", "First name Last name"],
  "venue": "Workshop, conference, or arXiv name",
  "year": "2026",
  "note": "Optional short note, or an empty string.",
  "links": [
    { "label": "Article", "url": "https://arxiv.org/abs/..." },
    { "label": "Code", "url": "https://github.com/..." }
  ]
}
```

Ajouter `"hidden": true` pour conserver une publication dans les données sans
l'afficher. Utiliser une chaîne vide pour une note absente et une liste vide
pour des liens absents.

## Ajouter une catégorie de publications

Ajouter un objet dans `publicationGroups` :

```json
{
  "heading": "International conferences",
  "publications": []
}
```

Les catégories ne contenant aucune publication visible sont automatiquement
omises de la page générée.

## Ajouter un enseignement

Ajouter un cours à l'année concernée dans `teachingYears` :

```json
{
  "code": "COURSE01",
  "title": "Introduction to Machine Learning",
  "language": "English",
  "details": "1st-year Master's in Computer Science · 8 h lectures and 12 h labs",
  "description": "Optional short description of the course."
}
```

Pour une nouvelle année universitaire, ajouter un bloc contenant `year` et
`courses`.

## Ajouter un séminaire ou un exposé scientifique

Ajouter l'entrée la plus récente au début de la liste `seminars` :

```json
{
  "title": "Title of the talk",
  "event": "Name of the seminar or research group",
  "location": "Institution or city",
  "date": "October 2026",
  "note": "Optional context, or an empty string.",
  "links": [
    { "label": "Slides", "url": "https://..." }
  ]
}
```

La navigation et la section Seminars sont automatiquement omises lorsque la
liste est vide.

## Ajouter une actualité

La liste `news` est conservée dans `content.json`, mais aucune section News
n'est actuellement présente dans le modèle. Elle pourra être activée plus tard
en ajoutant un emplacement dans `index.template.html` et son rendu dans
`build.py`.
