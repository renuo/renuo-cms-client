grunt lint
RC=$?
if [ ! $RC -eq 0 ]; then
  echo 'linting issues detected, commit aborted!'
  exit 1
fi

grunt test
RC=$?
if [ ! $RC -eq 0 ]; then
  echo 'test issues detected, commit aborted!'
  exit 1
fi
