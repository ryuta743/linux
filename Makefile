.PHONY: build clean deploy

build:
	docker build -t ryutaterada/k8s-express ./src/api
	docker push ryutaterada/k8s-express
	docker build -t ryutaterada/k8s-nodejs ./src/nuxt
	docker push ryutaterada/k8s-nodejs

deploy:
	kubectl apply -f src/api/api-deployment.yaml
	kubectl apply -f src/api/api-service.yaml

nuxt:
	kubectl apply -f src/nuxt/nuxt-deployment.yaml
	kubectl apply -f src/nuxt/nuxt-service.yaml

clean:
	kubectl delete -f src/api/api-deployment.yaml
	kubectl delete -f src/api/api-service.yaml

next:
	kubectl delete -f src/nuxt/nuxt-deployment.yaml
	kubectl delete -f src/nuxt/nuxt-service.yaml

