# Surekha | Accessible Portfolio (HTML5 Semantic Structure & Accessibility)

Multi-page portfolio in plain HTML5, CSS3 and vanilla JavaScript. No build step, no backend, no paid APIs.

## Folder structure
```
portfolio/
├── index.html      Home: introduction, career objective, skills
├── about.html      Education, technical skills, achievements
├── projects.html   Project articles with technologies
├── contact.html    Accessible contact form
├── css/style.css   All styles (tokens, layout, focus, reduced motion)
├── js/script.js    Mobile menu + form validation
└── images/         favicon.svg, profile-placeholder.svg
```

## Run locally
Open `index.html` in a browser, or serve the folder (better for Lighthouse):
```
cd portfolio
python3 -m http.server 8000      # then visit http://localhost:8000
```

## Edit your content
Search for `EDIT` comments in each HTML file. Replace the placeholder education, skills, achievements, projects, GitHub/LinkedIn links, and `your.email@example.com` (also the `data-recipient` attribute in `contact.html`). Replace `images/profile-placeholder.svg` with your photo and **update its `alt` text**.

## How the contact form works
There is no server. After valid input, the page shows a confirmation with a link that opens your email app with the message prefilled. To send directly, connect a free form service (e.g. Formspree) by setting the form `action` and `method="post"`.

## Test with Lighthouse
1. Serve the site (above) and open it in Chrome.
2. DevTools > Lighthouse > select **Accessibility** and **SEO** > Analyze. Repeat for all four pages, in mobile and desktop modes.
3. Fix anything flagged after you change content (for example missing alt text or low contrast). Scores depend on your edits, so run it yourself and report the real results.
Also run the W3C validator (validator.w3.org) and the axe DevTools extension.

## Manual accessibility checklist
**Keyboard**
- [ ] Tab from the top: the first stop is "Skip to main content"; pressing Enter moves focus to the main content.
- [ ] Every link, button and form control is reachable in a logical order, with a clearly visible focus outline.
- [ ] At phone width the Menu button opens with Enter or Space; Escape closes it and returns focus to the button.
- [ ] No keyboard traps; nothing requires a mouse.

**Form validation**
- [ ] Submit the empty form: an error summary appears and receives focus; each link jumps to its field.
- [ ] Each invalid field shows a specific message next to it, in red text with a border (not colour alone).
- [ ] Typing a valid value clears that field's error. An invalid email and a message under 10 characters give clear messages.
- [ ] A valid submit shows the confirmation message.

**Screen reader (NVDA, JAWS, VoiceOver or TalkBack)**
- [ ] Landmarks list: banner, navigation (Main, Footer), main, contentinfo.
- [ ] Headings list shows one h1 per page and no skipped levels.
- [ ] Each field announces its label, "required", hint and error text; the radio group announces its legend.
- [ ] The current page is announced in the navigation; new-tab links say "opens in a new tab".
- [ ] The home page diagram is announced once as an image with its description.

**Visual and motion**
- [ ] Zoom to 200% and 400%: no horizontal scrolling or clipped content.
- [ ] Enable "Reduce motion" in your OS: the diagram appears instantly and smooth scrolling stops.
- [ ] Turn on a forced-colours mode: all content stays visible.


## Advanced CSS3 & Responsive Architecture assignment

This version includes the following assignment requirements:

- **CSS Grid:** hero, skill/feature cards, project gallery, about layout, and contact layout.
- **Flexbox:** header controls, navigation lists, action buttons, chips, and footer alignment.
- **Mobile-first responsive CSS:** narrow-screen base styles plus tablet and desktop breakpoints; responsive typography uses `clamp()`.
- **CSS custom properties:** shared design tokens in `:root`, with a dark theme override on `:root[data-theme="dark"]`.
- **Light/dark mode:** theme button on every page; preference is stored in `localStorage` when browser storage is available.
- **Accessibility:** semantic landmarks, skip link, visible focus styles, keyboard-accessible controls, and reduced-motion support.

### Run the project

No build tools or dependencies are required. Extract the ZIP, open the `portfolio` folder, and open `index.html` in a browser. For a local server, open a terminal in the `portfolio` folder and run `python -m http.server 8000`, then visit `http://localhost:8000`.

### Responsive verification

Use browser DevTools responsive mode and verify widths of 320px, 375px, 768px, 1024px, and 1440px. Check that navigation, cards, forms, and theme switching remain usable and that no horizontal overflow appears.
