TAG=$(git describe --tags --abbrev=0 --exact-match HEAD)
retV=$?
if [ $retV -ne 0 ]; then
    echo $(git rev-parse --short HEAD)
else
    echo $TAG
fi