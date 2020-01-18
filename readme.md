1. in file js/global.json change host to ip server
2. copy project file to server
3. open shell login to server as root access
4. cd into project folder
5. install pm2 if pm2 not exist "npm install -g pm2"
6. run "npm install"
    - to start service run "pm2 start bin/service_mdvr"
    - to stop service run "pm2 stop service_mdvr"
    - to restart process run "pm2 restart service_mdvr"
    - to delete process run "pm2 delete service_mdvr"
    - to run production <after server restart service also restart> start or restart process then run "pm2 startup"

Don't forget to open firewall on port 3000
