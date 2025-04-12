'use client';

import { Terminal, TerminalQuestion } from '@/components/ui/Terminal';
import { useEffect, useState, useRef } from 'react';

// Hook to detect if we're on mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

const QUESTIONS = [
  {
    id: 'what-is-this',
    question: 'What is this?',
    answer: `AI Whisperers is a community of curious builders, thinkers, tinkerers, and founders exploring the edge of human-machine interaction. We host conversations, design experiments, and build tools that help people better understand and collaborate with AI — and each other.`
  },
  {
    id: 'what-do-you-do',
    question: 'What kind of stuff do you do?',
    answer: `We host meetups and salons about technical intuition, prompt engineering, and agent workflows.

We build prototypes, like voice agents, treasure hunts, or language learning challenges using AI.

We create spaces — online and offline — where it's safe to explore "dumb questions" and hard-to-articulate insights.

We often say: "We help people learn how to talk to strangers — and machines."`
  },
  {
    id: 'whats-the-vibe',
    question: "What's the vibe?",
    answer: `Terminal aesthetic meets curiosity lab.

Half hacker space, half philosophical dojo.

We value intuition, skepticism, and a willingness to experiment.

Everyone here is still learning. If you feel like you don't "know enough," you're already one of us.`
  },
  {
    id: 'how-to-join',
    question: 'How do I join?',
    answer: `ask the person who sent you this website how to get involved`
  },
  {
    id: 'whos-behind',
    question: "Who's behind this?",
    answer: `AI Whisperers was started by Stewart Alsop, host of the Crazy Wisdom podcast, along with a growing group of AI practitioners, developers, and explorers around the world. It's a decentralized network of people who believe in building with integrity, skepticism, and curiosity.`
  },
  {
    id: 'what-makes-different',
    question: "What makes it different?",
    answer: `Not a hypefest. We care more about asking good questions than showing off flashy demos.

Not just for devs. You don't need to be a 10x engineer. You just need to be curious and willing to learn.

Not just theory. We're builders. We try things. We break things. We reflect and iterate.`
  },
  {
    id: 'what-done-so-far',
    question: "What have you done so far?",
    answer: `Hosted meetups in Argentina, Brazil, and online

Built real-world treasure hunts that teach people how to interact with AI in public

Ran sessions on hallucinations, JSON outputs, and agent UX

Started building an LLM-powered FAQ trained on everything we say and share`
  },
  {
    id: 'whats-the-goal',
    question: "What's the goal?",
    answer: `To make critical thinking and human connection the default when building with AI.

We're not trying to create a product.
We're trying to create a culture.`
  }
];

