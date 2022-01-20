import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Article from './Article';

const ArticleData = [
  {
    href: "/1/",
    title: "見出し1",
    date: "2022/01/19"
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
    {
      ArticleData.map((post, i) => {
        return <Article href={post.href} title={post.title} date={post.date} key={i} />
      })
    }
  </React.StrictMode>,
  document.getElementById('root')
)
