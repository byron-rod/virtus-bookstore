const Message = ({ type, children }) => {
  const baseStyle =
    "p-4 mb-4 text-sm rounded-lg justify-center flex items-center";
  let typeStyle = "";

  switch (type) {
    case "success":
      typeStyle = "bg-green-100 text-green-700";
      break;
    case "danger":
      typeStyle = "bg-red-100 text-red-700";
      break;
    case "warning":
      typeStyle = "bg-yellow-100 text-yellow-700";
      break;
    case "info":
      typeStyle = "bg-blue-100 text-blue-700";
      break;
    default:
      typeStyle = "bg-gray-100 text-gray-700";
  }

  return <div className={`${baseStyle} ${typeStyle}`}>{children}</div>;
};

export default Message;
