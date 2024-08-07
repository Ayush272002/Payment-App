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

- Go to the `docker-compose.yml` and fill `MONGODB_URL` and `JWT_SECRET`.
- Open your terminal in the root dir of the project then run
- ```shell
    docker-compose up
    ```
- Go to `http://localhost:5173` on your browser <br>
The project would have been hosted there 

Alternatively,

- Backend <br>
Run the following command from the project root directory. 

```shell
docker pull ayush27002/payment-app:backend
docker run -e MONGODB_URL=<your_mongo_url> -e PORT=8000 -e JWT_SECRET=<jwt_pass> -d -p 8000:8000 ayush27002/payment-app:backend
```

- Frontend <br>
Run the following command from the project root directory

```shell
docker pull ayush27002/payment-app:frontend
docker run -e VITE_API_BASE_URL=http://localhost:8000⁠ -d -p 5173:5173 ayush27002/payment-app:frontend
```
- Go to `http://localhost:5173` on your browser <br>
The project would have been hosted there 

For more info on the docker image visit [here](https://hub.docker.com/repository/docker/ayush27002/payment-app/general)


***Imp -> Why Do I dont need to use networks and the frontend and backend run without networks <br><br>
Ans -> In a web application running in a browser, localhost always refers to the machine running the browser, not the container. so it makes request to localhost which is the machine and not the container anymore***
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
