# Design System Specification: Technical Portfolio & High-End SaaS

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Architect’s Blueprint"**

This design system moves beyond the "standard dark mode" template to create a high-fidelity, editorial experience that mirrors the precision of a high-end IDE and the sophistication of a premium SaaS product. It is built on the principle of **Tonal Depth over Structural Rigidity**. 

Instead of relying on heavy borders to define space, we use a sophisticated layering of dark neutrals and "glass" surfaces to create a sense of infinite, organized space. The aesthetic is "Cyber-Minimalist"—where the technical grit of monospace type meets the airy, expansive feel of modern glassmorphism.

**Key Deviations from Standard UI:**
*   **Asymmetric Bento Grids:** Eschew perfectly equal columns. Use the spacing scale to create intentional focal points where one grid item dominates the visual hierarchy.
*   **Light-Source Logic:** Treat the UI as if a light source is positioned at the top-center. Accents don't just exist; they glow and cast ambient light onto nearby surfaces.

---

## 2. Colors & Surface Logic

The color palette is rooted in a deep, obsidian base with electric technical accents.

### Core Palette
*   **Background (`#131315`):** The foundation. Use this for the deepest layer of the application.
*   **Primary (`#ADC6FF`):** Our "Cyber Blue." Used for interactive highlights and primary actions.
*   **Secondary (`#D0BCFF`):** Our "Neon Purple." Reserved for secondary highlights, accents, and "glow" effects.
*   **Neutral/Surface:** A range from `surface-container-lowest` (`#0E0E10`) to `surface-bright` (`#39393B`).

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning large areas of the layout. Boundaries must be defined through:
1.  **Tonal Shifts:** Placing a `surface-container-low` card against a `surface` background.
2.  **Negative Space:** Using the `16` (5.5rem) or `20` (7rem) spacing tokens to create mental boundaries.

### The Glass & Gradient Rule
To achieve the "Vercel-inspired" depth, use **Glassmorphism** for floating elements (Navigation bars, Modals, Hovering Cards). 
*   **Surface:** Use `surface-variant` with an opacity of 40-60%.
*   **Blur:** Apply a `backdrop-filter: blur(12px)`.
*   **Texture:** Apply a linear gradient (45deg) from `primary` to `primary-container` at 10% opacity across the surface to give it a "technical sheen."

---

## 3. Typography: Editorial Technicality

We use a dual-font approach to balance human-centric readability with machine-centric precision.

| Level | Token | Font Family | Size | Case/Tracking |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Inter / Geist | 3.5rem | -0.02em (Tight) |
| **Headline** | `headline-md` | Inter / Geist | 1.75rem | -0.01em |
| **Title** | `title-sm` | Inter / Geist | 1.0rem | Normal |
| **Body** | `body-md` | Inter / Geist | 0.875rem | Normal |
| **Technical** | `label-md` | Space Grotesk / Mono | 0.75rem | Uppercase / +0.05em |

**Editorial Intent:**
*   **Headlines:** Always use `on-surface` (`#E5E1E4`) for high contrast.
*   **Body:** Always use `on-surface-variant` (`#C2C6D6`) to reduce eye strain and create hierarchy.
*   **Metadata:** Use `label-md` in Monospace for git hashes, timestamps, and technical tags to evoke a "terminal" feel.

---

## 4. Elevation & Depth: The Layering Principle

Depth is not achieved with drop shadows, but through **Tonal Layering**.

*   **The Stack:**
    1.  **Base:** `surface` (`#131315`)
    2.  **Sectioning:** `surface-container-low` (`#1C1B1D`)
    3.  **Components/Cards:** `surface-container` (`#201F22`)
    4.  **Popovers/Floating:** `surface-container-highest` (`#353437`)
*   **Ambient Shadows:** For floating elements, use a shadow color derived from `primary` at 5% opacity with a blur of 40px. This creates a "glow" rather than a "shadow."
*   **The Ghost Border:** If a separator is required for accessibility, use the `outline-variant` token at 15% opacity. It should be felt, not seen.

---

## 5. Components & UI Elements

### Bento Cards
*   **Background:** `surface-container-lowest`.
*   **Border:** 1px "Ghost Border" using `outline-variant` at 10% opacity.
*   **Interaction:** On hover, the border opacity increases to 30% and a subtle `primary` glow appears at the top edge.

### Interactive Buttons
*   **Primary:** Background: `primary-container`. Text: `on-primary-container`. Shape: `md` (0.375rem).
*   **Secondary:** Ghost style. Background: transparent. Border: `outline-variant` (20%). On hover: Background `surface-bright`.
*   **Tertiary:** Monospace text with a leading `>` character. No background.

### Glowing Timeline Dots
*   Used for "Experience" or "Project" lists. 
*   A 6px circle using `primary`. 
*   **The Effect:** A `box-shadow` of 0 0 15px `primary` at 50% opacity to create a "pulsing node" look.

### Input Fields
*   **Styling:** Forgo the four-sided box. Use a `surface-container-low` background with a 2px bottom-border only, using `outline-variant`.
*   **Focus State:** The bottom border transitions to `primary` with a subtle outer glow.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Mono for Data:** Any number, date, or code-related string should use the `label-md` (Monospace) scale.
*   **Embrace Asymmetry:** In a Bento grid, make one card 2x taller or wider than the others to break the "template" feel.
*   **Layer your Glows:** Use gradients that transition from `primary` to `secondary` for high-impact areas like Hero headers.

### Don’t:
*   **Don't use pure black (#000):** It kills the "glass" effect. Stick to the `surface` tokens.
*   **Don't use Dividers:** Avoid horizontal lines `<hr>`. Use a `2.0rem` (Spacing 6) gap or a background color shift to separate content.
*   **Don't Over-Round:** Keep corner radius to `md` (0.375rem) or `lg` (0.5rem). Anything more feels too "consumer-friendly" and loses the technical edge.