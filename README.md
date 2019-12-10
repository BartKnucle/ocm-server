# OCM Server

> Open configuration management server

## Node 12.13.1 LTS

Install gitlab

Install docker
https://docs.docker.com/install/linux/docker-ce/ubuntu/

Installer docker runner
https://gitlab.com/gitlab-org/gitlab-runner/blob/master/docs/install/linux-repository.md


## RUNNER AS SUDO
Grant sudo permissions

You can grant sudo permissions to the gitlab-runner user as this is who is executing the build script.

$ sudo usermod -a -G sudo gitlab-runner

You now have to remove the password restriction for sudo for the gitlab-runner user.

Start the sudo editor with

$ sudo visudo

Now add the following to the bottom of the file

gitlab-runner ALL=(ALL) NOPASSWD: ALL

## Certificate
$SSL_CERT
$SSL_KEY

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3001
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start