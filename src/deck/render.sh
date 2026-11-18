#!/bin/bash
# usage: render.sh deck.pptx outprefix dpi
set -e
d=$(dirname "$1"); b=$(basename "$1" .pptx)
pkill -f soffice >/dev/null 2>&1 || true
timeout 400 python3 /home/claude/tools/render_uno.py "$1" "$d/$b.pdf"
rm -f "$2"-*.jpg
pdftoppm -jpeg -r "${3:-110}" "$d/$b.pdf" "$2"
