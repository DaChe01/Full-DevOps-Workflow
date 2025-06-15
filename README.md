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
│   │   ├── install.yaml          # (Optional) Setup Docker, K8s, etc.
│   │   ├── build.yaml            # Builds Docker image
│   │   └── deploy_k8s.yaml       # Deploys app to Kubernetes
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
│   └── Jenkinsfile              # Jenkins pipeline definition
```

---

## ⚙️ Pipeline Flow (CI/CD)

```
Git Push → Jenkins → Ansible → Docker → Kubernetes → Live App
```

1. **Jenkins** detects code push and triggers pipeline
2. **Ansible** builds Docker image from `simon-game/`
3. **Ansible** applies K8s manifests to deploy
4. Application accessible via Minikube service

---

## 🚀 Deployment Steps

### 1. Clone the Repo

```bash
git clone https://github.com/DaChe01/Full-DevOps-Workflow.git
cd simon-game
```

### 2. Jenkins Setup

* Create a new **Pipeline Job**
* Use the `Jenkinsfile` inside `jenkins/` or paste its content into the job
* Trigger the build to start CI/CD

### 3. Ansible Requirements

* Ensure passwordless SSH to remote machine
* Install dependencies:

  ```bash
  sudo apt install ansible docker.io kubectl
  ```

### 4. Kubernetes Setup

* Start Minikube:

  ```bash
  minikube start
  ```

* Access the app:

  ```bash
  minikube service simon-game-service
  ```

---

## 🐳 Docker Commands (Dev Only)

```bash
# Build manually (used in build.yaml)
docker build -t simon-game:latest ./app

# Run locally
docker run -p 8080:80 simon-game
```

---

## 🛆 Ansible Playbooks

* `build.yaml`: Builds and tags Docker image
* `deploy_k8s.yaml`: Applies K8s manifests
* `install.yaml`: Installs Docker, K8s components (optional)
