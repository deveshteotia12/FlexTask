# Flex Task

## Approach
- Implementing a simple form based solution wasn't enough for the given problem statement.
- So, a full fledged website is created for the users.
- User can get on to the website and register themselves.
- Now, they can be redirected to their personalized Dashboard where they will have to fill basic information.
- After filling their details like contact no, age etc (Everything is validated keeping age in between certain section).
- There are different timings or batches for Yoga classes, mentioned timings are not hardcoded but rather more scaling approach is implemented. Slots are dynamically stored in the database with each slot being unique.
- User can see different slots and occupancies in different slots.
- User can now select any of the slot and subscribe to the Yoga class.
- If already subscribed user is not allowed to subscribe again for given month rather details related to subscription are made visible on the portal.
- Every month user status is changed using schedulers and they are prompted to subscribe again.

## Code Structuring and  Architecture
- Backend is implemented on Node JS and frontend on React.
- Different Node Packages are used such as node-cron,bcrypt,jsonwebtoken etc.
- Code is structured in very professional way, there is lot of room for expansion is left.
- Addition to service can be done easily.
 ### Backend
- src folder contains the backend code .
- Further shared folder contains all the code or logic shared among all the API's like Middlewares.
- api folder contains all the API's separated for slots API and Users API.
- Divided into controller, router and schema it becomes more easy to understand.
### Frontend
- client folder contains the frontend code.
- utils contains all API calls and constants.
- Pages and Components are used.


## Installation Locally

###

```
# cd src (for server) cd client(for client)
cd src 
npm install
npm start
```