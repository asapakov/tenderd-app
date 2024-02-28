import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import logo from '../assets/logo.svg';

export default function Layout() {
  const testMenuItems = [
    {
      href: '/',
      alt: 'Dashboard',
    },
    {
      href: '/analytics',
      alt: 'Analytics',
    },
    {
      href: '/tracking',
      alt: 'Tracking',
    },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <nav>
          <ul>
            {testMenuItems.map(({ href, alt }) => (
              <div key={href}>
                <NavLink to={href}>
                  <p>{alt}</p>
                </NavLink>
              </div>
            ))}
          </ul>
        </nav>
      </div>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
