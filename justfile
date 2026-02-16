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


    