IMAGE_NAME = unigram-payment_node-server-api
CONTAINER_NAME = unigram-payment_node-server-api

PORT = 1000
VERSION = 1.0.2

build:
	docker build -t $(IMAGE_NAME):${VERSION} .

run: build
	docker run -d -p $(PORT):$(PORT) --name $(CONTAINER_NAME):${VERSION} $(IMAGE_NAME):${VERSION}

stop:
	docker stop $(CONTAINER_NAME):${VERSION} || true

restart: clean run

clean: stop
	docker rm $(CONTAINER_NAME):${VERSION} || true
	docker rmi $(IMAGE_NAME):${VERSION}

logs:
	docker logs -f $(CONTAINER_NAME):${VERSION}

help:
	@echo "Usage:"
	@echo " make build - Build the Docker image"
	@echo " make run - Start the Docker container"
	@echo " make stop - Stopping the Docker container."
	@echo " make restart - Restart the Docker container" @echo " make restart - Restart the Docker container"
	@echo " make logs - View the Docker container logs"
	@echo " make clean - Deleting the Docker image"