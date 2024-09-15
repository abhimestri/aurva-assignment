import toast from "react-hot-toast";

interface NotifyProps {
  text: string;
  type?: "success" | "error";
}

const notify = ({ text, type }: NotifyProps) => {
  switch (type) {
    case "success":
      return toast.success(text, { style: { fontSize: "14px" } });
    case "error":
      return toast.error(text, { style: { fontSize: "14px" } });
    default:
      return toast(text);
  }
};

export default notify;
