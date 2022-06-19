import { Spin } from "antd";

interface LoadingProps {
    loading: boolean;
    size?: "large" | "small" | "default";
}
const Loading  = ({loading,size}:LoadingProps) => {
  return <>{
    loading && <Spin size={size} />
    }</>;
};


Loading.defaultProps = {
    loading : false,
    size : "default"
}

export default Loading;
