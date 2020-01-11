# revenue_monster_test

## How to run

1. Create a .env file with apiKey variable
2. npm install
3. npm run start
4. npm run test (optional)

## How to use

1. localhost:3000/api/top  
It will get the top 20 popular movies' information and picture, then save into storage folder.

3. localhost:3000/api/search?title=star  
You can change the route query in order to search the comments based on the criterias below:
    - title (part of body)
    - description (part of body)
    - filename (part of body)
    - original_link (part of body)