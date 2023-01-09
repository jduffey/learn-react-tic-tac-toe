export function Square(props) {
    const bgColor = props.highlight ? "lightgreen" : "inherit";
    return (
        <button
            style={{ backgroundColor: bgColor }}
            className='square'
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}