#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

paint_src="$ROOT/src/assets/page-images/paintings"
code_src="$ROOT/src/assets/page-images/code-art"
face_src="$ROOT/src/assets/page-images/face-value"

paint_out="$ROOT/src/assets/optimized/paintings"
code_out="$ROOT/src/assets/optimized/code-art"
face_out="$ROOT/src/assets/optimized/face-value"

mkdir -p "$paint_out/thumb_jpg" "$paint_out/thumb_heic" "$paint_out/full_jpg" "$paint_out/full_heic"
mkdir -p "$code_out/960_jpg" "$code_out/960_heic" "$code_out/1600_jpg" "$code_out/1600_heic"
mkdir -p "$face_out/960_jpg" "$face_out/960_heic" "$face_out/1800_jpg" "$face_out/1800_heic"

convert_dir() {
  local src_dir="$1"
  local out_1_jpg="$2"
  local out_1_heic="$3"
  local out_2_jpg="$4"
  local out_2_heic="$5"
  local size_1="$6"
  local size_2="$7"

  find "$src_dir" -maxdepth 1 -type f \
    \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.avif' -o -iname '*.gif' \) \
    -print0 | while IFS= read -r -d '' file; do
      local name stem
      name="$(basename "$file")"
      stem="${name%.*}"

      sips -Z "$size_1" -s format jpeg -s formatOptions 72 "$file" --out "$out_1_jpg/$stem.jpg" >/dev/null
      sips -Z "$size_2" -s format jpeg -s formatOptions 78 "$file" --out "$out_2_jpg/$stem.jpg" >/dev/null

      # HEIC is a modern format; keep JPG fallback for full browser coverage.
      sips -Z "$size_1" -s format heic -s formatOptions 70 "$file" --out "$out_1_heic/$stem.heic" >/dev/null || true
      sips -Z "$size_2" -s format heic -s formatOptions 74 "$file" --out "$out_2_heic/$stem.heic" >/dev/null || true
    done
}

convert_dir "$paint_src" "$paint_out/thumb_jpg" "$paint_out/thumb_heic" "$paint_out/full_jpg" "$paint_out/full_heic" 760 1800
convert_dir "$code_src" "$code_out/960_jpg" "$code_out/960_heic" "$code_out/1600_jpg" "$code_out/1600_heic" 960 1600
convert_dir "$face_src" "$face_out/960_jpg" "$face_out/960_heic" "$face_out/1800_jpg" "$face_out/1800_heic" 960 1800

echo "Optimized image derivatives generated in src/assets/optimized/."
