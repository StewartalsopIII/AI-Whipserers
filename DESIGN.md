# AI Whisperers Design Documentation

## Design Overview

The AI Whisperers website features a hacker-chic, terminal-inspired interface with interactive elements and animations. The design emphasizes a dark theme with glowing green terminal aesthetics.

## Key Visual Elements

### Terminal Aesthetic

- **Dark Mode**: Off-black background (#121212) with terminal-green text
- **Typography**: Monospace font (JetBrains Mono) for terminal elements and headers
- **Terminal Box**: Central interface element with glowing borders and realistic terminal styling
- **Blinking Cursor**: Animated cursor mimicking terminal input

### Interactive Network

- **Connection Mesh**: Animated network of connections between questions
- **Beam Animation**: When clicking a question, a green energy beam travels to other questions
- **Node Pulse**: Visual feedback when interactions occur
- **User Silhouettes**: Abstract representations of users connected to the terminal

### Matrix Background

- **Falling Characters**: Japanese characters and binary digits falling in Matrix-style
- **Depth Effect**: Background elements are darker green, while interactive elements are brighter
- **Gradient Glow**: Various elements have subtle glow effects to create depth

## Responsive Design

### Desktop View

- Questions arranged in orbital pattern around the terminal
- Full network visualization with animated connections
- Matrix animation in the background
- Enhanced glow effects and visual details

### Mobile View

- Vertical list of clickable questions at the top
- Smooth scrolling to terminal when questions are clicked
- Terminal-style interface preserved in a mobile-friendly layout
- Visual effects optimized for mobile performance

## Color Scheme

- **Background**: #121212 (off-black)
- **Terminal Green**: Brighter elements use rgb(50, 255, 50) to rgb(100, 255, 100)
- **Background Elements**: Darker green rgb(0, 100, 0) with lower opacity
- **Headers**: White (#ffffff)
- **Highlights**: Bright green accents for interaction points

## Animation Details

### Beam Effect

The beam effect visualizes connections between questions:

1. When a question is clicked, beams of bright green energy travel to other questions
2. The beam is a segment of brighter green that travels along connection paths
3. Nodes pulse when the beam reaches them
4. The effect creates a sense of energy flowing through the network

### Matrix Rain

The Matrix-style falling characters:

1. Uses a mix of Japanese characters and binary digits
2. Characters fall at different speeds
3. The animation is subtle with low opacity to maintain readability
4. Only appears on desktop view to avoid performance issues on mobile

## Implementation Notes

- Canvas-based animations for network visualization
- CSS animations for cursor blinking and terminal effects
- Conditional rendering based on device type
- Optimized performance through strategic animation methods