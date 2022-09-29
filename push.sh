#!/bin/bash

pnpm format
git add -A
git commit -m "chore: format" 
git push
