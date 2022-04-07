Demo app, how to add security to your Angular applications using JSON Web Tokens, claims, and a .NET 5 Web API.

It's based on the training below:
Angular Security Using .NET 5 and JSON Web Tokens by Paul D. Sheriff

Thank you.
Sam Klok

1. To open solution, use file PTCApp.code-workspace in VSC.
2. To compile API, go to the PTCApi / Terminal / Run Build Task
2.1 To run API, got to Debug / NetCore Launch PTCApi
2.2 To check it, open URL 
	http://localhost:5000/api/product  (requre authorization)
	http://localhost:5000/api/ProductPublic 	(open)
3. To install all fro Angular run ..\PTC>npm install
3.1. To run Angular client app PTC, run in the separate terminal ..\PTC> npm start
