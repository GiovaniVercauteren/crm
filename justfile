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
  sops --encrypt --input-type dotenv --output-type dotenv backend/.env > backend/.env.enc

encrypt-frontend-env:
  sops --encrypt --input-type dotenv --output-type dotenv frontend/.env > frontend/.env.enc

encrypt-envs:
  just encrypt-backend-env
  just encrypt-frontend-env

decrypt-backend-env:
  sops --decrypt --input-type dotenv --output-type dotenv backend/.env.enc > backend/.env

decrypt-frontend-env:
  sops --decrypt --input-type dotenv --output-type dotenv frontend/.env.enc > frontend/.env

decrypt-envs:
  just decrypt-backend-env
  just decrypt-frontend-env


    