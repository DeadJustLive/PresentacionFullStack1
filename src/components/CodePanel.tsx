import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodePanelProps {
  code: string;
  language?: string;
  title?: string;
  maxHeight?: string;
}

const CodePanel: React.FC<CodePanelProps> = ({ 
  code, 
  language = 'java', 
  title = 'ejemplo.java',
  maxHeight = '400px'
}) => {
  return (
    <div className="rounded-lg sm:rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col w-full" style={{ maxHeight }}>
      {/* Mac-like Header */}
      <div className="bg-[#2d2d2d] px-3 sm:px-4 py-2 flex items-center border-b border-[#404040]">
        <div className="flex gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 text-center text-[#858585] text-[10px] sm:text-xs font-mono font-medium">
          {title}
        </div>
      </div>
      
      {/* Code Body */}
      <div className="flex-1 overflow-auto p-2 sm:p-3 bg-[#1e1e1e] code-scroll">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            background: 'transparent',
            padding: 0,
            margin: 0,
            fontSize: '0.75rem',
            lineHeight: '1.5'
          }}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodePanel;