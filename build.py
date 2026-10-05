#!/usr/bin/env python3
"""Generate the static index.html file from content.json."""

from __future__ import annotations

import html
import json
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent
CONTENT_PATH = ROOT / "content.json"
TEMPLATE_PATH = ROOT / "index.template.html"
OUTPUT_PATH = ROOT / "index.html"


def escape(value: Any) -> str:
    return html.escape(str(value), quote=True)


def render_links(links: list[dict[str, str]]) -> str:
    if not links:
        return ""

    items = []
    for link in links:
        label = escape(link["label"])
        url = escape(link["url"])
        external = ' target="_blank" rel="noopener noreferrer"' if url != "#" else ""
        items.append(
            f'                    <span class="entry-link-item">[<a class="article-link" href="{url}"{external}>{label}</a>]</span>'
        )

    return '\n                <div class="entry-links">\n' + "\n".join(items) + "\n                </div>"


def render_publications(groups: list[dict[str, Any]]) -> str:
    rendered_groups = []

    for group in groups:
        publications = [item for item in group["publications"] if not item.get("hidden", False)]
        if not publications:
            continue

        entries = []
        for publication in publications:
            authors = ", ".join(
                f"<strong>{escape(author)}</strong>" if author == "Julien Bastian" else escape(author)
                for author in publication["authors"]
            )
            note = ""
            if publication.get("note"):
                note = f'\n                <p class="publication-note">{escape(publication["note"])}</p>'

            entries.append(
                "\n".join(
                    [
                        '            <article class="publication-entry">',
                        f'                <h4 class="publication-title">{escape(publication["title"])}</h4>',
                        f'                <p class="entry-authors">{authors}</p>',
                        f'                <p class="publication-venue">{escape(publication["venue"])}, {escape(publication["year"])}</p>{note}{render_links(publication.get("links", []))}',
                        "            </article>",
                    ]
                )
            )

        rendered_groups.append(
            "\n".join(
                [
                    '        <div class="publication-group">',
                    f'            <h3 class="group-heading">{escape(group["heading"])}</h3>',
                    '            <div class="publication-list">',
                    "\n".join(entries),
                    "            </div>",
                    "        </div>",
                ]
            )
        )

    return "\n".join(rendered_groups)


def render_seminars(seminars: list[dict[str, Any]]) -> str:
    entries = []
    for seminar in seminars:
        details = " · ".join(
            escape(value)
            for value in (seminar.get("event"), seminar.get("location"), seminar.get("date"))
            if value
        )
        detail_html = f'\n            <p class="seminar-details">{details}</p>' if details else ""
        note_html = (
            f'\n            <p class="seminar-note">{escape(seminar["note"])}</p>'
            if seminar.get("note")
            else ""
        )
        entries.append(
            "\n".join(
                [
                    '        <article class="seminar-entry">',
                    f'            <h3 class="seminar-title">{escape(seminar["title"])}</h3>{detail_html}{note_html}{render_links(seminar.get("links", []))}',
                    "        </article>",
                ]
            )
        )

    return "\n".join(entries)


def render_teaching(years: list[dict[str, Any]]) -> str:
    rendered_years = []

    for teaching_year in years:
        courses = []
        for course in teaching_year["courses"]:
            language = (
                f'\n                    <span class="course-language">{escape(course["language"])}</span>'
                if course.get("language")
                else ""
            )
            description = (
                f'\n                <p>{escape(course["description"])}</p>'
                if course.get("description")
                else ""
            )
            courses.append(
                "\n".join(
                    [
                        '            <article class="teaching-course">',
                        '                <div class="course-heading">',
                        f'                    <h4>{escape(course["title"])}</h4>{language}',
                        "                </div>",
                        f'                <p class="entry-authors">{escape(course["details"])}</p>{description}',
                        "            </article>",
                    ]
                )
            )

        rendered_years.append(
            "\n".join(
                [
                    '        <div class="teaching-year">',
                    f'            <h3 class="group-heading">{escape(teaching_year["year"])}</h3>',
                    '            <div class="teaching-list">',
                    "\n".join(courses),
                    "            </div>",
                    "        </div>",
                ]
            )
        )

    return "\n".join(rendered_years)


def build() -> None:
    content = json.loads(CONTENT_PATH.read_text(encoding="utf-8"))
    template = TEMPLATE_PATH.read_text(encoding="utf-8")

    seminars = content.get("seminars", [])
    replacements = {
        "{{SEMINARS_NAV}}": '<a href="#seminars">Seminars</a>' if seminars else "",
        "{{PUBLICATIONS}}": render_publications(content.get("publicationGroups", [])),
        "{{SEMINARS_SECTION}}": (
            '<section id="seminars" class="reveal">\n'
            '    <h2>Seminars</h2>\n'
            f'    <div class="seminar-list">\n{render_seminars(seminars)}\n    </div>\n'
            "</section>"
            if seminars
            else ""
        ),
        "{{TEACHING}}": render_teaching(content.get("teachingYears", [])),
    }

    generated = template
    for marker, rendered_html in replacements.items():
        if marker not in generated:
            raise ValueError(f"Missing template marker: {marker}")
        generated = generated.replace(marker, rendered_html)

    unresolved = [marker for marker in replacements if marker in generated]
    if unresolved:
        raise ValueError(f"Unresolved template markers: {', '.join(unresolved)}")

    OUTPUT_PATH.write_text(generated, encoding="utf-8")
    print(f"Generated {OUTPUT_PATH.name} from {CONTENT_PATH.name}")


if __name__ == "__main__":
    build()
