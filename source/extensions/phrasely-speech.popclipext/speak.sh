#!/dist/bash

# Check if an argument (URL) is provided
# if [ $# -eq 0 ]; then
#   echo "Usage: $0 <URL>"
#   exit 1
# fi

# Get the URL from the first argument
text="$(</dev/stdin)"

language=$(curl -X 'POST' \
  'https://traefik.stg.open.textshuttle.com/api/unstable/v4/detect_language' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d "{
  \"text\": \"$text\"
}")

language=$(echo "$language" | grep -o '"language": *"[^"]*"' | grep -o '"[^"]*"$' | sed 's/"//g')

# Generate a temporary filename for the downloaded MP3 file
# tmp_file=$(mktemp /tmp/downloaded_mp3_XXXXXX.mp3)

# # Use curl to download the MP3 file from the provided URL

# encoded_value=$(python3 -c "import urllib.parse; print urllib.parse.quote('''$text''')")
# lang=$(python3 -c "import urllib.parse; print urllib.parse.quote('''$lang''')")
res=$(curl  -G \
    https://us-central1-hackzurich23-8237.cloudfunctions.net/text2speech \
    --data-urlencode "text=$text" \
    --data-urlencode "lang=$language" \
    --http1.1\
    -v\
    -o /tmp/zium.mp3
    )

# curl--data-urlencode "blah=df ssdf sdf" --data-urlencode "blah2=dfsdf sdfsd " http://whatever.com/whatever
echo "Zium $language"
# # Check if the download was successful
# if [ $? -ne 0 ]; then
#   echo "Error: Failed to download the MP3 file from $url."
#   exit 1
# fi

# Use afplay to play the downloaded MP3 file
afplay "/tmp/zium.mp3"

# Clean up the temporary file
rm -f "$tmp_file"