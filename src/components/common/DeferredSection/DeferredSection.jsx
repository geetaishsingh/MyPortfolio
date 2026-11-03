import { useEffect, useRef, useState } from 'react';

export default function DeferredSection({ id, load, reserveClass }) {
  const sectionRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [Section, setSection] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!shouldLoad) return undefined;

    let active = true;
    load().then(
      (module) => {
        if (active) setSection(() => module.default);
      },
      (error) => {
        console.error(`Unable to load the ${id} section.`, error);
        if (active) setLoadError(error);
      }
    );

    return () => {
      active = false;
    };
  }, [id, load, shouldLoad]);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target || shouldLoad) return undefined;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setShouldLoad(true);
        }
      },
      { rootMargin: '1000px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`home__section-slot ${!Section && !loadError ? reserveClass : ''}`}
      aria-busy={!Section && !loadError}
    >
      {Section ? (
        <Section sectionId={null} />
      ) : loadError ? (
        <p role="alert">This section could not be loaded. Please reload the page.</p>
      ) : null}
    </div>
  );
}
