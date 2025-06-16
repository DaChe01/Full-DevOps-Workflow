# Use official Jenkins LTS image
FROM jenkins/jenkins:lts

# Switch to root to install required packages
USER root

# Install Ansible, rsync, and openssh-client
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        software-properties-common \
        rsync \
        openssh-client \
        python3 \
        python3-pip && \
    pip3 install --no-cache-dir ansible && \
    rm -rf /var/lib/apt/lists/*

# Optional: prepare .ssh folder for Jenkins
RUN mkdir -p /var/jenkins_home/.ssh && \
    chown -R jenkins:jenkins /var/jenkins_home/.ssh && \
    chmod 700 /var/jenkins_home/.ssh

# Switch back to Jenkins user
USER jenkins
