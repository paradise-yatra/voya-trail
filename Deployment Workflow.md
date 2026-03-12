Workflow for deployment of this website on Hostinger VPS

Step 1 - Ask me for the commit name.
Step 2 - Once you have the commit name. in the project root run git add .
Step 3 - Then run git commit -m "Commit Name"
Step 4 - Then run git push origin main
Step 5 - Open normal terminal and connect to the hostinger vps using ssh and paraphrase. SSH - ssh root@31.97.202.88
Step 6 - Enter paraphrase - superchat9897
Step 7 - Once you are inside the VPS go to this location cd /var/www/Voya Trail
Step 8 - Run git pull origin main
Step 9 - then run npm install
Step 10 - If any vulnerabilities come then run npm audit fix (if no vulnerabilities then skip this step)
Step 11 - If vulnerabilities still exist after running npm audit fix then run npm audit fix --force (if no vulnerabilities then skip this step)
Step 12 - then run npm run build
Step 13 - Once build is complete and successful. run pm2 list
Step 14 - then run pm2 restart 2
Step 15 - then run pm2 save

Note - If you encounter any issues or situation that is not mentioned in the above workflow then you will not proceed or do anything to trouble shoot it. You will directly report that to me.