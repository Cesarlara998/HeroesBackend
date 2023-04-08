
# HeroesBackend
API Y GUARDADO DE EQUIPOS Y PERSONAJES FAVORITOS DE MARVEL API

## Environment Variables


Para correr el proyecto localmente, se necesita agregar las siguientes variables de entorno a un archivo .env

en el caso de  PUBLIC_KEY,PRIVATE_KEY,URL_MARVEL, ESTOS SE OBTIENEN DESDE LA WEB DE DEVELOP DE MARVEL

A la fecha de 04/2023 URL_MARVEL env es https://gateway.marvel.com

`PORT`
`PUBLIC_KEY`
`PRIVATE_KEY`
`URL_MARVEL` 
`MONGO_URI` 
 
EN EL CASO DE NO TOCAR EL ARCIHOV DE COMPOSE,
DEJAR EL ENV DE MONGO URI COMO mongodb://root:example@mongodb:27017/


## Run Locally

Clonar

```bash
  git clone https://github.com/Cesarlara998/HeroesBackend
```

Ir a la carpeta del proyecto

```bash
  cd HeroesBackend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Run Locally With Docker

Clonar
```bash
  git clone https://github.com/Cesarlara998/HeroesBackend
```
Ir a la carpeta del proyecto
```bash
  cd HeroesBackend
```

```bash
  docker-compose up -d
```

