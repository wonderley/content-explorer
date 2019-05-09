#! /bin/bash
set -e
docker run -it --rm --name mypostgres -v `pwd`/db:/docker-entrypoint-initdb.d postgres