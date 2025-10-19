import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Menu from '@jwp/ott-theme/assets/icons/menu.svg?react';

import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';

import styles from './Header.module.scss';

type Props = {
  className?: string;
  sideBarOpen: boolean;
  onClick: () => void;
};

const HeaderMenu = ({ className, sideBarOpen, onClick }: Props) => {
  const { t } = useTranslation('menu');
  
// ✅ Configurable hardcoded links
const customLinks = [
  { label: 'Support', url: 'https://example.com/support' },
  { label: 'Donate', url: 'https://example.com/donate' },
  { label: 'About', url: 'https://example.com/about' },
].filter(link => link.url && link.label); // ignores empty entries
  return (
    <div className={classNames(styles.menu, className)}>
      <IconButton className={styles.iconButton} aria-label={t('open_menu')} aria-expanded={sideBarOpen} onClick={onClick}>
        <Icon icon={Menu} />
      </IconButton>
      {/* 👇 Hardcoded custom links */}
      <nav className={styles.customLinks}>
        {customLinks.map(link => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default HeaderMenu;
