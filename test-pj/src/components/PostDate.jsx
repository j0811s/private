import { NewLabel } from './NewTag';

export const PostDate = (props) => {
  return (
    <>
      <NewLabel date={props.date}></NewLabel>
      <div>{props.date}</div>
    </>
  )
}