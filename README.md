# Smart To-Do List

When you are recommended something it's not always easy to jot it down for later in an organized fashion. Adding the item to your phone or computer ends up taking time and opening up the right app is only part of the problem. You then have to locate the right list ("Movies to watch", "Books to read", etc.) to add to. And if you do get it in to the right list, you don't have much more context about it. This delay and lack of additional information acts as a huge deterrent.

The solution? A smart, auto-categorizing todo list app. The user simply has to add the name of the thing, and it gets put into the correct list.


## Final Product

!["gif"](https://github.com/edonnellan/Smart-To-Do-List/blob/0823fd5bd5fc586a78fabfbb88ca15267dfd1a2d/docs/todolist.gif)

!["home"](https://github.com/edonnellan/Smart-To-Do-List/blob/0823fd5bd5fc586a78fabfbb88ca15267dfd1a2d/docs/01-home.jpg)

!["edit"](https://github.com/edonnellan/Smart-To-Do-List/blob/0823fd5bd5fc586a78fabfbb88ca15267dfd1a2d/docs/02-edit.jpg)

!["completed"](https://github.com/edonnellan/Smart-To-Do-List/blob/0823fd5bd5fc586a78fabfbb88ca15267dfd1a2d/docs/03-completed.jpg)


## Getting Started

1. Get a Google API Key: <https://console.cloud.google.com/apis/credentials>
2. Get a Search engine ID: <https://programmablesearchengine.google.com/>
   - Add sites to search (ex. wikipedia.org, amazon.com)
3. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
4. Update the .env file with your correct local information 
5. Install dependencies: `npm i`
6. Fix to binaries for sass: `npm rebuild node-sass`
7. Reset database: `npm run db:reset`
8. Run the server: `npm run local`
9. Visit <http://localhost:8080/>


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- express
- morgan
- pg
- request
- ejs
- chalk
- dotenv

   
