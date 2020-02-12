.PHONY: up logs down build

up:
	docker-compose up -d --build

logs:
	docker-compose logs

down:
	docker-compose down

ba:
	docker build -t ryutaterada/k8s-express:1.0.8 ./src/api
	docker push ryutaterada/k8s-express:1.0.8

bw:
	docker build -t ryutaterada/k8s-nodejs:1.0.5 ./src/web
	docker push ryutaterada/k8s-nodejs:1.0.5

bd:
	docker build -t ryutaterada/k8s-mysql:1.0.1 ./src/db
	docker push ryutaterada/k8s-mysql:1.0.1

dg:
	kubectl apply -f istio.yaml

da:
	kubectl apply -f api.yaml

dw:
	kubectl apply -f web.yaml

dd1:
	kubectl apply -f db1.yaml

dd2:
	kubectl apply -f db2.yaml

cg:
	kubectl delete -f istio.yaml

ca:
	kubectl delete -f api.yaml

cw:
	kubectl delete -f web.yaml

cd:
	kubectl delete -f db1.yaml
	kubectl delete -f db2.yaml

cd1:
	kubectl delete -f db1.yaml

cd2:
	kubectl delete -f db2.yaml

mm:
	kubectl run -it --rm --image=ryutaterada/k8s-mysql --restart=Never mysql-client -- mysql -h db -p

ww:
	kubectl exec -it web-6b64674b66-cncjl --container web /bin/sh

path:
	export PATH=$PATH:/snap/bin

istio:
	kubectl apply -f D:work/git/istio/install/kubernetes/istio-demo.yaml

all:
	kubectl apply -f db.yaml
	kubectl apply -f api.yaml
	kubectl apply -f web.yaml
	kubectl apply -f istio.yaml

call:
	kubectl delete -f api.yaml
	kubectl delete -f web.yaml
	kubectl delete -f istio.yaml
	kubectl delete -f db.yaml