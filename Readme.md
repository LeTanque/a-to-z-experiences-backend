# BackEnd Repository for the AtoZ Experience build week team

## Base URL

[Deployed on Heroku](https://atozexperiences-letanque.herokuapp.com/)

## Authorization Routes

POST to `/api/auth/register`

- expects name, username, password, email and role in the req.body

POST to `/api/auth/login`

- expects username and password in the req.body,
- outputs a token and welcome message

## User Routes

GET to `/api/users`

- expects token for authorization
- outputs an array of users

GET to `/api/users/:id`
- expects token for authorization
- outputs user with the specified ID

GET to `/api/users/:id/provider`

- expects token for authorization
- outputs the specific user with the id as well as an experiences key with the value of an array of experiences that they are providing

GET to `/api/users/:id/experiences`

- expects token for authorization
- outputs the title and description of the experiences the user is signed up for

PUT to `/api/users/:id`
- expects token for authorization
- outputs user with updated info


## Experience Routes

GET to `/api/experiences`

- expects token for authorization
- outputs an array of all the experiences available, with all their data

GET to `/api/experiences/:id`

- expects token for authorization
- outputs an experience object for the specific experience

GET to `/api/experiences/:id/users`

- expects token for authorization
- outputs the users who are signed up for that experience
- ...also outputs the title and description of the experience for clarification purposes

POST to `/api/experiences`

- expects token for authorization
- requires title, description, category, street, region, city,  postCode, and provider_id in the req.body
- adds the experience to the array of experiences

PUT to `/api/experiences/:id`
- expects token for authorization
- updates the experience at the id

DELETE to `/api/experiences/:id`
- expects token for authorization
- deletes the experience at the id point
