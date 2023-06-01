// IntersectionObserver isn't available in test environment

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
