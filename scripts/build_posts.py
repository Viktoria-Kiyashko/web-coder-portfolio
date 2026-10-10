
import json
from pathlib import Path
from datetime import date, datetime

import yaml

posts = []

for file in Path("posts").glob("*.md"):
    text = file.read_text(encoding="utf-8")

    if not text.startswith("---"):
        continue

    parts = text.split("---", 2)
    if len(parts) < 3:
        continue

    metadata = yaml.safe_load(parts[1]) or {}

    if not isinstance(metadata, dict):
        continue

    post = metadata.copy()

    if isinstance(post.get("date"), (date, datetime)):
        post["date"] = post["date"].isoformat()

    post["body"] = parts[2].strip()
    post["slug"] = file.stem

    posts.append(post)

posts.sort(
    key=lambda post: str(post.get("date", "")),
    reverse=True
)

Path("posts.json").write_text(
    json.dumps(posts, ensure_ascii=False, indent=2),
    encoding="utf-8"
)

print(f"Собрано публикаций: {len(posts)}")
