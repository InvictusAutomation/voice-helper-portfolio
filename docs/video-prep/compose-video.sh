#!/bin/bash
# ============================================================
# "Be The Only" - Rock Chen Personal Video Composer
# Pure FFmpeg — no Python dependencies
# Fixed version for FFmpeg 8.x+
# ============================================================

set -e
export PATH="/usr/local/bin:$PATH"

BASE="/Users/rlf/Desktop/code/codebuddy/voice-helper-portfolio"
PUBLIC="$BASE/remotion-videos/public"
OUTPUT="$BASE/remotion-videos/output/be-the-only.mp4"
TMPDIR=$(mktemp -d)
echo "Temp dir: $TMPDIR"
mkdir -p "$BASE/remotion-videos/output"

W=1920; H=1080; FPS=30

# Source files
TW="$PUBLIC/assets/tw.mp4"
C11="$PUBLIC/clips/1-1.mp4"
C12="$PUBLIC/clips/1-2.mp4"
C21="$PUBLIC/clips/2-1.mp4"
C22="$PUBLIC/clips/2-2.MP3"
BC="$PUBLIC/clips/bookclub.mp4"
GIF="$PUBLIC/assets/phineas-ferb-giphy.gif"
N1="$PUBLIC/assets/IMG_4016.jpeg"
N2="$PUBLIC/assets/IMG_4017.png"
N3="$PUBLIC/assets/IMG_4018.png"

FONT="/System/Library/Fonts/Helvetica.ttc"

# ============================================================
echo "=== Shot 1: Born in Taiwan (0-4.4s) ==="
ffmpeg -y -i "$TW" -i "$C11" \
  -filter_complex "
    [0:v]scale=$W:$H:force_original_aspect_ratio=increase,crop=$W:$H[bg];
    [1:v]scale=-1:600,pad=$W:$H:(ow-iw)/2:(oh-ih)/2+80:color=#87CEEB[fg];
    [bg][fg]overlay=(W-w)/2:H-h*0.85:enable='between(t,0,$(ffprobe -v error -show_entries format=duration -of csv=p=0 $C11))',
    drawtext=text='I was born in Taiwan, a breezy island.':fontfile=$FONT:fontsize=44:fontcolor=white:x=(w-text_w)/2:y=140:shadowcolor=#87CEEB@0.8:shadowx=3:shadowy=3:enable='between(t,0.8,4.0)'
  " \
  -t 4.4 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  "$TMPDIR/s1.mp4" 2>/dev/null && echo "Shot 1 ✅"

# ============================================================
echo "=== Shot 2: Jimmy Liao (4.4-7.6s) ==="
ffmpeg -y -i "$C12" \
  -filter_complex "
    color=s=${W}x${H}:c=#1A1A2E:d=3.2:r=$FPS[bg];
    [0:v]scale=-1:560,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2+80:color=#1A1A2E[fg];
    [bg][fg]overlay=(W-w)/2:(H-h)/2,
    drawtext=text='I grew up mesmerized by Jimmy Liao'\''s paintings.':fontfile=$FONT:fontsize=42:fontcolor=white:x=(w-text_w)/2:y=140:shadowcolor=#DDA0DD@0.6:shadowx=3:shadowy=3:enable='between(t,0.8,2.9)'
  " \
  -t 3.2 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  "$TMPDIR/s2.mp4" 2>/dev/null && echo "Shot 2 ✅"

