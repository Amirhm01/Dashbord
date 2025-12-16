# Admin Dashboard

This is a **Next.js** project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
It’s a modern **Admin Dashboard** built with **React**, **TypeScript**, and **Material UI (MUI)**, featuring charts, data tables, icons, and global state management for admin panels.

---

## Getting Started

### 1. Install Dependencies

First, make sure you have Node.js installed. Then install all required packages:

```bash
npm install
# or
yarn
# or
pnpm install
```

### 2. Run Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.  
The app auto-updates as you edit the files.

---

## Project Structure

```
/app            # Next.js app directory
/components     # Reusable React components (Cards, Tables, Charts, etc.)
/redux          # Redux Toolkit slices and store
/public         # Public assets (icons, images, fonts)
/styles         # Global and styled-components styles
```

---

## Tech Stack & Packages

- **Next.js** – React framework for server-side rendering and routing
- **React** – UI library for building components
- **TypeScript** – Static typing for safer code
- **Material UI (MUI)** – UI components and theming
- **Redux Toolkit** – State management for the dashboard
- **react-redux** – Connect Redux with React components
- **Recharts** – Interactive line charts for analytics
- **react-data-table-component** – Advanced data tables with sorting, pagination, and custom columns
- **styled-components** – Write CSS in JS for custom styling
- **iconsax-react** – Modern and clean icons

---

## Usage & Examples

### Charts

Line charts are implemented with **Recharts**. Example usage:

```tsx
<LineChart width={500} height={300} data={data}>
  <Line type="monotone" dataKey="value" stroke="#8884d8" />
  <CartesianGrid stroke="#ccc" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
</LineChart>
```

### Tables

Tables use **react-data-table-component**:

```tsx
<DataTable columns={columns} data={data} pagination selectableRows />
```

### Redux State

Global state is managed with **Redux Toolkit**:

```ts
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) – Features and API
- [Recharts Documentation](https://recharts.org/en-US/) – Charts library
- [Material UI Documentation](https://mui.com/) – UI components and theming
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/) – State management
- [react-data-table-component](https://github.com/jbetancur/react-data-table-component) – Advanced tables
- [styled-components](https://styled-components.com/) – CSS-in-JS styling
- [Iconsax](https://iconsax.io/) – Icon library

---

## Deploy on Vercel

The easiest way to deploy is with [Vercel](https://vercel.com/new).

```bash
vercel deploy
```

Check [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more info.

---

## License

This project is open-source and free to use for personal or commercial projects.
