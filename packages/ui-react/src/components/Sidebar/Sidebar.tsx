import React, { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Close from '@jwp/ott-theme/assets/icons/close.svg?react';

import IconButton from '../IconButton/IconButton';
import Icon from '../Icon/Icon';
import Modal, { type AnimationProps } from '../Modal/Modal';
import Slide from '../Animation/Slide/Slide';
import createInjectableComponent from '../../modules/createInjectableComponent';

import styles from './Sidebar.module.scss';

export const SidebarIdentifier = Symbol(`SIDEBAR`);

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const SlideLeft = ({ children, ...props }: AnimationProps) => (
  <Slide direction="left" {...props}>
    {children}
  </Slide>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  const { t } = useTranslation('menu');

   // 👇 Add up to 3 configurable hardcoded links/buttons
  const customLinks = [
      { label: 'About', to: 'https://pages.ccity.tv/about', external: true },
      { label: 'Sightlines', to: 'https://pages.ccity.tv/sightlinesguide', external: true },
     { label: 'Contact', to: 'https://pages.ccity.tv/contact', external: true },
  ];

  const handleButtonClick = (url: string, external?: boolean) => {
    if (external) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} AnimationComponent={SlideLeft}>
      <div className={styles.sidebar} id="sidebar">
        <div className={styles.heading}>
          <IconButton onClick={onClose} aria-label={t('close_menu')}>
            <Icon icon={Close} />
          </IconButton>
        </div>
        <nav className={styles.group} onClick={onClose}>
          {children}
        </nav>
         {/* 👇 your custom buttons always visible in fly-out */}
        <div className={styles.customLinks}>
          {customLinks.map((item, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(item.to, item.external)}
              className="_menuButton_5vhgl_1"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default createInjectableComponent(SidebarIdentifier, Sidebar);
