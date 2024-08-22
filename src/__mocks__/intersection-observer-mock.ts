// IntersectionObserver isn't available in test environment
import { vi, beforeEach } from "vitest";

export function mockIntersectionObserver() {
  const observeSpy = vi.fn();
  const unobserveSpy = vi.fn();
  const disconnectSpy = vi.fn();

  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: observeSpy,
      unobserve: unobserveSpy,
      disconnect: disconnectSpy,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  return {
    observeSpy,
    unobserveSpy,
    disconnectSpy,
  };
}
