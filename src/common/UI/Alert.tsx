import { clsx } from "clsx";
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi";

export type AlertProps = {
  children: React.ReactNode;
  type?: "error" | "warning";
};

export function Alert(props: AlertProps) {
  const { children, type = "error" } = props;

  return (
    <div
      className={clsx("flex items-center gap-x-2 rounded-lg px-4 py-2.5", {
        "bg-red-100 text-red-800": type === "error",
        "bg-amber-100 text-amber-800": type === "warning",
      })}
    >
      <div>
        {type === "error" && <FiAlertCircle className={"size-5"} />}
        {type === "warning" && <FiAlertTriangle className={"size-5"} />}
      </div>
      <p className={"text-sm"}>{children}</p>
    </div>
  );
}
