import React from "react";

export default function Map(props) {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.7399040776495!2d-6.261147484122739!3d53.34791197997939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!3m2!1sen!2sus!4v1462581622087"
      style={{
        width: "100%",
        height: "100%",
        border: "0",
        marginRight: props.openDrawer ? "30px" : "",
      }}
      title="mapExplorer"
      frameborder="0"
      allowfullscreen
    ></iframe>
  );
}
