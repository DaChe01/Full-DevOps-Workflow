# Use official Jenkins LTS image
FROM jenkins/jenkins:lts

# Switch to root to install packages
USER root

# Install SSH, rsync, Ansible (for completeness)
RUN apt-get update && \
    apt-get install -y \
        rsync \
        openssh-client \
        ansible \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release && \
    rm -f /var/lib/apt/lists/*

# Create .ssh dir with right perms (in Jenkins home)
RUN mkdir -p /var/jenkins_home/.ssh && \
    chown -R jenkins:jenkins /var/jenkins_home/.ssh && \
    chmod 700 /var/jenkins_home/.ssh

# Switch back to Jenkins user
USER jenkins


docker run -d -p 9090:8080 --name test-jenkins jenkins-ssh


# docker build -t custom-jenkins -f jenkins/Dockerfile .
# docker run -d -p 7070:8080 -v jenkins_home:/var/jenkins_home custom-jenkins
