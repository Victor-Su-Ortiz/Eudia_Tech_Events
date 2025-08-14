# Adding the Eudia Logo

## 📍 Where to Place Your Eudia Logo

Place your Eudia PNG image files in the `public/images/` directory:

```
public/
└── images/
    ├── eudia-logo.png           # Main logo
    ├── eudia-logo-white.png     # White version for dark backgrounds (optional)
    ├── eudia-logo-dark.png      # Dark version for light backgrounds (optional)
    └── eudia-icon.png           # Square icon version (optional)
```

## 🎨 Recommended Image Specifications

- **Format**: PNG with transparent background
- **Main Logo Size**: 200x200px or larger (will be scaled down)
- **Icon Size**: Square aspect ratio (1:1)
- **File Size**: Optimize for web (< 100KB preferred)

## 📝 How to Add Your Logo

1. **Copy your Eudia PNG file** to `/public/images/eudia-logo.png`

2. **Update the Header component** (`app/(ui)/components/Header.tsx`):
   - Remove lines 42-46 (the gradient icon div)
   - Uncomment lines 33-40 (the Image component)
   - Add the import at the top: `import Image from 'next/image'`

3. **Update the Footer component** (`app/(ui)/components/Footer.tsx`):
   - Replace the gradient icon with the Image component
   - Use the same pattern as the Header

4. **For OG Images** (social media previews):
   - Place a high-resolution version at `/public/images/eudia-og.png`
   - Recommended size: 1200x630px

## 💡 Current Fallback Design

Until you add your PNG logo, the site uses a gradient icon with the Sparkles symbol as a placeholder. This ensures the site looks professional even without the actual logo file.

## 🔧 Quick Implementation

To quickly switch to using your PNG logo everywhere:

1. Add your logo: `public/images/eudia-logo.png`
2. Run this command to update all components:
   ```bash
   # This will uncomment the Image components and remove the gradient placeholders
   pnpm run update-logo
   ```

## 🌓 Dark Mode Consideration

If you have different logo versions for light/dark themes:

```tsx
import { useTheme } from 'next-themes'

function Logo() {
  const { theme } = useTheme()

  return (
    <Image
      src={theme === 'dark' ? '/images/eudia-logo-white.png' : '/images/eudia-logo.png'}
      alt="Eudia"
      width={40}
      height={40}
    />
  )
}
```

## 📱 Favicon Setup

Don't forget to add favicons:

1. Place `favicon.ico` in `/public/`
2. Add apple-touch-icon: `/public/apple-touch-icon.png` (180x180px)
3. Add favicon-32x32: `/public/favicon-32x32.png`
4. Add favicon-16x16: `/public/favicon-16x16.png`

These will be automatically picked up by Next.js.
