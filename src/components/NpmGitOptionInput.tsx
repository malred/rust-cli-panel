type Props = {
    npmType: string,
    setNpmType: Function,
    git: string,
    setGit: Function,
}

const NpmGitOptionInput = (props: Props) => {
    return (
        <>
            <label htmlFor="npmType">是否自动安装依赖</label>
            {/*<input id="framework" type="text"/>*/}
            <div id={'npmType'} className={'create-image-container'}>
                <img
                    onClick={() => props.setNpmType("npm")}
                    className={`${props.npmType === 'npm' ? 'active' : ''} `}
                    src="/npm_1.svg" alt=""
                    title={'npm'}
                />
                <img
                    onClick={() => props.setNpmType("pnpm")}
                    className={`${props.npmType === 'pnpm' ? 'active' : ''} `}
                    src="/pnpm.svg" alt=""
                    title={'pnpm'}
                />
                <img
                    onClick={() => props.setNpmType("yarn")}
                    className={`${props.npmType === 'yarn' ? 'active' : ''} `}
                    src="/yarn.svg" alt=""
                    title={'yarn'}
                />
                <img
                    onClick={() => props.setNpmType("")}
                    className={`${props.npmType === '' ? 'active' : ''} `}
                    src="/cancel.svg" alt=""
                    title={'none'}
                />
            </div>


            <label htmlFor="git">是否使用git</label>
            {/*<input id="framework" type="text"/>*/}
            <div id={'git'} className={'create-image-container'}>
                <img
                    onClick={() => props.setGit("git")}
                    className={`${props.git === 'git' ? 'active' : ''} `}
                    src="/git.svg" alt=""/>
                <img
                    onClick={() => props.setGit("")}
                    className={`${props.git === '' ? 'active' : ''} `}
                    src="/cancel.svg" alt=""/>
            </div>
        </>
    );
};

export default NpmGitOptionInput;