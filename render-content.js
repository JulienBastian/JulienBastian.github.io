function element(tag, className, text) {
  const node = document.createElement(tag);

  if (className) node.className = className;
  if (text) node.textContent = text;

  return node;
}

function addLinks(parent, links) {
  if (!links || links.length === 0) return;

  const container = element("div", "entry-links");

  links.forEach((link) => {
    const linkItem = element("span", "entry-link-item");
    const anchor = element("a", "article-link", link.label);
    anchor.href = link.url;

    if (link.url !== "#") {
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }

    linkItem.appendChild(document.createTextNode("["));
    linkItem.appendChild(anchor);
    linkItem.appendChild(document.createTextNode("]"));
    container.appendChild(linkItem);
  });

  parent.appendChild(container);
}

function renderPublications() {
  const container = document.querySelector("#publication-content");

  SITE_CONTENT.publicationGroups.forEach((group) => {
    const visiblePublications = group.publications.filter(
      (publication) => !publication.hidden
    );

    if (visiblePublications.length === 0) return;

    const groupNode = element("div", "publication-group");
    groupNode.appendChild(element("h3", "group-heading", group.heading));

    const list = element("div", "publication-list");

    visiblePublications.forEach((publication) => {
      const article = element("article", "publication-entry");
      article.appendChild(element("h4", "publication-title", publication.title));

      const authors = element("p", "entry-authors");
      publication.authors.forEach((author, index) => {
        let authorNode = document.createTextNode(author);

        if (author === "Julien Bastian") {
          const strong = element("strong");
          strong.appendChild(authorNode);
          authorNode = strong;
        }

        authors.appendChild(authorNode);
        if (index < publication.authors.length - 1) {
          authors.appendChild(document.createTextNode(", "));
        }
      });
      article.appendChild(authors);

      const venue = element("p", "publication-venue");
      venue.appendChild(document.createTextNode(publication.venue));
      venue.appendChild(document.createTextNode(`, ${publication.year}`));
      article.appendChild(venue);

      if (publication.note) {
        article.appendChild(element("p", "publication-note", publication.note));
      }

      addLinks(article, publication.links);
      list.appendChild(article);
    });

    groupNode.appendChild(list);
    container.appendChild(groupNode);
  });
}

function renderTeaching() {
  const container = document.querySelector("#teaching-content");

  SITE_CONTENT.teachingYears.forEach((teachingYear) => {
    const group = element("div", "teaching-year");
    group.appendChild(element("h3", "group-heading", teachingYear.year));

    const list = element("div", "teaching-list");

    teachingYear.courses.forEach((course) => {
      const article = element("article", "teaching-course");
      const heading = element("div", "course-heading");
      heading.appendChild(element("h4", "", course.title));

      if (course.language) {
        heading.appendChild(element("span", "course-language", course.language));
      }

      article.appendChild(heading);
      article.appendChild(element("p", "entry-authors", course.details));

      if (course.description) {
        article.appendChild(element("p", "", course.description));
      }

      list.appendChild(article);
    });

    group.appendChild(list);
    container.appendChild(group);
  });
}

function renderSeminars() {
  const section = document.querySelector("#seminars");
  const navLink = document.querySelector("#seminars-nav");
  const container = document.querySelector("#seminar-content");
  const seminars = SITE_CONTENT.seminars || [];

  if (seminars.length === 0) return;

  section.hidden = false;
  navLink.hidden = false;

  const list = element("div", "seminar-list");

  seminars.forEach((seminar) => {
    const article = element("article", "seminar-entry");
    article.appendChild(element("h3", "seminar-title", seminar.title));

    const details = [seminar.event, seminar.location, seminar.date]
      .filter(Boolean)
      .join(" · ");

    if (details) {
      article.appendChild(element("p", "seminar-details", details));
    }

    if (seminar.note) {
      article.appendChild(element("p", "seminar-note", seminar.note));
    }

    addLinks(article, seminar.links);
    list.appendChild(article);
  });

  container.appendChild(list);
}

function renderNews() {
  const container = document.querySelector("#news-content");
  if (!container) return;

  const list = element("div", "news-list");

  SITE_CONTENT.news.forEach((item) => {
    const article = element("article", "news-entry");
    const time = element("time", "", item.date);
    time.dateTime = item.datetime;
    article.appendChild(time);

    const content = element("div", "news-body");
    content.appendChild(element("h3", "", item.title));
    content.appendChild(element("p", "", item.text));

    if (item.link) addLinks(content, [item.link]);

    article.appendChild(content);
    list.appendChild(article);
  });

  container.appendChild(list);
}

renderPublications();
renderSeminars();
renderTeaching();
renderNews();
