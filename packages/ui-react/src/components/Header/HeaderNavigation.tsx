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
  
  // 👇 Combine passed navItems with hardcoded customLinks
  const extendedNavItems = [...navItems, ...customLinks];
  return (
    <nav className={classNames(styles.nav, className)} ref={navRef}>
      <ul onFocus={focusHandler}>
       {extendedNavItems.map((item, index) => (
          <li key={index}>
            {item.external ? (
              <a
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                 activeClassname={styles.navButton}
              >
                {item.label}
              </a>
            ) : (
              <Button
                activeClassname={styles.navButton}
                label={item.label}
                to={item.to}
                variant="text"
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