export default function Home() {
  const [randomPositions, setRandomPositions] = useState<{[key: string]: {top: string, left: string, rotate: string}}>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  
  // Function to scroll to terminal
  const scrollToTerminal = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  };
  
  const handleMobileQuestionClick = (id: string) => {
    setActiveQuestionId(id);
    // Dispatch the event to the terminal component
    window.dispatchEvent(
      new CustomEvent('question-click', { detail: { questionId: id } })
    );
    // Scroll to terminal
    scrollToTerminal();
  };
  
  useEffect(() => {
    // Generate positions for questions in a circular pattern around the terminal
    // Only needed for desktop view
    if (!isMobile) {
      const positions: {[key: string]: {top: string, left: string, rotate: string}} = {};
      
      // Responsive radius based on screen size - using much larger values to prevent overlap
      let radius;
      if (window.innerWidth < 640) { // Small mobile
        radius = 280;
      } else if (window.innerWidth < 768) { // Mobile
        radius = 350;
      } else if (window.innerWidth < 1024) { // Tablet
        radius = 420; 
      } else { // Desktop
        radius = 550;
      }
      
      QUESTIONS.forEach((q, i) => {
        // Split questions to top and bottom sections to avoid overlapping with terminal
        const isTopSection = i < QUESTIONS.length / 2;
        
        // Base angle calculation
        let angle;
        if (isTopSection) {
          // Top half - spread from -45 to -135 degrees (converted to radians)
          angle = (-45 - (i / (QUESTIONS.length / 2)) * 90) * (Math.PI / 180);
        } else {
          // Bottom half - spread from 45 to 135 degrees (converted to radians)
          const bottomIndex = i - Math.floor(QUESTIONS.length / 2);
          angle = (45 + (bottomIndex / (QUESTIONS.length - Math.floor(QUESTIONS.length / 2))) * 90) * (Math.PI / 180);
        }
        
        const baseX = Math.sin(angle) * radius;
        const baseY = Math.cos(angle) * radius;
        
        // Add minimal randomness to avoid overlapping the terminal
        const randomOffsetX = (Math.random() - 0.5) * 30;
        const randomOffsetY = (Math.random() - 0.5) * 30;
        const rotate = (Math.random() * 4 - 2).toFixed(1); // -2 to 2 degrees
        
        positions[q.id] = {
          top: `calc(50% + ${baseY + randomOffsetY}px)`,
          left: `calc(50% + ${baseX + randomOffsetX}px)`,
          rotate: `${rotate}deg`,
        };
      });
      
      setRandomPositions(positions);
      
      // Update positions on window resize
      const handleResize = () => {
        // Recalculate positions when the window is resized
        let newRadius;
        if (window.innerWidth < 640) {
          newRadius = 280;
        } else if (window.innerWidth < 768) {
          newRadius = 350;
        } else if (window.innerWidth < 1024) {
          newRadius = 420;
        } else {
          newRadius = 550;
        }
        
        const newPositions = {...positions};
        QUESTIONS.forEach((q, i) => {
          // Split questions to top and bottom sections to avoid overlapping with terminal
          const isTopSection = i < QUESTIONS.length / 2;
          
          // Base angle calculation
          let angle;
          if (isTopSection) {
            // Top half - spread from -45 to -135 degrees (converted to radians)
            angle = (-45 - (i / (QUESTIONS.length / 2)) * 90) * (Math.PI / 180);
          } else {
            // Bottom half - spread from 45 to 135 degrees (converted to radians)
            const bottomIndex = i - Math.floor(QUESTIONS.length / 2);
            angle = (45 + (bottomIndex / (QUESTIONS.length - Math.floor(QUESTIONS.length / 2))) * 90) * (Math.PI / 180);
          }
          
          const baseX = Math.sin(angle) * newRadius;
          const baseY = Math.cos(angle) * newRadius;
          
          newPositions[q.id] = {
            top: `calc(50% + ${baseY}px)`,
            left: `calc(50% + ${baseX}px)`,
            rotate: positions[q.id]?.rotate || '0deg',
          };
        });
        
        setRandomPositions(newPositions);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMobile]);

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-start py-10 min-h-screen">
        <div className="text-center space-y-3 mb-8 z-10 px-4">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-terminal-green">🧠 </span>
            AI WHISPERERS
          </h1>
          <p className="text-lg max-w-xl mx-auto opacity-90">
            Helping humans talk to machines — and each other
          </p>
        </div>

        {/* Mobile: Questions List */}
        <div className="w-full px-4 mb-10">
          <div className="terminal-box p-3 mb-4">
            <p className="text-sm text-terminal-gray mb-2">$ ls questions/</p>
            <div className="space-y-2">
              {QUESTIONS.map((q) => (
                <div 
                  key={q.id}
                  className={`px-3 py-2 rounded border border-terminal-green border-opacity-40 cursor-pointer transition-colors duration-200 
                             ${activeQuestionId === q.id ? 'bg-terminal-green bg-opacity-20' : 'bg-black bg-opacity-40'}`}
                  onClick={() => handleMobileQuestionClick(q.id)}
                >
                  <div className="font-mono text-sm">
                    <span className="text-terminal-green opacity-80 mr-1">$</span>
                    {q.question}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile: Terminal */}
        <div ref={terminalRef} className="w-full px-4 pb-20">
          <Terminal 
            initialPrompt="$ ask_ai_whisperers --about"
            questions={QUESTIONS}
          />
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[90vh] relative overflow-hidden">
      <div className="text-center space-y-5 mb-16 z-10">
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-terminal-green">🧠 </span>
          AI WHISPERERS
        </h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Helping humans talk to machines — and each other
        </p>
      </div>

      <div className="w-full relative h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px]" ref={containerRef}>
        <div ref={terminalRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-[85%] sm:max-w-[70%] md:max-w-[500px]">
          <Terminal 
            initialPrompt="$ ask_ai_whisperers --about" 
            questions={QUESTIONS} 
          />
        </div>
        
        {/* Questions scattered around - desktop only */}
        <div className="absolute inset-0 pointer-events-none w-full h-full">
          {QUESTIONS.map((q, i) => (
            <div 
              key={q.id}
              className="absolute transform transition-all duration-300 ease-in-out"
              style={{
                top: randomPositions[q.id]?.top || '50%',
                left: randomPositions[q.id]?.left || '50%',
                transform: `translate(-50%, -50%) rotate(${randomPositions[q.id]?.rotate || '0deg'})`,
                pointerEvents: 'auto',
                maxWidth: '200px'
              }}
            >
              <TerminalQuestion 
                id={q.id}
                question={q.question}
                onClick={() => {}} // No-op, event handling is done in Terminal component
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}