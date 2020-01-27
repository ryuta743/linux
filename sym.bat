setlocal
mklink /j %~dp0\docker\src\web\app %~dp0\hew2020

pushd "%~dp0"
cd docker
docker-compose up -d --build
pause
docker-compose down
rmdir src/web/app
popd