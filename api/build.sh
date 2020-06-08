#!/bin/bash

docker run -d -p 5000:5000 --restart=always --name registry registry:2
docker build -t localhost:5000/example-api .
docker push localhost:5000/example-api