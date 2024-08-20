import {useNavigate,} from "react-router-dom";
import {useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import NpmGitOptionInput from "./NpmGitOptionInput.tsx";

type  Props = {
    type: string
    dir: string
}

const CreateViteForm = (props: Props) => {
    const navigate = useNavigate();

    // 项目目录
    // const [dir, setDir] = useState('');
    // 项目名称
    const [project_name, setProject_name] = useState('vite-project')
    // 前端框架
    const [framework_type, setFramework_type] = useState('react')
    // 是否使用ts
    const [variant_type, setVariant_type] = useState('ts')
    // 使用什么包管理工具
    const [npmType, setNpmType] = useState('pnpm')
    // 是否初始化git
    const [git, setGit] = useState('')

    // 创建中
    const [creating, setCreating] = useState(false);

    // 提交创建
    async function submit() {
        setCreating(true)
        // let res = await invoke('create_vite', {
        //     framework_type, variant_type, project_name, dir: searchParams.get('dir')
        // })
        let res = await invoke('create_vite', {
            frameworkType: framework_type,
            variantType: variant_type,
            projectName: project_name,
            dir: props.dir,
            npmType,
            git
        })
        console.log(res)
        if (res === '创建成功') {
            setCreating(false)
            navigate('/')
        }
    }

    return (
        <>
            {
                !creating && <div className={'create-form-page-container'}>
                    <h2>创建{props.type}项目</h2>

                    <label htmlFor="dir">目录</label>
                    <div>{props.dir}</div>
                    {/*<input type={'text'} value={dir}*/}
                    {/*       onChange={e => setDir(e.target.value)}*/}
                    {/*/>*/}

                    <label htmlFor="project_name">项目名称</label>
                    <input
                        value={project_name}
                        onChange={e => setProject_name(e.target.value)}
                        id="project_name" type="text"
                    />

                    <label htmlFor="framework">选择框架</label>
                    {/*<input id="framework" type="text"/>*/}
                    <div className={'create-image-container'} id={'framework'}>
                        <img
                            onClick={() => setFramework_type("react")}
                            className={`${framework_type === 'react' ? 'active' : ''} `}
                            src="/react.svg" alt=""/>
                        <img
                            onClick={() => setFramework_type("vue")}
                            className={`${framework_type === 'vue' ? 'active' : ''} `}
                            src="/vue.svg" alt=""/>
                    </div>

                    <label htmlFor="variant">是否使用ts</label>
                    {/*<input id="framework" type="text"/>*/}
                    <div id={'variant'} className={'create-image-container'}>
                        <img
                            onClick={() => setVariant_type("ts")}
                            className={`${variant_type === 'ts' ? 'active' : ''} `}
                            src="/typescript.svg" alt=""/>
                        <img
                            onClick={() => setVariant_type("js")}
                            className={`${variant_type === 'js' ? 'active' : ''} `}
                            src="/javascript.svg" alt=""/>
                    </div>

                    <NpmGitOptionInput
                        npmType={npmType} setNpmType={setNpmType} git={git} setGit={setGit}/>

                    <button
                        disabled={creating}
                        onClick={async () => {
                            await submit()
                        }}
                        className={'btn-create-submit'}>创建
                    </button>
                </div>
            }
            {creating && <div>creating...</div>}
        </>
    );
};

export default CreateViteForm;