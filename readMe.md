## iResume Native

This repo implements the front-end of a mobile aplication. The aplicaton, along with its back-end, works as a Resume/CV builder, allowing the user to insert his basic info, Academic and Professional experiences, skills, and generates a formated pdf file. 

## How to run locally

### You will need in your machine:
* [Node](https://nodejs.org/en)
* Yarn (`npm i yarn`)
* [Ngrok](https://ngrok.com/download) (for fowarding local server)
* [Android Studio](https://developer.android.com/studio) (for device simulation)
* Expo Go app (to run at your own device)
* [Back-end](https://github.com/estevamcardoso/iResume-serverless)

### To run the app at the terminal inside main folder:
* `yarn`
  * to install all dependencies
* `yarn start`
  * to start the aplication

### To create a DNS pointing to your local back-end server:
* `ngrok.exe http 3000`
  * Where 3000 is the server port
  * Ngrok will return a DNS like `https://93ec-189-41-210-203.sa.ngrok.io`
  * Valid for 120 minutes
  * Add this DNS to **API_URL** at `./src/utils/constants.ts`


Now, you are ready to test and implement new stuff!!

## Workflow
Every implementation starts with an **issue**, from which we must create a **branch**. 

After implementing, open a **Pull Request** and request a peer review.