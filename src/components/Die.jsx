import "../App.css";
export default function Die(props) {
  const limeGreen = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffffff",
  };
  return (
    <div className="box" style={limeGreen} onClick={props.onClick}>
      <h2 className="die-value">{props.value}</h2>
    </div>
  );
}
