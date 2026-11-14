# LUNA BASE — Junior Astronaut Mission Trainer

An independent educational browser game inspired by NASA Space Apps Challenge 2026, “Build a Junior Astronaut Mission Trainer.”

## Run
Open `index.html` in a modern browser. No build step or backend is required.

## NASA data integration
The app can request the last seven days of NASA DONKI Solar Flare (FLR) and Coronal Mass Ejection (CME) records from:
- `https://api.nasa.gov/DONKI/FLR`
- `https://api.nasa.gov/DONKI/CME`

It starts with NASA's `DEMO_KEY`; rate limits may apply. For more reliable use, request a personal API key at https://api.nasa.gov/ . The key can be placed in browser localStorage as `nasaApiKey` (developer console: `localStorage.setItem('nasaApiKey','YOUR_KEY')`). Do not publish a private key in a public repository.

DONKI records are space-weather context. They are not a local radiation forecast for a lunar or Martian outpost. The game uses a fictional preparedness drill and simplified resource effects. Resource units, consumption, and events are educational gameplay assumptions, not real engineering specifications.

## Files
- `index.html`: interface
- `style.css`: responsive styling
- `app.js`: game logic and NASA DONKI request
- `SUBMISSION_TEXT.md`: copy-ready submission fields and disclosures
- `NASA_DATA_SOURCES.md`: data attribution and source notes
- `DEMO_SCRIPT.md`: <=30-second video narration
- `PRESENTATION_OUTLINE.md`: seven-slide outline

## AI/SI disclosure
AI assistance was used to generate and refine code, styling, debugging suggestions, and draft documentation. The team should review, test, modify, and understand the final work, and disclose the specific tools and uses in the official submission. Do not claim human-authored code if AI generated it.

## Attribution and branding
This is an independent student project and is not an official NASA product or endorsement. NASA names are used only to identify the source of public data and the challenge. No NASA logo or mission insignia is included.
