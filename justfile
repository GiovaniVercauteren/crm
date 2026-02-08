[working-directory: 'backend']
_start_backend:
  npm run start:dev

[working-directory: 'frontend']
_start_frontend:
  npm run dev

start:
  just _start_backend & \
  just _start_frontend & \
  wait

default: start
    