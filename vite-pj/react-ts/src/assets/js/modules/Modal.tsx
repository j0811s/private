import { useEffect, useCallback, useState }  from 'react';
import '@css/modules/modal.scss';

const ModalContent = (props) => {
  return(
    <div className='util-modal'>
      <div className='util-modal_overlay' />
      <div className="util-modal_containar" onClick={(event) => {event.stopPropagation()}}>
        <div className='util-modal_inner'>
          <div className='util-modal_content'>
            {props.content}
            <button onClick={props.onClick} type='button'>閉じる</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Modal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const open = (event) => {
    setIsModalOpen(true);
    document.addEventListener('click', close);
    event.stopPropagation();
  }

  const close = useCallback(() =>{
    setIsModalOpen(false);
    document.removeEventListener('click', close);
  }, [])

  useEffect(()=>{
    return ()=>{
      document.removeEventListener('click', close);
    }
  }, [close])

  return (
    <>
      <button onClick={(event) => open(event)}>{props.buttonText ? props.buttonText : '詳細を見る'}</button>
      {
        isModalOpen ? <ModalContent onClick={() => { {close()} }} content={props.content} /> : ''
      }
    </>
  );
}

export default Modal;