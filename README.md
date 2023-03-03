Instead of Create React App, we are using Next.JS. There are some differences from the vanilla React.

## First time

Remember to install dependencies:

```bash
npm install
```

## Running the server

Type the following command in Bash:

```bash
npm run dev
# "npm start" won't work here, since it's Next.js, not Create React App.
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the webpage.

## Creating a new webpage

### Routing

We don't use the classic `<Route>` components. Instead, every .tsx file in `pages` directory automagically becomes a webpage.

The folder structure describes the URL that will be matched:

```bash
/pages/index.tsx = /
# "index.tsx" is the default page in a directory, so the "index" is omitted in the URL.

/pages/samples/index.tsx = /samples
# same here

/pages/samples/page.tsx = /samples/page
# File name becomes a part of the URL

/pages/samples/[id].tsx = /samples/X
# X can be anything (usually some ID) and can be read by the React webpage!
# But if X = "page", then the previous match will apply.
```

You can see the example pages in the `/pages/samples` folder - I covered the basics of navigating between pages and reading parts of the URL.

### Where to write everything?

In Next, there are two distinct parts of a page: `<Head>` and `<main>`.

In `<Head>` we can place elements like page title or an icon.

The `<main>` block contains the contents of a page (all forms, buttons, text etc.).

Hooks like `useState, useRecoilState, useEffect` etc. are placed before the `return()`, as in plain React.

### MUI

TODO

## Creating tests

TODO

We have each other, we don't need tests.

## Project structure

We have two default branches, **main** and **dev**. If you want to make changes, the workflow is as follows:

1. Checkout the **dev** branch.
2. Create a new branch with a good name - for instance, if you want to add a registration form, you can name it **form-registration**.
3. Commit your changes to the branch and push it to remote repository.
4. Create a Pull Request in GitHub, from your branch to **dev**. Add one or two reviewers (possibly including Jakub). You can announce the PR on Signal.
5. If everything is OK, the PR will be accepted. Everyone should then pull the changes from **dev** into branches they are working on.
6. Once in a while, I will merge **dev** into **main**. Then, a new frontend will be generated on Azure and released for everyone to see and admire.