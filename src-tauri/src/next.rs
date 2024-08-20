use std::path::Path;
use crate::common::{copy_dir_all, current_exe_pkg, git_init, install, match_bool, match_bool_default_no, npm_and_git};

#[derive(Debug)]
struct UserSelectedNextApp {
    project_name: String,
    is_typescript: bool,
    use_eslint: bool,
    use_tailwindcss: bool,
    use_src_dir: bool,
    use_app_router: bool,
    import_alias: bool,
    // import_alias: String,
    dir: String,
}

impl UserSelectedNextApp {
    fn new(
        project_name: &str,
        is_ts: bool,
        eslint: bool,
        tailwind: bool,
        src: bool,
        app_r: bool,
        // alias: &str,
        alias: bool,
        dir: &str,
    ) -> Self {
        let project_name = if project_name.is_empty() {
            "my-app"
        } else { project_name };

        UserSelectedNextApp {
            project_name: project_name.to_string(),
            is_typescript: is_ts,
            use_eslint: eslint,
            use_tailwindcss: tailwind,
            use_src_dir: src,
            use_app_router: app_r,
            // import_alias: alias.to_string(),
            import_alias: alias,
            dir: dir.to_string(),
        }
    }
    // 创建文件
    fn init(&self) {
        // let mut path = "./src/public/".to_string();
        let mut path = "public/nextjs/".to_string();

        if self.is_typescript {
            path += "ts";
        } else {
            path += "js";
        }

        if self.use_eslint {
            path += "-";
            path += "lint";
        }
        if self.use_tailwindcss {
            path += "-";
            path += "tailwind";
        }
        if self.use_src_dir {
            path += "-";
            path += "src";
        }
        if self.use_app_router {
            path += "-";
            path += "app";
        }
        if self.import_alias {
            path += "-";
            path += "alias";
        }

        println!("复制: {}", current_exe_pkg() + &path);

        copy_dir_all(
            Path::new(
                &(current_exe_pkg() + &path)
            ),
            Path::new(&(self.dir.clone() + "/" + &self.project_name.clone())),
        ).unwrap();
    }
}

pub fn create_next_project(
    project_name: String, variant_type: String, eslint: String, tailwind: String,
    use_src: String, use_app: String, alias: String,
    dir: String, npm_type: String, git: String,
) {
    // variant_type -> ts/js
    let ts = match_bool(variant_type.as_str().clone());
    let use_eslint = match_bool(eslint.as_str().clone());
    let tailwind = match_bool(tailwind.as_str().clone());
    let src = match_bool_default_no(use_src.as_str().clone());
    let app_r = match_bool(use_app.as_str().clone());
    let use_alias = match_bool_default_no(alias.as_str().clone());

    let user_select = UserSelectedNextApp::new(
        &project_name, ts, use_eslint, tailwind, src, app_r, use_alias, &dir,
    );
    // println!("{user_select:?}");

    user_select.init();

    npm_and_git(
        npm_type, git,
        (user_select.dir.clone() + "/" + &user_select.project_name.clone()),
    );
}
