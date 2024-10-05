## Driver Hub

This is a Next.js React app using Typescript and the pages router for navigation.
The app uses the Prisma ORM for handling queries and server-side data fetching.

## Getting Started

Run `npm i` to install dependencies.

Next, run `npx prisma migrate dev --name init`, this should initialise a local sqlite database named `dev.db` and seed it automatically.

Finally, start the development server on `localhost:3000` with `npm run dev`.