/*eslint-disable */
import React, {useState} from 'react';
import './TopBar.css';
import Modal from './Modal';
import Info from '../assets/info.svg';


const Toolbar = () => {
  //toggle modal
  const [showModal, setModal] = useState(false);
  return (
    <div className='topbar-container'>
      <div></div>
      <div className='topbar-heading'>Buffer Buffet</div>
      <div></div>
      <img className='topbar-info-btn' alt = "info" src={Info}></img>
    </div>
  );
};

export default Toolbar;
