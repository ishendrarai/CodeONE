import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, Database, Check, Clock, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { SUGGESTED_PROMPTS, CANNED_RESPONSES } from '../data/mockCoach';
import { DEMO_USER } from '../data/mockUser';

export default function Coach() {
  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'coach',
      text: `Hello ${DEMO_USER.name}! I am your CodeONE Consistency Coach. I analyze your 480+ verified submissions across Codeforces and AtCoder to diagnose topics, breakdown contest rating deltas, and propose daily problem sets.\n\nSelect a prompt below or ask me a training question.`,
      dataUsed: null,
    },
  ]);
  const [activeDataUsed, setActiveDataUsed] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSelectPrompt = (promptItem) => {
    if (isTyping) return;

    // Add user message
    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: promptItem.label,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const targetResponse = CANNED_RESPONSES[promptItem.id] || CANNED_RESPONSES.solve_today;

    // Simulate streaming typing effect
    setTimeout(() => {
      const coachMsg = {
        id: `coach_${Date.now()}`,
        sender: 'coach',
        text: targetResponse.message,
        dataUsed: targetResponse.dataUsed,
      };
      setMessages((prev) => [...prev, coachMsg]);
      setActiveDataUsed(targetResponse.dataUsed);
      setIsTyping(false);
    }, 700);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Fall back to solve_today response for arbitrary text
    setTimeout(() => {
      const coachMsg = {
        id: `coach_${Date.now()}`,
        sender: 'coach',
        text: CANNED_RESPONSES.solve_today.message,
        dataUsed: CANNED_RESPONSES.solve_today.dataUsed,
      };
      setMessages((prev) => [...prev, coachMsg]);
      setActiveDataUsed(CANNED_RESPONSES.solve_today.dataUsed);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-ink">AI Consistency Coach</h1>
            <Badge variant="accent" size="xs">
              Major Project Demo
            </Badge>
          </div>
          <p className="text-xs text-ink-secondary mt-0.5">
            Scripted demonstration of automated CP performance intelligence and weakness remediation.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="text-[11px] font-mono text-ink-muted bg-white border border-app-border px-3 py-1.5 rounded-lg">
          Telemetry ground truth: <span className="font-bold text-ink">Codeforces + AtCoder</span>
        </div>
      </div>

      {/* Suggested Prompts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SUGGESTED_PROMPTS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectPrompt(p)}
            disabled={isTyping}
            className="text-left p-3 rounded-xl border border-app-border bg-white hover:border-app-border-strong hover:bg-app-hover transition-all space-y-1 group disabled:opacity-50"
          >
            <p className="text-xs font-semibold text-ink group-hover:text-accent flex items-center justify-between">
              <span>{p.label}</span>
              <span className="text-[10px] text-ink-muted font-mono">↗</span>
            </p>
            <p className="text-[10px] text-ink-secondary line-clamp-2 leading-relaxed">
              {p.summary}
            </p>
          </button>
        ))}
      </div>

      {/* Main Chat + Data Citation Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Chat Window (2 cols) */}
        <Card className="lg:col-span-2 p-0 flex flex-col h-[560px] bg-white overflow-hidden">
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((m) => {
              const isCoach = m.sender === 'coach';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${isCoach ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isCoach ? 'bg-ink text-white' : 'bg-accent text-white'
                    }`}
                  >
                    {isCoach ? <Bot size={15} /> : <span className="font-mono text-xs font-bold">KS</span>}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                      isCoach
                        ? 'bg-app-bg border border-app-border text-ink'
                        : 'bg-ink text-white font-medium'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans">{m.text}</div>
                    {m.dataUsed && (
                      <button
                        onClick={() => setActiveDataUsed(m.dataUsed)}
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-accent hover:underline pt-1"
                      >
                        <Database size={11} />
                        <span>View {m.dataUsed.length} cited telemetry parameters</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-ink text-white flex items-center justify-center shrink-0">
                  <Bot size={15} />
                </div>
                <div className="bg-app-bg border border-app-border rounded-2xl p-3 flex items-center gap-1.5 text-ink-muted text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  <span>Coach is analyzing submission telemetry...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleCustomSubmit} className="p-3 border-t border-app-border bg-white flex items-center gap-2">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about your contest history, rating drops, or weak topics..."
              className="flex-1 text-xs text-ink placeholder:text-ink-muted bg-app-bg border border-app-border rounded-xl px-4 h-10 focus:outline-none focus:border-accent"
            />
            <Button type="submit" variant="primary" size="md" disabled={isTyping || !inputText.trim()}>
              <Send size={14} />
            </Button>
          </form>
        </Card>

        {/* Right Data Citation Panel (1 col) */}
        <Card className="p-5 bg-white space-y-4">
          <div className="flex items-center justify-between border-b border-app-border pb-3">
            <div className="flex items-center gap-2">
              <Database size={15} className="text-accent" />
              <h2 className="text-xs font-bold text-ink">Grounded User Telemetry</h2>
            </div>
            <span className="text-[10px] font-mono text-verdict-ac font-semibold">Zero Hallucinations</span>
          </div>

          <p className="text-[11px] text-ink-secondary leading-relaxed">
            Every recommendation is calculated from your actual verified performance logs, never synthetic guesses.
          </p>

          <div className="space-y-2 pt-1">
            {activeDataUsed ? (
              activeDataUsed.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-app-bg border border-app-border text-xs font-mono">
                  <p className="text-[10px] text-ink-muted uppercase">{item.metric}</p>
                  <p className="font-bold text-ink mt-0.5">{item.value}</p>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs font-mono text-ink-muted bg-app-bg border border-app-border rounded-xl">
                Select a suggested prompt on the left to inspect the telemetry metrics used.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
