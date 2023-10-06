#!/usr/bin/env bash
cd other-years-scraper && go run . && cd ..
cd first-year-scraper && python3 main.py && cd ..