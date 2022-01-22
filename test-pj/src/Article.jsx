import { useState, useEffect, useCallback } from 'react'
import { Title } from './components/Title';
import { PostDate } from './components/PostDate';
import { PublishBtn } from './components/PublishBtn';

const Article = (props) => {
  const [isPublished, setIsPublished] = useState(false);

  // 子コンポーネントにコールバック関数を渡すならuseCallback経由で
  const handlePublish = useCallback(() => {
    setIsPublished(prevState => !prevState);
  }, [setIsPublished]);

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