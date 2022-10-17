# Team Project Management Web App 

This project was bootstrapped with [React](https://github.com/facebook/create-react-app) and [Firebase](https://firebase.google.com/).

# Demo 
Please visit [Project Done](https://project-management-b274f.firebaseapp.com/) for a live demo.
# Features
- User auth and session powered by [Firebase](https://firebase.google.com/)
- Users:
  - Users online status checkbar
  - Users bios edit and share
- Projects:
  - Creating projects, Assigning team members, Editing team members
  - Pinning projects for easy access
  - Archive Projects
  - Searching Projects by keywords
  - Filtering/Sorting projects 
- Communication:
  - Commenting/Issuing within a project
  -  Discussion inside comments/issues   
  -  Like and unlike comments/issues   

# Getting Started

## Development
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deploy to you Firebase service
- Get and copy your firebase credentials to 
```bash
src/firebase/config copy.js
```
- rename `src/firebase/config copy.js` as `src/firebase/config.js`
- execute the following command to init firebase project. When Initializing firebase, use `build` as the `public directory`.
```bash
npm install -g firebase-tools
firebase login
firebase init
```
- build and deploy
```
npm run build
firebase deploy
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

