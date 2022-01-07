[course video](https://www.youtube.com/watch?v=Wn_Kb3MR_cU)
[code](https://github.com/adrianhajdin/project_web3.0/tree/main/smart_contract)

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
