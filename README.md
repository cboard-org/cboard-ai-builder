
# Cboard AI builder

The Cboard AI Builder is an augmentative and alternative communication (AAC) board generator designed to streamline the creation process for speech therapists or caregivers. It aims to reduce the time required to create specific AAC boards and provide a preliminary draft quickly.
Once the board is created, it can be conveniently exported for use within the [Cboard App](https://app.cboard.io/).

We're using Discord to collaborate, join us at: https://discord.gg/TEH8uxh

# How it Works

The process of using Cboard AI Builder starts with users providing the theme of the board and defining the grid dimensions. This information guides the generation of a comprehensive board layout, including labels and corresponding pictograms for each tile. The system sources pictograms from a database of images known as the Global Symbols bank. If a suitable image is not found, the AI autonomously generates a new pictogram tailored to the specific label. This seamless process simplifies board creation, providing efficiency and customization.

## Getting Started

First, install the project dependecies and run the development server:

```bash
yarn install

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit any file.

This is a [Next.js v14](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Contributors

## Developers

For the transaltions we are currently using [Next-intl](https://next-intl-docs.vercel.app/). To add new messages to the project, just add it on the file ```en-US.json```.
