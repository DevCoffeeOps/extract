#!/bin/bash

# Directory to save files
BUILD_DIR="builds"

# Create the builds directory if it doesn't exist
mkdir -p "$BUILD_DIR"

# Function to generate a timestamped filename with an incrementing number
generate_filename() {
    # Get the current date
    current_date=$(date +"%Y%m%d")
    
    # Find the highest existing increment for today's date
    highest_increment=$(ls "$BUILD_DIR" | grep -oP "${current_date}_\d+.sif" | grep -oP "\d+(?=.sif)" | sort -nr | head -n 1)
    
    # If no files exist for today, start with 1
    if [ -z "$highest_increment" ]; then
        increment=1
    else
        # Otherwise, increment the highest existing number
        increment=$((highest_increment + 1))
    fi
    
    # Combine date and increment to form the filename
    filename="${BUILD_DIR}/image_${current_date}_${increment}.sif"
    echo "$filename"
}

# Generate the filename
filename=$(generate_filename)

# Print the unique filename
echo "Using filename: $filename"

apptainer build -F $filename data/app.def

