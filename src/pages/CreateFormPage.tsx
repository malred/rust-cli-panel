// @ts-ignore
import {useNavigate, useParams, useRoutes, useSearchParams} from "react-router-dom";
import CreateViteForm from "../components/CreateViteForm.tsx";

const CreateFormPage = () => {
    const params = useParams();
    // console.log(params)
// @ts-ignore
    let [searchParams, _] = useSearchParams();
    // console.log(searchParams)
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
        </>
    );
};

export default CreateFormPage;