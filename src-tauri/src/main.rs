// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::common::cmd;
use crate::vite::{create_vite_project, UserSelected};

mod common;
mod vite;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn create_vite(
    framework_type: String, variant_type: String, project_name: String, dir: String,
    npm_type: String, git: String,
) -> String {
    println!("{} {} {} {}", framework_type, variant_type, project_name, dir);

    create_vite_project(
        framework_type, variant_type, project_name, dir,
        npm_type, git,
    );

    format!("创建成功")
}

#[tauri::command]
fn chdir() -> String {
    cmd("chdir").unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_vite, chdir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
