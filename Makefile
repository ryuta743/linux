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
	docker build -t ryutaterada/k8s-mariadb ./src/mysql
	docker push ryutaterada/k8s-mariadb

da:
	kubectl apply -f src/api/api-deployment.yaml
	kubectl apply -f src/api/api-service.yaml

dn:
	kubectl apply -f src/nuxt/nuxt-deployment.yaml
	kubectl apply -f src/nuxt/nuxt-service.yaml

dd:
	kubectl apply -f src/db/db-deployment.yaml
	kubectl apply -f src/db/db-service.yaml
	kubectl apply -f src/db/db-claim.yaml
	kubectl apply -f src/db/db-volume.yaml

dm:
	kubectl apply -f src/mysql/db-config.yaml
	kubectl apply -f src/mysql/db-deployment.yaml
	kubectl apply -f src/mysql/db-service.yaml
	kubectl apply -f src/mysql/db-claim.yaml
	kubectl apply -f src/mysql/db-volume.yaml

ca:
	kubectl delete -f src/api/api-deployment.yaml
	kubectl delete -f src/api/api-service.yaml

cn:
	kubectl delete -f src/nuxt/nuxt-deployment.yaml
	kubectl delete -f src/nuxt/nuxt-service.yaml

cd:
	kubectl delete -f src/db/db-deployment.yaml
	kubectl delete -f src/db/db-service.yaml
	kubectl delete -f src/db/db-claim.yaml
	kubectl delete -f src/db/db-volume.yaml

cm:
	kubectl delete -f src/mysql/db-deployment.yaml
	kubectl delete -f src/mysql/db-service.yaml
	kubectl delete -f src/mysql/db-claim.yaml
	kubectl delete -f src/mysql/db-volume.yaml

mm:
	kubectl run -it --rm --image=ryutaterada/k8s-mariadb --restart=Never mysql-client -- mysql -h mysql -p
