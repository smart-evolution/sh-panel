.PHONY: build-image
build-image:
	docker build --no-cache --tag oszura/sh-panel --file=Dockerfile .

.PHONY: build-image-soft
build-image-soft:
	docker build --tag oszura/sh-panel --file=Dockerfile .
