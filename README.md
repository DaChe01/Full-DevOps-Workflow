# 🎮 Simon Game - DevOps CI/CD Project

This project demonstrates a complete CI/CD pipeline for deploying a **static web app** (Simon Game) using:

* ✅ Jenkins for automation
* ✅ Ansible for orchestration
* ✅ Docker for containerization
* ✅ Kubernetes (Minikube) for deployment

---

## 🛠️ Tech Stack

* **Frontend**: HTML, CSS, JavaScript (Static React-free web game)
* **CI/CD Tools**: Jenkins, Ansible, Git
* **Containerization**: Docker
* **Orchestration**: Kubernetes (via Minikube)

---

## 📁 Project Structure

```
simon-game/
├── ansible/
│   ├── inventory.ini
│   ├── playbooks/
│   │   ├── install.yaml          # Installs Docker, K8s, etc.
│   │   ├── build.yaml            # Builds Docker image
│   │   └── deploy.yaml           # Deploys app to Kubernetes
├── simon-game/
│   ├── sounds/                   # Game audio
│   ├── index.html
│   ├── style.css
│   ├── index.js
│   └── Dockerfile               # Builds the static site image
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── jenkins/
│   ├── Jenkinsfile              # Jenkins pipeline definition
│   └── Dockerfile               # Optional Jenkins environment setup
```

---

## ⚙️ Pipeline Flow (CI/CD)

```
Git Push → Jenkins → Ansible → Docker → Kubernetes → Live App
```

1. **Jenkins** detects code push and triggers pipeline
2. **Ansible** runs `install.yaml` to setup environment (optional to keep or remove)
3. **Ansible** builds Docker image from `simon-game/`
4. **Ansible** applies K8s manifests to deploy
5. Application accessible via Minikube service

---

## 🚀 Deployment Steps

### 1. Clone the Repo

```bash
git clone https://github.com/DaChe01/Full-DevOps-Workflow.git
cd simon-game
```

### 2. Jenkins Setup

* Create a new **Pipeline Job**
* Use the `Jenkinsfile` inside `jenkins/` or move it to root
* Trigger the build to start CI/CD

### 3. Ansible Requirements

* Ensure passwordless SSH to remote machine is setup
* Jenkins runs Ansible commands internally — nothing extra needed if pipeline runs successfully

> 🔧 The Jenkinsfile already includes `install.yaml`. You can remove that stage if your system is already configured.

### 4. Jenkins Environment Setup (Optional)

If you're setting up Jenkins in a Docker environment and want required tools pre-installed (like Ansible, rsync, openssh-client), you can use the included `jenkins/Dockerfile`:

```bash
docker build -t custom-jenkins -f jenkins/Dockerfile .
docker run -p 8080:8080 -v jenkins_home:/var/jenkins_home custom-jenkins
```

> ✅ Alternatively, you can install Ansible, rsync, and openssh manually if you're using native Jenkins or already have a configured Jenkins Docker image.

### 5. Access

 * Access the app via Minikube:

  ```bash
  minikube service simon-game-service
  ```

* Or forward the Kubernetes service port manually if you want to access from a different device or remote system:

  ```bash
  kubectl port-forward service/simon-game-service 9090:80
  ```

  Then, on your local machine:

  ```bash
  ssh -L 9090:localhost:9090 your-user@your-server-ip
  ```

  Open `http://localhost:9090` in your browser.

---

## 💼 Jenkinsfile

Jenkinsfile Sample (already included in `jenkins/Jenkinsfile`).

Includes stages to install dependencies (via Ansible), build the Docker image, and deploy to Kubernetes.

---

## 📜 License

MIT License. Use freely and responsibly.
