#!/usr/bin/env python3
"""
WalserFly Vimeo FULL-SYNC
=========================
Liest ALLE Videos aus Vimeo-Ordnern und ERSETZT videos-config.js komplett.
- Neues Video auf Vimeo → erscheint auf Website
- Video gelöscht auf Vimeo → verschwindet von Website
- Video verschoben auf Vimeo → verschiebt sich auf Website
"""

import os
import json
import sys
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from datetime import datetime

VIMEO_TOKEN = os.environ.get("VIMEO_TOKEN", "")
CONFIG_FILE = "videos-config.js"
COVERS_FILE = "season-covers.js"

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
    url = f"https://api.vimeo.com{endpoint}"
    req = Request(url)
    req.add_header("Authorization", f"Bearer {VIMEO_TOKEN}")
    req.add_header("Accept", "application/vnd.vimeo.*+json;version=3.4")
    try:
        with urlopen(req) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as e:
        print(f"❌ API Fehler: {e.code}")
        return None


def get_folders():
    data = vimeo_api("/me/projects?per_page=100")
    if not data:
        return []
    folders = []
    for project in data.get("data", []):
        folders.append({"name": project.get("name", ""), "uri": project.get("uri", "")})
        print(f"  📁 {project.get('name')}")
    return folders


def get_videos_in_folder(folder_uri):
    videos = []
    page = 1
    while True:
        data = vimeo_api(f"{folder_uri}/videos?per_page=100&page={page}&sort=date&direction=desc")
        if not data:
            break
        for video in data.get("data", []):
            video_id = video.get("uri", "").split("/")[-1]
            videos.append({
                "id": video_id,
                "title": video.get("name", "Ohne Titel"),
                "url": f"https://player.vimeo.com/video/{video_id}",
                "thumbnail": get_thumbnail(video),
            })
        if not data.get("paging", {}).get("next"):
            break
        page += 1
    return videos


def get_thumbnail(video):
    sizes = video.get("pictures", {}).get("sizes", [])
    best, best_w = "", 0
    for s in sizes:
        if s.get("width", 0) > best_w:
            best, best_w = s.get("link", ""), s.get("width", 0)
    return best


def build_config(all_videos):
    js = "// Auto-generiert von sync-vimeo.py (FULL SYNC)\n"
    js += f"// {datetime.now().strftime('%Y-%m-%d %H:%M')}\n"
    js += "window.VIDEOS = {\n"
    for season in ["winter", "fruehling", "sommer", "herbst", "ki"]:
        js += f"  {season}: [\n"
        for v in all_videos.get(season, []):
            title = v["title"].replace("'", "\\'")
            js += f"    {{ id: '{v['id']}', title: '{title}', url: '{v['url']}' }},\n"
        js += "  ],\n"
    js += "};\n"
    return js


def build_covers(all_videos):
    js = "// Auto-generiert von sync-vimeo.py\n"
    js += f"// {datetime.now().strftime('%Y-%m-%d %H:%M')}\n"
    js += "window.SEASON_COVERS = {\n"
    for season in ["winter", "fruehling", "sommer", "herbst", "ki"]:
        videos = all_videos.get(season, [])
        if videos and videos[0].get("thumbnail"):
            js += f"  {season}: '{videos[0]['thumbnail']}',\n"
    js += "};\n"
    return js


def main():
    print("=" * 50)
    print("🎬 WalserFly Vimeo FULL-SYNC")
    print("=" * 50)

    if not VIMEO_TOKEN:
        print("❌ VIMEO_TOKEN fehlt!")
        sys.exit(1)

    print("\n📁 Lese Ordner...")
    folders = get_folders()
    if not folders:
        sys.exit(1)

    print("\n🎥 Lese Videos...")
    all_videos = {}
    total = 0

    for folder in folders:
        js_key = FOLDER_MAP.get(folder["name"])
        if not js_key:
            continue
        print(f"\n  📂 {folder['name']} → {js_key}")
        videos = get_videos_in_folder(folder["uri"])
        print(f"     → {len(videos)} Videos")
        all_videos[js_key] = videos
        total += len(videos)

    print(f"\n📝 Schreibe {CONFIG_FILE}...")
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        f.write(build_config(all_videos))

    print(f"📝 Schreibe {COVERS_FILE}...")
    with open(COVERS_FILE, "w", encoding="utf-8") as f:
        f.write(build_covers(all_videos))

    print(f"\n✅ FULL SYNC: {total} Videos in {len(all_videos)} Kategorien")
    for s, v in all_videos.items():
        print(f"   {s}: {len(v)}")


if __name__ == "__main__":
    main()
