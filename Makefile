GOCMD=go
GOLINT=golint
GOFMT=gofmt
MAKE=make
NPM=npm
FULL_IMAGE_NAME=oszura/$(IMAGE_NAME)

SH_PANEL_MONGO_URI=mongodb://localhost:27017
SH_PANEL_MONGO_DB=shpanel
SH_HTTP_PORT=3223
SH_API_SRV_PORT=3222

.DEFAULT_GOAL := all

.PHONY: deps
deps:
	$(shell cd /; $(GOCMD) get -u golang.org/x/lint/golint)
	$(GOCMD) mod vendor
	$(NPM) install

.PHONY: all
all:
	$(MAKE) build-frontend
	$(MAKE) build-backend $(ENV)

.PHONY: build-frontend
build-frontend:
	$(NPM) rebuild node-sass
	$(NPM) run build:$(ENV)

.PHONY: build-backend
build-backend:
	$(GOCMD) build -mod=vendor -o shpanel

.PHONY: test
test:
	$(NPM) run test
	$(GOCMD) test -mod=vendor ./...

.PHONY: integration-test
integration-test:
	$(NPM) run cypress:run

.PHONY: lint
lint:
	$(NPM) run flow
	$(NPM) run lint
	$(NPM) run csslint
	./scripts/gofmt_test.sh
	$(GOLINT) ./... | grep -v vendor/ && exit 1 || exit 0
	$(GOCMD) vet -mod=vendor ./... | grep -v vendor/ && exit 1 || exit 0

.PHONY: fix
fix:
	$(NPM) run prettify
	$(NPM) run lint:fix
	$(NPM) run csslint:fix
	$(GOFMT) -w .

.PHONY: run
run:
	SH_PANEL_MONGO_URI=$(SH_PANEL_MONGO_URI) \
	SH_PANEL_MONGO_DB=$(SH_PANEL_MONGO_DB) \
	SH_API_SRV_PORT=$(SH_API_SRV_PORT) \
	SH_HTTP_PORT=$(SH_HTTP_PORT) \
	./shpanel

### Containerization
.PHONY: image
image:
ifdef ENV
	docker build --tag $(FULL_IMAGE_NAME)-$(ENV):$(V) --file=./docker/$(IMAGE_NAME)/$(ENV)/Dockerfile .
else
	docker build --tag $(FULL_IMAGE_NAME):$(V) --file=./docker/$(IMAGE_NAME)/Dockerfile .
endif


.PHONY: compose-up
compose-up:
	cd docker/sh-panel/dev && docker-compose --verbose up

.PHONY: run-container
run-container:
	docker run --network=docker_default -it -v $(shell pwd):/root/go/src/github.com/smart-evolution/shpanel \
	    -e SH_PANEL_MONGO_URI=$(SH_PANEL_MONGO_URI) \
	    -e SH_PANEL_MONGO_DB=$(SH_PANEL_MONGO_DB) \
	    -e SH_API_SRV_PORT=$(SH_API_SRV_PORT) \
	    -e SH_HTTP_PORT=$(SH_HTTP_PORT) oszura/shpanel

### Deployment
.PHONY: deploy
deploy:
	kubectl apply -f ./kubernetes/deployment.yaml
	kubectl apply -f ./kubernetes/service.yaml

### Utilities
.PHONY: version
version:
	git tag $(V)
	./scripts/changelog.sh
	go generate
	$(NPM) version $(V) --no-git-tag-version
	git add package.json
	git add ./version.go || true
	git add ./docs/changelogs/CHANGELOG_$(V).md
	git commit --allow-empty -m "Build $(V)"
	git tag --delete $(V)
	git tag $(V)
