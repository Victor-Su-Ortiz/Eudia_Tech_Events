#!/bin/bash

echo "🚀 Setting up Bay Area Tech Events..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    echo "NEXT_PUBLIC_SITE_URL=http://localhost:3000" > .env.local
fi

# Initialize husky
echo "🪝 Setting up Git hooks..."
pnpm prepare

# Validate data
echo "✅ Validating event data..."
pnpm validate

echo ""
echo "✨ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  pnpm dev"
echo ""
echo "To add a new event, run:"
echo "  pnpm add-event --help"
echo ""
echo "For more information, see the README.md file."
