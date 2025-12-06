import Link from 'next/link';
import { Upload, Zap, Shield, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">EmailEnrich</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link 
              href="/dashboard" 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find & Verify Emails
            <br />
            <span className="gradient-text">At Scale</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The most affordable email enrichment tool. Upload your CSV or scrape from Sales Navigator.
            Get verified emails in minutes.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium glow-green"
            >
              Start Enriching
            </Link>
            <Link 
              href="/demo" 
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-lg font-medium"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-8 card-hover">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart CSV Upload</h3>
            <p className="text-muted-foreground">
              Automatic column detection. Just drag & drop your CSV and we'll handle the rest.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 card-hover">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Most Affordable</h3>
            <p className="text-muted-foreground">
              Best pricing in the market. Pay only for verified emails, not failed attempts.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 card-hover">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Verification</h3>
            <p className="text-muted-foreground">
              Instant email verification. Catch-all detection coming soon.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 card-hover">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy & Scalable</h3>
            <p className="text-muted-foreground">
              Simple CSV upload or REST API. Scale from 100 to 100,000+ leads effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">87M+</div>
            <div className="text-muted-foreground">Emails Processed</div>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">~55%</div>
            <div className="text-muted-foreground">Average Hit Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">&lt;5min</div>
            <div className="text-muted-foreground">Average Processing</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center bg-card border border-border rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to enrich your leads?</h2>
          <p className="text-muted-foreground mb-8">
            Most affordable email enrichment. Enrich your CSV or scrape Sales Navigator.
          </p>
          <Link 
            href="/dashboard" 
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium glow-green"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground text-sm">
              © 2024 EmailEnrich. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
