import { useLocation } from "react-router-dom";

export function Others() {
  //获得当前的路径
  const pathItems = useLocation().pathname.split('/').filter(item => item);

  return (
    <>
      <h1>Others</h1>
      <p>Current path: {pathItems.join('/')}</p>
    </>
  );
}