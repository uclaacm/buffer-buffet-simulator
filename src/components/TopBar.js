import React, {useState} from 'react';
import './TopBar.css';
import Modal from './Modal';
import Info from '../assets/info.svg';
import {Link} from 'react-router-dom';

const TopBar = () => {
  // toggle modal
  const [showModal, setModal] = useState(false);
  return (
    <div className='topbar-view'>
      {showModal && <Modal setModal={setModal}></Modal>}
      <div className='topbar-container'>
        <div className='topbar-heading'>
          <Link to="/">Buffer Buffet Simulator</Link>
        </div>

        <div className='topbar-btn'>
          <a href="http://bufferbuffet.uclaacm.com/">Course 1</a>
        </div>

        <div className='topbar-btn'>
          <Link to="/info">Documentation</Link>
        </div>

        <div className='topbar-img-box'>
          <img className='topbar-info-btn' alt = "info" src={Info} onClick ={() => {
            setModal(true);
          }}/>
        </div>
      </div>
    </div>

  );
};

export default TopBar;
