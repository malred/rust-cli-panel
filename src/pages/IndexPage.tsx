// @ts-ignore
import React, {useEffect, useState} from 'react';
import {createTypes} from "../constants/createTypes.ts";
import {Link} from "react-router-dom";
import {invoke} from "@tauri-apps/api/tauri";

const IndexPage = () => {
    // 创建在哪个目录
    const [dir, setDir] = useState("");

    // // 获取当前目录路径
    async function chdir() {
        setDir(await invoke("chdir"))
    }

    useEffect(() => {
        (async () => {
            await chdir()
        })()
    }, []);

    return (
        <div className={'type-container'}>
            <div className={'dir-container'}>
                <h2>创建目录</h2>
                <input className={'dir-input'}
                       onChange={(event) => setDir(event.target.value)}
                       type="text" value={dir}/>
            </div>

            <h2>项目类型</h2>
            <div className={'type-card-container'}>
                {createTypes.map(item => (
                    <Link to={`create/${item.name}?dir=${dir}`}>
                        <div className={'type-card'}>
                            <img src={item.icon} alt=""/>
                            <span>{item.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default IndexPage;