# Payment App

A simple payment app using MERN stack just to test how transactions work in a database

[Live Deployemnt Link](https://payment-app-ayush.vercel.app)

### Test credentaials <br>
Email - test@gmail.com <br> 
Password - Test@1234

---
Note - The server is deployed on free tier so it might take time to get responses from the server when you test this application. Or if you want to run it locally then follow the instructions below. 

- Clone the repository
```shell
git clone https://github.com/Ayush272002/Payment-App
```

There is a docker file to easily run the project easily

Steps to do that 

- Backend <br>
Run the following command from the project root directory. 
Fill in the .env file first
```shell
cd backend
docker build -t payment-app-backend .
docker run -d -p 8000:8000 payment-app-backend
```

- Frontend <br>
Run the following command from the project root directory
In the .env file the put this as the base URL 
```
VITE_API_BASE_URL = http://localhost:8000
```

```shell
cd frontend
docker build -t payment-app-frontend .
docker run -d -p 5173:5173 payment-app-frontend
```

- Go to `http://localhost:5173` on your browser <br>
The project would have been hosted there
------
## Running without docker

### Running the backend
Fill the necessary fields in the .env file and then do the following

```shell
cd backend
npm i
npm start
```

### Running the frontend
Fill the necessary fields (the backend url) in the .env file and then do the following

```shell
cd frontend
npm i
npm run dev
```
## Contributing
Contributions are welcome! If you have suggestions for new features, bug fixes, or improvements, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions or suggestions, please feel free to contact.
