import {useNavigate,} from "react-router-dom";
import {useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import NpmGitOptionInput from "./NpmGitOptionInput.tsx";

type  Props = {
    type: string
    dir: string
}

const CreateNextForm = (props: Props) => {
    const navigate = useNavigate();

    // 项目目录
    // const [dir, setDir] = useState('');
    // 项目名称
    const [projectName, setProjectName] = useState('my-app')
    // 是否使用eslint
    const [eslint, setEslint] = useState('yes')
    // 是否使用ts
    const [ts, setTs] = useState('yes')
    // 是否使用tailwindcss
    const [tailwind, setTailwind] = useState('yes')
    // 是否使用src目录
    const [useSrc, setUseSrc] = useState('no')
    // 是否使用app目录
    const [useApp, setAlias] = useState('yes')
    // 是否使用alias别名
    const [alias, setUseApp] = useState('no')

    // 使用什么包管理工具
    const [npmType, setNpmType] = useState('pnpm')
    // 是否初始化git
    const [git, setGit] = useState('')

    // 创建中
    const [creating, setCreating] = useState(false);

    // 提交创建
    async function submit() {
        setCreating(true)
        console.log('dir: ', props.dir)
        let res = await invoke('create_next', {
            projectName,
            eslint, ts, tailwind,
            useSrc, useApp, alias,
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
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                        id="project_name" type="text"
                    />

                    <label htmlFor="eslint">使用eslint</label>
                    {/*<input id="framework" type="text"/>*/}
                    <div className={'create-image-container'} id={'eslint'}>
                        <img
                            onClick={() => setEslint("yes")}
                            className={`${eslint === 'yes' ? 'active' : ''} `}
                            src="/eslint.svg" alt=""/>
                        <img
                            onClick={() => setEslint("no")}
                            className={`${eslint === 'no' ? 'active' : ''} `}
                            src="/cancel.svg" alt=""/>
                    </div>

                    <label htmlFor="variant">是否使用ts</label>
                    <div id={'variant'} className={'create-image-container'}>
                        <img
                            onClick={() => setTs("yes")}
                            className={`${ts === 'yes' ? 'active' : ''} `}
                            src="/typescript.svg" alt=""/>
                        <img
                            onClick={() => setTs("no")}
                            className={`${ts === 'no' ? 'active' : ''} `}
                            src="/javascript.svg" alt=""/>
                    </div>

                    <label htmlFor="tailwind">是否使用tailwindcss</label>
                    <div id={'tailwind'} className={'create-image-container'}>
                        <img
                            onClick={() => setTailwind("yes")}
                            className={`${tailwind === 'yes' ? 'active' : ''} `}
                            src="/tailwind-svgrepo-com.svg" alt=""/>
                        <img
                            onClick={() => setTailwind("no")}
                            className={`${tailwind === 'no' ? 'active' : ''} `}
                            src="/cancel.svg" alt=""/>
                    </div>

                    <label htmlFor="src">是否使用src</label>
                    <div id={'src'} className={'create-image-container'}>
                        <img
                            onClick={() => setUseSrc("yes")}
                            className={`${useSrc === 'yes' ? 'active' : ''} `}
                            src="/src-svgrepo-com.svg" alt=""/>
                        <img
                            onClick={() => setUseSrc("no")}
                            className={`${useSrc === 'no' ? 'active' : ''} `}
                            src="/cancel.svg" alt=""/>
                    </div>

                    <label htmlFor="app">是否使用app(推荐)</label>
                    <div id={'app'} className={'create-image-container'}>
                        <img
                            onClick={() => setUseApp("yes")}
                            className={`${useApp === 'yes' ? 'active' : ''} `}
                            src="/app-opened-svgrepo-com.svg" alt=""/>
                        <img
                            onClick={() => setUseApp("no")}
                            className={`${useApp === 'no' ? 'active' : ''} `}
                            src="/cancel.svg" alt=""/>
                    </div>

                    <label htmlFor="alias">是否使用alias(别名)</label>
                    <div id={'alias'} className={'create-image-container'}>
                        <img
                            onClick={() => setAlias("yes")}
                            className={`${alias === 'yes' ? 'active' : ''} `}
                            src="/app-opened-svgrepo-com.svg" alt=""/>
                        <img
                            onClick={() => setAlias("no")}
                            className={`${alias === 'no' ? 'active' : ''} `}
                            src="/cancel.svg" alt=""/>
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

export default CreateNextForm;