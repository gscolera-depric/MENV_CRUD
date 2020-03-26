HOST = 192.168.0.33

.PHONY: client

client:
	npm run serve --prefix client

.PHONY: server

server:
	HOST=${HOST} npm run dev --prefix server

.PHONY: build

build:
	make clean
	npm run build --prefix server
	npm run build --prefix client

run:
	node ./www/server.js
	
clean:
	rm -rf ./www