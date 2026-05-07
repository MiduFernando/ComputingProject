#!/bin/bash

# Create placeholder images using ImageMagick or simple data URIs
# But since we might not have ImageMagick, let's create simple PNG placeholders

# Function to create a simple placeholder PNG
create_placeholder() {
  local filename=$1
  local label=$2
  
  # Use Python to create a simple PNG placeholder
  python3 << PYTHON
import os
from PIL import Image, ImageDraw, ImageFont

# Create a simple placeholder image
img = Image.new('RGB', (400, 300), color='#E0F2F1')
draw = ImageDraw.Draw(img)

# Write text
text = "$label"
try:
  draw.text((10, 10), text, fill='#00897B')
except:
  draw.text((10, 10), text, fill=(0, 137, 123))

img.save('$filename')
PYTHON
}

# Create all placeholder images
create_placeholder "drAnuraImage.png" "Dr. Anura Perera"
create_placeholder "drRoshanImage.png" "Dr. Roshan"
create_placeholder "drNirmalaImage.png" "Dr. Nirmala"
create_placeholder "drSunilImage.png" "Dr. Sunil"
create_placeholder "drDineshImage.png" "Dr. Dinesh"
create_placeholder "drYasminImage.png" "Dr. Yasmin"
create_placeholder "drDiliniImage.png" "Dr. Dilini"
create_placeholder "drArjunaImage.png" "Dr. Arjuna"
create_placeholder "drSharmalaImage.png" "Dr. Sharmala"
create_placeholder "drKasunImage.png" "Dr. Kasun"
create_placeholder "drThiliniImage.png" "Dr. Thilini"
create_placeholder "drBuddhikaImage.png" "Dr. Buddhika"
create_placeholder "MedicalTeamImage.png" "Medical Team"
create_placeholder "ConsulationImage.png" "Consultation"
create_placeholder "facilitiesImage.png" "Facilities"
create_placeholder "heroImage.png" "Hero Image"
create_placeholder "ColomboGeneralHospital.png" "Colombo General Hospital"
create_placeholder "AsiriCentralHospital.png" "Asiri Central Hospital"

echo "✅ All placeholder images created!"
