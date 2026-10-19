/**
 * ============================================================
 *  THE ONE FILE YOU EDIT.
 *  Every date, word, caption and photo lives here.
 *  You never need to touch the components.
 * ============================================================
 */

export type PhotoCategory = "shreya" | "together" | "memories";

export interface TimelineEvent {
  /** Free text shown on the card, e.g. "20 October 2026". EDIT ME. */
  date: string;
  title: string;
  description: string;
  /** Optional filename inside public/images/ (leave "" for none). */
  photo?: string;
  /** Small decorative glyph shown on the timeline marker. */
  detail: string;
}

export interface PhotoEntry {
  /** Filename inside public/images/ — e.g. "us-01.jpg". */
  file: string;
  caption: string;
  /** Used for the filter buttons. */
  category: PhotoCategory;
  /** Alt text for screen readers (describe what's in the photo). */
  alt: string;
  /**
   * Only changes how the photo is framed inside the small gallery card.
   * The lightbox always shows the full, uncropped photo.
   * Examples: "center", "50% 20%" (show more of the top), "top".
   */
  position?: string;
}

export const content = {
  /* ---------- People & names ---------- */
  girlfriendName: "Shreya",
  nicknames: ["Shrey", "Shreyuu", "Ghuu"],

  /* ---------- Dates (ISO format: YYYY-MM-DD) ----------
   * relationshipStartDate  : the day your story began.
   * anniversaryDate        : the day the countdown counts down to.
   *
   * NOTE: 20 Oct 2026 + 2 years = 20 Oct 2028, so that is what is set below.
   * If you typed the start year by mistake (for example you meant 2024),
   * change BOTH dates here, e.g. "2024-10-20" and "2026-10-20".
   * Everything else updates by itself.
   *
   * Timezone: the countdown uses the viewer's own local time, counting down
   * to midnight (00:00) at the start of the anniversary date.
   */
  relationshipStartDate: "2024-10-20",
  anniversaryDate: "2026-10-20",
  anniversaryTitle: "Two Years of Us",

  /* ---------- Welcome screen ---------- */
  welcome: {
    dedication: "FOR SHREYA ❤️",
    title: "Two Years of Us",
    quote: ["Some people become a part of your story.", "Somehow, you become their favourite part."],
    greeting: "Hey, Shreyuu... I made something just for you.",
    envelopeLabel: "To My Favourite Person",
    button: "Open Your Little Surprise 💌",
  },

  /* ---------- Music ----------
   * Put a file you have permission to use at public/audio/anniversary-music.mp3
   * If the file is missing, the site still works perfectly (music stays off).
   */
  musicTitle: "Perfect — Ed Sheeran",
  musicSrc: "/audio/anniversary-music.mp3",
  /** A normal link to a licensed listening service (not embedded). Set "" to hide. */
  musicListenUrl: "https://open.spotify.com/search/Perfect%20Ed%20Sheeran",

  /* ---------- Chapter 2: the letter (one string per paragraph) ---------- */
  loveLetter: [
    "My Dearest Shreya,",
    "Happy anniversary to us, my love. ❤️",
    "Sometimes I think about how someone can slowly become such an important part of your life. And then I think about you, Shrey, and I realise that some people make life feel a little more beautiful just by being part of it.",
    "You are someone I want to share my happiness with, someone I want to make memories with, and someone whose smile means so much to me.",
    "When I think about us, I don't just think about the big moments. I think about the little things, the conversations, the laughter, the unexpected smiles, and all those ordinary moments that become special because they involve you.",
    "I know that no relationship is perfect. What matters to me is that we keep learning, understanding each other, communicating honestly, and making the effort to grow together.",
    "Thank you for being Shreya. Thank you for the happiness you bring into my life, for the memories we have made, and for all the moments we have yet to discover.",
    "If I could start our story again, I would still want the chance to meet you, know you, and discover all the little things that make you who you are.",
    "Shreyuu, you are not just a name on my phone or someone I talk to. You are someone who holds a very special place in my heart.",
    "And Ghuu, if there is one thing I want you to remember from this little surprise, it is this:",
    "You matter to me. Your happiness matters to me. And our story matters to me.",
    "I hope that when you look back at these memories, you smile. I hope this little website reminds you that someone is genuinely happy to have you in their life.",
    "Two years, one (lots of jagda ) story, and so many more memories waiting to be made.",
    "Happy anniversary, my Shrey. ❤️",
  ],
  letterSignOff: "With all my love,",
  letterSignature: "Your MAN.",
  letterButton: "Keep reading, my love →",

  /* ---------- Chapter 3: timeline ----------
   * Every description below is a PLACEHOLDER. Replace with your real memories.
   */
  timeline: {
    heading: "Every Chapter Has a Little Bit of Us",
    subtitle: "Not just the time we've spent together, but the memories that made it meaningful.",
  },
  timelineEvents: [
    {
      date: "20 October 2024",
      title: "The Beginning",
      description: "The beginning of our story.",
      photo: "",
      detail: "✦",
    },
    {
      date: "15 november 2024",
      title: "The First Special Memory",
      description: "Tune Chuaaa.... To mein dhadakne lga  ......",
      photo: "WhatsApp Image 2026-10-13 at 4.03.10 PM.jpeg",
      detail: "✦",
    },
    {
      
      title: "Getting Closer by beautiful gift",
      description: "Add a memory, conversation, or experience that brought you closer.",
      photo: "image.png",
      detail: "♡",
    },
    {
      
      title: "The selfiess",
      description: "What an Eyes.",
      photo: "WhatsApp Image 2026-10-13 at 4.20.25 PM.jpeg",
      detail: "✿",
    },
    {
      date: "14 june 2025",
      title: "Growing Together",
      description: "#MAYA",
      photo: "WhatsApp Image 2026-10-13 at 4.20.11 PM.jpeg",
      detail: "❦",
    },
    {
      
      title: "Another Chapter Begins",
      description: "HOT and COLD together",
      photo: "image-2.png",
      detail: "☾",
    },
  ] as TimelineEvent[],

  /* ---------- Chapter 4: photos ----------
   * 1. Copy your photos into  public/images/
   * 2. Add one line per photo here (file name must match exactly).
   * Photos that are not found show a soft placeholder instead.
   * The captions below are SUGGESTIONS — replace them with your own words.
   */
  gallery: {
    heading: "Little Pieces of Our Story 📸",
    subtitle: "If a picture could speak, some of these would tell our favourite stories.",
  },
  photos: [
    { file: "image-3.png", caption: "One of my favourite smiles.", category: "shreya", alt: "A photograph of Shreya" },
    { file: "image-4.png", caption: "A moment I want to remember.", category: "together", alt: "A photograph of Shreya and me together" },
    { file: "image-5.png", caption: "Just you being you.", category: "shreya", alt: "A photograph of Shreya" },
    { file: "image-6.png", caption: "A little memory, a lot of happiness.", category: "together", alt: "A photograph of the two of us" },
    { file: "image-7.png", caption: "One photograph, countless feelings.", category: "memories", alt: "A photograph of a place or thing that matters to us" },
    { file: "image-8.png", caption: "Two of a kind", category: "together", alt: "A photograph of the two of us" },
  ] as PhotoEntry[],

  /* ---------- Chapter 5: reasons ----------
   * Add as many as you like (50, 100…). Just add more lines.
   */
  reasonsSection: {
    heading: "A Few Reasons You're So Special to Me",
    button: "Show Me Another Reason ❤️",
    buttonAgain: "Read them all again ↺",
  },
  reasons: [
    "The happiness I feel when we talk.",
    "The little moments that remind me of you.",
    "The memories we have already made.",
    "The laughter we have shared.",
    "The chance to learn more about you.",
    "The way ordinary moments can become special.",
    "The things that make our story unique.",
    "The chance to learn how to LOVE.",
    "The opportunity to support your dreams.",
    "The comfort of being able to talk honestly.",
    "The person you are, beyond our relationship.",
    "The simple fact that you are Shreya.",
  ],

  /* ---------- Chapter 6: promises ---------- */
  promisesSection: {
    heading: "Things I Want to Keep Choosing With You",
    closing:
      "I cannot promise that every day will be perfect. But I want us to keep choosing honesty, kindness, patience, respect, and effort.",
  },
  promises: [
    "To listen and try to understand rather than assume.",
    "To celebrate your happiness and support your dreams.",
    "To make time for the little moments that keep us connected.",
    "To communicate honestly and handle difficult moments with care.",
    "To keep growing as individuals while nurturing our relationship.",
  ],

  /* ---------- Chapter 7: countdown ---------- */
  countdown: {
    heading: "A beautiful milestone is waiting for us.",
    todayTitle: "Today is our special day, Shreyuu! ❤️",
    pastTitle: "Our special day is here to remember. ❤️",
  },

  /* ---------- Chapter 8: hidden messages ---------- */
  hidden: {
    heading: "Shreyuu, I Have a Few Little Things to Tell You...",
  },
  hiddenMessages: [
    {
      label: "For When You Need a Smile ❤️",
      message:
        "If this little message makes you smile, then it has already done what I hoped it would. Sending you a little happiness, Shrey.",
    },
    {
      label: "For When You Need a Little Reminder 💌",
      message:
        "Whatever kind of day you're having, remember that you deserve kindness, respect, and happiness. And I hope this little surprise reminds you of how much you matter to me.",
    },
    {
      label: "For When You Want to Feel Special ✨",
      message:
        "Out of all the things this website could say, I hope it leaves you with one simple feeling: you are appreciated, you are important, and I am grateful that our story exists.",
    },
  ],

  /* ---------- Chapter 9: final surprise ---------- */
  final: {
    before: "Before you leave, Shreya...",
    oneLast: "There's one last thing I want you to know.",
    button: "Open My Heart ❤️",
    title: "TWO YEARS OF US",
    subtitle: "To my Shrey. My Shreyuu. My Ghuu. ❤️",
    replay: "Let's Read Our Story Again ↺",
  },
  finalMessage: [
    "Happy Two Years of Us, my Shreyuu. ❤️",
    "Thank you for being a part of my story.",
    "I hope we keep making memories that make us laugh, moments that teach us something, and little experiences that remind us why the time we share matters.",
    "I hope we keep learning about each other, celebrating each other's happiness, and finding beautiful things in the ordinary days.",
    "There is so much life left to experience and so many chapters left to write.",
    "And for this little moment, I just wanted to stop everything, make something for you, and remind you that you have a special place in my heart.",
    "Happy anniversary, Shrey.",
    "You are a very special part of my story.",
    "Two years of us. More memories to come. ❤️",
  ],
};

export type Content = typeof content;
