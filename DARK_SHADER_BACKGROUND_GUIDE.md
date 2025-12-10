# 🎨 Animated Shader Background - Implementation Guide

## ✅ **What's Been Updated**

I have replaced the previous background with the **exact animated effect** you requested, using the provided shader code.

### **1. New Shader Implementation**
- Created `src/components/ui/background-paper-shaders.tsx` containing the custom `ShaderPlane` and `EnergyRing` components.
- **UPDATED**: Implemented a **Premium Silky Design** shader with organic folds and sheen highlights.
- **UPDATED**: Increased plane geometry resolution to `[128, 128]` for ultra-smooth waves.

### **2. Global Background Update**
- Updated `src/components/ui/dark-shader-background.tsx` to use the new `ShaderPlane`.
- Applied the **Dark Theme** colors (`#000000` mixed with `#333333`) to match the demo's aesthetic.
- Added the **Lighting Overlay Effects** (pulsing blur orbs) as requested.

### **3. Configuration Updates**
- **CSS**: Extended `src/index.css` with the provided **Tailwind CSS variables** using the `oklch` color space.
- **Tailwind**: Updated `tailwind.config.ts` to remove `hsl()` wrappers, allowing the new `oklch` variables to work natively.

---

## 🎨 **Customization**

### **Adjusting Colors**
Edit `src/components/ui/dark-shader-background.tsx`:

```tsx
<ShaderPlane 
    position={[0, 0, 0]} 
    color1="#000000"   // Primary dark color
    color2="#333333"   // Secondary accent color
/>
```

### **Adjusting Animation Speed/Intensity**
Edit `src/components/ui/background-paper-shaders.tsx`:

```javascript
// In ShaderPlane component
uniforms.time.value = state.clock.elapsedTime       // Speed
uniforms.intensity.value = 0.5 + Math.sin(...) * 0.1 // Intensity
```

### **Lighting Overlays**
You can tweak the glowing orbs in `src/components/ui/dark-shader-background.tsx` under the `div` with `pointer-events-none`.

---

## 🚀 **How to Use**

The background is already integrated globally via `App.tsx`. You don't need to do anything else!

If you want to use the **Energy Ring** effect (also provided in your code), you can uncomment it in `src/components/ui/dark-shader-background.tsx`:

```tsx
{/* <EnergyRing radius={2} position={[0, 0, -1]} /> */}
```

---

## 📱 **Performance**
- The shader runs on the GPU via WebGL (Three.js).
- Optimized for smooth performance.
- `bg-black` fallback ensures no white flashes.

Enjoy your new premium animated background! ✨
