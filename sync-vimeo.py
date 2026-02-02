#!/usr/bin/env python3
"""
WalserFly Vimeo Auto-Sync
=========================
Liest Videos aus Vimeo-Ordnern (Winter, Frühling, Sommer, Herbst, KI)
und ergänzt videos-config.js automatisch mit neuen Videos.

Bestehende Videos in videos-config.js werden NICHT gelöscht.
Nur neue Videos aus Vimeo werden hinzugefügt.
"""

import os
import re
import json
import sys
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from datetime import datetime

# ===== KONFIGURATION =====
VIMEO_TOKEN = os.environ.get("VIMEO_TOKEN", "")
CONFIG_FILE = "videos-config.js"

# Mapping: Vimeo-Ordnername → JavaScript-Key
FOLDER_MAP = {
    "Winter": "winter",
    "Frühling": "fruehling",
    "Fruhling": "fruehling",
    "Fruehling": "fruehling",
    "Sommer": "sommer",
    "Herbst": "herbst",
    "KI": "ki",
    "Ki": "ki",
}


def vimeo_api(endpoint):
    """Macht einen GET-Request an die Vimeo API."""
    url = f"https://api.vimeo.com{endpoint}"
    req = Request(url)
    req.add_header("Authorization", f"Bearer {VIMEO_TOKEN}")
    req.add_header("Accept", "application/vnd.vimeo.*+json;version=3.4")

    try:
        with urlopen(req) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as e:
        print(f"❌ Vimeo API Fehler: {e.code} - {e.reason}")
        if e.code == 401:
            print("   → Token ungültig oder abgelaufen!")
        body = e.read().decode("utf-8")
        print(f"   → {body[:300]}")
        return None


def get_folders():
    """Holt alle Vimeo-Ordner/Projekte."""
    data = vimeo_api("/me/projects?per_page=100")
    if not data:
        return []

    folders = []
    for project in data.get("data", []):
        name = project.get("name", "")
        uri = project.get("uri", "")
        # URI ist z.B. /users/123456/projects/789
        folders.append({"name": name, "uri": uri})
        print(f"  📁 Ordner gefunden: {name} ({uri})")

    return folders


def get_videos_in_folder(folder_uri):
    """Holt alle Videos aus einem Vimeo-Ordner."""
    videos = []
    page = 1

    while True:
        data = vimeo_api(f"{folder_uri}/videos?per_page=100&page={page}")
        if not data:
            break

        for video in data.get("data", []):
            video_uri = video.get("uri", "")
            # URI ist z.B. /videos/123456789
            video_id = video_uri.split("/")[-1]

            videos.append({
                "id": video_id,
                "title": video.get("name", "Ohne Titel"),
                "url": f"https://player.vimeo.com/video/{video_id}",
                "duration": video.get("duration", 0),
                "created": video.get("created_time", ""),
                "thumbnail": get_thumbnail(video),
            })

        # Pagination
        paging = data.get("paging", {})
        if paging.get("next"):
            page += 1
        else:
            break

    return videos


def get_thumbnail(video):
    """Extrahiert die beste Thumbnail-URL."""
    pictures = video.get("pictures", {})
    sizes = pictures.get("sizes", [])

    # Nimm das größte Thumbnail
    for size in reversed(sizes):
        if size.get("link"):
            return size["link"]

    return ""


def parse_existing_config(filepath):
    """Liest die bestehende videos-config.js und extrahiert vorhandene Video-IDs."""
    existing_ids = {}  # season -> set of video IDs

    if not os.path.exists(filepath):
        print(f"  ⚠️ {filepath} nicht gefunden. Wird neu erstellt.")
        return {}, ""

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Extrahiere alle Vimeo-Video-IDs pro Kategorie
    for js_key in ["winter", "fruehling", "sommer", "herbst", "ki"]:
        existing_ids[js_key] = set()
        # Suche nach player.vimeo.com/video/XXXXXXX
        pattern = rf"(?:'{js_key}'|{js_key})\s*:\s*\[(.*?)\]"
        match = re.search(pattern, content, re.DOTALL)
        if match:
            section = match.group(1)
            ids = re.findall(r"player\.vimeo\.com/video/(\d+)", section)
            existing_ids[js_key] = set(ids)
            print(f"  📋 {js_key}: {len(ids)} bestehende Videos")

    return existing_ids, content


