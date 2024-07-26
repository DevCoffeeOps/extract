#!/bin/bash

# Directory where the builds are stored
BUILD_DIR="builds"

# Check if the builds directory exists
if [ ! -d "$BUILD_DIR" ]; then
  echo "Builds directory '$BUILD_DIR' does not exist."
  exit 1
fi

# Find the latest built file based on the filename pattern
latest_file=$(ls -1t "$BUILD_DIR"/image_*.sif 2>/dev/null | head -n 1)

# Check if any build files exist
if [ -z "$latest_file" ]; then
  echo "No build files found in '$BUILD_DIR'."
  exit 1
fi

# Run the apptainer command with the latest file
echo "Running apptainer with the latest build file: $latest_file"
apptainer run --containall "$latest_file"
