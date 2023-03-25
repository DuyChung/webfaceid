import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";


function App({ renderBody = () => null, isShow = true, onClose = () => { },left='10%',right='10%' }) {
  const customStyles = {
    content: {
      top: "15%",
      left:left,
      right:right
    },
  
  };
  
  return (
    <div style={{zIndex:1000,alignSelf:'center',alignItems:'center',display:'flex'}}>
      <Modal isOpen={isShow} onRequestClose={onClose} style={customStyles}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <FaTimes size={50} onClick={() => onClose()} />
        </div>
        {renderBody()}
      </Modal>
    </div>

  );
}
export default App;
