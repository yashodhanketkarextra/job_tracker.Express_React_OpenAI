Job Tracker - Server
====================

Backend part of the Job Tracker application.

Usage
-----

1.	Run `npm install` to install dependencies

2.	Create a `.env` file in the root directory with the following content:

	```
	/apps/server/.env
	MONGO_URI={your mongodb uri}
	GROQ_API_KEY={your groq key} // i'm using groq to access openai model
	JWT_SECRET={your jwt secret}
	```

3.	Run `npm run dev` to start server in development mode or `make` if make is installed

4.	Run `npm run build` then `npm start` or `make prod` to build and start server in production mode
