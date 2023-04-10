import { useParams, useNavigate } from "react-router-dom";

export const withParams = (WrappedComponent) => (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <WrappedComponent {...props} params={params} navigate={navigate} />;
};
