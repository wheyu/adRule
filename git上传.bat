@echo off
git add .

set THISDATE=%DATE:~0,4%%DATE:~5,2%%DATE:~8,2%

git commit -m %THISDATE%

git push

pause