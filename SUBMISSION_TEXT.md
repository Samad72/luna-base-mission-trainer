# Copy-ready submission text

## Project name
LUNA BASE: Junior Astronaut Mission Trainer

## Project summary (50–200 words)
LUNA BASE: Junior Astronaut Mission Trainer is an interactive browser game that lets learners command a simulated lunar or Martian outpost for seven days. Players balance five critical systems—oxygen, water, food, electrical power, and radiation-shield integrity—by choosing one priority action each day. Daily consumption and clearly labelled fictional events create trade-offs that can lead to mission success or failure. The application also connects to NASA’s DONKI space-weather API to retrieve recent solar-flare and coronal-mass-ejection records. These records provide real-world context for a preparedness drill; they are not presented as a local Moon or Mars radiation forecast. The project aims to make systems thinking, resource constraints, and space-weather awareness understandable through play. It is a simplified educational simulation, not an engineering or operational mission-planning tool.

## Project details
LUNA BASE responds to the Junior Astronaut Mission Trainer challenge by turning outpost resource management into a seven-day interactive simulation. The player selects a Moon or Mars outpost and chooses one daily action: optimize solar panels, recycle water, maintain the greenhouse, repair life support, or reinforce radiation shielding. At the end of each turn, the crew consumes supplies and may encounter a clearly labelled simulated event. The mission succeeds if all five resource meters remain above zero through day seven; it ends early if a critical resource is exhausted.

The application uses HTML, CSS, and JavaScript and runs in a modern browser without a server or account. Its NASA data connection requests recent Solar Flare (FLR) and Coronal Mass Ejection (CME) records from NASA’s DONKI API. The retrieved records are used as space-weather context for a preparedness drill. DONKI records are not interpreted as a site-specific lunar or Martian radiation forecast. Resource values, daily consumption, event effects, and the seven-day game model are simplified educational assumptions.

Benefits and intended impact: learners can experiment with trade-offs, see how one system affects another, and discuss why mission teams must plan for limited resources and environmental hazards. The game is designed to encourage curiosity and systems thinking, not to teach operational engineering values.

Creative approach: combines a playable resource-management loop with a real NASA space-weather data source and a debrief that makes the distinction between observed data and fictional gameplay explicit.

Tools: HTML, CSS, JavaScript, browser Fetch API, NASA DONKI API. AI-assisted tools were used to generate and refine code, styling, debugging suggestions, and draft documentation. The team must review, test, understand, and accurately disclose the AI tools and contributions used.

## Use of Super Intelligence (SI)
AI / Super Intelligence usage disclosure:
Our team used AI-assisted tools to help generate and refine HTML, CSS and JavaScript code, suggest interface layouts, support debugging, and draft project documentation and presentation text. Team members reviewed and tested the generated output, integrated the components, and are responsible for the final project. The specific AI tools used should be named in the final submission if required by the form. NASA DONKI is the source of the space-weather records; AI was not used to create or alter NASA observations. Gameplay resource values and simulated consequences are team-designed educational assumptions.
