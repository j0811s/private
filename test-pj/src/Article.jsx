import { useState } from 'react'
import { Title } from './components/Title';
import { Date } from './components/Date';
import { PublishBtn } from './components/PublishBtn';
import './App.css'

const Article = (props) => {
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = (publishStatus) => {
    setIsPublished(!publishStatus);
  }

  return (
    <article className="article">
      <a href={props.href}>
        <Title title={props.title}></Title>
        <Date date={props.date}></Date>
      </a>
      <PublishBtn isPublished={isPublished} onClick={handlePublish}></PublishBtn>
    </article>
  )
}

export default Article