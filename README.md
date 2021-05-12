# Demo Nextjs Express Prisma

## Install Typescript

``` bash
yarn add --dev @types/react@latest ts-node@latest @types/node@latest typescript@latest @types/next
```

## Install Express

Install Express And Util

``` bash
yarn add express body-parser compression cookie-parser
yarn add @babel/register dotenv @babel/core
```

Install Express Type OF Dev

``` bash
yarn add --dev @types/body-parser @types/compression @types/cookie-parser @types/express
```

## Install Prisma

Install Prisma Dev

``` bash
yarn add --dev prisma
```

Install Prisma CLI

``` bash
npx prisma
```

Init Prisma to project

``` bash
npx prisma init
```

## Install Tailwind

Install Package

``` bash
yarn add --dev tailwindcss@latest postcss@latest autoprefixer@latest
```

Add Tailwind Config

``` bash
npx tailwindcss init -p
```

Add File `tailwind.config.js`

``` javascript
module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
```

Add File `postcss.config.js`

``` javascript
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}
```

Change File `styles/globals.css`

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add Import CSS TO `pages/_app.tsx`

``` typescript
import { AppProps } from 'next/app'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
```
