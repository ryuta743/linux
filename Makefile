.PHONY: build clean deploy

build:
	docker build -t ryutaterada/k8s-express ./src/api
	docker push ryutaterada/k8s-express

deploy:
	kubectl apply -f src/api/api-deployment.yaml
	kubectl apply -f src/api/api-service.yaml

clean:
	kubectl delete -f src/api/api-deployment.yaml
	kubectl delete -f src/api/api-service.yaml

