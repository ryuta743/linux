.PHONY: build clean deploy

build:
	docker build -t ryutaterada/k8s-express ./src/api
	docker push ryutaterada/k8s-express
<<<<<<< HEAD
	docker build -t ryutaterada/k8s-nodejs ./src/nuxt
	docker push ryutaterada/k8s-nodejs
=======
>>>>>>> master

deploy:
	kubectl apply -f src/api/api-deployment.yaml
	kubectl apply -f src/api/api-service.yaml
<<<<<<< HEAD
	kubectl apply -f src/nuxt/nuxt-deployment.yaml
	kubectl apply -f src/nuxt/nuxt-service.yaml
=======
>>>>>>> master

clean:
	kubectl delete -f src/api/api-deployment.yaml
	kubectl delete -f src/api/api-service.yaml
<<<<<<< HEAD
	kubectl delete -f src/nuxt/nuxt-deployment.yaml
	kubectl delete -f src/nuxt/nuxt-service.yaml
=======
>>>>>>> master

