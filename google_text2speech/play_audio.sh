#!/bin/bash

# Check if an argument (MP3 file path) is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <MP3_FILE>"
  exit 1
fi

# Get the MP3 file path from the first argument
mp3_file="$1"

# Check if the MP3 file exists
if [ ! -f "$mp3_file" ]; then
  echo "Error: The specified MP3 file does not exist."
  exit 1
fi

# Use afplay to play the MP3 file
afplay "$mp3_file"
