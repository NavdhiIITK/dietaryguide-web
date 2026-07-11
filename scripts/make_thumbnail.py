#!/usr/bin/env python3
"""
Generate a branded Dietary Guide blog thumbnail (1200x630, OG-optimised).

Usage:
    python make_thumbnail.py post.json out.png
    python make_thumbnail.py --title "..." [--subtitle "..."] [--tag "..."] out.png

Reads title/subtitle/first-tag from a post.json (the same file publish-blog-post.mjs
consumes) and renders a clean, on-brand title card. Uses bundled Poppins fonts if
present (scripts/assets/fonts), otherwise falls back to DejaVu so it always runs.
"""
import argparse
import json
import os
import sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# Brand palette
GREEN = (22, 163, 74)          # #16a34a
GREEN_LIGHT = (220, 252, 231)  # #dcfce7
GREEN_SOFT = (240, 253, 244)   # #f0fdf4
INK = (15, 23, 42)             # #0f172a
MUTED = (71, 85, 105)          # #475569
WHITE = (255, 255, 255)

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_DIRS = [
    os.path.join(HERE, "assets", "fonts"),
    "/usr/share/fonts/truetype/google-fonts",
]


def find_font(names):
    for d in FONT_DIRS:
        for n in names:
            p = os.path.join(d, n)
            if os.path.exists(p):
                return p
    return None


def load(names, size, fallback):
    p = find_font(names) or fallback
    return ImageFont.truetype(p, size)


DEJAVU = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
DEJAVU_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def wrap(draw, text, font, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_tracked(draw, xy, text, font, fill, tracking=2):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("args", nargs="*")
    ap.add_argument("--title")
    ap.add_argument("--subtitle")
    ap.add_argument("--tag")
    ns = ap.parse_args()

    title = ns.title
    subtitle = ns.subtitle or ""
    tag = ns.tag or ""

    positional = list(ns.args)
    if title is None and positional and positional[0].endswith(".json"):
        data = json.load(open(positional[0], encoding="utf-8"))
        title = data.get("title", "")
        subtitle = data.get("subtitle", "") or ""
        tags = data.get("tags") or []
        tag = (tags[0] if tags else "")
        out = positional[1] if len(positional) > 1 else "thumbnail.png"
    else:
        out = positional[-1] if positional else "thumbnail.png"

    if not title:
        print("No title provided.", file=sys.stderr)
        sys.exit(1)

    img = Image.new("RGB", (W, H), WHITE)

    # Soft green decorative corner (top-right)
    wash = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    wd = ImageDraw.Draw(wash)
    wd.ellipse([W - 260, -180, W + 180, 260], fill=GREEN_SOFT + (255,))
    wd.ellipse([W - 150, -120, W + 120, 150], fill=GREEN_LIGHT + (255,))
    img = Image.alpha_composite(img.convert("RGBA"), wash).convert("RGB")
    d = ImageDraw.Draw(img)

    # Left accent bar
    d.rectangle([0, 0, 14, H], fill=GREEN)

    margin_x = 70
    content_w = W - margin_x - 90

    # Wordmark
    f_mark = load(["Poppins-SemiBold.ttf", "Poppins-Medium.ttf"], 26, DEJAVU_BOLD)
    dot_r = 9
    d.ellipse([margin_x, 66, margin_x + dot_r * 2, 66 + dot_r * 2], fill=GREEN)
    draw_tracked(d, (margin_x + dot_r * 2 + 14, 62), "DIETARY GUIDE", f_mark, GREEN, tracking=3)

    # Category chip
    y = 128
    if tag:
        f_chip = load(["Poppins-Medium.ttf"], 24, DEJAVU_BOLD)
        tw = d.textlength(tag.upper(), font=f_chip)
        pad = 20
        d.rounded_rectangle([margin_x, y, margin_x + tw + pad * 2, y + 44], radius=22, fill=GREEN_LIGHT)
        d.text((margin_x + pad, y + 8), tag.upper(), font=f_chip, fill=GREEN)
        y += 74

    # Title, dynamic sizing to fit
    title = title.strip()
    lines, f_title, line_h = [], None, 0
    for size in (72, 66, 60, 54, 48, 44):
        f_title = load(["Poppins-Bold.ttf"], size, DEJAVU_BOLD)
        lines = wrap(d, title, f_title, content_w)
        line_h = int(size * 1.16)
        if len(lines) <= 4 and y + line_h * len(lines) < H - 150:
            break
    ty = y
    for ln in lines:
        d.text((margin_x, ty), ln, font=f_title, fill=INK)
        ty += line_h

    # Subtitle (optional)
    if subtitle:
        f_sub = load(["Poppins-Regular.ttf"], 27, DEJAVU)
        for ln in wrap(d, subtitle, f_sub, content_w)[:2]:
            ty += 6
            if ty > H - 120:
                break
            d.text((margin_x, ty + 12), ln, font=f_sub, fill=MUTED)
            ty += 38

    # Footer
    d.line([margin_x, H - 78, margin_x + 54, H - 78], fill=GREEN, width=4)
    f_foot = load(["Poppins-Medium.ttf"], 24, DEJAVU_BOLD)
    d.text((margin_x, H - 62), "dietaryguide.in", font=f_foot, fill=MUTED)
    f_foot2 = load(["Poppins-Regular.ttf"], 22, DEJAVU)
    tagline = "Healthy eating, made simple for India"
    tw2 = d.textlength(tagline, font=f_foot2)
    d.text((W - 90 - tw2, H - 60), tagline, font=f_foot2, fill=MUTED)

    img.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({os.path.getsize(out)} bytes)")


if __name__ == "__main__":
    main()
