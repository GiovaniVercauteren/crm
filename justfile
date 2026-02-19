default: start

start:
  just _start_backend & \
  just _start_frontend & \
  wait

[working-directory: 'backend']
_start_backend:
  npm run start:debug

[working-directory: 'frontend']
_start_frontend:
  npm run dev

encrypt-backend-env:
  sops --encrypt --input-type dotenv --output-type dotenv backend/.env.production > backend/.env.encrypted

encrypt-frontend-env:
  sops --encrypt --input-type dotenv --output-type dotenv frontend/.env.production > frontend/.env.encrypted

encrypt-database-env:
  sops --encrypt --input-type dotenv --output-type dotenv database/.env.production > database/.env.encrypted

encrypt-envs:
  just encrypt-backend-env
  just encrypt-frontend-env
  just encrypt-database-env

decrypt-backend-env:
  sops --decrypt --input-type dotenv --output-type dotenv backend/.env.encrypted > backend/.env.production

decrypt-frontend-env:
  sops --decrypt --input-type dotenv --output-type dotenv frontend/.env.encrypted > frontend/.env.production

decrypt-database-env:
  sops --decrypt --input-type dotenv --output-type dotenv database/.env.encrypted > database/.env.production

decrypt-envs:
  just decrypt-backend-env
  just decrypt-frontend-env
  just decrypt-database-env


    