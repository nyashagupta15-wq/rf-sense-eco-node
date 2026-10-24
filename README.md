# RF-Sense Eco-Node

Seva Innovation Challenge 2026 (Maharashtra zone) · Team: Nyasha Gupta (lead) and Sonali Nirala · Bhilai Institute of Technology, Durg

A pole-mounted module that harvests stray RF energy from mobile-tower signals to power a bird-sound activity sensor, an RF level logger and a LoRa radio, with no battery and no wiring. This repository holds the **software demo**: a dashboard that compares bird activity with RF level around towers.

**Project stage: Idea.** There is no hardware prototype yet. The rectifier design was simulated in LTspice. The demo shows how the data from deployed nodes would be stored and viewed.

## About the demo data

All readings are **simulated** (36 towers: 20 in Maharashtra, 8 in Madhya Pradesh and 8 in Chhattisgarh, 7 to 20 October 2026, one reading about every 15 minutes when a node has enough stored energy). The simulation has no RF effect on birds built in, so a correlation near zero is expected. The data only shows how the dashboard and database work. It is not a finding about birds or radiation.

## What the dashboard does

- Summary tiles, a map of the towers, and charts of bird activity and RF level over time
- Filter by tower, and see which nodes are reporting normally
- **Add a reading:** a form that stands in for a node. It sends one reading to the database. A deployed node would send the same fields by LoRa through a gateway.
- Upload a CSV of readings
- An activity log that shows each step of what the page sends to the database

## How it is built

- Static page (`index.html`), no framework, hosted on GitHub Pages
- Database: Supabase (PostgreSQL), reached through its REST API with the public (publishable) key in `config.js`
- Tables: `towers` (tower_id, district, lat, lon) and `readings` (tower_id, read_at, rf_dbm, bird_activity_index, stored_energy_mj, source)
- Row Level Security: visitors can read everything and add readings marked `visitor`, only inside the demo date range. They cannot edit or delete anything.
- If the database cannot be reached, the page falls back to built-in sample data and says so at the top

## Files

- `index.html`: the dashboard
- `config.js`: Supabase project URL and publishable key (never put a secret key here)

## Limits

- Bird measurement is **activity from sound**, not a count of birds or species
- Ambient RF harvesting gives very little power (microwatts), so the node senses in short bursts every 15 minutes
- The node monitors radiation levels. It does not reduce them
