.PHONY: up logs down build

up:
	docker-compose up -d --build

logs:
	docker-compose logs

down:
	docker-compose down

init:
	kubeadm init --pod-network-cidr=10.244.0.0/16

canal:
	kubectl apply -f https://docs.projectcalico.org/v3.1/getting-started/kubernetes/installation/hosted/canal/rbac.yaml
	kubectl apply -f https://docs.projectcalico.org/v3.1/getting-started/kubernetes/installation/hosted/canal/canal.yaml

metal:
	kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.7.2/manifests/metallb.yaml
	kubectl apply -f src/ingress/configmap.yaml

ingress:
	kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.27.1/deploy/static/mandatory.yaml
	kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.27.1/deploy/static/provider/baremetal/service-nodeport.yaml

ba:
	docker build -t ryutaterada/k8s-express ./src/api
	docker push ryutaterada/k8s-express

bn:
	docker build -t ryutaterada/k8s-nodejs ./src/nuxt
	docker push ryutaterada/k8s-nodejs

bd:
	docker build -t ryutaterada/k8s-mysql ./src/db
	docker push ryutaterada/k8s-mysql

ist:
	istioctl manifest apply --set profile=demo
	kubectl label namespace default istio-injection=enabled

da:
	kubectl apply -f src/api/api-deployment.yaml
	kubectl apply -f src/api/api-service.yaml
	kubectl apply -f src/api/api-ingress.yaml

dn:
	kubectl apply -f src/nuxt/nuxt-deployment.yaml
	kubectl apply -f src/nuxt/nuxt-service.yaml
	kubectl apply -f src/nuxt/nuxt-ingress.yaml

dd:
	kubectl apply -f src/db/db-deployment.yaml
	kubectl apply -f src/db/db-service.yaml
	kubectl apply -f src/db/db-claim.yaml
	kubectl apply -f src/db/db-volume.yaml
	kubectl apply -f src/db/db-config.yaml

ca:
	kubectl delete -f src/api/api-deployment.yaml
	kubectl delete -f src/api/api-service.yaml
	kubectl delete -f src/api/api-ingress.yaml

cn:
	kubectl delete -f src/nuxt/nuxt-deployment.yaml
	kubectl delete -f src/nuxt/nuxt-service.yaml
	kubectl delete -f src/nuxt/nuxt-ingress.yaml

cd:
	kubectl delete -f src/db/db-deployment.yaml
	kubectl delete -f src/db/db-service.yaml
	kubectl delete -f src/db/db-claim.yaml
	kubectl delete -f src/db/db-volume.yaml
	kubectl delete -f src/db/db-config.yaml

is:
	kubectl label namespace tenshoku istio-injection-enabled

mm:
	kubectl run -it --rm --image=ryutaterada/k8s-mysql --restart=Never mysql-client -- mysql -h mysql -p
