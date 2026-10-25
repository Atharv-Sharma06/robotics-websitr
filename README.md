# The Mechanical Mooses · VEX Team 42285B

Team website for VEX robotics team **42285B, The Mechanical Mooses**.

It's a plain static site (HTML, CSS and JavaScript), with no build step.

## Editing the content

Team info lives at the top of `script.js`:

- `TEAM`: contact email, Instagram link and build hours
- `MEMBERS`: names, roles, bios and optional photo paths
- `ROBOT_SPECS`: the rows in the Robot section
- `EVENTS`: the season timeline (`done: true` marks an event as finished, `award` adds a trophy badge)
- `SPONSORS`: sponsor names and optional links

To add a robot photo, put the image in this folder and replace the placeholder `<div>` in the Robot section of `index.html` with `<img src="robot.jpg" alt="Our robot">`.

## Previewing locally

Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Publishing

`.github/workflows/pages.yml` deploys the site to GitHub Pages on every push to `main`. To turn it on, go to **Settings → Pages** in this repo and set **Source** to **GitHub Actions**.
