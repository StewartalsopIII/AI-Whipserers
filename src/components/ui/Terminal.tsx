'use client';

import { useEffect, useState } from 'react';

interface TerminalProps {
  initialPrompt?: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
}

export function Terminal({ initialPrompt = "$ ask_ai_whisperers --about", questions }: TerminalProps) {
  const [activeAnswer, setActiveAnswer] = useState<string | null>(null);
  
  // Listen for events from TerminalQuestion components
  useEffect(() => {
    const handleQuestionEvent = (event: CustomEvent) => {
      const { questionId } = event.detail;
      setActiveAnswer(questionId === activeAnswer ? null : questionId);
    };
    
    window.addEventListener('question-click' as any, handleQuestionEvent);
    
    return () => {
      window.removeEventListener('question-click' as any, handleQuestionEvent);
    };
  }, [activeAnswer]);
  
  return (
    <div className="terminal-box w-full mx-auto text-terminal-green">
      <div className="flex items-center mb-3 text-xs text-terminal-gray">
        <span className="mr-2 text-terminal-dimgreen">⬤</span>
        <span className="mr-2 text-terminal-dimgreen opacity-60">⬤</span>
        <span className="mr-2 text-terminal-dimgreen opacity-30">⬤</span>
        <span className="flex-grow text-center">~/ai_whisperers/terminal</span>
      </div>
      
      <div className="mb-6">
        <span className="terminal-prompt text-sm md:text-base">{initialPrompt}</span>
        <span className="terminal-cursor"></span>
      </div>
      
      {activeAnswer && (
        <div className="my-4 p-4 bg-black bg-opacity-70 rounded border-l-2 border-terminal-green animate-in">
          <div className="terminal-prompt mb-3 text-sm opacity-80">
            $ cat {questions.find(q => q.id === activeAnswer)?.question.slice(0, 15).toLowerCase().replace(/\s+/g, '_')}.txt
          </div>
          <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed opacity-90">
            {questions.find(q => q.id === activeAnswer)?.answer}
          </div>
        </div>
      )}
    </div>
  );
}

export function TerminalQuestion({ id, question, onClick }: { id: string; question: string; onClick: () => void }) {
  const handleClick = () => {
    // Both dispatch an event for the Terminal component and call the onClick prop
    window.dispatchEvent(new CustomEvent('question-click', { 
      detail: { questionId: id } 
    }));
    
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <div 
      className="terminal-question cursor-pointer inline-block transform transition-all duration-300 
                 hover:scale-105 hover:text-terminal-white bg-black bg-opacity-50 
                 px-3 py-2 rounded-sm border border-terminal-green border-opacity-40
                 text-sm md:text-base whitespace-nowrap text-center"
      onClick={handleClick}
    >
      <span className="text-terminal-green opacity-90 mr-1">$</span>
      {question}
    </div>
  );
}