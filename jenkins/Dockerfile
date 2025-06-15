# Use official Jenkins LTS image
FROM jenkins/jenkins:lts

# Switch to root to install packages
USER root

# Install rsync and openssh-client
RUN apt-get update && \
    apt-get install -y rsync openssh-client && \
    apt-get clean

# Switch back to Jenkins user
USER jenkins
