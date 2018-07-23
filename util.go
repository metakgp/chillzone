package main

import "os"

func InDebugMode() bool {
	return os.Getenv("DEBUG") == "1"
}
