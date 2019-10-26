GOCMD=go
GOLINT=golint
GOFMT=gofmt
MAKE=make
NPM=npm
IMAGE_NAME="oszura/sh-panel"
ENV=prod

.DEFAULT_GOAL := all

.PHONY: install
install:
	$(shell cd /; $(GOCMD) get -u golang.org/x/lint/golint)
	$(GOCMD) mod vendor
	$(NPM) install

.PHONY: all
all:
	$(MAKE) build-frontend
	$(MAKE) build-backend

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

.PHONY: image
image:
	docker build --tag $(IMAGE_NAME) --file=./docker/$(ENV)/Dockerfile .

.PHONY: compose-up
compose-up:
	cd docker && docker-compose --verbose up

.PHONY: run-container
run-container:
	docker run --network=docker_default -it -v $(shell pwd):/root/go/src/github.com/smart-evolution/shpanel \
	    -e SH_MONGO_URI=mongodb://172.18.0.2:27017 \
	    -e SH_MONGO_DB=shpanel \
	    -e SH_PANEL_PORT=3223 oszura/shpanel
