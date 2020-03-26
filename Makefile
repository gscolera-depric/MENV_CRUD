DB_URL = "mongodb+srv://gscolera:12345@cluster0-todah.mongodb.net/test?retryWrites=true&w=majority"
HOST = 192.168.0.33

.PHONY: client

client:
	npm run serve --prefix client

.PHONY: server

server:
	HOST=${HOST} DB_URL=${DB_URL} npm run dev --prefix server

.PHONY: build

build:
	make clean
	npm run build --prefix server
	npm run build --prefix client

clean:
	rm -rf ./www