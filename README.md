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
│   └── Jenkinsfile              # Jenkins pipeline definition
```

---

## ⚙️ Pipeline Flow (CI/CD)

```
Git Push → Jenkins → Ansible → Docker → Kubernetes → Live App
```

1. **Jenkins** detects code push and triggers pipeline
2. **Ansible** builds Docker image from `app/`
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
* Use the `Jenkinsfile` inside `jenkins/` or move it to root
* Trigger the build to start CI/CD

### 3. Ansible Requirements

* Ensure passwordless SSH to remote machine
* You can either:

  * Manually install dependencies:

    ```bash
    sudo apt install ansible docker.io kubectl
    ```
  * **OR** include the `install.yaml` playbook in your Jenkinsfile to automate installation during pipeline runs.

> ✅ DevOps encourages full automation, so using `install.yaml` is preferred if you're setting up new machines or testing end-to-end automation.

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

## 💼 Jenkinsfile (Pipeline Script)

Place your Jenkinsfile in the root or inside `jenkins/` folder. This project already includes a working pipeline script in `jenkins/Jenkinsfile`, so there's no need to rewrite it here.

### 💡 Optional: Include `install.yaml`

If your remote machine does **not** have Docker, Kubernetes, etc., pre-installed, you can add an extra stage to your Jenkinsfile:

```groovy
stage('Install Dependencies') {
    steps {
        sh 'ansible-playbook -i ansible/inventory.ini ansible/playbooks/install.yaml'
    }
}
```

> ⚡ Use this only if your infrastructure needs initial setup. CI/CD typically assumes it's already configured.

> 🐳 **Docker Note**: If you prefer complete automation, `install.yaml` will handle Docker installation too. So, you can skip installing it manually if you're including this playbook in your Jenkinsfile.

---

## 🐳 Docker Commands (Dev Only)

> ⚠️ These commands are for local testing or debugging only. In production or CI/CD, Docker is handled by `ansible/playbooks/build.yaml`.

```bash
# Build manually (alternative to build.yaml)
docker build -t simon-game:latest ./simon-game

# Run locally
docker run -p 8080:80 simon-game
```

## 📜 License

MIT License. Use freely and responsibly.
