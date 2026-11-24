# Adding gallery photos

1. Put copies of your photos in a temporary folder (keep the originals safe).
2. Remove hidden location data and shrink them. With ImageMagick:
   ```bash
   mogrify -strip -auto-orient -resize '1600x1600>' -quality 82 *.jpg
   ```
   (`-strip` removes GPS location and camera data. Without ImageMagick: `exiftool -all= -overwrite_original *.jpg`.)
3. Copy the results into `public/gallery/` using simple lowercase names, e.g. `nacos-award.jpg`.
4. Add one entry per photo in `src/content/gallery.ts` (src, alt text, caption, group: 'work' or 'life').
5. Commit and push. Aim for under 400 KB per photo.


