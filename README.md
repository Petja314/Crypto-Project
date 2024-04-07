
![Mi crypto](https://github.com/Petja314/Crypto-Project/assets/101811219/0ec276ac-5a74-49b5-b0ea-1fedbd822a59)

# Mi Crypto Empowering Your Crypto Journey with Simplicity and Precision!

## 🚀 Introduction
Mi Crypto offers a comprehensive suite of tools to effortlessly track, swap, and optimize your cryptocurrency investments. With real-time data at your fingertips, managing your crypto portfolio has never been easier.

## Installation

To clone and run this application, you'll need [Git](https://git-scm.com/) and [ Node.js](https://nodejs.org/en/download/) installed on your system. Once you have them, you can install the project dependencies using  [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/lang/en/) packages.

From command line : 


```bash
# Clone this repository
$ git clone git@github.com:Petja314/Crypto-Project.git

# Go into the repository
$ cd Crypto-Project

# Install dependencies
  yarn install 
  yarn add firebase

# Run the app
  yarn start 
```

Install DEX Exchange back end:

```bash
# Go into the back end root 
$ cd src
$ cd dexBackend  

# Install dependencies
$ yarn install 

# Run the back end
$ node server.js
```



    

## API Reference

To use these APIs, you'll need to obtain **your own API keys**. Refer to the project root file .env.example for examples and instructions on where to obtain these keys.

**Frontend APIs**:

- Alternative API: Open API platform providing data on the current Fear and Greed Index.
- Coin Stat API: Retrieves data about the crypto market, including lists of tokens, chart data, and more.
- Exchange Currency API: Provides the latest exchange rates for selected currencies.


**Backend APIs**:

- Moralis API: Provides current prices from decentralized exchange (DEX) platforms on the selected ERC-20 network.
- 1INCH DEX API: Enables swapping of selected tokens via an API.



| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |




## Application usage demo : 

![Untitled design](https://github.com/Petja314/Crypto-Project/assets/101811219/e8190d93-53c4-4d9e-9011-2363254ec8c8)


**⏱️ Real-Time Tracking**:

- Upon logging in, users are greeted with a real-time dashboard displaying live data on various cryptocurrencies.
- Users can navigate to different sections of the application to view detailed information about specific cryptocurrencies, including current prices, market trends, and trading volumes.

**👨‍💻 Customizable Profiles**:

- Users can create personalized accounts by signing up with their email address and choosing a unique username and profile photo.
- Once logged in, users can update their profile information, such as their display name, bio, and profile picture, to reflect their preferences and personality.

**📊 Advanced Analytics**:

- Users can access interactive charts and graphs that visualize market trends, including price movements, trading volumes, and volatility indicators like fear and greed indices.
- Weekly leaderboards and performance rankings allow users to compare the performance of different cryptocurrencies and track their progress over time.

**⚙️ Flexible Filtering**:

- Users can customize their data views by filtering cryptocurrencies based on various criteria, such as currency type, market capitalization, trading volume, and price changes.
- Advanced filtering options enable users to focus on specific subsets of cryptocurrencies that match their investment preferences and risk tolerance.

**💼 Portfolio Management**:

- Users can create and manage their crypto portfolios within the application, tracking their investments and monitoring their profit and loss in real-time.
- Portfolio management tools allow users to add, remove, and edit positions, set price alerts, and analyze performance metrics to make informed investment decisions.

**㊗️ Instant Swaps**:

- Integrated with MetaMask wallet, users can seamlessly swap ERC-20 tokens directly from their wallets using the decentralized exchange aggregator.
- The swap feature provides users with access to a wide range of tokens and ensures secure and instant transactions without the need for intermediaries.

**📰 Latest News Updates**:

- Users can stay informed with the latest news updates and market insights curated by the application.
- The news section covers bullish and bearish trends, trending topics in the crypto world, and important developments affecting the cryptocurrency market.

**🖥️ User data storage**:

 - All user data, including login credentials, passwords, account information, and custom portfolio details, is securely stored in the Firebase backend.
- Access to this data is restricted to project administrators only, ensuring the confidentiality and security of user information.
## Dependencies
**Design**  :

![Static Badge](https://img.shields.io/badge/MaterialUi-blue?style=for-the-badge&logo=mui&labelColor=black&link=https%3A%2F%2Fmui.com%2Fmaterial-ui%2F)

Is an open-source React component library that implements Google's Material. 

**Database**  :

![Static Badge](https://img.shields.io/badge/Firebase-yellow?style=for-the-badge&logo=firebase&labelColor=black&link=https%3A%2F%2Fmui.com%2Fmaterial-ui%2F)

Backed by Google which helps to store your data safe.

**Web 3.0 DEX** :

![Static Badge](https://img.shields.io/badge/WAGMI-GREEN?style=for-the-badge&logo=wasmcloud&labelColor=black&link=https%3A%2F%2F1.x.wagmi.sh%2F)

 Collection of React Hooks containing everything you need to work with Ethereum.

![Static Badge](https://img.shields.io/badge/MORALIS-%2300BFFF?style=for-the-badge&logo=mozilla&labelColor=black&link=https%3A%2F%2Fmoralis.io%2F)

Instant access to cross-chain blockchain data with API request.


![Static Badge](https://img.shields.io/badge/WEB_3_MODAL-%23FFA07A?style=for-the-badge&logo=webtrees&logoColor=%23FFA07A&labelColor=black&link=https%3A%2F%2Fdocs.walletconnect.com%2F)

Web3Modal SDK allows you to easily connect your Web3 app with wallets. 

**Crypto Chart**: 

![Static Badge](https://img.shields.io/badge/CHART_JS-%23F08080?style=for-the-badge&logo=chartdotjs&logoColor=%23F08080&labelColor=black&link=https%3A%2F%2Fdocs.walletconnect.com%2F)

Library to convert data into the charts.

**HTTP requests** :

![Static Badge](https://img.shields.io/badge/AXIOS-%235A29E4?style=for-the-badge&logo=axios&logoColor=%235A29E4&labelColor=black&link=https%3A%2F%2Faxios-http.com%2F)

Promise-based HTTP Client for node.js and the browser.

**Server**:

![Static Badge](https://img.shields.io/badge/NODE_JS-%23339933?style=for-the-badge&logo=nodedotjs&logoColor=%23339933&labelColor=black&link=https%3A%2F%2Fnodejs.org%2Fen)

Create servers, web apps, command line tools and scripts.

**REACT/REDUX**: 

![Static Badge](https://img.shields.io/badge/REDUX-%23764ABC?style=for-the-badge&logo=redux&logoColor=%23764ABC&labelColor=black&link=https%3A%2F%2Fredux.js.org%2F)

 A JS library for predictable and maintainable global state management.


![Static Badge](https://img.shields.io/badge/Browser_Router-%23CA4245?style=for-the-badge&logo=reactrouter&logoColor=%23CA4245&labelColor=black&link=https%3A%2F%2Freactrouter.com%2Fen%2F)

 Stores the current location in the browser's address bar using clean URLs.





