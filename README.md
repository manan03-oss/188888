# Two Years of Us: a cinematic anniversary website for Shreya

React + Vite + TypeScript. No database, no login, no API keys, no tracking.
All personal content lives in one file: `src/data/anniversaryContent.ts`.

## 1. What you need
- A computer with **Node.js 18 or newer** (https://nodejs.org, choose the LTS installer, then restart your terminal).
- A code editor such as VS Code (optional but handy).
- Check Node works: `node -v`

## 2. Run it on your computer
```bash
cd shreya-anniversary
npm install
npm run dev        # opens a live preview, usually http://localhost:5173
```
Edits to any file update the preview automatically.

To test the real production version:
```bash
npm run build
npm run preview    # usually http://localhost:4173
```

## 3. Add your photos
Copy them into `public/images/`, then list them in `photos` inside
`src/data/anniversaryContent.ts`:
```ts
{ file: "us-01.jpg", caption: "Your own words here.", category: "together",
  alt: "Describe the photo for screen readers", position: "50% 20%" }
```
- `category`: `"shreya"`, `"together"` or `"memories"`.
- `position` (optional) only changes the thumbnail framing, for example `"top"` to keep faces in view.
  The full photo is always shown, uncropped, when tapped.
- Missing files show a soft "A photo will go here" placeholder. Photos are never edited, enhanced or uploaded anywhere.
- Timeline cards can also show a photo: set `photo: "file.jpg"` on an event.

## 4. Edit the dates
In `src/data/anniversaryContent.ts`:
```ts
relationshipStartDate: "2026-10-20",
anniversaryDate: "2028-10-20",
```
Use `YYYY-MM-DD`. The countdown targets **00:00 local time (the viewer's own timezone)** on `anniversaryDate`.
- Before that day: live countdown.
- On that day: "Today is our special day, Shreyuu! ❤️" with hearts.
- After that day: "Our special day is here to remember. ❤️" (never negative numbers).

**Please double-check the start year.** 20 October 2026 plus two years is 20 October 2028. If your
real start date was earlier (say 2024), change both dates (e.g. `2024-10-20` and `2026-10-20`).
In dev mode the browser console warns if the two dates aren't a whole number of years apart.

## 5. Edit the letter and messages
Everything is plain text in the same file: `loveLetter`, `timelineEvents`, `reasons`,
`promises`, `hiddenMessages`, `finalMessage`. One string per paragraph.
- Timeline entries are **placeholders** ("Add the moment that made you smile..."). Replace them with real memories.
- To add more reasons, add more lines to `reasons` (works for 50 or 100).

## 6. Optional music
See `public/audio/README.md`. Short version: put a track you're allowed to use at
`public/audio/anniversary-music.mp3`. Nothing plays until the play button is pressed.
If the file is missing, a small note appears with a normal link to listen to the song on Spotify; the site is unaffected.
(The code deliberately does not include the song itself.)

## 7. Publish it (Netlify, easiest)
1. `npm run build` creates the `dist/` folder.
2. Go to https://app.netlify.com/drop and drag the **`dist`** folder onto the page.
3. Netlify gives you a link such as `https://something.netlify.app`. In Site settings you can rename it.

Vercel alternative: push the project to GitHub, import it at https://vercel.com/new
(Framework: Vite, build command `npm run build`, output `dist`).

**Privacy:** anyone who has the link can open the site. The page asks search engines not to index it,
but it is not password-protected. For protection, use your host's password feature
(Netlify: Site configuration > Access & security; Vercel: Deployment Protection) which may require a paid plan.
Share the link only with Shreya.

## 8. Test on an Android phone
Open the published link in Chrome on the phone. Check: the envelope opens by tap, the letter scrolls smoothly,
photos open full-screen, the hidden envelopes open, the music button behaves, and the final "Open My Heart" and replay work.
Also try it in both portrait and landscape.
Before it's live, you can test on your Wi-Fi: run `npm run dev -- --host`, then open the "Network" address it prints on the phone.

## 9. Updating after a change
Edit the file or add the photo, run `npm run build`, and drag the new `dist` folder onto your Netlify site's
"Deploys" tab (or push to GitHub if you use Vercel/Netlify Git deploys).

## Accessibility and motion
Keyboard, touch and screen readers are supported. With the system setting "reduce motion" on, travelling
animations and particles are turned off, and all text is shown immediately.

## Structure
```
shreya-anniversary/
  index.html  package.json  vite.config.ts  tsconfig.json  README.md
  public/images/  public/audio/        <- your photos and optional music
  src/
    main.tsx  App.tsx  index.css
    data/anniversaryContent.ts         <- ALL your words, dates, photos
    data/dates.ts                      <- timezone/DST-safe date helpers
    hooks/hooks.ts
    components/  WelcomeScreen  Envelope  LoveLetter  StoryTimeline  MemoryGallery
                 PhotoLightbox  SafeImage  ReasonsGrid  PromisesSection
                 AnniversaryCountdown  HiddenMessages  FinalSurprise  MusicPlayer
                 Reveal  Particles  HeartBurst
```
Fonts (Cormorant Garamond, DM Sans, Caveat) are bundled locally through `@fontsource`, with system fallbacks.
