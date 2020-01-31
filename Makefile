.PHONY: up logs down build

up:
	docker-compose up -d --build

logs:
	docker-compose logs

down:
	docker-compose down

ba:
	docker build -t ryutaterada/k8s-express ./src/api
	docker push ryutaterada/k8s-express

bw:
	docker build -t ryutaterada/k8s-nodejs ./src/web
	docker push ryutaterada/k8s-nodejs

bd:
	docker build -t ryutaterada/k8s-mysql ./src/db
	docker push ryutaterada/k8s-mysql

da:
	kubectl apply -f src/api/api-deployment.yaml
	kubectl apply -f src/api/api-service.yaml

dw:
	kubectl label namespace default isito-injection=enabled --overwrite
	kubectl apply -f src/web/web-deployment.yaml
	kubectl apply -f src/web/web-service.yaml
	kubectl apply -f src/web/web-account.yaml
	kubectl apply -f src/k8s/gateway.yaml
	kubectl apply -f src/k8s/vservice.yaml

dd:
	kubectl apply -f src/db/db-deployment.yaml
	kubectl apply -f src/db/db-service.yaml
	kubectl apply -f src/db/db-claim.yaml
	kubectl apply -f src/db/db-volume.yaml
	kubectl apply -f src/db/db-config.yaml

ca:
	kubectl delete -f src/api/api-deployment.yaml
	kubectl delete -f src/api/api-service.yaml

cw:
	kubectl delete -f src/web/web-deployment.yaml
	kubectl delete -f src/web/web-service.yaml
	kubectl delete -f src/web/web-ingress.yaml
	kubectl delete -f src/k8s/gateway.yaml
	kubectl delete -f src/k8s/vservice.yaml

cd:
	kubectl delete -f src/db/db-deployment.yaml
	kubectl delete -f src/db/db-service.yaml
	kubectl delete -f src/db/db-claim.yaml
	kubectl delete -f src/db/db-volume.yaml
	kubectl delete -f src/db/db-config.yaml

mm:
	kubectl run -it --rm --image=ryutaterada/k8s-mysql --restart=Never mysql-client -- mysql -h db -p

all:
	kubectl apply -f src/api/api-deployment.yaml
	kubectl apply -f src/api/api-service.yaml
	kubectl apply -f src/web/web-deployment.yaml
	kubectl apply -f src/web/web-service.yaml
	kubectl apply -f src/web/web-account.yaml
	kubectl apply -f src/k8s/gateway.yaml
	kubectl apply -f src/k8s/vservice.yaml
	kubectl apply -f src/db/db-deployment.yaml
	kubectl apply -f src/db/db-service.yaml
	kubectl apply -f src/db/db-claim.yaml
	kubectl apply -f src/db/db-volume.yaml
	kubectl apply -f src/db/db-config.yaml
	kubectl apply -f src/k8s/prometheus.yaml

call:
	kubectl delete -f src/api/api-deployment.yaml
	kubectl delete -f src/api/api-service.yaml
	kubectl delete -f src/web/web-deployment.yaml
	kubectl delete -f src/web/web-service.yaml
	kubectl delete -f src/web/web-ingress.yaml
	kubectl delete -f src/k8s/gateway.yaml
	kubectl delete -f src/k8s/vservice.yaml
	kubectl delete -f src/db/db-deployment.yaml
	kubectl delete -f src/db/db-service.yaml
	kubectl delete -f src/db/db-claim.yaml
	kubectl delete -f src/db/db-volume.yaml
	kubectl delete -f src/db/db-config.yaml
	kubectl delete -f src/k8s/prometheus.yaml

test:
	export PATH="/snap/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"
	kubectl label namespace default isito-injection=enabled --overwrite
	kubectl apply -f src/api/api-deployment.yaml
	kubectl apply -f src/api/api-service.yaml
	kubectl apply -f src/k8s/gateway.yaml
	kubectl apply -f src/k8s/vservice.yaml
	kubectl apply -f src/db/db-deployment.yaml
	kubectl apply -f src/db/db-service.yaml
	kubectl apply -f src/db/db-claim.yaml
	kubectl apply -f src/db/db-volume.yaml
	kubectl apply -f src/db/db-config.yaml
	kubectl apply -f src/db/db-storage.yaml

ctest:
	kubectl delete -f src/api/api-deployment.yaml
	kubectl delete -f src/api/api-service.yaml
	kubectl delete -f src/k8s/gateway.yaml
	kubectl delete -f src/k8s/vservice.yaml
	kubectl delete -f src/db/db-deployment.yaml
	kubectl delete -f src/db/db-service.yaml
	kubectl delete -f src/db/db-claim.yaml
	kubectl delete -f src/db/db-volume.yaml
	kubectl delete -f src/db/db-config.yaml
	kubectl delete -f src/db/db-storage.yaml