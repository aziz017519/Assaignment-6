# 💪 FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion. Browse a library of twelve lifts, open any workout for its full specs and step-by-step instructions, lock it into **Today's Plan** (capped at five lifts) or **save it for later**, and watch your minutes and calories add up on the **My Plan** page.

**Live Link:** _add your deployed URL here_
**GitHub Repository:** _add your repo URL here_

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 15 (App Router)** | Pages, routing, dynamic routes, Server & Client Components |
| **React 19** | Components, props, state, effects, Context API |
| **Tailwind CSS v4** | Styling and responsive layout |
| **react-hot-toast** | Toast notifications |
| **lucide-react** | Icons |
| **next/font** | Oswald (display) + Inter (body) fonts |

Data comes from the FitLog API: `https://api.abcz.workers.dev/api/fitlog` (with an automatic fallback to the alternative API).

---

## ✨ Key Features

1. **Workout Library** — all workouts fetched on the server and shown as a responsive 3×4 card grid with tags, equipment, duration, calories and rating, with a loading animation while data streams in.
2. **Dynamic Details Page** (`/workouts/[id]`) — two-column layout with the workout image, a key-specs table and numbered instructions; unknown IDs show the 404 page.
3. **Today's Plan & Saved lists** — add or save any workout with one click; navbar badges update instantly and a toast confirms every action. The plan is capped at five unfinished lifts.
4. **My Plan dashboard** — live Exercises / Minutes / Calories metrics, Today's Plan / Saved tabs, a Sort By dropdown (Duration, Calories, Rating), plus **Mark as Done** and **Remove** actions.
5. **Persistent state** — the plan and saved lists live in React Context and are stored in `localStorage`, so nothing is lost on reload.
6. **Fully responsive** — mobile, tablet and desktop, with a custom 404 page and an error page if the API is down.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout: fonts, Navbar, Footer, Toaster, PlanProvider
│   ├── page.js                # Home: Hero + Library (Suspense + Loader)
│   ├── not-found.js           # 404 page
│   ├── error.js               # Error page
│   ├── my-plan/page.js        # My Plan page (Client Component)
│   └── workouts/[id]/         # Dynamic details page + loading state
├── components/                # Navbar, Footer, Hero, WorkoutCard, PlanCard, ...
├── context/PlanContext.jsx    # Global state (Context API + localStorage)
└── lib/api.js                 # API fetch helpers
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm start
```

## ☁️ Deployment

Push the repository to GitHub, import it on [Vercel](https://vercel.com/new), and click **Deploy** — no extra configuration is needed. Every route (including `/my-plan` and `/workouts/:id`) works on reload.
