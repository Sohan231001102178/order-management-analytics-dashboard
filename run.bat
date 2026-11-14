@echo off
echo Starting OMS Order Management Analytics Dashboard...
cd /d "%~dp0"
call npm.cmd run dev
pause
