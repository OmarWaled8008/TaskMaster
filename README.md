# TaskMaster 
**Modern Task Management App Built with Next.js, Tailwind CSS, and NextAuth**

TaskMaster is a full-stack, themeable task management application that empowers users to create, track, and manage their daily tasks with ease. Built using the latest technologies from the Next.js ecosystem, it offers a secure, responsive, and intuitive user experience.

---

## Key Features

- **Authentication**
  - Secure login with **Email**, **Google**, and **GitHub** via `next-auth`
- **Task Management**
  - Create, edit, delete, and view tasks by status: `Pending`, `In Progress`, and `Completed`
- **Personalization**
  - Each user sees and manages only their own tasks
- **Theming**
  - Light, Dark, and System theme support with `next-themes`
- **Responsive Design**
  - Fully responsive UI using Tailwind CSS v4 and ShadCN UI components
- **Middleware Protection**
  - Routes under `/home` are protected using custom `middleware.js`

---

## Tech Stack

| Category        | Technology                         |
|----------------|-------------------------------------|
| Framework       | [Next.js 15 (App Router)](https://nextjs.org) |
| UI Components   | [Tailwind CSS v4](https://tailwindcss.com), [ShadCN UI](https://ui.shadcn.com) |
| Authentication  | [NextAuth.js](https://next-auth.js.org) |
| Icons           | Lucide, Heroicons, Font Awesome    |
| Theming         | [next-themes](https://github.com/pacocoursey/next-themes) |
| Fonts           | [Geist](https://vercel.com/font) via `next/font` |
| State & Data    | JSON mock files (`users.json`, `task.json`) |
| Deployment      | Ready for [Vercel](https://vercel.com) |

---

## Project Structure

```bash
.
├── app/                  # Pages and API routes (App Router)
│   ├── home/             # Task views, creation, and profile
│   └── api/              # API endpoints for tasks & users
├── components/           # Shared UI components
├── data/                 # Mock data storage (tasks, users)
├── public/               # Static assets (images, icons)
├── styles/               # Tailwind config and global styles
├── utils/                # Custom hooks and helpers
├── middleware.js         # Route access control
└── ...
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/taskmaster.git
cd taskmaster
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000
```

> Also add Google and GitHub OAuth client IDs and secrets if enabled.

### 4. Run Development Server

```bash
npm run dev
```

Then open your browser at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command            | Description                        |
|--------------------|------------------------------------|
| `npm run dev`      | Start development server           |
| `npm run build`    | Create production build            |
| `npm run start`    | Start production server            |
| `npm run lint`     | Run ESLint to check for issues     |

---

## Screenshots

> *(Add screenshots in `/public` and reference them here)*

---

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [ShadCN UI Components](https://ui.shadcn.com)




