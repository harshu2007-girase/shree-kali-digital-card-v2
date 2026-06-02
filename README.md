# Shree Kali Manufacturers Premium DG Card

This folder contains a self-contained premium DG card build and a DziCard-ready upload guide.

## Files

- `index.html` - main DG card
- `styles.css` - visual design and responsive layout
- `script.js` - products, reviews, 360 viewer, save contact, share, copy buttons
- `preview-server.js` - Node server for mobile link, inquiry records, and visitor count
- `package.json` - deploy/start commands for Node hosting
- `.gitignore` - keeps runtime customer data out of GitHub
- `dzicard-upload-guide.md` - DziCard-ready content and asset guide
- `assets/` - optimized images, QR, video, and catalogue PDF
- `assets/vendor/lucide.min.js` - local icon library for offline-friendly buttons

## Open Locally

Open `index.html` in a browser, or run a local static server from this folder.

The card includes:

- Call, WhatsApp, Save Contact, Share Card
- Public product price catalogue
- 360-style product image viewer
- Product gallery tabs and lightbox
- Video demo
- Secure payment panel with exact bank details and QR
- Google review highlights
- PDF catalogue download
- Location map, website, and social links
- Customer inquiry form with WhatsApp submit
- Shared inquiry records when opened through `preview-server.js`
- Real visitor counter in the Trust section when opened through `preview-server.js`
- Built-in DZ card chatbot with English/Hindi answers, voice mode, and card navigation commands

## GitHub / Deployment

Upload the full `final-dz-card` folder to GitHub.

For simple static viewing, GitHub Pages can open the card, but these features will not be shared across devices:

- Owner inquiry data from all mobiles
- Real visitor counter across all mobiles
- Server API endpoints

For the complete card, deploy this folder on a Node.js host that runs:

```bash
npm start
```

Recommended hosting type: Render, Railway, VPS, cPanel Node app, or any Node.js server that supports long-running apps and persistent storage. Use Node 18 or newer.

Health check URL:

```text
/api/health
```

## Shared Inquiry Data

For inquiry records from different mobiles to appear in one owner panel, open the card through the server link, not directly as `file://`.

Run:

```bash
node preview-server.js
```

Then open the PC/mobile network link such as:

```text
http://10.183.135.144:4190/
```

Owner data is available from Inquiry Form > Owner Inquiry Data.
Password: `shreekali100cr`

When customers submit from this server link, records are stored in `data/inquiries.json` on the server computer and can be viewed from any device using the password.

On production hosting, set `DATA_DIR` to a persistent storage folder if the host supports it. If no `DATA_DIR` is set, records are stored in the local `data/` folder beside `preview-server.js`.

## Real Visitor Counter

The Trust section visitor counter is real only from the server/mobile link. It records unique browser/device visitors and total opens in `data/visitors.json` on the server computer. Direct `file://` opening cannot count visitors across other mobiles.

## DZ Card Chatbot

The AI Chatbot button uses the card's own data to answer common customer questions instantly. It does not need an API key and stays focused on Shree Kali Manufacturers products, prices, payment details, contact, location, certificates, inquiry steps, and QR/scanner details.

The assistant supports English and Hindi/Hinglish style questions, can speak answers using browser speech synthesis, can listen by microphone where the browser supports Web Speech recognition, and can open card areas from commands such as "open product section", "payment kholo", "open inquiry form", "open QR", "open gallery", "open trust", and "open rod change".
