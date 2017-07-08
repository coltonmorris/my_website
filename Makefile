build:
	docker build -t my-website .

deploy:
	kubectl apply -f ./kubernetes
