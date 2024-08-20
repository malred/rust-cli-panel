import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={'sidebar'}>
            <div className={'sidebar-logo-container'}>
                <img
                    className={'sidebar-logo'}
                    src="/logo.png" alt=""/>
            </div>
            <ul className={'sidebar-list'}>
                <Link to={'/'}>
                    <li>首页</li>
                </Link>
            </ul>
        </div>
    );
};

export default Sidebar;