# ============================================================
echo "=== Shot 3a: Phineas & Ferb (7.6-13s) ==="
S3AD=5.4
ffmpeg -y -loop 1 -t $S3AD -i "$GIF" -i "$C21" \
  -filter_complex "
    [0:v]scale=-1:-2,pad=${W}+200:${H}+120:100:60:color=#4FC3F7[main];
    color=s=${W}x${H}:c=#4FC3F7:d=${S3AD}:r=${FPS}[bg];
    [bg][main]overlay=(W-w)/2:(H-h)/2,
    drawtext=text='Phineas and Ferb told me that the best summer vacation':fontfile=$FONT:fontsize=30:fontcolor=#212121:x=(w-text_w)/2:y=h-220:shadowcolor=white@0.6:shadowx=2:shadowy=2:enable='between(t,0.3,4.8)',
    drawtext=text='is the one where we build things.':fontfile=$FONT:fontsize=30:fontcolor=#212121:x=(w-text_w)/2:y=h-175:shadowcolor=white@0.6:shadowx=2:shadowy=2:enable='between(t,2.5,4.8)',
    drawtext=text='Clip from Phineas and Ferb (C) Disney, via GIPHY':fontfile=$FONT:fontsize=15:fontcolor=#212121@0.35:italic=1:x=w-380:y=h-45:enable='between(t,0.1,$S3AD)'
  " \
  -t $S3AD -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -map "[v]" -map 1:a? -c:a aac -b:a 192k -af "atrim=end=$S3AD,volume=0.85" \
  "$TMPDIR/s3a.mp4" 2>/dev/null && echo "Shot 3a ✅"

# ============================================================
echo "=== Shot 3b: Deep Thinking (13-21s) ==="
S3BD=8.0
ffmpeg -y -f lavfi -i "color=c=#0A1628:s=${W}x${H}:d=${S3BD}:r=${FPS}" -i "$C21" \
  -filter_complex "
    [0:v]
    drawtext=text='Then, I always get obsessed with the feeling':fontfile=$FONT:fontsize=28:fontcolor=white:x=(w-text_w)/2:y=h-180:shadowcolor=black:shadowx=2:shadowy=2:enable='between(t,0.5,7.5)',
    drawtext=text='of diving deep into thinking':fontfile=$FONT:fontsize=28:fontcolor=white:x=(w-text_w)/2:y=h-140:shadowcolor=black:shadowx=2:shadowy=2:enable='between(t,2.5,7.5)',
    drawtext=text='and the underlying logic of the world with great minds.':fontfile=$FONT:fontsize=28:fontcolor=white:x=(w-text_w)/2:y=h-100:shadowcolor=black:shadowx=2:shadowy=2:enable='between(t,4.5,7.5)'
  " \
  -t $S3BD -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -map "[v]" -map 1:a? -c:a aac -b:a 192k -ss 5.4 -af "atrim=end=$S3BD,volume=0.85" \
  "$TMPDIR/s3b.mp4" 2>/dev/null && echo "Shot 3b ✅"

