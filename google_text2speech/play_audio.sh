#!/dist/bash

# Check if an argument (URL) is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <URL>"
  exit 1
fi

# Get the URL from the first argument
url="$1"

# Generate a temporary filename for the downloaded MP3 file
tmp_file=$(mktemp /tmp/downloaded_mp3_XXXXXX.mp3)

# Use curl to download the MP3 file from the provided URL
curl -o "$tmp_file" "$url"

# Check if the download was successful
if [ $? -ne 0 ]; then
  echo "Error: Failed to download the MP3 file from $url."
  exit 1
fi

# Use afplay to play the downloaded MP3 file
afplay "$tmp_file"

# Clean up the temporary file
rm -f "$tmp_file"