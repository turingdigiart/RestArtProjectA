@echo off
echo ==========================================
echo     for-loop-format-animation
echo     Remotion Animation Preview Server
echo ==========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Go to parent directory (Demo root)
cd ..

REM Set parent directory as variable
set "DEMO_ROOT=%CD%"

REM Go back to project directory
cd "%~dp0"

echo [Current Directory]: %CD%
echo [Demo Root]: %DEMO_ROOT%
echo [Server Address]: http://localhost:3000
echo.
echo [Features]:
echo    - Open http://localhost:3000 in browser
echo    - Real-time animation preview
echo    - Press Ctrl+C to stop server
echo    - Close this window to stop server
echo.
echo [Starting Remotion Studio]...
echo.

REM Try to execute remotion
"%DEMO_ROOT%\node_modules\.bin\remotion.CMD" studio src/index.ts

if errorlevel 1 (
    echo.
    echo [Error]: Failed to start remotion studio
    echo.
    echo [Troubleshooting]:
    echo 1. Check if dependencies are installed:
    echo    cd "%DEMO_ROOT%"
    echo    pnpm install
    echo.
    echo 2. Check if remotion exists:
    echo    dir "%DEMO_ROOT%\node_modules\.bin"
    echo.
)

echo.
echo Server stopped
pause