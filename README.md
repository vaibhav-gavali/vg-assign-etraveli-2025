# Movies App for Etraveli

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Packages we installed

```js
npm install react-router-dom react-redux @reduxjs/toolkit

npm install axios react-icons reselect sass styled-components @types/styled-components

// SETUP FOR TESTING
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event
npm install -D vitest jsdom
--save-dev / -D
```

## Scripts for running test before builds

```js
"scripts": {
  "dev": "npm run test && vite",
  "build": "npm run test && tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

## Steps for Pushing code to github

```js
git init
git add . 
git commit -m "Initial commit with all the Assigment changes"  
git remote add origin https://github.com/vaibhav-gavali/vg-assign-etraveli-2025.git
git push -u origin master (For pushing from your local you need to create tokens now on github)
```

## Steps for deploy website to github

```js
npm install --save-dev gh-pages

// Add entry with base in vite.config.ts file
export default defineConfig({
  base: '/vg-assign-etraveli-2025/',
})

// Add deploy scripts in package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

npm run deploy

https://<username>.github.io/vg-assign-etraveli-2025/
```