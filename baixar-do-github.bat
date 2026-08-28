@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cd /d "%~dp0"
echo.
echo ==========================================
echo   Baixando alteracoes do GitHub
echo ==========================================
echo.

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 goto naorepo

echo Conferindo se tem coisa nao enviada aqui...
git diff --quiet HEAD
if errorlevel 1 goto sujo
echo Tudo certo, nada pendente.
echo.

echo Buscando novidades no GitHub...
git fetch --all --prune
if errorlevel 1 goto erro
echo.

for /f "delims=" %%b in ('git rev-parse --abbrev-ref HEAD') do set "ATUAL=%%b"

echo Voce esta na branch: !ATUAL!
echo.
echo Branches que existem no GitHub:
echo.
for /f "tokens=*" %%r in ('git branch -r ^| findstr /v "HEAD"') do (
    set "L=%%r"
    set "L=!L:origin/=!"
    echo    - !L!
)
echo.

set "ALVO="
set /p "ALVO=Qual branch quer baixar? (Enter = !ATUAL!): "
if not defined ALVO set "ALVO=!ATUAL!"

echo.
echo Trocando para a branch !ALVO! ...
git checkout "!ALVO!"
if errorlevel 1 goto erro

echo.
echo Baixando...
git pull --ff-only origin "!ALVO!"
if errorlevel 1 goto divergiu

echo.
echo Ultimos commits que voce tem agora:
echo.
git log -5 --pretty=format:"   %%h  %%s"
echo.
echo.
echo Arquivos do commit mais recente:
echo.
git diff-tree --no-commit-id --name-status -r HEAD
echo.
echo ==========================================
echo   Pronto. Sua pasta esta atualizada.
echo ==========================================
echo.
pause
exit /b 0

:sujo
echo.
echo ==========================================
echo   PAREI. VOCE TEM ALTERACOES NAO ENVIADAS
echo ==========================================
echo.
echo Tem arquivo modificado nesta pasta que ainda nao subiu.
echo Se eu baixar agora, seu trabalho pode ser sobrescrito.
echo.
echo O que mudou aqui:
echo.
git status --short
echo.
echo Rode o atualizar-github.bat primeiro para salvar,
echo depois rode este aqui de novo.
echo.
pause
exit /b 1

:divergiu
echo.
echo ==========================================
echo   PAREI. AS VERSOES SEGUIRAM CAMINHOS DIFERENTES
echo ==========================================
echo.
echo A branch daqui e a do GitHub tem commits diferentes.
echo Nao dei o pull para nao misturar seus arquivos.
echo.
echo Abre o Claude Code no projeto e pede pra resolver.
echo.
pause
exit /b 1

:naorepo
echo.
echo ==========================================
echo   ESTA PASTA NAO E UM REPOSITORIO GIT
echo ==========================================
echo.
echo Coloque este arquivo dentro da pasta do projeto
echo (a mesma onde esta o atualizar-github.bat).
echo.
pause
exit /b 1

:erro
echo.
echo ==========================================
echo   DEU ERRO. Leia a mensagem acima.
echo ==========================================
echo.
pause
exit /b 1
