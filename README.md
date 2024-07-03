<div align="center" id="top"> 
  <img src="https://i.pinimg.com/564x/4f/1d/69/4f1d69018176870ca7a94c1e8a50c824.jpg" alt="Stocks Profiles" />

&#xa0;

  <!-- <a href="https://stocksprofiles.netlify.app">Demo</a> -->
</div>

<h1 align="center">Stocks Profiles</h1>

<p align="center">

  <a href="https://prisma.io"> 
    <img width="122" height="20" src="https://made-with.prisma.io/dark.svg" alt="Prisma" />
  </a>

  <img alt="Github top language" src="https://img.shields.io/github/languages/top/Raxuis/stocks-profiles?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/Raxuis/stocks-profiles?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Raxuis/stocks-profiles?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/Raxuis/stocks-profiles?color=56BEB8">
</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/Raxuis" target="_blank">Author</a>
</p>

<br>

## :dart: About

Stocks Profiles is a web application that allows users to view and analyze stock prices. It provides a user-friendly interface for navigating through various stocks and their corresponding data.

## :sparkles: Features

:heavy_check_mark: Login with Google / GitHub\
:heavy_check_mark: Get a stock profile\
:heavy_check_mark: Get a stock chart\
:heavy_check_mark: Manage your queries

## :rocket: Technologies

The following tools were used in this project:

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [Node](https://nodejs.org/en/), and [pnpm](https://pnpm.io/) installed.

## :checkered_flag: Starting

1. **Clone this project**

   ```bash
   $ git clone https://github.com/Raxuis/stocks-profiles
   ```

2. **Access the project directory**

   ```bash
   $ cd stocks-profiles
   ```

3. **Install dependencies**

   ```bash
   $ pnpm install
   ```

4. **Set up environment variables**

   - Copy the `.env.example` file to create a new `.env` file:
     ```bash
     $ cp .env.example .env
     ```
   - Open the newly created `.env` file and fill in the required environment variables, particularly the PostgreSQL connection string:

     ```
     DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
     ```

     Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your PostgreSQL credentials and database information.

5. **Run the project**

   ```bash
   $ pnpm dev
   ```

   The server will initialize at <http://localhost:3000>

## :memo: License

This project is under the MIT license. For more details, see the [LICENSE](LICENSE.md) file.

Made with :heart: by <a href="https://github.com/Raxuis" target="_blank">Raphaël</a>

&#xa0;

<a href="#top">Back to top</a>

---
