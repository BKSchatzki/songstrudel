# SongStrudel

An app for users to create, save, and share arrangements. Arrangements can be updated, shared, and privated. Sections can be copied and pasted, and unfinished work is saved in local storage.

**Link to project:** https://songstrudel.vercel.app

![SongStrudel](https://res.cloudinary.com/djqsm7sz5/image/upload/v1693945902/bks-portfolio/songstrudel_emoglr.jpg)

## How It's Made:

**Tech used:** NextJS, NextAuth, Tailwind, DaisyUI, MongoDB, Mongoose

This app is an evolution of the SongStruct concept (https://github.com/BKSchatzki/songstruct), implementing a feed for all arrangements, a search function, as well as management of created arrangements. Local storage is used to copy and paste sections and store new arrangements before they are saved to the database. An arrangement itself is an object whose state is updated through a complex form.

## Optimizations

The Arrangement component is the form that exists inside of the /create-arrangement route, and is broken into many subcomponents that all have the state of the arrangement object passed as props. Increasing form complexity has resulted in prop drilling, and future iterations of this project will use global state management. Pagination needs to be implemented, and form performance on mobile (the intended main use case for the app) needs to be improved.

## Lessons Learned:

Note to self: remember to connect to the database inside your handlers when on serverless. Keep in mind common design patterns so that the project can scale more easily.

## Examples:

Take a look at some more examples in my portfolio:

**BK Chat:** https://github.com/BKSchatzki/bk-chat

**C Flat Run:** https://github.com/BKSchatzki/cflatrun-landingpage

**Nick B. Schatzki:** https://github.com/BKSchatzki/nbs-portfolio

**SongStruct:** https://github.com/BKSchatzki/songstruct
