import React from "react";
export const CustomCard = ({ component: Component, props, }) => (React.createElement("div", { style: { width: "100%", height: "100%", overflow: "auto" } },
    React.createElement(Component, Object.assign({}, (props !== null && props !== void 0 ? props : {})))));
