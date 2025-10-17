#!/bin/bash

# Portfolio Quick Setup Script
# Run this after customizing the portfolio with your information

echo "🎨 Building your creative portfolio..."
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm is not installed. Installing npm dependencies instead..."
    npm install
else
    echo "✅ Installing dependencies with pnpm..."
    pnpm install
fi

echo ""
echo "✨ Portfolio setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update your personal information in src/app/layout.tsx"
echo "2. Add your projects to src/app/page.tsx and src/app/projects/page.tsx"
echo "3. Add your blog posts to src/app/blog/page.tsx"
echo "4. Update social media links and contact email"
echo "5. Customize colors in src/app/globals.css"
echo ""
echo "🚀 To start developing:"
echo "   pnpm dev"
echo ""
echo "📦 To build for production:"
echo "   pnpm build"
echo ""
echo "🌐 To deploy:"
echo "   - Vercel: vercel"
echo "   - Netlify: netlify deploy"
echo ""
echo "📖 For detailed customization guide, see CUSTOMIZATION_GUIDE.md"
echo "📚 For portfolio documentation, see PORTFOLIO_README.md"
