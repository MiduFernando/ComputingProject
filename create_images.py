from PIL import Image, ImageDraw
import os

os.chdir("/Users/rasanthi/Downloads/Final Year Project Computing/frontend/assets")

images = [
    ("drAnuraImage.png", "Dr. Anura"),
    ("drRoshanImage.png", "Dr. Roshan"),
    ("drNirmalaImage.png", "Dr. Nirmala"),
    ("drSunilImage.png", "Dr. Sunil"),
    ("drDineshImage.png", "Dr. Dinesh"),
    ("drYasminImage.png", "Dr. Yasmin"),
    ("drDiliniImage.png", "Dr. Dilini"),
    ("drArjunaImage.png", "Dr. Arjuna"),
    ("drSharmalaImage.png", "Dr. Sharmala"),
    ("drKasunImage.png", "Dr. Kasun"),
    ("drThiliniImage.png", "Dr. Thilini"),
    ("drBuddhikaImage.png", "Dr. Buddhika"),
    ("MedicalTeamImage.png", "Medical Team"),
    ("ConsulationImage.png", "Consultation"),
    ("facilitiesImage.png", "Facilities"),
    ("heroImage.png", "Hero Image"),
    ("ColomboGeneralHospital.png", "Colombo Hospital"),
    ("AsiriCentralHospital.png", "Asiri Hospital"),
]

for filename, label in images:
    img = Image.new('RGB', (400, 300), color=(224, 242, 241))
    draw = ImageDraw.Draw(img)
    draw.text((20, 20), label, fill=(0, 137, 123))
    img.save(filename)
    print(f"✅ {filename}")

print("✅ All images created!")
