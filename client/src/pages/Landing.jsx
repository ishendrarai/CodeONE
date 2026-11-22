import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Hero from '../components/landing/Hero';
import PlatformMarquee from '../components/landing/PlatformMarquee';
import FeatureGrid from '../components/landing/FeatureGrid';
import HowItWorks from '../components/landing/HowItWorks';
import Showcase from '../components/landing/Showcase';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-app-bg text-ink relative">
      {/* Sticky Minimal Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 border-b border-app-border">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center text-white">
              <Code2 size={15} />
            </div>
            <span className="font-bold text-sm tracking-tight text-ink">CodeONE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-ink-secondary">
            <a href="#features" className="hover:text-ink transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-ink transition-colors">
              How It Works
            </a>
            <a href="#platforms" className="hover:text-ink transition-colors">
              Platforms
            </a>
            <a href="#faq" className="hover:text-ink transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight size={13} />}>
                Launch Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Platform Marquee */}
      <div id="platforms">
        <PlatformMarquee />
      </div>

      {/* Feature Grid */}
      <div id="features">
        <FeatureGrid />
      </div>

      {/* How it Works */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* In-depth Showcases */}
      <Showcase />

      {/* FAQ Accordion */}
      <div id="faq">
        <FAQ />
      </div>

      {/* Final Call to Action */}
      <section className="py-20 px-6 bg-white border-t border-app-border text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="mono-label">Major Project Presentation Ready</span>
          <h2 className="text-3xl font-bold tracking-tight text-ink">
            Consolidate your competitive programming journey today.
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Experience the complete frontend demo with live 365-day heatmaps, contest schedules, and an AI coach.
          </p>
          <div className="pt-2">
            <Link to="/dashboard">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight size={16} />}>
                Launch Full App Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