def build_video_entry(video):
    """Erstellt einen JavaScript-Eintrag für ein Video."""
    # Escape einfache Anführungszeichen im Titel
    title = video["title"].replace("'", "\\'")
    return f"    {{ id: '{video['id']}', title: '{title}', url: '{video['url']}' }}"


def update_config(existing_ids, existing_content, new_videos_by_season):
    """Aktualisiert videos-config.js mit neuen Videos."""

    if not existing_content:
        # Erstelle komplett neue Datei
        existing_content = "window.VIDEOS = {\n"
        for key in ["winter", "fruehling", "sommer", "herbst", "ki"]:
            existing_content += f"  {key}: [],\n"
        existing_content += "};\n"

    updated_content = existing_content
    total_new = 0

    for season, videos in new_videos_by_season.items():
        # Filtere nur wirklich neue Videos
        new_videos = [v for v in videos if v["id"] not in existing_ids.get(season, set())]

        if not new_videos:
            continue

        total_new += len(new_videos)
        print(f"  ✨ {season}: {len(new_videos)} neue Videos gefunden!")

        # Erstelle neue Einträge
        new_entries = ",\n".join([build_video_entry(v) for v in new_videos])

        # Füge neue Videos am ANFANG des Arrays ein (neueste zuerst)
        pattern = rf"({season}\s*:\s*\[)"
        replacement = f"{season}: [\n{new_entries},\n"

        # Prüfe ob das Array leer ist
        empty_pattern = rf"{season}\s*:\s*\[\s*\]"
        if re.search(empty_pattern, updated_content):
            replacement_empty = f"{season}: [\n{new_entries}\n  ]"
            updated_content = re.sub(empty_pattern, replacement_empty, updated_content)
        else:
            updated_content = re.sub(pattern, replacement, updated_content, count=1)

    return updated_content, total_new


def main():
    print("=" * 50)
    print("🎬 WalserFly Vimeo Auto-Sync")
    print(f"📅 {datetime.now().isoformat()}")
    print("=" * 50)

    if not VIMEO_TOKEN:
        print("❌ VIMEO_TOKEN nicht gesetzt!")
        print("   Setze den Token als GitHub Secret oder Umgebungsvariable.")
        sys.exit(1)

    # 1. Vimeo-Ordner auslesen
    print("\n📁 Lese Vimeo-Ordner...")
    folders = get_folders()

    if not folders:
        print("❌ Keine Ordner gefunden oder API-Fehler!")
        sys.exit(1)

    # 2. Videos pro Ordner abrufen
    print("\n🎥 Lese Videos aus Ordnern...")
    new_videos_by_season = {}

    for folder in folders:
        folder_name = folder["name"]
        js_key = FOLDER_MAP.get(folder_name)

        if not js_key:
            print(f"  ⏩ Überspringe Ordner '{folder_name}' (nicht gemappt)")
            continue

        print(f"\n  📂 {folder_name} → {js_key}")
        videos = get_videos_in_folder(folder["uri"])
        print(f"     → {len(videos)} Videos gefunden")

        if videos:
            new_videos_by_season[js_key] = videos

    # 3. Bestehende Config lesen
    print(f"\n📋 Lese bestehende {CONFIG_FILE}...")
    existing_ids, existing_content = parse_existing_config(CONFIG_FILE)

    # 4. Config aktualisieren
    print("\n🔄 Aktualisiere Config...")
    updated_content, total_new = update_config(
        existing_ids, existing_content, new_videos_by_season
    )

    if total_new == 0:
        print("\n✅ Keine neuen Videos gefunden. Alles aktuell!")
        return

    # 5. Datei speichern
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        f.write(updated_content)

    print(f"\n🎉 {total_new} neue Videos hinzugefügt!")
    print(f"✅ {CONFIG_FILE} aktualisiert!")


if __name__ == "__main__":
    main()
