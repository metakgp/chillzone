#!/usr/bin/env bash
cd other-years-scraper && go build && ./other-years-scraper && cd ..
cd first-year-scraper && python main.py && cd ..