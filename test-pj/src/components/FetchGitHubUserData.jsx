import { useState, useEffect, useRef } from 'react';

export const FetchGitHubUserData = (props) => {
  const [userName, setUserName] = useState('');
  const [id, setId] = useState(props.id);

  const renderFlgRef = useRef(false);

  const handleId = (props) => {
    setId(props.id);
  }

  // useEffect(() => {
  //   // 初回に走らないようにフラグ建て
  //   if (renderFlgRef.current) {
  //     fetch(`https://api.github.com/users/${id}`)
  //       .then(res => {
  //         if (!res.ok) throw Error(`Status_${res.status}`);
  //         return res.json();
  //       })
  //       .then(data => {
  //         console.log(data);
  //         setUserName(data.login ? data.login : '不明');
  //       })
  //       .catch(reject => {
  //         console.error(reject);
  //       })
  //   } else {
  //     renderFlgRef.current = true;
  //   }
  // }, [id]);

  const fetchJson = () => {
    fetch(`https://api.github.com/users/${id}`)
      .then(res => {
        if (!res.ok) throw Error(`Status_${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log(data);
        setUserName(data.login);
      })
      .catch(reject => {
        console.error(reject);
      })
  }

  return (
    <div>
      <p>ユーザー / {userName ? userName : '未取得'}</p>
      <button type='button' onClick={() => fetchJson()}>Fetch</button>
    </div>
  )
}