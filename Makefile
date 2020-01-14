.PHONY: build clean deploy

up:
	docker-compose up -d --build

logs:
	docker-compose logs

down:
	docker-compose down

ba:
	docker build -t ryutaterada/k8s-express ./src/api
	docker push ryutaterada/k8s-express

bn:
	docker build -t ryutaterada/k8s-nodejs ./src/nuxt
	docker push ryutaterada/k8s-nodejs

bd:
	docker build -t ryutaterada/k8s-mariadb ./src/db
	docker push ryutaterada/k8s-mariadb

da:
	kubectl apply -f src/api/api-deployment.yaml
	kubectl apply -f src/api/api-service.yaml

dn:
	kubectl apply -f src/nuxt/nuxt-deployment.yaml
	kubectl apply -f src/nuxt/nuxt-service.yaml

dd:
	kubectl apply -f src/db/nuxt-deployment.yaml
	kubectl apply -f src/db/nuxt-service.yaml

ca:
	kubectl delete -f src/api/api-deployment.yaml
	kubectl delete -f src/api/api-service.yaml

cn:
	kubectl delete -f src/nuxt/nuxt-deployment.yaml
	kubectl delete -f src/nuxt/nuxt-service.yaml

cd:
	kubectl delete -f src/db/nuxt-deployment.yaml
	kubectl delete -f src/db/nuxt-service.yaml

