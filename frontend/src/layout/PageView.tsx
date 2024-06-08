import React from "react";
import { useOutletContext } from "react-router-dom";

type PageViewProps = React.PropsWithChildren & {
  title?: React.ReactNode;
  actions?: React.ReactNode;
};
export function PageView({ title, actions, children }: PageViewProps) {
  const ctx = useOutletContext() as any;

  React.useEffect(() => {
    ctx.setTitle(title);
  }, [title]);

  React.useEffect(() => {
    ctx.setActions(actions);
  }, [actions]);

  return children;
}
