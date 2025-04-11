# AI Whisperers Website Implementation

This document explains the technical implementation details of the AI Whisperers website redesign.

## Overview

The website was redesigned from a standard Next.js boilerplate to create a terminal-inspired, hacker-chic aesthetic with an interactive terminal that displays answers to user questions.

## Key Components

### 1. Terminal Component

Located in `/src/components/ui/Terminal.tsx`, this React component:
- Renders a terminal-like interface with window controls and command prompts
- Accepts questions and answers as props
- Uses React state to track which answer is currently displayed
- Implements communication between question elements and the terminal via custom events

```tsx
export function Terminal({ initialPrompt = "$ ask_ai_whisperers --about", questions }: TerminalProps) {
  const [activeAnswer, setActiveAnswer] = useState<string | null>(null);
  
  // Listen for events from TerminalQuestion components
  useEffect(() => {
    const handleQuestionEvent = (event: CustomEvent) => {
      const { questionId } = event.detail;
      setActiveAnswer(questionId === activeAnswer ? null : questionId);
    };
    
    window.addEventListener('question-click' as any, handleQuestionEvent);
    return () => window.removeEventListener('question-click' as any, handleQuestionEvent);
  }, [activeAnswer]);
  
  // Terminal rendering logic...
}
```

### 2. Questions Positioning System

Located in `/src/app/page.tsx`, this implementation:
- Uses React hooks to calculate and update question positions
- Arranges questions in arcs above and below the terminal
- Implements responsive sizing for different screen widths
- Updates positions on window resize

```tsx
// Position calculation logic
// Split questions to top and bottom sections to avoid overlapping with terminal
const isTopSection = i < QUESTIONS.length / 2;

// Base angle calculation with specific ranges to leave space for the terminal
let angle;
if (isTopSection) {
  // Top half - spread from -45 to -135 degrees
  angle = (-45 - (i / (QUESTIONS.length / 2)) * 90) * (Math.PI / 180);
} else {
  // Bottom half - spread from 45 to 135 degrees
  const bottomIndex = i - Math.floor(QUESTIONS.length / 2);
  angle = (45 + (bottomIndex / (QUESTIONS.length - Math.floor(QUESTIONS.length / 2))) * 90) * (Math.PI / 180);
}

const baseX = Math.sin(angle) * radius;
const baseY = Math.cos(angle) * radius;
```

### 3. Styling System

The styling combines Tailwind utility classes with custom CSS:

#### Tailwind Configuration (`tailwind.config.js`)
- Defines terminal-specific colors (black, green, white)
- Configures typography with monospace and sans-serif fonts
- Sets up animations for terminal cursor blinking

```js
// Custom colors for terminal aesthetic
colors: {
  terminal: {
    black: '#121212',
    green: '#00ff00',
    dimgreen: '#00cc00',
    gray: '#ababab',
    white: '#ffffff',
  },
},
// Custom fonts and animations
fontFamily: {
  mono: ["'JetBrains Mono'", "'Fira Code'", "'Courier New'", 'monospace'],
  sans: ["'Inter'", 'Helvetica', 'Arial', 'sans-serif'],
},
```

#### Global CSS (`src/app/globals.css`)
- Sets up terminal colors and responsive adjustments
- Creates a grid background pattern for the terminal aesthetic
- Implements animations for text appearance
- Defines component styling for terminal elements

```css
/* Terminal styling */
.terminal-box {
  @apply bg-black bg-opacity-50 border border-terminal-green p-6 rounded-md font-mono shadow-lg;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.15);
}

.terminal-cursor {
  @apply inline-block w-2 h-4 bg-terminal-green ml-1 align-middle animate-blink;
}

/* Background grid pattern */
body::before {
  content: "";
  position: fixed;
  /* Grid pattern implementation */
  background-image: 
    linear-gradient(to bottom, rgba(0, 255, 0, 0.03) 1px, transparent 1px),
    linear-gradient(to right, rgba(0, 255, 0, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

## Content Structure

The website content is stored in a JavaScript array in `src/app/page.tsx`:

```tsx
const QUESTIONS = [
  {
    id: 'what-is-this',
    question: 'What is this?',
    answer: `AI Whisperers is a community of curious builders...`
  },
  // More questions and answers...
];
```

## Responsive Design

The design adapts to different screen sizes through:

1. **Responsive Container Heights**: Using tailwind breakpoints to adjust container heights
   ```tsx
   <div className="w-full relative h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px]">
   ```

2. **Dynamic Radius Calculation**: Screen width-dependent spacing
   ```tsx
   // Radius changes based on screen size
   let radius;
   if (window.innerWidth < 640) { 
     radius = 280; // Small mobile
   } else if (window.innerWidth < 768) {
     radius = 350; // Mobile
   } // etc.
   ```

3. **Terminal Size Constraints**: Max-width limits for different screen sizes
   ```tsx
   <div className="max-w-[85%] sm:max-w-[70%] md:max-w-[500px]">
   ```

4. **Font Size Adjustments**: Typography adjustments via media queries
   ```css
   @media (max-width: 768px) {
     .terminal-question {
       font-size: 0.8rem;
     }
   }
   ```

## Animation Effects

The site includes several animations:
- Blinking cursor animation simulating a terminal prompt
- Fade-in animation for answers appearing in the terminal
- Subtle hover effects on terminal questions
- Transform effects when questions are interacted with

## Future Enhancements

Potential improvements for future versions:
1. Add typing animation for terminal responses
2. Implement terminal command history
3. Add more interactive terminal commands
4. Create animated transitions between questions
5. Implement keyboard navigation for accessibility