# SongStrudel

A full app where users can create and save arrangements to the database and have them show up in a feed. Viewing and cloning of completed arrangements, user profile, ability to set published and unpublished all WIP.

**Link to project:** https://songstrudel.vercel.app

![SongStrudel](https://res.cloudinary.com/djqsm7sz5/image/upload/v1693945902/bks-portfolio/songstrudel_emoglr.jpg)

## How It's Made:

**Tech used:** NextJS, NextAuth, Tailwind, MongoDB, Mongoose

This app is a continuation of SongStruct (https://github.com/BKSchatzki/songstruct), working back-to-front rather than front-to-back. The main focus was the /create-arrangement route; at its core, it is a form. However, the state of the form is completely mutable. It is initialized as an object with the same structure as the schema for arrangements, then that object's state is changed as the user manipulates the form. The user is able to add and delete sections at any point in the arrangement, as well as edit the cells (which are just buttons), and change their titles and descriptions.

## Optimizations

The Arrangement component is the form that exists inside of the /create-arrangement route, and is broken into many subcomponents that all have the state of the arrangement object passed as props. The upside to this is that this can be reused in a future /view-arrangement route with only a few tweaks to determine user. There are a few issues that need to be addressed on the whole, such as the way Discord auth works regarding sessions. Additionally, I need to either protect the /create-arrangement route or implement a little more logic to make sure arrangements can't be created if not logged in. NextJS caching is also still a mystery, and I've forced the feed to be dynamic; still there are some odd behaviors with getting new arrangements to show in the feed.

## Lessons Learned:

I enjoyed working back-to-front on this project; creating a form based on a schema was gratifying. This was also my first NextJS project, and I liked routing with Next a lot more than with react-router. Auth was also tricky to implement, but should be much easier to do in the future.

## Examples:

Take a look at some more examples in my portfolio:

**BK Chat:** https://github.com/BKSchatzki/bk-chat

**C Flat Run:** https://github.com/BKSchatzki/cflatrun-landingpage

**Nick B. Schatzki:** https://github.com/BKSchatzki/nbs-portfolio

**SongStruct:** https://github.com/BKSchatzki/songstruct
