import React, { useRef } from 'react';
import classNames from 'classnames';

import Button from '../Button/Button';

import styles from './Header.module.scss';

type NavItem = {
  label: string;
  to: string;
};

const scrollOffset = 100;

// 👇 Add up to 3 hardcoded links here
const customLinks: NavItem[] = [
  { label: 'Support', to: 'https://example.com/support', external: true },
  { label: 'Donate', to: 'https://example.com/donate', external: true },
  { label: 'About', to: 'https://example.com/about', external: true },
];
const HeaderNavigation = ({ className, navItems }: { className?: string; navItems: NavItem[] }) => {
  const navRef = useRef<HTMLElement>(null);

  const focusHandler = (event: React.FocusEvent) => {
    if (!navRef.current) return;

    const navRect = navRef.current.getBoundingClientRect();
    const targetRect = (event.target as HTMLElement).getBoundingClientRect();

    // get the element offset position within the navigation scroll container
    const targetScrollTo = targetRect.left + navRef.current.scrollLeft - navRect.left;
    // the first half items will reset the scroll offset to 0
    // all elements after will be scrolled into view with an offset, so that the previous item is still visible
    const scrollTo = targetScrollTo < navRect.width / 2 ? 0 : targetScrollTo - scrollOffset;

    navRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };
  
// Merge default nav items with your custom hardcoded buttons
  const extendedNavItems = [...navItems, ...customLinks];

  // Handler for button clicks
  const handleButtonClick = (url: string, external?: boolean) => {
    if (external) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  };

  return (
    <nav className={classNames(styles.nav, className)} ref={navRef}>
      <ul onFocus={focusHandler}>
       {extendedNavItems.map((item, index) => {
          // ✅ Define isActive *inside* the map before it’s used
          const isActive =
            !item.external &&
            (location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(item.to)));

          return (
            <li key={index}>
              <button
                onClick={() => handleButtonClick(item.to, item.external)}
                className={classNames(
                  '_button_15pe7_1',
                  '_default_15pe7_39',
                  '_text_15pe7_62',
                  { [styles.activeButton]: isActive } // uses boolean safely
                )}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
