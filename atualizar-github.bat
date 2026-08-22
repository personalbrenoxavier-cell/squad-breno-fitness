@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ==========================================
echo   Enviando alteracoes para o GitHub
echo ==========================================
echo.

git add -A

git diff --cached --quiet
if not errorlevel 1 (
    echo Nada mudou desde o ultimo envio.
    echo.
    pause
    exit /b 0
)

echo Arquivos que vao subir:
echo.
git diff --cached --name-status
echo.

set "MSG="
set /p "MSG=Descreva a mudanca (ou so aperte Enter): "
if not defined MSG set "MSG=Atualizacao de %date%"

git commit -m "%MSG%"
if errorlevel 1 goto erro

git push
if errorlevel 1 goto erro

echo.
echo ==========================================
echo   Pronto. Enviado para o GitHub.
echo ==========================================
echo.
pause
exit /b 0

:erro
echo.
echo ==========================================
echo   DEU ERRO. Leia a mensagem acima.
echo ==========================================
echo.
pause
exit /b 1
