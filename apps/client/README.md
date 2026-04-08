Job Tracker - Client
====================

Frontend part of the Job Tracker application.

Usage
-----

1.	Run `npm install` to install dependencies

2.	Create a `.env` file in the root directory with the following content:

	```
	VITE_API_URL="http://localhost:5000/api"
	or
	VITE_API_URL=${modified server url if required}
	```

3.	Make sure server is running

4.	To start the development mode

	```sh
	# if make is installed
	make

	# if not
	npm run dev
	```

5.	To start production build

	```sh
	# if make is installed
	make prod

	# if not
	npm run build
	npm run preview
	```
