.PHONY: up logs down build

up:
	docker-compose up -d --build

logs:
	docker-compose logs

down:
	docker-compose down

ba:
	docker build -t ryutaterada/k8s-express:1.0.1 ./src/api
	docker push ryutaterada/k8s-express:1.0.1

bw:
	docker build -t ryutaterada/k8s-nodejs:1.0.3 ./src/web
	docker push ryutaterada/k8s-nodejs:1.0.3

bd:
	docker build -t ryutaterada/k8s-mysql:1.0.1 ./src/db
	docker push ryutaterada/k8s-mysql:1.0.1

dg:
	kubectl apply -f src/k8s/istio.yaml

da:
	kubectl apply -f src/api/api.yaml

dw:
	kubectl apply -f src/web/web.yaml

dd:
	kubectl apply -f src/db/db.yaml

cg:
	kubectl delete -f src/k8s/istio.yaml

ca:
	kubectl delete -f src/api/api.yaml

cw:
	kubectl delete -f src/web/web.yaml

cd:
	kubectl delete -f src/db/db.yaml

mm:
	kubectl run -it --rm --image=ryutaterada/k8s-mysql --restart=Never mysql-client -- mysql -h db -p

ww:
	kubectl exec -it web-6b64674b66-cncjl --container web /bin/sh

stat:
	export PATH="/snap/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"
	kubectl label namespace default istio-injection=enabled --overwrite

all:
	kubectl apply -f src/db/db.yaml
	kubectl apply -f src/api/api.yaml
	kubectl apply -f src/web/web.yaml
	kubectl apply -f src/k8s/istio.yaml

call:
	kubectl delete -f src/api/api.yaml
	kubectl delete -f src/web/web.yaml
	kubectl delete -f src/k8s/istio.yaml
	kubectl delete -f src/db/db.yaml

test:
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