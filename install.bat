@echo off
echo Installing SS Stores E-commerce Website...
echo.

echo Step 1: Installing root dependencies...
call npm install

echo.
echo Step 2: Installing server dependencies...
cd server
call npm install
cd ..

echo.
echo Step 3: Installing client dependencies...
cd client
call npm install
cd ..

echo.
echo Installation complete!
echo.
echo To start the application:
echo   npm run dev
echo.
echo The application will be available at:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:5000
echo   Admin Dashboard: http://localhost:3000/admin
echo.
pause
