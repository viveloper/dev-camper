# 리액트 & 타입스크립트 프로젝트

> 리액트와 타입스크립트를 사용하여 DevCamper 서비스의 프론트엔드를 완성한다.

## Usage

### Env Variables

Create a .env file in then backend and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
GEOCODER_PROVIDER = mapquest
GEOCODER_API_KEY = your key
FILE_UPLOAD_PATH=./public/uploads
MAX_FILE_UPLOAD=1000000
JWT_SECRET=jwt scret key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
