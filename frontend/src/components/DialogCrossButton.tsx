import cx from "classnames";
import DialogCross from "assets/dialog-cross.svg";

export function DialogCrossButton({
  className,
  ...props
}: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type='button'
      className={cx(
        "absolute right-0 top-0 rounded-full bg-[#888888]/40 p-1 hover:bg-blue-high/10",
        className
      )}
    >
      <img src={DialogCross} />
    </button>
  );
}
