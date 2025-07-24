# v0 Design Mode Guide for AlignSynch

## Overview

This guide covers how to use v0 Design Mode to customize and iterate on the AlignSynch admin dashboard interface without writing code directly.

## Getting Started with Design Mode

### 1. Enabling Design Mode

**Option A: Keyboard Shortcut**
- Press `Option + D` (Mac) or `Alt + D` (Windows/Linux)

**Option B: UI Toggle**
- Click the **Design** tab at the top of the v0 interface

### 2. Element Selection

Once Design Mode is active:
- Move your cursor over elements to highlight them
- Click on any highlighted element to select it
- Selected elements show a blue outline with editing controls

## AlignSynch-Specific Components

### Navigation Components
- **Site Header**: Main navigation with logo and user menu
- **Admin Sidebar**: Collapsible navigation for admin sections
- **Breadcrumbs**: Page hierarchy navigation

### Dashboard Components
- **Project Cards**: Interactive cards showing project status
- **Analytics Cards**: Metrics and KPI displays
- **Activity Feed**: Recent actions and updates

### Form Components
- **Settings Forms**: User preferences and configuration
- **Quiz Creation**: Interactive quiz builder interface
- **User Management**: Admin user controls

## Design Mode Workflows

### Quick Visual Tweaks (Design Panel)
1. Select an element
2. Use the Design Panel on the right for:
   - **Colors**: Background, text, border colors
   - **Typography**: Font size, weight, spacing
   - **Layout**: Margin, padding, alignment
   - **Effects**: Shadows, opacity, border radius

### Complex Changes (Prompting)
1. Select an element
2. Use the prompt input to describe changes:
   - "Make this button larger and blue"
   - "Add a shadow to this card"
   - "Change the layout to three columns"

### Working with AlignSynch Theme

**Primary Colors:**
- Blue-Green: `hsl(180, 100%, 25%)` - Primary actions
- Soft Grey: `hsl(210, 20%, 98%)` - Backgrounds
- Dark Grey: `hsl(210, 10%, 23%)` - Text

**Typography:**
- Headings: Inter font, weights 500-700
- Body: Inter font, weight 400
- Code: JetBrains Mono

## Common Editing Tasks

### 1. Updating Colors
\`\`\`
Select element → Design Panel → Color section → Choose from palette
\`\`\`

### 2. Adjusting Spacing
\`\`\`
Select element → Design Panel → Layout section → Adjust margin/padding
\`\`\`

### 3. Changing Typography
\`\`\`
Select element → Design Panel → Typography section → Font size/weight
\`\`\`

### 4. Adding Effects
\`\`\`
Select element → Design Panel → Appearance section → Shadow/opacity
\`\`\`

## Best Practices

### Do's
- ✅ Use the existing color palette for consistency
- ✅ Test changes on different screen sizes
- ✅ Save frequently using the save button
- ✅ Use semantic color names (primary, secondary, etc.)

### Don'ts
- ❌ Don't use arbitrary colors outside the theme
- ❌ Don't make text too small (minimum 14px)
- ❌ Don't break responsive layouts
- ❌ Don't remove accessibility features

## Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Testing Responsiveness
1. Use browser dev tools to test different sizes
2. Check that text remains readable
3. Ensure buttons remain clickable
4. Verify navigation works on mobile

## Troubleshooting

### Element Won't Select
- Try clicking on a parent element first
- Use the element tree in dev tools
- Refresh the preview if needed

### Changes Not Saving
- Check for JavaScript errors in console
- Ensure you're clicking the save button
- Try refreshing and making changes again

### Layout Breaking
- Use the undo function (Cmd/Ctrl + Z)
- Check responsive settings
- Verify margin/padding values are reasonable

## Integration with Development Workflow

### 1. Design Mode → Code
- Make visual changes in Design Mode
- Export the updated code
- Integrate into your development branch

### 2. Collaboration
- Share Design Mode links with team members
- Use comments to discuss changes
- Document design decisions in this guide

### 3. Version Control
- Save major design iterations
- Document changes in commit messages
- Keep design and code changes in sync

## Advanced Tips

### Custom CSS Classes
When using prompts, you can reference existing Tailwind classes:
- "Add the `shadow-lg` class to this card"
- "Use `text-blue-600` for this heading"

### Component Variants
Create variations of existing components:
- "Make a smaller version of this button"
- "Create a dark variant of this card"

### Animation and Interactions
- "Add a hover effect to this button"
- "Make this card slide in from the left"

## Getting Help

### Resources
- v0 Documentation: [v0.dev/docs](https://v0.dev/docs)
- Tailwind CSS: [tailwindcss.com](https://tailwindcss.com)
- AlignSynch Design System: See `docs/design-system.md`

### Support
- Use the v0 community forum for questions
- Check the troubleshooting section above
- Contact the development team for AlignSynch-specific issues
