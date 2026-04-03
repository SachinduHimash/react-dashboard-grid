import React from "react";

interface Props {
  component: React.ComponentType<any>;
  props?: Record<string, unknown>;
}

export const CustomCard: React.FC<Props> = ({
  component: Component,
  props,
}) => (
  <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
    <Component {...(props ?? {})} />
  </div>
);
