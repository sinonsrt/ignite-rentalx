# Qual imagem vou baixar
FROM node:latest

# Diretório que quero criar 
WORKDIR /usr/app

# Copiar o arquivo de -> para
COPY package.json ./

# Depois de tudo, realizar a instalação das dependencias
RUN npm install

# Agora copia tudo para dentro da raiz
COPY . .

# Liberar a porta 3333, que é a porta que esta aplicação
EXPOSE 3333

# Rodar o script na app
CMD ["npm", "run", "dev"]


## Para rodar o arquivo dockerfile para criar o container - docker build -t nome da imagem / local do dockerfile
# docker build -t rentalx .

## Para rodar o container
# -p 3333:3333 mapear as portas
# rentalx - nome do container
# docker run -p 3333:3333 rentalx

## Para acessar o container
# inspiring_lichterman - nome do container em execução
# /bin/base - diretório base dentro do container
# docker exec -it inspiring_lichterman /bin/bash


# docker ps -a - ver containers up e down
# docker images - ver imagens baixadas
# docker ps - ver containers rodando

## para inciar container
# docker start nome do container

## ver logs do container
# docker logs nome do container

## para fica observando os logs do container
# docker logs nome do container -f


