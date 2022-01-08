[course video](https://www.youtube.com/watch?v=Wn_Kb3MR_cU)
[code](https://github.com/adrianhajdin/project_web3.0/tree/main/smart_contract)

![image](./client/images/Capture.JPG)

# Setup

- use [Vite](https://vitejs.dev/guide/), instead of `create-react-app` to initialize our app using **react** framework
- use [TailWind](https://tailwindcss.com/docs/guides/create-react-app) for CSS

- create `client` folder

## Vite

- `npm init vite@latest`

  - project name: `./` (so at our current folder)
  - package name: `krypt` (you can call whatever you like)
  - framework: `react` -> `react`

- `npm install`

## Tailwind

- `npm install -D tailwindcss postcss autoprefixer`
- `npx tailwindcss init -p`
- copy/paste following into `tailwind.config.js`
  ```
  module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {},
  },
  plugins: [],
  }
  ```
- replace the content of `src/index.css` with the following
  ```
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- simplify/update `src/App.jsx`

  ```
  const function App() = () => {
  return (
      <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
  );
  }

  export default App;
  ```

## Start the server

- `npm run dev`

## Smart_contract

- stop the server, create and move to `/Web3.0/smart_contract`

- `npm init -y` (creates `package.json`)

**Commit 1**

# React (frontend Homepage)

## Setup

- create `components` folder in `src`, under it, create all the component **jsx** files:

  - `Navbar, Footer, Loader, Services, Transactions, Welcome`

- to allow our app to import all these components in one line

  - create `index.js` in the same folder
    ```
    export { default as Loader } from "./Loader";
    export { default as Navbar } from "./Navbar";
    export { default as Welcome } from "./Welcome";
    export { default as Footer } from "./Footer";
    export { default as Services } from "./Services";
    export { default as Transactions } from "./Transactions";
    ```
  - in `App.jsx`, add
    `import { Navbar, Welcome, Footer, Services, Transactions } from "./components";`

- copy/paste `index.css` content from github
- got `client/images/` and it's 3 image files from coure gdrive

- install react dependencies (stop server)
  - `npm install react-icons ethers`
  - restart the servers `npm run dev`

## Navbar

- accommodates both desktop version and mobile version

**Commit 2**

## Welcome page

- phase 1, layout, no functionality yet

**Commit 3**

- phase 2, layout, grid of 6 cells added

**Commit 4**

- phase 3, layout
  - all above are left layout
  - now adding the ether card to the right layout

**Commit 5**

- phase 4, layout, add input form

- copy/paste `tailwind.config.js`, where `mf:` is defined
  - error message `Cannot find module '@tailwindcss/forms'`
  - `npm i @tailwindcss/forms'

**Commit 6**
