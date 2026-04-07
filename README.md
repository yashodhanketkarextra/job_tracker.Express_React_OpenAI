Job tacker
==========

Small job tracker dashboard application

Tech Stack
----------

-	React (Typescript)
-	Tanstack Query, Rotuer
-	Tailwindcss
-	MongoDB
-	Express
-	OpenAI API

Installation
------------

1.	Clone the repo
2.	Install dependencies
3.	Create a .env file with the following variables

	```
	/apps/server/.env
	MONGO_URI={your mongodb uri}
	GROQ_API_KEY={your groq key} // i'm using groq to access openai model
	JWT_SECRET={your jwt secret}
	```

4.	Run the server

5.	Run the client and go to http://localhost:5173

License
-------

MIT License
