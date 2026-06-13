#!/usr/bin/env python3
"""Build transparent Velora mark PNGs + favicon.ico from source PNG."""
from __future__ import annotations

import math
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(
    sys.argv[1]
    if len(sys.argv) > 1
    else r"D:\Discord\Boost Bot V2 (IA)\data\redeem-panel-clone\public\brand\velora-mark-512.png"
)
OUT_DIR = ROOT / "themes" / "156746" / "assets"
STRAIGHTEN_DEG = 3.2  # counter slight clockwise tilt in source art


def orange_points(im: Image.Image) -> list[tuple[int, int]]:
    px = im.load()
    w, h = im.size
    pts: list[tuple[int, int]] = []
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a > 128 and r + g + b > 60:
                pts.append((x, y))
    return pts


def principal_angle(pts: list[tuple[int, int]]) -> float:
    cx = sum(p[0] for p in pts) / len(pts)
    cy = sum(p[1] for p in pts) / len(pts)
    sxx = syy = sxy = 0.0
    for x, y in pts:
        dx = x - cx
        dy = y - cy
        sxx += dx * dx
        syy += dy * dy
        sxy += dx * dy
    return 0.5 * math.degrees(math.atan2(2 * sxy, sxx - syy))


def trim(im: Image.Image, pad: int = 8) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(im.width, x1 + pad)
    y1 = min(im.height, y1 + pad)
    return im.crop((x0, y0, x1, y1))


def resize_contain(im: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    im.thumbnail((size, size), Image.Resampling.LANCZOS)
    ox = (size - im.width) // 2
    oy = (size - im.height) // 2
    canvas.paste(im, (ox, oy), im)
    return canvas


def main() -> int:
    if not SOURCE.exists():
        print(f"Source not found: {SOURCE}")
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    im = Image.open(SOURCE).convert("RGBA")
    pts = orange_points(im)
    angle = principal_angle(pts)
    rotate_by = -angle
    print(f"Detected tilt: {angle:.2f} deg, rotating {rotate_by:.2f} deg")

    straight = im.rotate(rotate_by, resample=Image.Resampling.BICUBIC, expand=True)
    straight = trim(straight, pad=12)

    for name, size in (
        ("velora-mark-512.png", 512),
        ("velora-mark-128.png", 128),
        ("velora-mark-32.png", 32),
    ):
        out = resize_contain(straight.copy(), size)
        path = OUT_DIR / name
        out.save(path, optimize=True)
        print(f"OK {path.name} ({size}x{size})")

    ico_sizes = [16, 32, 48]
    ico_images = [resize_contain(straight.copy(), s) for s in ico_sizes]
    ico_path = OUT_DIR / "favicon.ico"
    ico_images[0].save(
        ico_path,
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
        append_images=ico_images[1:],
    )
    print(f"OK {ico_path.name}")

    redeem = SOURCE.parent
    for name, size in (
        ("velora-mark-512.png", 512),
        ("velora-mark-128.png", 128),
        ("velora-mark-32.png", 32),
    ):
        out = resize_contain(straight.copy(), size)
        out.save(redeem / name, optimize=True)

    ico_images[0].save(
        redeem / "favicon.ico",
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
        append_images=ico_images[1:],
    )
    print("OK redeem-panel-clone/public/brand synced")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
