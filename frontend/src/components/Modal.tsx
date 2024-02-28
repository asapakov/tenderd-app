import React from 'react';
const Modal = React.memo(({ title, body, button, cb, state }: any) => {
  return (
    <div
      className="modal fade show"
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
      style={{ display: 'block', background: '#00000080' }}
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={state}
            ></button>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={state}
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                cb();
                return state();
              }}
              className="btn btn-primary"
            >
              {button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'ModalComponent';

export default Modal;
