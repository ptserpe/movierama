# MovieRama 

React SPA with nodejs express project that allows posting and rating movies.

Implemented app and ui images and three microservices: movies, auth, ratings.

## Development

### Prerequisites
* npm (nodes js)
* docker
* k8s
* scaffold
* Jenkins


### Install kubernetes on Azure VM
```console
    • ssh -i ~/keys/azurevm azureuser@20.79.203.73
```    
Installing k8s
```console
    • sudo snap install microk8s --classic --channel=1.22/stable
    • microk8s enable dns storage ingress registry
```
Moreover, we added the following in /var/snap/microk8s/current/args/containerd-template.toml to translate 20.79.203.73:32000 to localhost and thus k8s can pull images from the registry

### Build & Run for Development purposes

From the root of the repo run 
We use scaffold locally to push the images at the registry running alongside the k8s cluster. For development purposes:
1. install kubectl and skaffold
2. copy config from microk8s running on azure vm

```console

    • ssh -i ~/keys/azurevm -L32000:localhost:32000 azureuser@20.79.203.73
    • microk8s config
```
   * copy the output locally to your laptop at ~/.kube/config
   * replace 10.0.0.4 with the VM's ip
   * leave ssh session open in order for scaffold to be able to push the images on the image registry
3. go to the root of the git repo
4. create a dev k8s namespace with the command 
```console
kubectl create ns dev
```
5. initiate a dev skaffold session with the command 
```console
skaffold dev --port-forward --namespace=dev 
--default-repo=localhost:32000
```
• The above command builds the images of the api and ui components

• Deploys them on k8s at namespace dev

• Forwards all the k8s service ports locally to our dev machine

To setup Jenkins on Azure VM:
```console
    • sudo apt install openjdk-8-jre
    • wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add  
    • sudo apt update
    • sudo apt install jenkins 
    • sudo apt-get update
    • sudo apt-get install ca-certificates curl gnupg lsb-release
    • sudo mkdir -p /etc/apt/keyrings
    • curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    • echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    •  sudo apt-get update
    • sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    • sudo usermod -aG docker jenkins
    • curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && sudo install skaffold /usr/local/bin/
```

You can find an operational version of our app under: http://20.79.203.73/ 

Code: https://github.com/ptserpe/movierama/tree/microservices_arch

Optionally you may change ```DB_MOCK_DATA``` inside ```.env``` accordingly to have some initial data present. When ```DB_MOCK_DATA``` (default: ```true```) 12 movies will be present created by 4 users and some ratings. The creds for these mocked users are (```username```:```pass```):

- test1:test1
- test2:test2
- test3:test3
- test4:test4
- admin : admin1234
