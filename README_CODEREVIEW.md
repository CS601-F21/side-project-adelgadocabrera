
# `CODEREVIEW.ME` 
#### Make the ~~world~~ _code_ a better place

 [![CodeReview](https://www.bounteous.com/sites/default/files/insights/2019-06/previews/20190606_blog_code_review_limbo-_how_low_should_you_go_website.png)](https://github.com/CS601-F21/side-project-adelgadocabrera)

Your code works. But have you ever wondered if your code is elegant and readable? 
Do you want to write clean, maintainable code?

Whereas some websites such as Stackoverflow are focused on helping other developers solve their problems, 
codereview.me aims to help developers write clean code and learn how to do proper code reviews.


## Features

- Authentication
    - Either Google/Github OAuth or most likely Basic Authentication so I can implement it myself
    - (MVP) Persist profile information such as:
        - Username
        - Email
        - Student or proffesional 
        - Years of experience
        - Company
        Additional, most likely not included in mvp
        - Description about yourself
        - Favorite programming languages

- Welcome page - nothing fancy
    - (MVP) List of code reviews
        - Date
        - Title
        - Description (or not)
        - Number of comments / code reviews
        - Programming language

- Upload and share Github Gist
    - (MVP) Additional information besides Github Gist:
        - (Mandatory) Programming language
        - (Mandatory) Title
        - (Mandatory) Description/context of what you are trying to accomplish
        - (Optional) Link to public repo  
    - (MVP) Only online public sharing is allowed - everyone can see every Gist published
    - (MVP) Real-time code-reviews of Gist - but will have Posts like appearance
    - (MVP) Code-reviews will show username + years experience + company/university - if they provided all that 
        information. 
    - (MVP or not) Upvote code reviews - even if code review is performed by someone with little experience
        it may have the most upvotes so will appear as best solution

- (probably not MVP) Public per user profile page 
    - Display
        - Username
        - Company
        - Years of experience
        - Favorite programming languages 
        - Description about user
        - Code reviews performed
        - Code reviews requests


  
## Tech Stack

**Client:** 
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/) (unsure about this one, normally I do my own css, but it could speed things up)

**Server:** 
- Java (choose one:) 
    - (Most likely this one) Pure java built in libraries
    - Use third party [framework](https://hackr.io/blog/java-frameworks)

**Database:**
- [PostgreSQL](https://www.postgresql.org/)

**Optional:**
- Bundle everything in [Docker](https://www.docker.com/) container
  
## Authors

- [@adelgadocabrera](https://www.github.com/adelgadocabrera)
  
