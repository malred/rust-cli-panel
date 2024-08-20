// @ts-ignore
import {useNavigate, useParams, useRoutes, useSearchParams} from "react-router-dom";
import CreateViteForm from "../components/CreateViteForm.tsx";
import CreateNextForm from "../components/CreateNextForm.tsx";

const CreateFormPage = () => {
    const params = useParams();
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();

    return (
        <>
            <div
                onClick={() => navigate('/')}
                className={'back-btn'}
            >&lt;-back
            </div>
            {params.type === 'vite' &&
                <CreateViteForm
                    type={params.type}
                    dir={searchParams.get('dir') || ''}
                />
            }
            {params.type === 'next' &&
                <CreateNextForm
                    type={params.type}
                    dir={searchParams.get('dir') || ''}
                />
            }
        </>
    );
};

export default CreateFormPage;