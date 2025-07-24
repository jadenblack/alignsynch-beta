# AlignSynch Component Library

## Overview

This document provides comprehensive information about all components in the AlignSynch admin dashboard, including how to customize them using v0 Design Mode.

## Navigation Components

### SiteHeader
**Location**: `components/layout/site-header.tsx`
**Purpose**: Main application header with navigation and user controls

**Design Mode Tips**:
- Select the header container to adjust height and background
- Click on logo to change size or alignment
- Select navigation items to modify spacing and colors
- User menu can be styled by selecting the dropdown trigger

**Customizable Properties**:
- Background color
- Logo size and positioning
- Navigation item spacing
- User avatar size
- Mobile menu appearance

### AdminSidebar
**Location**: `components/admin/sidebar.tsx`
**Purpose**: Collapsible navigation sidebar for admin sections

**Design Mode Tips**:
- Select sidebar container to adjust width
- Click on navigation items to change colors and spacing
- Collapse button can be restyled for better visibility
- Section headers can be modified for typography

**Customizable Properties**:
- Sidebar width (collapsed/expanded)
- Navigation item colors and hover states
- Section dividers and spacing
- Collapse/expand animation

### Breadcrumbs
**Location**: Built into page layouts
**Purpose**: Shows current page hierarchy

**Design Mode Tips**:
- Select breadcrumb container for spacing adjustments
- Individual crumbs can be styled for color and typography
- Separators can be customized or replaced with icons

## Dashboard Components

### ProjectCard
**Location**: `components/dashboard/project-card.tsx`
**Purpose**: Displays project information in card format

**Design Mode Tips**:
- Card container can be adjusted for padding and shadows
- Header section for title and status styling
- Content area for description and metadata
- Action buttons for color and size modifications

**Customizable Properties**:
- Card dimensions and spacing
- Status indicator colors
- Typography hierarchy
- Button styles and positioning
- Hover effects and animations

### ProjectDetailModal
**Location**: `components/dashboard/project-detail-modal.tsx`
**Purpose**: Detailed view of project information

**Design Mode Tips**:
- Modal overlay can be adjusted for opacity
- Modal content container for size and positioning
- Header section with close button styling
- Content sections for layout and spacing

### AnalyticsCard
**Purpose**: Displays metrics and KPIs

**Design Mode Tips**:
- Number display for font size and color
- Label text for typography and positioning
- Trend indicators for color coding
- Background and border styling

## Form Components

### Input
**Location**: `components/ui/input.tsx`
**Purpose**: Text input fields

**Design Mode Tips**:
- Input container for border and background
- Focus states for ring color and width
- Placeholder text styling
- Error state appearance

**Customizable Properties**:
- Border radius and width
- Background and text colors
- Focus ring appearance
- Padding and height
- Error state styling

### Button
**Location**: `components/ui/button.tsx`
**Purpose**: Interactive buttons with multiple variants

**Variants Available**:
- Primary: Main action buttons
- Secondary: Supporting actions
- Outline: Subtle actions
- Ghost: Minimal styling
- Link: Text-like appearance

**Design Mode Tips**:
- Select button to modify colors and sizing
- Text content can be edited directly
- Icon buttons need icon selection
- Loading states can be customized

### Select
**Location**: `components/ui/select.tsx`
**Purpose**: Dropdown selection component

**Design Mode Tips**:
- Trigger button styling
- Dropdown content appearance
- Option item styling and spacing
- Selected state appearance

### Textarea
**Location**: `components/ui/textarea.tsx`
**Purpose**: Multi-line text input

**Design Mode Tips**:
- Resize behavior and minimum height
- Border and background styling
- Focus states and validation
- Placeholder text appearance

## Data Display Components

### Table
**Location**: `components/ui/table.tsx`
**Purpose**: Structured data display

**Design Mode Tips**:
- Table container for borders and spacing
- Header row for background and typography
- Data rows for alternating colors
- Cell padding and alignment

**Customizable Properties**:
- Row striping colors
- Header background and text
- Border styles and colors
- Cell spacing and alignment
- Responsive behavior

### Card
**Location**: `components/ui/card.tsx`
**Purpose**: Content container with header, body, and footer

**Design Mode Tips**:
- Card container for shadows and borders
- Header section for title styling
- Content area for padding and layout
- Footer for action placement

### Badge
**Location**: `components/ui/badge.tsx`
**Purpose**: Status indicators and labels

**Variants Available**:
- Default: Standard appearance
- Secondary: Muted appearance
- Destructive: Error/warning states
- Outline: Bordered appearance

### Progress
**Location**: `components/ui/progress.tsx`
**Purpose**: Progress indicators

**Design Mode Tips**:
- Container bar for background and height
- Progress fill for color and animation
- Text labels for positioning and styling

## Feedback Components

### Alert
**Location**: `components/ui/alert.tsx`
**Purpose**: Important messages and notifications

**Variants Available**:
- Default: General information
- Destructive: Error messages

**Design Mode Tips**:
- Alert container for background and borders
- Icon positioning and color
- Title and description typography
- Close button styling

### Dialog
**Location**: `components/ui/dialog.tsx`
**Purpose**: Modal dialogs and overlays

**Design Mode Tips**:
- Overlay background and opacity
- Dialog container positioning and size
- Header with title and close button
- Content area and footer actions

### LoadingSpinner
**Location**: `components/ui/loading-spinner.tsx`
**Purpose**: Loading state indicators

