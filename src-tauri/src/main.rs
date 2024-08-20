// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::common::cmd;
use crate::next::create_next_project;
use crate::vite::{create_vite_project, UserSelected};

mod common;
mod vite;
mod next;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn create_vite(
    framework_type: String, variant_type: String, project_name: String, dir: String,
    npm_type: String, git: String,
) -> String {
    create_vite_project(
        framework_type, variant_type, project_name, dir,
        npm_type, git,
    );

    format!("创建成功")
}

#[tauri::command]
fn create_next(
    project_name: String, ts: String, eslint: String, tailwind: String,
    use_src: String, use_app: String, alias: String,
    dir: String, npm_type: String, git: String,
) -> String {
    create_next_project(
        project_name, ts, eslint, tailwind,
        use_src, use_app, alias,
        dir, npm_type, git,
    );

    format!("创建成功")
}

#[tauri::command]
fn chdir() -> String {
    cmd("chdir").unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            chdir,create_vite,create_next
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
