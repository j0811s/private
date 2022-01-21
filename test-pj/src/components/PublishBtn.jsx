export const PublishBtn = (props) => {
  return (
    <div className="btnWrap">
      <button className="btn" type="button" onClick={() => props.onClick()}>
        公開ボタン:{props.isPublished.toString()}
      </button>
    </div>
  )
}