**Design Mode Tips**:
- Spinner size and color
- Animation speed and style
- Container positioning
- Text label styling

## Layout Components

### Separator
**Location**: `components/ui/separator.tsx`
**Purpose**: Visual dividers between content

**Design Mode Tips**:
- Line thickness and color
- Spacing around separator
- Orientation (horizontal/vertical)

### ScrollArea
**Location**: `components/ui/scroll-area.tsx`
**Purpose**: Custom scrollable containers

**Design Mode Tips**:
- Container dimensions
- Scrollbar appearance
- Content padding
- Scroll behavior

### Collapsible
**Location**: `components/ui/collapsible.tsx`
**Purpose**: Expandable content sections

**Design Mode Tips**:
- Trigger button styling
- Content container appearance
- Animation timing and easing
- Icon rotation and positioning

## Specialized Components

### EmotionalCard
**Location**: `components/ui/emotional-card.tsx`
**Purpose**: Cards with emotional design elements

**Design Mode Tips**:
- Gradient backgrounds and overlays
- Rounded corners and shadows
- Content positioning and spacing
- Emotional color schemes

### CollaborativeButton
**Location**: `components/ui/collaborative-button.tsx`
**Purpose**: Buttons designed for team interactions

**Design Mode Tips**:
- Multi-user state indicators
- Collaborative color schemes
- Icon and text positioning
- Hover and active states

### EmpathyBadge
**Location**: `components/ui/empathy-badge.tsx`
**Purpose**: Badges showing empathy levels

**Design Mode Tips**:
- Color gradients for empathy levels
- Size variations for different contexts
- Text and icon combinations
- Animation effects

### RelationshipProgress
**Location**: `components/ui/relationship-progress.tsx`
**Purpose**: Progress bars for relationship metrics

**Design Mode Tips**:
- Multi-segment progress bars
- Color coding for different metrics
- Label positioning and styling
- Animation and transitions

## Admin-Specific Components

### DirectoryHeader
**Location**: `components/admin/directory-header.tsx`
**Purpose**: Header for admin directory pages

**Design Mode Tips**:
- Title and subtitle styling
- Action button positioning
- Search and filter controls
- Breadcrumb integration

### DirectorySection
**Location**: `components/admin/directory-section.tsx`
**Purpose**: Organized sections in admin directory

**Design Mode Tips**:
- Section header styling
- Content grid layout
- Item spacing and alignment
- Expansion/collapse behavior

### DeploymentChecklist
**Location**: `components/admin/deployment-checklist.tsx`
**Purpose**: Checklist for deployment tasks

**Design Mode Tips**:
- Checklist item styling
- Status indicators and colors
- Progress tracking appearance
- Action button placement

## Design Mode Best Practices

### Component Selection
1. **Start with the container**: Select the outermost element first
2. **Work inward**: Then select child elements for specific styling
3. **Use the element tree**: If selection is difficult, use browser dev tools

### Color Consistency
1. **Use design tokens**: Reference the established color palette
2. **Maintain contrast**: Ensure accessibility standards are met
3. **Test variations**: Check how colors look in different states

### Responsive Design
1. **Test multiple sizes**: Use browser dev tools to check responsiveness
2. **Maintain proportions**: Ensure components scale appropriately
3. **Check mobile usability**: Verify touch targets are adequate

### Typography Hierarchy
1. **Follow the scale**: Use established font sizes and weights
2. **Maintain readability**: Ensure sufficient contrast and spacing
3. **Consider context**: Match typography to component purpose

## Component Dependencies

### Core Dependencies
- React 18+
- Next.js 14+
- Tailwind CSS 3+
- Radix UI primitives

### Component Relationships
\`\`\`
SiteHeader
├── Logo
├── Navigation
│   ├── NavigationItem
│   └── UserMenu
└── MobileMenu

AdminSidebar
├── SidebarHeader
├── NavigationSection
│   ├── NavigationItem
│   └── SubNavigation
└── CollapseButton

ProjectCard
├── CardHeader
├── CardContent
│   ├── ProjectStatus
│   ├── ProjectMeta
│   └── ProjectActions
└── CardFooter
\`\`\`

## Customization Workflows

### 1. Color Theme Updates
\`\`\`
1. Select component container
2. Open Design Panel → Color section
3. Choose from AlignSynch palette
4. Test in light/dark modes
5. Save changes
\`\`\`

### 2. Layout Adjustments
\`\`\`
1. Select layout container
2. Open Design Panel → Layout section
3. Adjust margin/padding values
4. Test responsive behavior
5. Verify accessibility
\`\`\`

### 3. Typography Changes
\`\`\`
1. Select text element
2. Open Design Panel → Typography section
3. Adjust size/weight/spacing
4. Check contrast ratios
5. Test readability
\`\`\`

### 4. Adding Effects
\`\`\`
1. Select target element
2. Open Design Panel → Appearance section
3. Add shadows/opacity/radius
4. Preview in context
5. Ensure performance impact is minimal
\`\`\`

## Testing Your Changes

### Visual Testing
- Check all component states (hover, focus, active)
- Verify responsive behavior across breakpoints
- Test in different browsers and devices
- Validate color contrast and accessibility

### Functional Testing
- Ensure interactive elements still work
- Verify keyboard navigation
- Test screen reader compatibility
- Check performance impact

### Integration Testing
- Verify components work together
- Check for layout conflicts
- Test in different page contexts
- Validate with real data

For more detailed information about specific components, refer to the individual component files and their TypeScript interfaces.
