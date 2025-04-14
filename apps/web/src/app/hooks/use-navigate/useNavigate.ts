import { useNavigate as useReactRouterNavigate } from 'react-router-dom';

export const useNavigate = () => {
    const navigate = useReactRouterNavigate();

    return navigate;
};
