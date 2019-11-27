import React, { useState } from "react";

const MyButton = props => {
  const [isHover, setIsHover] = useState(false);
  const _handleHover = () => {
    setIsHover(!isHover);
  };

  const {
    text,
    height,
    width,
    onClick,
    style,
    className,
    fontSize,
    type,
    Icon,
    bold
  } = props;
  const defaultStyle = {
    // background: isHover ? Colors.textwhite : Colors.textGold,
    height: `${height === undefined ? "100%" : height}`,
    width:  `${width === undefined ? "100%" : width}`,
    // color: isHover ? Colors.textGold : Colors.textwhite,
    boxShadow: "none",
    outline:'none',
    fontSize: `${undefined?'15rem':fontSize}`,
    type: `${type === undefined ? "submit" : `${type}`}`,
    // border: `2px solid ${Colors.textGold}`,
    fontWeight: `${bold === undefined ? "normal" : "bold"}`,
    padding: 10
  };
  const userStyle = style === undefined ? {} : style;
  return (
    <div>
      <button
        className={` border ${className}}`}
        style={{ ...defaultStyle, ...userStyle,fontSize:'1.8rem' }}
        onClick={onClick}
        onMouseOver={_handleHover}
        onMouseLeave={_handleHover}
      >
        {text}
        <div className="float-right">
          {Icon === undefined ? null : (
            <span>
              <i className={`${Icon}`} />
            </span>
          )}
        </div>
      </button>
    </div>
  );
};
export default MyButton;
