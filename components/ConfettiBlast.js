let confettiPromise;

// Lazy-load canvas-confetti so it only runs in the browser.
async function getConfetti() {
  if (typeof window === "undefined") return null;
  if (!confettiPromise) {
    confettiPromise = import("canvas-confetti");
  }
  const mod = await confettiPromise;
  return mod?.default ?? mod;
}

export async function fireConfetti() {
  const confetti = await getConfetti();
  if (!confetti) return;

  confetti({
    particleCount: 200,
    spread: 70,
    startVelocity: 40,
    origin: { y: 0.6 },
    scalar: 1.1,
  });
}
