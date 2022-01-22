import React from 'react'
import ReactDOM from 'react-dom'
import '@css/index.scss'
import Count from '../modules/Count'
import Modal from '../modules/Modal'

ReactDOM.render(
  <Count />,
  document.getElementById('count')
)

const ModalContent = () => {
  return (
    <>
      <p>サンプルテキスト</p>
      <dl>
        <dt>題目</dt>
        <dd>説明</dd>
      </dl>
    </>
  )
}

type Props = {
  content: any,
  handleClick: (event: React.MouseEvent<HTMLInputElement>) => void     // onClick
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void   // onChange
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void      // onSubmit

}
ReactDOM.render(
  <Modal buttonText="モーダルを開く" content={ModalContent()} />,
  document.getElementById('modal')
)
