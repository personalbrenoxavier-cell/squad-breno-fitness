@echo off
title Squad Breno - Claude Code
cd /d "%~dp0"

REM ==========================================================
REM  Localiza o claude.exe automaticamente (versao mais recente)
REM ==========================================================
set "CLAUDE_DIR=%APPDATA%\Claude\claude-code"
set "CLAUDE_EXE="

for /f "delims=" %%i in ('dir /b /ad /o-n "%CLAUDE_DIR%" 2^>nul') do (
    if exist "%CLAUDE_DIR%\%%i\claude.exe" (
        set "CLAUDE_EXE=%CLAUDE_DIR%\%%i\claude.exe"
        goto :encontrou
    )
)

REM Nao achou
echo.
echo ========================================
echo   ERRO: claude.exe nao encontrado
echo ========================================
echo.
echo Procurei em: %CLAUDE_DIR%
echo.
echo Verifique se o Claude Code esta instalado.
echo.
pause
exit /b 1

:encontrou
echo ========================================
echo   SQUAD BRENO XAVIER - Claude Code
echo ========================================
echo.
echo Comandos disponiveis:
echo   /avaliacao       - Avaliacao postural inicial
echo   /reavaliacao     - Reavaliacao comparativa
echo   /dieta           - Dieta mensal
echo   /dieta-mounjaro  - Dieta para Mounjaro/GLP-1
echo.
echo Digite "/" no campo de mensagem para ver a lista completa.
echo ========================================
echo.

"%CLAUDE_EXE%"

REM Se o Claude fechar (saida normal ou erro), mantem a janela aberta
echo.
echo ========================================
echo   Sessao do Claude finalizada.
echo   Pressione qualquer tecla para fechar.
echo ========================================
pause >nul
