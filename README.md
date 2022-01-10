- [course video](https://www.youtube.com/watch?v=Wn_Kb3MR_cU)
- [code](https://github.com/adrianhajdin/project_web3.0/tree/main/smart_contract)

- use [Vite](https://vitejs.dev/guide/), instead of `create-react-app` to initialize our app using **react** framework
- use [TailWind](https://tailwindcss.com/docs/guides/create-react-app) for CSS
- use **hardhat** for smart contract
- use react **Context** API to manage the interaction with the blockchain, instead of writing the logic all across the components.

![image](./client/images/Capture.JPG)

# Setup

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

- `npm run dev` (in `client` folder)

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

# Smart Contract

## Setup

- install VS Code `solidty` extension

- create `smart_contract` folder
- `npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers`

- `npx hardhat` -> choose `Create a basic sample project`

- `npx hardhat test` (which runs the test script, deploying/testing a basic greeter solidity contract)

**Commit 7**

## Smart Contract

- delete `Greeter.sol` and create `Transactions.sol`
- delete `sample-scripts.js` and create `deploy.js`
- copy/paste `hardhat.config.js`, replace with my own Alchemy ropsten testnet http address and MetaMask acc1 private key.

## Deployment

- `npx hardhat run scripts/deploy.js --network ropsten`

  ```
  Compiling 2 files with 0.8.0
  Compilation finished successfully
  Transactions address:  0x1bB08ffd1EF88E78A1dbEA0CAcc2d1EB3aDDF713
  ```

  using above address you'll find the contract in [ropsten](https://ropsten.etherscan.io/)

**Commit 8**

# Integration - react and blockchain

## Setup

- in `cient/src`
  - create `utils/constants.js`, enter the contract address found above there
  - copy file `smart_contract/artifacts/contracts/Transactions.sol/Transaction.json` in `util` folder, and import **abi** in `constants.js`
- now we have all the info we need inside react to interact with our smart contract

- in `client`, `npm run dev`

## Context API

- use react contexts API around our entire app, which allows us not to write the logic all across our components.
- create `context` folder in `src`, and file `TransactionContext.jsx` as a centralized place for all the logic interacting with the blockchain

- `TransactionContext.jsx`

  - `export const TransactionContext = React.createContext()`
  - and

  ```
  export const TransactionsProvider = ({ children }) => {
    ...
    return (
        <TransactionContext.Provider value={{...}}>
            {children}
        </TransactionContext.Provider>
    )};
  ```

  - so the component wrapped by `TransactionsProvider` will have access to value object `value={{...}}`

- `main.jsx`

  ```
  import { TransactionsProvider } from "./context/TransactionContext";

  ReactDOM.render(
    <TransactionsProvider>
      <App />
    </TransactionsProvider>,
    document.getElementById("root")
  );
  ```

- `Welcome.jsx`

  let's see how we'll get above testing value in `Welcome.jsx` component

  ```
  import React, { useContext } from "react";
  import { TransactionContext } from "../context/TransactionContext";
  ...
  const { value } = useContext(TransactionContext);
  console.log(value);
  ```

  - if we replace `value={{...}}` with `value={{ value: "test of context" }}` in `TransactionContext.js`, we'll see it in the browser console

**Commit 9**

## Getting MetaMask account

- get MetaMask account

  - `const checkIfWalletIsConnect = async () => {`
  - `const accounts = await ethereum.request({ method: "eth_accounts" });`

- log into MetaMast, refresh webpage, and we'll see the the account in browser's console (because I connected MetaMask with localhost:3000 in previous project). Otherwise, this would be an empty array (getting no acounts, since none are connected yet)

**Commit 10**

## Connecting to MetaMask account

- `const connectWallet = async () => {`
- pass it to other components

  ```
    return (
    <TransactionContext.Provider value={{ connectWallet }}>
      {children}
    </TransactionContext.Provider>
  )
  ```

  here `{ connectWallet }` is shorthand for `{ connectWallet:connectWallet}`

- `Welcome.js`

  - change `const { value } = useContext(TransactionContext);` to `const { connectWallet } = useContext(TransactionContext);`
  - now we can take out the dummy `const connectWallet = () => {};` and the `Connect Wallet` should function now.

- verify:
  - remove connected `localhost:3000` from MetaMask accounts
  - refresh our Webpage and we'll see an empty array in browser console (from line 34 in `TransactionContext.js`) )
  - click `Connect Wallet`, MetaMask pops up for us to select one or more accounts to connect
  - select one account and connect
  - refresh our webpage we'll see our MetaMask account show up in browser console (from line 34 in `TransactionContext.js`)

**Commit 11**

## Conditinoal rendering ("Connect Wallnet" button won't show if there is connected account)

- setCurrentAccount and pass it `<TransactionContext.Provider value={{ connectWallet, currentAccount }}>`
- use it in `Welcome.jsx`
  - `const { connectWallet, currentAccount } = useContext(TransactionContext);`
  - change `Connect Wallet` from alwayse shown to conditional rendering `{!currentAccount && (<button ...`
- so when the webpage first load, useEffect and `checkIfWalletIsConnect` runs. If there is no `currentAccount` set, Connect Wallet button will show. Otherwise, it will not show.

**Commit 12**

## Sending (logging) transaction

- set the state and `handleChange` function in `TransactionContext.jsx`

  ```
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });

    const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  ```

- pass them to our context object
  ```
    return (
    <TransactionContext.Provider value={{
      connectWallet, currentAccount,
      formData, setformData, handleChange
    }}>
      {children}
    </TransactionContext.Provider>
    );};
  ```
- getting/using above state and function in `Welcome.jsx`
  ```
    const { connectWallet, currentAccount, formData, setformData, handleChange } =
    useContext(TransactionContext);
    ...
    <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange}/>
    ...
  ```
- handle form submit

  - add `onClick={handleSubmit}` to submit button, and
  - define `handleSubmit` function

  ```
    const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData; // destructure formData
    e.preventDefault();
    if (!addressTo || !amount || !keyword || !message) return; // must have data for all the fields
    sendTransaction();
    };
  ```

  - pass `sendTransaction()` from TransactionContext.jsx to Welcome.jsx

  - define `sendTransaction` in TransactionContext.jsx
    ```
      const { addressTo, amount, keyword, message } = formData;
      getEthereumContract()
    ```
    - at this moment, it only does
      `console.log({provider,signer,transactionContract,});`

- enter some fake data (make sure enter number in `Amount(Eth)` field, otherwise it won't pass the data validation), click `Send now`, you'll see the very detailed info of `provider,signer,transactionContract` in browser console (from console.log at line 19 in TransactionContext.jsx)

**Commit 13**

## Sending money (to another address)

- in `getEthereumContract`, instead of logging contract info, we'll return the contract:

  - `return transactionsContract;`

- in `sendTransaction`, instead of just calling `getEthereumContract()`, we'll use it by assigning: `const transactionsContract = getEthereumContract();`

- now we can use the variable `transactionsContract` to call all contract related functions

- convert amount and send money from one address to another

  ```
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: "0x5208", //=21000 Gwei, https://www.rapidtables.com/convert/number/hex-to-decimal.html
          value: parsedAmount._hex,
        }],
  ```

## Store info to blockchain (from our address to the contract)

- to store the info to the blockchain

  - `const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);`
  - this will take time, so add isLoading state

- `const transactionsCount = await transactionsContract.getTransactionCount();`
- add transactionCount state, `const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));`
- using **local storage** above. if we instead set it's initial value to zero, the count will turn into zero everytime we reload our browswer. (no `localStorage.setItem()` yet.)

- now we can test

  - copy 2nd MetaMask account and paste into webpage
  - enter 0.0005 (ETH)
  - keyword test
  - message test
  - click send now
  - MetaMask pops up for sending money confirmation
  - MetaMask pops up again for "contract interaction" (storing above transaction info)
  - in browswer console

  ```
  Loading - 0x07bba312b6c995b09de9a865a9590152669daea8b89b23a876fd7a4d606bb96d
  Success - 0x07bba312b6c995b09de9a865a9590152669daea8b89b23a876fd7a4d606bb96d
  ```

  - in MetaMask, account 1 we have one send money (0.0005 ETH) activity and one contract interaction activity (above transaction id can also be found there); account 2 has one receive money (0.0005 ETH) activity.

- details of both transactions can be seen on https://ropsten.etherscan.io/ by clicking the activity status in MetaMask; for the 2nd transaction we can see the "keyword test" and "message test" in the input data field of the transaction record

**Commit 14**

# Rest of the frontend development (React, Tailwind)

## Services.jsx

**Commit 15**

## Transactions.jsx

- in `Welcome`, change "address" to `{currentAccount}`, so the pink ethereum card shows our current address (if connected)
- as you can see it's too long (sticking out of the card), so
- `client/src/utils/shortenAddress.js`
  - `export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;`
- then import/use this in `Welcome.jsx`

  - `{shortenAddress(currentAccount)}`

- we'll use this util in `Transactions.jsx` also

- if account connected, show latest transactions, if not, "connect your account to see the latest transactions"

- copy/paste `client/src/utils/dummyData.js`
- display the transactions:
  ```
    <div className="flex flex-wrap justify-center items-center mt-10">
    {dummyData.reverse().map((transaction, i) => (
      <TransactionsCard key={i} {...transaction} />
    ))}
    </div>
  ```
- create `TransactionsCard`

- [GIPHY](https://developers.giphy.com/)

  - create account
  - create app (https://developers.giphy.com/docs/sdk)
  - select API (instead of SDK)
  - app name: web3.0
  - got API key (stored in .env)

- create `src/hooks/useFetch.jsx`
- import/use it in `Transactions.jsx`
  - `import useFetch from "../hooks/useFetch";`
  - `const gifUrl = useFetch({ keyword });`
  - ```
          <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
    ```

## store private key to .env file

- import/use it in `hardhat.config.js`
  - `const PRIVATE_KEY = import.meta.env.PRIVATE_KEY;`

**Commit 16**

## Footer.jsx

## Getting transaction data from blockchain

- create `checkIfTransactionsExists()` in `TransactionContext.jsx`
- and put it in useEffect()
  ```
    useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
    }, []);
  ```
- create `getAllTransactions()` and call it in `checkIfWalletIsConnect()`

**Commit 17**
