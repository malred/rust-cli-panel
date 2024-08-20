use std::error::Error;
use std::path::Path;
use serde::{Deserialize, Serialize};
use tauri::async_runtime::block_on;
use crate::common::{copy_dir_all, current_exe_pkg, git_init, install};

#[derive(Debug, Deserialize, Serialize)]
pub enum FrameworkType {
    React,
    Vue,
}

#[derive(Debug, Deserialize, Serialize)]
pub enum VariantType {
    Javascript,
    Typescript,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UserSelected {
    framework_type: FrameworkType,
    variant_type: VariantType,
    // file_name: String,
    project_name: String,
    dir: String,
}

impl UserSelected {
    fn new(project_name: &str, framework: &str, variant: &str, dir: &str) -> Self {
        let framework_type = match framework {
            "react" => {
                FrameworkType::React
            }
            "vue" => {
                FrameworkType::Vue
            }
            _ => {
                // panic!("No such framework type")
                // default
                FrameworkType::React
            }
        };

        let variant_type = match variant {
            "javascript" => {
                VariantType::Javascript
            }
            "typescript" => {
                VariantType::Typescript
            }
            "js" => {
                VariantType::Javascript
            }
            "ts" => {
                VariantType::Typescript
            }
            _ => {
                // panic!("No such variant type")
                VariantType::Typescript
            }
        };

        let project_name = if project_name.is_empty() {
            "vite-project"
        } else { project_name };

        UserSelected {
            project_name: project_name.to_string(),
            framework_type,
            variant_type,
            // file_name: "".to_string(),
            dir: dir.to_string(),
        }
    }

    // 创建文件
    fn init(&self) {
        // let mut path = "src/public/vite/".to_string();
        let mut path = "public/vite/".to_string();

        match self.framework_type {
            FrameworkType::React => {
                path += "react";
            }
            FrameworkType::Vue => {
                path += "vue";
            }
        }

        path += "-";

        match self.variant_type {
            VariantType::Javascript => {
                path += "js";
            }
            VariantType::Typescript => {
                path += "ts";
            }
        }

        println!("复制 {}",
                 &(current_exe_pkg() + &path)
        );

        // todo: 从网络上下载 或 调用cmd git clone
        // let p = Path::new("");
        // p.join("abc/");
        // p.join("/abc/");
        // p.join("/abc");
        // println!("{p:?}");

        copy_dir_all(
            // src,
            // Path::new(&(current_dir1.to_string() + "/" + &path)),
            Path::new(
                &(current_exe_pkg() + &path)
                // &(self.dir.to_string() + &path)
                // &(dir + &path)
            ),
            // dir/project 创建到目标位置
            Path::new(&(self.dir.clone() + "/" + &self.project_name.clone())),
        ).unwrap();
    }
}

pub fn create_vite_project(
    framework_type: String, variant_type: String, project_name: String, dir: String,
    npm_type: String, git: String,
) {
    let user_select = UserSelected::new(
        &project_name,
        &framework_type,
        &variant_type,
        &dir,
    );
    println!("{user_select:?}");

    user_select.init();

    // if !npm_type.is_empty() { install(&user_select.project_name, &npm_type); };
    if !npm_type.is_empty() {
        // 异步是单线程
        block_on(
            install(
                &(user_select.dir.clone() + "/" + &user_select.project_name.clone()), &npm_type,
            )
        );
    };
    if !git.is_empty() {
        git_init(&(user_select.dir.clone() + "/" + &user_select.project_name.clone()));
    }
}
