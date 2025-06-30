#!/bin/bash
# Initialize a conda environment
source $(conda info --base)/etc/profile.d/conda.sh
conda create -n portfolio-site python=3.11 -y
conda activate portfolio-site

# Install dependencies
pip install -r requirements.txt

# Verify bcrypt installation
echo "Verifying bcrypt installation..."
python -c "import bcrypt; print(f'bcrypt version: {bcrypt.__version__}')"

echo "Python environment setup complete!"
