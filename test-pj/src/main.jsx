import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Article from './Article';
import { FetchGitHubUserData } from './components/FetchGitHubUserData';


const ArticleData = [
  {
    href: "/1/",
    title: "見出し1",
    date: "2021/12/29"
  },
  {
    href: "/2/",
    title: "見出し2",
    date: "2022/01/20"
  },
  {
    href: "/3/",
    title: "見出し3",
    date: "2022/01/21"
  }
]


ReactDOM.render(
  <React.StrictMode>
    <FetchGitHubUserData id='google' />
    {
      ArticleData.map((post, i) => {
        return <Article href={post.href} title={post.title} date={post.date} key={i} />
      })
    }
  </React.StrictMode>,
  document.getElementById('root')
)
