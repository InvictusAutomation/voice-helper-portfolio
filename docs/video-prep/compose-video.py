#!/usr/bin/env python3
"""Be The Only - Video Composer v6 - Simple & Robust"""
import os, sys, subprocess, shutil
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.expanduser("~/Desktop/code/codebuddy/voice-helper-portfolio")
PUBLIC = BASE + "/remotion-videos/public"
OUTPUT = BASE + "/remotion-videos/output/be-the-only.mp4"
TMPDIR = "/tmp/bto-v6"

shutil.rmtree(TMPDIR, ignore_errors=True)
os.makedirs(TMPDIR)
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)

W, H, FPS = 1920, 1080, 30
FF = "/usr/local/bin/ffmpeg"


def get_font(size):
    for p in ["/System/Library/Fonts/HelveticaNeue.ttc",
              "/System/Library/Fonts/Helvetica.ttc",
              "/Library/Fonts/Arial Unicode.ttf"]:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                continue
    return ImageFont.load_default()


def txt_img(text, fontsize=36, color=(255,255,255,240), shadow=None,
            anchor="mm", w=W, h=H):
    img = Image.new("RGBA", (w, h), (0,0,0,0))
    draw = ImageDraw.Draw(img)
    f = get_font(fontsize)
    bbox = draw.textbbox((0,0), text, font=f)
    tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
    x_map = {"mm":(w-tw)//2, "top":(w-tw)//2, "bottom":(w-tw)//2}
    y_map = {"mm":(h-th)//2, "top":140, "bottom":h-200}
    px = x_map.get(anchor, (w-tw)//2)
    py = y_map.get(anchor, (h-th)//2)
    if shadow:
        sx, sy = shadow[0], shadow[1]
        if isinstance(shadow, tuple) and len(shadow) >= 5:
            scolor = (shadow[2], shadow[3], shadow[4], 180)
        elif isinstance(shadow, tuple) and len(shadow) >= 3:
            sr = shadow[2] if len(shadow) > 2 else 100
            sg = shadow[3] if len(shadow) > 3 else sr
            sb = shadow[4] if len(shadow) > 4 else sg
            scolor = (sr, sg, sb, 180)
        else:
            scolor = (100, 100, 100, 180)
        draw.text((px+sx, py+sy), text, fill=scolor, font=f)
    draw.text((px, py), text, fill=color, font=f)
    return img


def png2mp4(png_path, mp4_path, dur=5):
    subprocess.run([FF, "-y", "-loop", "1", "-t", str(dur),
                    "-i", png_path,
                    "-c:v", "libx264", "-preset", "ultrafast", "-crf", "18",
                    "-pix_fmt", "yuv420p", "-r", str(FPS),
                    mp4_path], capture_output=True)


def run(args, desc=""):
    cmd = [FF, "-y"] + list(args)
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        err = r.stderr[-400:] if r.stderr else "unknown"
        print(f"FAIL [{desc}]: {err[-200:]}")
        return False
    print(f"OK [{desc}]")
    return True


def run_filter_script(args, filter_text, desc=""):
    """Write filter to a temp file and run with filter_complex_script."""
    fc_path = TMPDIR + "/filter.txt"
    with open(fc_path, "w") as f:
        f.write(filter_text)

    # Insert -filter_complex_script after all input args (before any output/mapping args)
    # Strategy: insert right before the first arg that starts with '-' and isn't an input flag
    new_args = []
    inserted = False
    for i, arg in enumerate(args):
        # Insert before the first output-related argument (after all -i inputs)
        if not inserted and arg.startswith("-") and arg not in ("-i", "-y"):
            new_args.extend(["-filter_complex_script", fc_path])
            inserted = True
        new_args.append(arg)
    
    # If we haven't inserted yet (no suitable position found), append at end before last few args
    if not inserted:
        # Find a good insertion point: before -map or -c:v
        final_args = []
        for i, arg in enumerate(new_args):
            if not inserted and arg in ("-map", "-t", "-c:v", "-c:a", "-an", "-vn"):
                final_args.extend(["-filter_complex_script", fc_path])
                inserted = True
            final_args.append(arg)
        new_args = final_args
    
    return run(new_args, desc)


print("=" * 50)
print(" Be The Only - Video Composer v6")
print("=" * 50)


# ============================================================
# SHOT 1: Taiwan (tw.mp4 + 1-1.mp4 face + subtitle)
# ============================================================
print("\n--- Shot 1: Taiwan ---")
s1_sub = TMPDIR + "/s1sub.png"
txt_img("I was born in Taiwan, a breezy island.", 44,
        (255,255,255,245), (87,206,235,200), "top").save(s1_sub)
png2mp4(s1_sub, TMPDIR + "/s1sub_vid.mp4", 6)

fc_s1 = (
        "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080[bg];"
        "[1:v]scale=-1:600,pad=1920:1080:(ow-iw)/2:(oh-ih)/2+80:color=0x87CEEB[fg];"
        "[bg][fg]overlay=(W-w)/2:H-h*0.85[v];"
        "[v][2]overlay=0:0:enable=between(t,0.8,4.4)[out]"
    )

run_filter_script([
    "-i", PUBLIC + "/assets/tw.mp4",
    "-i", PUBLIC + "/clips/1-1.mp4",
    "-i", TMPDIR + "/s1sub_vid.mp4",
    "-map", "[out]",
    "-map", "1:a?",
    "-t", "4.4",
    "-c:v", "libx264", "-preset", "medium", "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k",
    TMPDIR + "/s1.mp4"
], fc_s1, "S1 Taiwan")


# ============================================================
# SHOT 2: Jimmy Liao (dark bg + 1-2.mp4 face + subtitle)
# ============================================================
print("\n--- Shot 2: Jimmy Liao ---")
s2_sub = TMPDIR + "/s2sub.png"
txt_img("I grew up mesmerized by Jimmy Liao's paintings.", 42,
        (255,255,255,240), (221,160,221,180), "top").save(s2_sub)
png2mp4(s2_sub, TMPDIR + "/s2sub_vid.mp4", 5)

fc_s2 = (
        "[1:v]scale=-1:560,pad=1920:1080:(ow-iw)/2:(oh-ih)/2+80:color=0x1A1A2E[face];"
        "[0:v][face]overlay=(W-w)/2:(H-h)/2[v];"
        "[v][2]overlay=0:0:enable=between(t,0.8,2.9)[out]"
    )

run_filter_script([
    "-f", "lavfi", "-i", ("color=c=0x1A1A2E:s=%dx%d:d=%.1f:r=%d" % (W,H,3.2,FPS)),
    "-i", PUBLIC + "/clips/1-2.mp4",
    "-i", TMPDIR + "/s2sub_vid.mp4",
    "-map", "[out]", "-map", "1:a?",
    "-t", "3.2",
    "-c:v", "libx264", "-preset", "medium", "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k",
    TMPDIR + "/s2.mp4"
], fc_s2, "S2 JimmyLiao")


# ============================================================
# SHOT 3a: Phineas & Ferb (GIF + text + attribution)
# ============================================================
print("\n--- Shot 3a: Phineas & Ferb ---")
s3a_dur = 5.4
s3a_main = TMPDIR + "/s3amain.png"
txt_img("Phineas and Ferb told me that\nthe best summer vacation is the one where we build things.",
        30, (33,33,33,235), (255,255,255,120), "bottom").save(s3a_main)

s3a_attr = TMPDIR + "/s3aattr.png"
txt_img("Clip from Phineas and Ferb (C) Disney, via GIPHY",
        15, (33,33,33,90)).save(s3a_attr)

png2mp4(s3a_main, TMPDIR + "/s3amain_vid.mp4", s3a_dur+1)
png2mp4(s3a_attr, TMPDIR + "/s3aattr_vid.mp4", s3a_dur+1)

# First convert GIF to video
gif_mp4 = TMPDIR + "/gif_conv.mp4"
subprocess.run([FF, "-y", "-f", "gif", "-i", PUBLIC + "/assets/phineas-ferb-giphy.gif",
                "-vf", ("scale=%d:-2" % int(H*0.7)),
                "-t", str(s3a_dur),
                "-c:v", "libx264", "-preset", "ultrafast", "-crf", "20",
                "-pix_fmt", "yuv420p", "-r", str(FPS),
                gif_mp4], capture_output=True)

fc_s3a = (
        "[0:v][1:v]overlay=(W-w)/2:(H-h)/2[v];"
        "[v][2]overlay=(W-w)/2:%d:enable=between(t,0.3,5.0)[v2]" % (H-220) +
        ";[v2][3]overlay=%d:%d:enable=between(t,0.1,%f)[out]" % (W-380, H-45, s3a_dur)
    )

run_filter_script([
    "-f", "lavfi", "-i", ("color=c=0x4FC3F7:s=%dx%d:d=%.1f:r=%d" % (W,H,s3a_dur,FPS)),
    "-i", gif_mp4,
    "-i", PUBLIC + "/clips/2-1.mp4",
    "-i", TMPDIR + "/s3amain_vid.mp4",
    "-i", TMPDIR + "/s3aattr_vid.mp4",
    "-t", str(s3a_dur),
    "-c:v", "libx264", "-preset", "medium", "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-map", "[out]", "-map", "2:a?",
    "-c:a", "aac", "-b:a", "192k",
    TMPDIR + "/s3a.mp4"
], fc_s3a, "S3a P&F")


# ============================================================
# SHOT 3b: Deep Thinking (dark bg + 2-1.mp4 offset + text lines)
# ============================================================
print("\n--- Shot 3b: Deep Thinking ---")
s3b_dur = 8.0
lines_3b = [
    ("Then, I always get obsessed with the feeling"),
    ("of diving deep into thinking"),
    ("and the underlying logic of the world with great minds."),
]

for idx, lt in enumerate(lines_3b):
    lp = TMPDIR + ("/s3bl%d.png" % idx)
    txt_img(lt, 28, (255,255,255,230), (0,0,0,150)).save(lp)
    png2mp4(lp, TMPDIR + ("/s3bl%d.mp4" % idx), s3b_dur)

# Build inputs and filters
bg_cmd = ["-f", "lavfi", "-i",
          "color=c=0x0A1628:s=%dx%d:d=%.1f:r=%d" % (W,H,s3b_dur,FPS)]
face_in = ["-i", PUBLIC + "/clips/2-1.mp4"]
text_ins = []
for idx in range(len(lines_3b)):
    text_ins += ["-i", TMPDIR + ("/s3bl%d.mp4" % idx)]

# Step 1: composite background + face
step1 = TMPDIR + "/s3b_step1.mp4"
run(bg_cmd + face_in +
    ["-filter_complex",
     "[0:v][1:v]overlay=%d:%d[vo]" % (W-500, H-350),
     "-t", str(s3b_dur),
     "-c:v", "libx264", "-preset", "ultrafast", "-crf", "20",
     "-pix_fmt", "yuv420p",
     "-map", "[vo]", "-map", "1:a?",
     "-c:a", "aac", "-b:a", "192k",
     step1], "S3b step1 bg+face")

# Step 2: add text overlays one at a time
prev_vid = step1
for idx in range(len(lines_3b)):
    st = 0.5 + idx * 2.2
    en = min(st + 6.0, s3b_dur - 0.5)
    yi = H - 180 + idx * 40
    txt_input = TMPDIR + ("/s3bl%d.mp4" % idx)
    out_vid = TMPDIR + ("/s3b_step%d.mp4" % (idx+2)) if idx < len(lines_3b)-1 else TMPDIR + "/s3b.mp4"

    # Use filter script file to avoid escaping issues
    fc_text = '[0:v][1:v]overlay=(W-tw)/2:%d:enable=between(t,%g,%g)[out]' % (yi, st, en)
    
    run_filter_script(
        ["-i", prev_vid,
         "-i", txt_input,
         "-t", str(s3b_dur),
         "-c:v", "libx264", "-preset", "medium", "-crf", "18",
         "-pix_fmt", "yuv420p",
         "-map", "[out]",
         # copy audio only from first input
         "-map", "0:a?", "-c:a", "copy",
         out_vid], fc_text, "S3b text%d" % idx)
    prev_vid = out_vid

# Clean up intermediate files
import glob as _glob
for f in _glob.glob(TMPDIR + "/s3b_step*.mp4"):
    if f != TMPDIR + "/s3b.mp4":
        os.unlink(f)


# ============================================================
# SHOT 4: Singapore Seminar (bookclub blur + 2-2 audio + text)
# ============================================================
print("\n--- Shot 4: Singapore Seminar ---")
s4_dur = 8.0

s4a_txt = "During my PG in Singapore, I once randomly stopped\npeople on the corridor to come join the seminar."
s4a_p = TMPDIR + "/s4a.png"
txt_img(s4a_txt, 30, (44,62,80,240), (255,255,255,100)).save(s4a_p)
png2mp4(s4a_p, TMPDIR + "/s4a_vid.mp4", s4_dur)

s4b_txt = "I organized and shared my opinions on AI\nwith people from different countries."
s4b_p = TMPDIR + "/s4b.png"
txt_img(s4b_txt, 30, (44,62,80,240), (255,255,255,100)).save(s4b_p)
png2mp4(s4b_p, TMPDIR + "/s4b_vid.mp4", s4_dur)

fc_text = (
        '[0:v]scale=1920:1080:force_original_aspect_ratio=increase,'
        'boxblur=%d:%d:0.08[blur];' % (W//10, H//10) +
        'color=s=%dx%d:c=0xFFF8E7:d=%.1f:r=30[warm];' % (W, H, s4_dur) +
        '[warm][blur]overlay=0:0[v0];' +
        '[v0][2]overlay=(W-tw)/2:360:enable=between(t,0.6,4.2)[v1];' +
        '[v1][3]overlay=(W-tw)/2:h-250:enable=between(t,4.2,%g)[out]' % s4_dur
    )

run_filter_script([
    "-i", PUBLIC + "/clips/bookclub.mp4",
    "-i", PUBLIC + "/clips/2-2.MP3",
    "-i", TMPDIR + "/s4a_vid.mp4",
    "-i", TMPDIR + "/s4b_vid.mp4",
    "-t", str(s4_dur),
    "-c:v", "libx264", "-preset", "medium", "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-map", "[out]", "-map", "1:a?",
    "-c:a", "aac", "-b:a", "192k",
    "-af", ("atrim=end=%.1f,volume=0.90" % s4_dur),
    TMPDIR + "/s4.mp4"
], fc_text, "S4 Singapore")


# ============================================================
# SHOT 5: Kevin Kelly Quote (dark bg + glowing text)
# ============================================================
print("\n--- Shot 5: Kevin Kelly Quote ---")
s5_dur = 10.0

qi = Image.new("RGBA", (W, H), (10,22,40,255))
draw = ImageDraw.Draw(qi)
qt = "\"Don't be the best. Be the only.\""
fq = get_font(52)
bb = draw.textbbox((0,0), qt, font=fq)
qw, qh = bb[2]-bb[0], bb[3]-bb[1]
qx, qy = (W-qw)//2, 340
for dx, dy in [(2,2),(-1,-1),(1,-1),(-1,1)]:
    draw.text((qx+dx,qy+dy), qt, fill=(20,184,166,60), font=fq)
draw.text((qx,qy), qt, fill=(255,255,255,255), font=fq)
atxt = "\u2014 Kevin Kelly"
af = get_font(26)
ab = draw.textbbox((0,0), atxt, font=af)
aw = ab[2]-ab[0]
draw.text((W-aw-280,480), atxt, fill=(255,255,255,165), font=af)
mlines = [
    "I think that's why I set my goal to explore the way",
    "of human thinking under the context of shift",
    "of human-AI interaction.",
]
my = H - 540; mf = get_font(26)
for ml in mlines:
    lb = draw.textbbox((0,0), ml, font=mf); lw = lb[2]-lb[0]
    draw.text(((W-lw)//2,my), ml, fill=(255,255,255,178), font=mf); my += 38
qi.save(TMPDIR + "/s5quote.png")
png2mp4(TMPDIR + "/s5quote.png", TMPDIR + "/s5quote_vid.mp4", s5_dur+1)

fc5 = '[0:v][2]overlay=0:0:enable=between(t,0.5,%g)[out]' % (s5_dur-0.5)

run_filter_script([
    "-f", "lavfi", "-i", ("color=c=0x0A1628:s=%dx%d:d=%.1f:r=%d" % (W,H,s5_dur,FPS)),
    "-i", PUBLIC + "/clips/2-2.MP3",
    "-i", TMPDIR + "/s5quote_vid.mp4",
    "-t", str(s5_dur),
    "-c:v", "libx264", "-preset", "medium", "-crf", "16",
    "-pix_fmt", "yuv420p",
    "-map", "[out]", "-map", "1:a?",
    "-c:a", "aac", "-b:a", "256k",
    "-ss", "8.0",
    "-af", ("atrim=end=%.1f,volume=0.95" % s5_dur),
    TMPDIR + "/s5.mp4"
], fc5, "S5 Quote")


# ============================================================
# SHOT 6: Notebook Photos (3 photos fade + name watermark)
# ============================================================
print("\n--- Shot 6: Notebook Photos ---")
s6_dur = 5.0

si = Image.new("RGBA", (W, H), (245,240,232,255))
sd = ImageDraw.Draw(si)
nt = "ROCK CHEN"; nf = get_font(38); nb = sd.textbbox((0,0), nt, font=nf)
nw = nb[2]-nb[0]
sd.text(((W-nw)//2, H-100), nt, fill=(13,148,136,255), font=nf)
tt = "Explorer of Human Thinking in the AI Era"; tf = get_font(18)
tb = sd.textbbox((0,0), tt, font=tf); twv = tb[2]-tb[0]
sd.text(((W-twv)//2, H-55), tt, fill=(44,62,80,115), font=tf)
si.save(TMPDIR + "/s6sig.png")
png2mp4(TMPDIR + "/s6sig.png", TMPDIR + "/s6sig_vid.mp4", s6_dur)

# Build S6 filter string step by step to avoid formatting issues
s6_p1_end = round(s6_dur * 0.31, 2)
s6_p2_start = round(s6_dur * 0.31 + 0.01, 2)
s6_p2_end = round(s6_dur * 0.65, 2)
s6_p3_start = round(s6_dur * 0.65 + 0.01, 2)
s6_sig_start = round(s6_dur * 0.64, 2)
s6_sig_end = round(s6_dur * 0.96, 2)

# Build filter string with proper between() syntax
f1 = "color=s=%dx%d:c=0xF5F0E8:d=%.1f:r=30[paper]" % (W, H, s6_dur)
f2 = "[0:v]scale=960:540[p1];[1:v]scale=960:540[p2];[2:v]scale=960:540[p3]"
f3 = '[paper][p1]overlay=(W-ow)/2:(H-oh)/2:enable=between(t,0,%g)[a1]' % s6_p1_end
f4 = ';[a1][p2]overlay=(W-ow)/2:(H-oh)/2:enable=between(t,%g,%g)[a2]' % (s6_p2_start, s6_p2_end)
f5 = ';[a2][p3]overlay=(W-ow)/2:(H-oh)/2:enable=between(t,%g,%g)[a3]' % (s6_p3_start, s6_dur)
f6 = ';[a3][4]overlay=0:0:enable=between(t,%g,%g)[out]' % (s6_sig_start, s6_sig_end)

fmt_s6 = f1 + ";" + f2 + ";" + f3 + f4 + f5 + f6

run_filter_script([
    "-loop", "1", "-t", str(s6_dur), "-i", PUBLIC + "/assets/IMG_4016.jpeg",
    "-loop", "1", "-t", str(s6_dur), "-i", PUBLIC + "/assets/IMG_4017.png",
    "-loop", "1", "-t", str(s6_dur), "-i", PUBLIC + "/assets/IMG_4018.png",
    "-i", TMPDIR + "/s6sig_vid.mp4",
    "-t", str(s6_dur),
    "-c:v", "libx264", "-preset", "medium", "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-map", "[out]",
    TMPDIR + "/s6.mp4"
], fmt_s6, "S6 Notebook")


# ============================================================
# CONCATENATE ALL SHOTS
# ============================================================
print("\n" + "=" * 50)
print(" Concatenating...")

shots = []
for sn in ["s1","s2","s3a","s3b","s4","s5","s6"]:
    p = TMPDIR + "/" + sn + ".mp4"
    if os.path.exists(p):
        shots.append(p)
        print(f"  Found {sn}.mp4 ({os.path.getsize(p)//1024}KB)")
    else:
        print(f"  MISSING {sn}")

cf_path = TMPDIR + "/concat.txt"
with open(cf_path, "w") as cf:
    for sf in shots:
        cf.write("file '%s'\n" % sf)

if shots:
    run([
        "-f", "concat", "-safe", "0", "-i", cf_path,
        "-c:v", "libx264", "-preset", "medium", "-crf", "16",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "256k",
        "-movflags", "+faststart",
        OUTPUT
    ], "Final concat")

    out_size = os.path.getsize(OUTPUT) // (1024*1024)
    print("\n" + "=" * 50)
    print(" DONE!")
    print(" Output: " + OUTPUT)
    print(" Size: ~%d MB" % out_size)
    print("=" * 50)
    subprocess.run(["open", os.path.dirname(OUTPUT)])
else:
    print("ERROR: No shots generated!")

shutil.rmtree(TMPDIR, ignore_errors=True)
