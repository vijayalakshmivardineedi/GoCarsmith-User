import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Token = () => {
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBeforeUnload = () => {
    if (!navigator.sendBeacon) {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      localStorage.clear();
    }
  };

  const handleUserActivity = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    // Uncomment the following line if you want to reset the timer on user activity
    // setLogoutTimer(setTimeout(handleLogout, 300000)); // Reset timer for 5 minutes
  };

  const handleLogout = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    localStorage.clear();
    setShowModal(false);
    navigate('/login');
  };

  const handleClose = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    setShowModal(false);
  };

  // useEffect(() => {
  //   const activityEvents = ['mousemove', 'keydown', 'mousedown', 'touchstart'];

  //   const handleUserActivityWrapper = () => {
  //     handleUserActivity();
  //   };

  //   activityEvents.forEach((event) => {
  //     window.addEventListener(event, handleUserActivityWrapper);
  //   });

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   window.addEventListener('unload', handleBeforeUnload);

  //   return () => {
  //     activityEvents.forEach((event) => {
  //       window.removeEventListener(event, handleUserActivityWrapper);
  //     });
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('unload', handleBeforeUnload);

  //     if (logoutTimer) {
  //       clearTimeout(logoutTimer);
  //     }
  //   };
  // }, [logoutTimer]);
  

  return (
    <div>
      {/* Your route component content */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Session expired</p>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Token;