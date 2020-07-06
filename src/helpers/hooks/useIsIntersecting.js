import { useEffect, useState } from 'react';

export default (divRef, options = {}) => {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.disconnect();
            setIntersecting(entry.isIntersecting);
          }
        }),
      { rootMargin: '200px', ...options },
    );
    observer.observe(divRef.current);
  }, []);

  return intersecting;
};
