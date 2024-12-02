### Next App

```sh

npx create-next-app@latest store
```

```sh
npx shadcn@latest init

```

- New York
- Zinc
- CSS variables:YES



## add shadcn components
```sh

- npx shadcn@latest add breadcrumb button card checkbox dropdown-menu input label popover select separator table textarea toast skeleton carousel


```

### Remove Boilerplate

- in globals.css remove all code after directives
- page.tsx

```tsx

```
### Install icons
### add import directly to package.json file and run npm install
```sh
npm install react-icons
"@radix-ui/react-icons": "^1.3.2",

```

### Shadcn DarkMode

[Next.js Dark Mode](https://ui.shadcn.com/docs/dark-mode/next)

```sh
npm install next-themes
npm install zod 
"@types/qrcode": "^1.5.5",
```

## install Qr reader libraries and helper libaries
```sh

npm install react-webcam
npm install jsqr 
npm install -g qrcode 
npm i --save-dev @types/qrcode

```

## Prisma 
```sh
npm install prisma --save-dev
npm install @prisma/client
npx prisma init

```

### Setup Instance

In development, the command next dev clears Node.js cache on run. This in turn initializes a new PrismaClient instance each time due to hot reloading that creates a connection to the database. This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.

(Prisma Instance)[https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution]

- create utils/db.ts

```ts
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```


### Connect Supabase with Prisma

[Useful Info](https://supabase.com/partners/integrations/prisma)

- add to .env

```bash
DATABASE_URL=""
DIRECT_URL=""
```

- DATABASE_URL : Transaction + Password + "?pgbouncer=true&connection_limit=1"
- DIRECT_URL : Session + Password

```prisma

```

- npx prisma migrate dev --name init
- npx prisma db push

npx prisma migrate dev --name init creates a new migration for your database schema
changes and applies it, while npx prisma db push directly updates the database schema without creating a migration. In the context of databases, a migration is set of operations, that modify the database schema, helping it evolve over time while preserving existing data.

```bash
npx prisma db push
```

```bash
npx prisma studio
```

```sh
npm install @faker-js/faker --save-dev
```