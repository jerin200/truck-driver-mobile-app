import { useState, useEffect, useRef, RefObject } from 'react';

export function useScrollDirection(scrollElementRef?: RefObject<HTMLElement>, threshold: number = 10) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const scrollElement = scrollElementRef?.current || window;
    
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = scrollElementRef?.current 
            ? scrollElementRef.current.scrollTop 
            : window.scrollY;
          const scrollDifference = currentScrollY - lastScrollY.current;

          // Show header when at top
          if (currentScrollY < 10) {
            setIsHeaderVisible(true);
          }
          // Scrolling down - hide header
          else if (scrollDifference > threshold && currentScrollY > 80) {
            setIsHeaderVisible(false);
          }
          // Scrolling up - show header
          else if (scrollDifference < -threshold) {
            setIsHeaderVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    if (scrollElementRef?.current) {
      scrollElementRef.current.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollElementRef?.current) {
        scrollElementRef.current.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollElementRef, threshold]);

  return isHeaderVisible;
}
