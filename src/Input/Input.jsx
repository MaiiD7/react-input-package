export const Input = (props) => {
  return (
    <>
    {props.select ? <select name="select" id="select"></select> : <input type="text" />}
    </>
  )
}