# ============================================================
echo "=== Shot 4: Singapore Seminar (21-29s) ==="
S4D=8.0
ffmpeg -y -i "$BC" -i "$C22" \
  -filter_complex "
    [0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,
     boxblur=luma_radius=min(h\,w)/20:chroma_radius=min(h\,w)/20:brightness=0.08[blur];
    color=s=${W}x${H}:c=#FFF8E7:d=${S4D}:r=${FPS}[warm];
    [warm][blur]overlay=0:0,
    drawtext=text='During my PG in Singapore, I once randomly stopped people':fontfile=$FONT:fontsize=30:fontcolor=#2C3E50:x=(w-text_w)/2:y=360:shadowcolor=white@0.5:shadowx=2:shadowy=2:enable='between(t,0.6,4.0)',
    drawtext=text='on the corridor to come join the seminar.':fontfile=$FONT:fontsize=30:fontcolor=#2C3E50:x=(w-text_w)/2:y=405:shadowcolor=white@0.5:shadowx=2:shadowy=2:enable='between(t,3.2,4.0)',
    drawtext=text='I organized and shared my opinions on AI':fontfile=$FONT:fontsize=30:fontcolor=#2C3E50:x=(w-text_w)/2:y=h-250:shadowcolor=white@0.5:shadowx=2:shadowy=2:enable='between(t,4.2,7.5)',
    drawtext=text='with people from different countries.':fontfile=$FONT:fontsize=30:fontcolor=#2C3E50:x=(w-text_w)/2:y=h-205:shadowcolor=white@0.5:shadowx=2:shadowy=2:enable='between(t,6.0,7.5)'
  " \
  -t $S4D -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -map "[v]" -map 1:a? -c:a aac -b:a 192k -af "atrim=end=$S4D,volume=0.90" \
  "$TMPDIR/s4.mp4" 2>/dev/null && echo "Shot 4 ✅"

# ============================================================
echo "=== Shot 5: Be The Only Quote (29-39s) ==="
S5D=10.0
ffmpeg -y -f lavfi -i "color=c=#0A1628:s=${W}x${H}:d=${S5D}:r=${FPS}" -i "$C22" \
  -filter_complex "
    [0:v]
    drawtext=text='\x22Don\x27t be the best. Be the only.\x22':fontfile=$FONT:fontsize=52:fontcolor=white:fontstyle_bold=1:x=(w-text_w)/2:y=340:shadowcolor=#14B8A6@0.4:shadowx=16:shadowy=16:enable='between(t,1.0,9.0)',
    drawtext=text='- Kevin Kelly':fontfile=$FONT:fontsize=26:fontcolor=white@0.65:italic=1:x=w-340:y=480:enable='between(t,3.5,9.0)',
    drawtext=text='I think that'\''s why I set my goal to explore the way':fontfile=$FONT:fontsize=26:fontcolor=white@0.70:x=(w-text_w)/2:y=560:enable='between(t,5.0,9.5)',
    drawtext=text='of human thinking under the context of shift':fontfile=$FONT:fontsize=26:fontcolor=white@0.70:x=(w-text_w)/2:y=600:enable='between(t,5.0,9.5)',
    drawtext=text='of human-AI interaction.':fontfile=$FONT:fontsize=26:fontcolor=white@0.70:x=(w-text_w)/2:y=640:enable='between(t,5.0,9.5)'
  " \
  -t $S5D -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -map "[v]" -map 1:a? -c:a aac -b:a 256k -ss 8.0 -af "atrim=end=$S5D,volume=0.95" \
  "$TMPDIR/s5.mp4" 2>/dev/null && echo "Shot 5 ✅"

# ============================================================
echo "=== Shot 6: Researcher's Notebook (39-44s) ==="
S6D=5.0
ffmpeg -y \
  -loop 1 -t $S6D -i "$N1" \
  -loop 1 -t $S6D -i "$N2" \
  -loop 1 -t $S6D -i "$N3" \
  -filter_complex "
    color=s=${W}x${H}:c=#F5F0E8:d=${S6D}:r=${FPS}[paper];
    [0:v]scale=960:540[p1]; [1:v]scale=960:540[p2]; [2:v]scale=960:540[p3];
    [paper][p1]overlay=(W-ow)/2:(H-oh)/2:enable='between(t,0,1.55)'[a1];
    [a1][p2]overlay=(W-ow)/2:(H-oh)/2:enable='between(t,1.55,3.25)'[a2];
    [a2][p3]overlay=(W-ow)/2:(H-oh)/2:enable='between(t,3.25,$S6D)',
    drawtext=text='ROCK CHEN':fontfile=$FONT:fontsize=38:fontcolor=#0D9488:x=(w-text_w)/2:y=h-100:enable='between(t,3.2,4.8)',
    drawtext=text='Explorer of Human Thinking in the AI Era':fontfile=$FONT:fontsize=16:fontcolor=#2C3E50@0.45:x=(w-text_w)/2:y=h-55:enable='between(t,3.9,4.8)'
  " \
  -t $S6D -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  "$TMPDIR/s6.mp4" 2>/dev/null && echo "Shot 6 ✅"

# ============================================================
echo ""
echo "==========================================="
echo " Concatenating all shots..."
echo "==========================================="

printf "file '%s'\n" "$TMPDIR/s1.mp4" "$TMPDIR/s2.mp4" "$TMPDIR/s3a.mp4" "$TMPDIR/s3b.mp4" "$TMPDIR/s4.mp4" "$TMPDIR/s5.mp4" "$TMPDIR/s6.mp4" > "$TMPDIR/concat.txt"

ffmpeg -y -f concat -safe 0 -i "$TMPDIR/concat.txt" \
  -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p \
  -c:a aac -b:a 256k -movflags +faststart \
  "$OUTPUT" 2>&1 | tail -5

rm -rf "$TMPDIR"

echo ""
echo "==========================================="
echo "  ✅ VIDEO EXPORTED! ✅"
echo "  $OUTPUT"
echo "==========================================="
open "$BASE/remotion-videos/output/"
