# syz — portfolio

A fast, dependency-free personal site. It is plain HTML, CSS and JavaScript, so there is no build step and nothing to install.

```
portfolio/
├── index.html            ← page shell + SEO / link-preview tags
├── content.js            ← ✏️  ALL text, projects, prices, contacts (edit this)
└── assets/
    ├── css/style.css     ← design (colors are CSS variables at the top)
    ├── js/main.js        ← rendering + animations (no need to touch)
    ├── projects/         ← project screenshots
    ├── img/portrait.svg  ← placeholder photo → replace with yours
    ├── og-image.png      ← 1200×630 link-preview image
    ├── favicon.svg
    └── apple-touch-icon.png
```

## Editing content

Open **`content.js`**. Every piece of text is either:

- `"text"`: shown the same in both languages, or
- `{ mn: "Монгол", en: "English" }`: one version per language.

To make a word green in a headline, wrap it in asterisks: `"I build websites that *work*..."`.

- **Projects:** add, remove or reorder the objects in `projects: [...]`. The grid adapts to any count.
- **Prices:** set `price: 500000` in `services`. It is formatted as `500,000₮` automatically.
- **Contact:** `contact.email`, `instagram`, `phone`, `telegram`. Set a value to `""` to hide it.
- **Tech stack:** `stack: [...]` uses icon slugs from [simpleicons.org](https://simpleicons.org).

## Replacing images

1. Project screenshots: export them at **1600×1000** (16:10) as `.webp` or `.jpg`, put them in `assets/projects/`, and update `image:` in `content.js`.
2. Your photo: use a **4:5** portrait (for example 800×1000). Save it as `assets/img/portrait.jpg` and update `about.photo`.
3. Fill in the `alt:` text for each image. It is used by screen readers and helps SEO.

## Contact form

By default, the form opens the visitor's email app with the message already filled in, so it works without a server.

If you want messages delivered to your inbox directly:

1. Create a free form at [formspree.io](https://formspree.io).
2. Paste its URL into `contact.formEndpoint` in `content.js`.

## Before you deploy: update the SEO tags

Link previews on Instagram, Facebook and Telegram don't run JavaScript. They read the `<head>` of **`index.html`** directly. If you add a custom domain, replace `https://syz-builds.vercel.app/` with it in:

- `<link rel="canonical">`
- `og:url`, `og:image`, `twitter:image`
- the JSON-LD block

## Run locally

Any static server works:

```bash
npx serve .
```

## Deploy

Drag the folder onto [Netlify Drop](https://app.netlify.com/drop), or push it to GitHub and import the repository on Vercel or Netlify. No build settings are needed.

## Language

Mongolian is the default (`defaultLang` in `content.js`). A visitor's choice is remembered on their device. You can also link straight to English with `?lang=en`, which is handy in an Instagram bio.
