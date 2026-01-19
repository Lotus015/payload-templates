# AWS Lightsail Deployment Guide

This guide walks you through deploying a Payload CMS law firm template to AWS Lightsail as a full-stack application on a single instance.

## Table of Contents

- [Prerequisites](#prerequisites)
- [1. Create Lightsail Instance](#1-create-lightsail-instance)
- [2. Initial Server Setup](#2-initial-server-setup)
- [3. Install PostgreSQL](#3-install-postgresql)
- [4. Install Node.js and pnpm](#4-install-nodejs-and-pnpm)
- [5. Deploy Your Application](#5-deploy-your-application)
- [6. Configure PM2 Process Manager](#6-configure-pm2-process-manager)
- [7. Configure Nginx Reverse Proxy](#7-configure-nginx-reverse-proxy)
- [8. Setup SSL with Let's Encrypt](#8-setup-ssl-with-lets-encrypt)
- [9. Configure Environment Variables](#9-configure-environment-variables)
- [10. Database Backup Strategy](#10-database-backup-strategy)
- [Maintenance and Troubleshooting](#maintenance-and-troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- An AWS account
- A domain name pointing to your Lightsail instance IP
- SSH key pair for accessing your instance
- Basic familiarity with Linux command line

---

## 1. Create Lightsail Instance

### Step 1.1: Create the Instance

1. Log in to the [AWS Lightsail Console](https://lightsail.aws.amazon.com/)
2. Click **Create instance**
3. Select your preferred AWS Region
4. Choose **Linux/Unix** platform
5. Select **OS Only** → **Ubuntu 22.04 LTS**
6. Choose an instance plan:
   - **Recommended minimum**: $10/month (2 GB RAM, 1 vCPU, 60 GB SSD)
   - **Production recommended**: $20/month (4 GB RAM, 2 vCPU, 80 GB SSD)
7. Name your instance (e.g., `law-firm-website`)
8. Click **Create instance**

### Step 1.2: Configure Networking

1. Go to your instance's **Networking** tab
2. Under **IPv4 Firewall**, add these rules:
   - HTTP (Port 80) - for Let's Encrypt verification
   - HTTPS (Port 443) - for secure traffic
   - Custom TCP Port 3000 - (temporary, for initial testing)
3. Create a **Static IP** and attach it to your instance

### Step 1.3: Configure DNS

Point your domain to the Lightsail static IP:

- **A Record**: `@` → Your Static IP
- **A Record**: `www` → Your Static IP

---

## 2. Initial Server Setup

### Step 2.1: Connect to Your Instance

```bash
ssh -i /path/to/your-key.pem ubuntu@your-static-ip
```

Or use the browser-based SSH client in the Lightsail console.

### Step 2.2: Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2.3: Set Timezone

```bash
sudo timedatectl set-timezone UTC
# Or your preferred timezone:
# sudo timedatectl set-timezone America/New_York
```

### Step 2.4: Create Application User (Optional but Recommended)

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG sudo deploy
sudo mkdir -p /home/deploy/.ssh
sudo cp ~/.ssh/authorized_keys /home/deploy/.ssh/
sudo chown -R deploy:deploy /home/deploy/.ssh
```

---

## 3. Install PostgreSQL

### Step 3.1: Install PostgreSQL 16

```bash
# Add PostgreSQL repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Install PostgreSQL
sudo apt update
sudo apt install -y postgresql-16 postgresql-contrib-16
```

### Step 3.2: Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL shell, run:
CREATE USER payloadcms WITH PASSWORD 'your_secure_password_here';
CREATE DATABASE lawfirm_db OWNER payloadcms;
GRANT ALL PRIVILEGES ON DATABASE lawfirm_db TO payloadcms;
\q
```

> **Security Note**: Replace `your_secure_password_here` with a strong, unique password. Use a password generator for production.

### Step 3.3: Configure PostgreSQL for Local Connections

Edit the PostgreSQL configuration to allow password authentication:

```bash
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

Find the line with `local all all peer` and change it to:

```
local   all             all                                     md5
```

Restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

### Step 3.4: Test Database Connection

```bash
psql -U payloadcms -d lawfirm_db -h localhost
# Enter your password when prompted
# Type \q to exit
```

---

## 4. Install Node.js and pnpm

### Step 4.1: Install Node.js 20 via nvm

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

### Step 4.2: Install pnpm

```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version
```

### Step 4.3: Add to System Path (for PM2)

To ensure PM2 can find Node.js when running as a service:

```bash
# Add Node.js to the system path
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
source ~/.bashrc
```

---

## 5. Deploy Your Application

### Step 5.1: Create Application Directory

```bash
sudo mkdir -p /var/www/lawfirm
sudo chown -R $USER:$USER /var/www/lawfirm
```

### Step 5.2: Clone or Upload Your Application

**Option A: Clone from Git**

```bash
cd /var/www/lawfirm
git clone https://github.com/yourusername/your-repo.git .
```

**Option B: Upload via SCP**

From your local machine:

```bash
scp -i /path/to/your-key.pem -r ./your-project/* ubuntu@your-static-ip:/var/www/lawfirm/
```

### Step 5.3: Install Dependencies

```bash
cd /var/www/lawfirm
pnpm install
```

### Step 5.4: Create Environment File

```bash
cp .env.example .env
nano .env
```

Configure your environment variables (see [Section 9](#9-configure-environment-variables) for details).

### Step 5.5: Build the Application

```bash
pnpm build
```

### Step 5.6: Run Database Migrations and Seed

```bash
# Seed the database with demo content (optional)
pnpm seed
```

### Step 5.7: Test the Application

```bash
pnpm start
```

Visit `http://your-static-ip:3000` to verify it's working. Press `Ctrl+C` to stop.

---

## 6. Configure PM2 Process Manager

PM2 keeps your application running and restarts it if it crashes.

### Step 6.1: Install PM2

```bash
npm install -g pm2
```

### Step 6.2: Create PM2 Ecosystem File

Create `/var/www/lawfirm/ecosystem.config.cjs`:

```bash
nano /var/www/lawfirm/ecosystem.config.cjs
```

Add the following configuration:

```javascript
module.exports = {
  apps: [
    {
      name: 'lawfirm',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/lawfirm',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

### Step 6.3: Start Application with PM2

```bash
cd /var/www/lawfirm
pm2 start ecosystem.config.cjs
```

### Step 6.4: Configure PM2 to Start on Boot

```bash
pm2 startup systemd
# Copy and run the command that PM2 outputs
pm2 save
```

### Step 6.5: Useful PM2 Commands

```bash
pm2 status          # Check application status
pm2 logs lawfirm    # View application logs
pm2 restart lawfirm # Restart application
pm2 stop lawfirm    # Stop application
pm2 delete lawfirm  # Remove from PM2
pm2 monit           # Real-time monitoring dashboard
```

---

## 7. Configure Nginx Reverse Proxy

Nginx serves as a reverse proxy, handling SSL termination and routing traffic to your Node.js application.

### Step 7.1: Install Nginx

```bash
sudo apt install -y nginx
```

### Step 7.2: Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/lawfirm
```

Add the following configuration (replace `yourdomain.com` with your actual domain):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS (uncomment after SSL setup)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Serve static files directly
    location /_next/static {
        alias /var/www/lawfirm/.next/static;
        expires 365d;
        access_log off;
    }

    # Media uploads
    location /media {
        alias /var/www/lawfirm/media;
        expires 30d;
        access_log off;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;
    gzip_disable "MSIE [1-6]\.";
}
```

### Step 7.3: Enable the Site

```bash
sudo ln -s /etc/nginx/sites-available/lawfirm /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

### Step 7.4: Verify Nginx is Working

Visit `http://yourdomain.com` - you should see your application.

---

## 8. Setup SSL with Let's Encrypt

### Step 8.1: Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Step 8.2: Obtain SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts:
- Enter your email address
- Agree to the Terms of Service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### Step 8.3: Verify Auto-Renewal

Certbot automatically sets up renewal. Test it with:

```bash
sudo certbot renew --dry-run
```

### Step 8.4: Final Nginx Configuration (After SSL)

After Certbot configures SSL, your Nginx config will be updated automatically. The final config should look like:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    location /_next/static {
        alias /var/www/lawfirm/.next/static;
        expires 365d;
        access_log off;
    }

    location /media {
        alias /var/www/lawfirm/media;
        expires 30d;
        access_log off;
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;
    gzip_disable "MSIE [1-6]\.";
}
```

---

## 9. Configure Environment Variables

### Required Environment Variables

Create or edit `/var/www/lawfirm/.env`:

```bash
nano /var/www/lawfirm/.env
```

```env
# Database Configuration
DATABASE_URL=postgresql://payloadcms:your_secure_password_here@localhost:5432/lawfirm_db

# Payload CMS
PAYLOAD_SECRET=your_very_long_random_secret_key_at_least_32_characters

# Application
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
NODE_ENV=production
PORT=3000
```

### Environment Variable Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `PAYLOAD_SECRET` | Secret key for Payload CMS encryption | Random 32+ character string |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of your website | `https://yourdomain.com` |
| `NODE_ENV` | Node.js environment | `production` |
| `PORT` | Application port (default: 3000) | `3000` |

### Generate a Secure PAYLOAD_SECRET

```bash
openssl rand -base64 32
```

### Apply Environment Changes

After updating `.env`, restart the application:

```bash
pm2 restart lawfirm
```

---

## 10. Database Backup Strategy

### Automated Daily Backups

#### Step 10.1: Create Backup Script

```bash
sudo mkdir -p /var/backups/postgresql
sudo nano /usr/local/bin/backup-db.sh
```

Add the following script:

```bash
#!/bin/bash

# Configuration
DB_NAME="lawfirm_db"
DB_USER="payloadcms"
BACKUP_DIR="/var/backups/postgresql"
RETENTION_DAYS=14
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_${DATE}.sql.gz"

# Create backup
PGPASSWORD="your_secure_password_here" pg_dump -U ${DB_USER} -h localhost ${DB_NAME} | gzip > ${BACKUP_FILE}

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "Backup created successfully: ${BACKUP_FILE}"
else
    echo "Backup failed!"
    exit 1
fi

# Remove backups older than retention period
find ${BACKUP_DIR} -name "${DB_NAME}_*.sql.gz" -mtime +${RETENTION_DAYS} -delete

echo "Old backups cleaned up (older than ${RETENTION_DAYS} days)"
```

Make it executable:

```bash
sudo chmod +x /usr/local/bin/backup-db.sh
```

#### Step 10.2: Schedule Daily Backups

```bash
sudo crontab -e
```

Add this line to run backups daily at 2 AM:

```
0 2 * * * /usr/local/bin/backup-db.sh >> /var/log/db-backup.log 2>&1
```

### Manual Backup

```bash
# Create a manual backup
pg_dump -U payloadcms -h localhost lawfirm_db > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -U payloadcms -h localhost lawfirm_db < backup_20240115.sql
```

### Off-Site Backup (Recommended)

For production, consider syncing backups to AWS S3:

```bash
# Install AWS CLI
sudo apt install -y awscli

# Configure AWS credentials
aws configure

# Add to backup script (after creating backup)
aws s3 cp ${BACKUP_FILE} s3://your-backup-bucket/postgresql/
```

### Lightsail Automatic Snapshots

1. Go to your Lightsail instance
2. Click on **Snapshots** tab
3. Enable **Automatic snapshots**
4. Choose your preferred snapshot time

This creates daily snapshots of your entire instance, providing disaster recovery capability.

---

## Maintenance and Troubleshooting

### Updating the Application

```bash
cd /var/www/lawfirm

# Pull latest changes
git pull origin main

# Install dependencies
pnpm install

# Rebuild
pnpm build

# Restart application
pm2 restart lawfirm
```

### Viewing Logs

```bash
# Application logs
pm2 logs lawfirm

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-16-main.log
```

### Common Issues and Solutions

#### Application Won't Start

```bash
# Check PM2 status
pm2 status

# View detailed logs
pm2 logs lawfirm --lines 100

# Check if port 3000 is in use
sudo lsof -i :3000
```

#### Database Connection Errors

```bash
# Test database connection
psql -U payloadcms -h localhost -d lawfirm_db

# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql
```

#### Nginx 502 Bad Gateway

This usually means the Node.js application isn't running:

```bash
# Check if application is running
pm2 status

# Restart application
pm2 restart lawfirm

# Check Nginx configuration
sudo nginx -t
```

#### SSL Certificate Renewal Issues

```bash
# Manually renew certificate
sudo certbot renew

# Check certificate expiration
sudo certbot certificates
```

### Performance Monitoring

```bash
# Monitor system resources
htop

# Monitor PM2 processes
pm2 monit

# Check disk usage
df -h

# Check memory usage
free -m
```

### Security Best Practices

1. **Keep system updated**: Run `sudo apt update && sudo apt upgrade` regularly
2. **Enable firewall**: Only keep necessary ports open (22, 80, 443)
3. **Use SSH keys**: Disable password authentication for SSH
4. **Regular backups**: Verify backups are running and test restoration
5. **Monitor logs**: Check for suspicious activity in Nginx and application logs
6. **Update dependencies**: Regularly update Node.js packages for security patches

---

## Quick Reference

### Service Commands

```bash
# Nginx
sudo systemctl start|stop|restart|status nginx

# PostgreSQL
sudo systemctl start|stop|restart|status postgresql

# PM2
pm2 start|stop|restart|delete|status lawfirm
```

### Important File Locations

| Purpose | Location |
|---------|----------|
| Application | `/var/www/lawfirm/` |
| Environment | `/var/www/lawfirm/.env` |
| PM2 Config | `/var/www/lawfirm/ecosystem.config.cjs` |
| Nginx Config | `/etc/nginx/sites-available/lawfirm` |
| SSL Certificates | `/etc/letsencrypt/live/yourdomain.com/` |
| Database Backups | `/var/backups/postgresql/` |
| Nginx Logs | `/var/log/nginx/` |

---

## Summary

After following this guide, you will have:

- A Lightsail instance running Ubuntu 22.04
- PostgreSQL 16 database server
- Node.js 20 with pnpm package manager
- Your Payload CMS application managed by PM2
- Nginx reverse proxy with SSL/TLS encryption
- Automated database backups
- A production-ready law firm website

For questions or issues, refer to the [Payload CMS documentation](https://payloadcms.com/docs) or create an issue in the repository.
