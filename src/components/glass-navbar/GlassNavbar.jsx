'use client';

import { useEffect, useRef, useState } from 'react';
import './GlassNavbar.css';

const DEFAULT_ITEMS = ['首页', '产品', '文档', '关于'];

/**
 * Floating glass navigation bar. Pinned to the viewport by default and
 * centered; scrolling shrinks it from full width to a compact pill.
 * With `pinned={false}` the bar is sticky inside the nearest scroll
 * container instead (useful inside previews and demos).
 */
const GlassNavbar = ({
  items = DEFAULT_ITEMS,
  brand = 'Solenio',
  defaultActive = 0,
  onItemSelect,
  pinned = true,
  shrink = true,
  compactAt = 40,
  compactWidth = 608,
  glassOpacity = 0.72,
  blurRadius = 14,
  barColor = '#ffffff',
  textColor = '#17181a',
  className = '',
}) => {
  const [active, setActive] = useState(defaultActive);
  const [compact, setCompact] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!shrink) {
      setCompact(false);
      return undefined;
    }
    /* Pinned bars follow the window; embedded bars follow their scroll
       container (the element they are stuck inside). */
    const target = pinned ? window : rootRef.current?.parentElement;
    if (!target) return undefined;
    const onScroll = () => {
      const y = pinned ? window.scrollY : target.scrollTop;
      setCompact(y > compactAt);
    };
    onScroll();
    target.addEventListener('scroll', onScroll, { passive: true });
    return () => target.removeEventListener('scroll', onScroll);
  }, [pinned, shrink, compactAt]);

  const classes = [
    'glass-navbar',
    pinned ? '' : 'glass-navbar--embedded',
    compact ? 'glass-navbar--compact' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav
      ref={rootRef}
      className={classes}
      style={{
        '--gnb-bar': barColor,
        '--gnb-ink': textColor,
        '--gnb-opacity': glassOpacity,
        '--gnb-blur': `${blurRadius}px`,
        '--gnb-compact': `${compactWidth}px`,
      }}
    >
      <a className="glass-navbar__brand" href="#top" onClick={(e) => e.preventDefault()}>
        {brand}
      </a>
      <span className="glass-navbar__spacer" />
      <ul className="glass-navbar__list">
        {items.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              className={`glass-navbar__link${index === active ? ' is-active' : ''}`}
              onClick={() => {
                setActive(index);
                onItemSelect?.(index, label);
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default GlassNavbar;
