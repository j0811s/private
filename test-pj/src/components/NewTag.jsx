export const NewLabel = (props) => {
  const nowDate = new Date().getTime();
  const postDate = new Date(props.date).getTime();

  const seventh = 604800000;
  const diffDate = postDate - nowDate;
  const isNewPost = seventh > Math.abs(diffDate);

  if (isNewPost) {
    return <div className="tag">New</div>
  } else {
    return null
  }
}