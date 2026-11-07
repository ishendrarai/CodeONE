export default function Footer() {
  return (
    <footer className="h-10 border-t border-border flex items-center px-6 shrink-0">
      <p className="text-xs text-text-muted">
        © {new Date().getFullYear()} CodeONE · Built for competitive programmers
      </p>
    </footer>
  );
}
