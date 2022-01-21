import { useState, useEffect } from 'react'
import { Title } from './components/Title';
import { PostDate } from './components/PostDate';
import { PublishBtn } from './components/PublishBtn';
import './App.css'

const Article = (props) => {
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    setIsPublished(prevState => !prevState);
  }

  /** 毎回 */
  // useEffect(() => {
  //   console.log(`current: ${isPublished}`);
  // });

  /** 初回のみ */
  // useEffect(() => {
  //   console.log(`current: ${isPublished}`);
  // }, []);

  /** deepsにisPublishedを指定 */
  useEffect(() => {
    console.log(`isPublished: ${isPublished}`);

    // クリーンアップ関数は、'再'レンダリングより前に呼ばれる
    return () => {
      console.log('Cleanup')
    }
  }, [isPublished]);

  return (
    <article className="article">
      <a href={props.href}>
        <Title title={props.title}></Title>
        <PostDate date={props.date}></PostDate>
      </a>
      <PublishBtn isPublished={isPublished} onClick={handlePublish}></PublishBtn>
    </article>
  )
}

export default Article