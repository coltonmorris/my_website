# VERSION = $(eval awk '/version/{gsub(/("|",)/,"",$2);print $2};' package.json)
VERSION = 0.1.0
IMAGE = gcr.io/my-website-169905/my-website
# IMAGEID = 


.PHONY: build
build:
	# docker tag [IMAGE_ID] [HOSTNAME]/[YOUR-PROJECT-ID]/[IMAGE]
	docker build -t $(IMAGE):latest -t $(IMAGE):$(VERSION) .

deploy:
	kubectl delete deployments --all
	kubectl delete pods --all
	kubectl apply -f ./kubernetes

push:
	# gcloud docker -- push [HOSTNAME]/[YOUR-PROJECT-ID]/[IMAGE]
	gcloud docker -- push $(IMAGE):latest


