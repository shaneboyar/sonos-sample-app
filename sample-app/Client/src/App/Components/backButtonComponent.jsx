import React from "react";

/** 
 * The BackButton() function is used to navigate backwards the same way a browser back button works
 * This function is passed through props.
 * @param props.navigate Used to navigate to previous page. Result of useNavigate() call
 */
export default function BackButton(props) {
  const goBack = () => {
    props.navigate(-1);
  }

  return (
      <div className="back_button" onClick={goBack} >
          <i className="fa fa-chevron-circle-left fa-3x" ></i>
      </div>
  );
}
