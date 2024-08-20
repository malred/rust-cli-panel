use std::{fs, io, process};
use std::env::current_exe;
use std::io::Read;
use std::path::Path;
use std::process::Command;

// 复制文件夹到指定路径
pub fn copy_dir_all(src: impl AsRef<Path>, dst: impl AsRef<Path>) -> io::Result<()> {
    // fs::create_dir_all(&dst)?;
    fs::create_dir_all(&dst).expect("创建dst目录失败");

    // println!("遍历");
    fs::read_dir(&src).expect("找不到src目录");
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let ty = entry.file_type()?;
        if ty.is_dir() {
            copy_dir_all(entry.path(), dst.as_ref().join(entry.file_name()))?;
        } else {
            fs::copy(entry.path(), dst.as_ref().join(entry.file_name()))?;
        }
    }

    // println!("copy dir done.");
    Ok(())
}


// 执行npm install操作
pub async fn install(project_name: &str, npm_type: &str) {
    if npm_type.is_empty() {
        return;
    }
    println!("{}", ("start install ..."));

    if cfg!(target_os = "windows") {
        // 获取当前目录
        // let chdir = cmd("chdir").unwrap();
        // let chdir = chdir.replace("\r\n", "");

        // 进入当前目录 && install
        let mut out = Command::new("cmd").arg("/c")
            .arg(
                // "cd ".to_string() + chdir.as_str() + "\\" + project_name + " && " +
                "cd ".to_string() + project_name + " && " +
                    &npm_type + " install"
            )
            .spawn().expect("cmd exec error!");
        // .output().expect("cmd exec error!");

        println!("{}", (&(
            "cd ".to_string() + project_name + " && " +
                &npm_type + " install"
        )));

        let status = out.wait().expect("failed to wait for child");

        // println!("child exited with: {}", status);
        if status.success() {
            println!("done.");
        }
    } else {
        println!("暂不支持mac os");
    }
}

// 执行命令行操作
pub fn cmd(cmd_shell: &str) -> Option<String> {
    if cfg!(target_os = "windows") {
        let mut out = Command::new("cmd").arg("/c")
            .arg(cmd_shell)
            .output().expect("cmd exec error!");

        // println!("{}", cmd_shell);
        Some(String::from_utf8_lossy(&out.stdout).to_string())
    } else {
        println!("");
        None
    }
}

// 执行git init操作
pub fn git_init(project_name: &str) {
    println!("{}", ("start git init ..."));

    if cfg!(target_os = "windows") {
        let chdir = cmd("chdir").unwrap();
        let chdir = chdir.replace("\r\n", "");

        let mut out = Command::new("cmd").arg("/c")
            .arg(
                // "cd ".to_string() + chdir.as_str() + "\\" + project_name +
                "cd ".to_string() + project_name +
                    " && " + "git init"
            )
            .spawn().expect("cmd exec error!");
        // .output().expect("cmd exec error!");

        // println!("{}", (&("cd ".to_string() + &chdir + "\\" + project_name +
        println!("{}", (&("cd ".to_string() + project_name +
            " && " + "git init"))
        );

        let status = out.wait().expect("failed to wait for child");

        if status.success() {
            println!("{}", ("done."));
        }
    } else {
        println!("")
    }
}

pub fn current_exe_pkg() -> String {
    let pkg_name = env!("CARGO_PKG_NAME");
    let pkg_name = pkg_name.to_string() + ".exe";

    // 获取当前目录的路径
    let current_exe = current_exe().unwrap();
    current_exe.display().to_string().replace(&pkg_name, "")
}

// match
pub fn match_bool(str: &str) -> bool {
    match str {
        "yes" => {
            true
        }
        "y" => {
            true
        }
        "1" => {
            true
        }
        "no" => {
            false
        }
        "n" => {
            false
        }
        "2" => {
            false
        }
        _ => {
            true
        }
    }
}

pub fn match_bool_default_no(str: &str) -> bool {
    match str {
        "yes" => {
            true
        }
        "y" => {
            true
        }
        "1" => {
            true
        }
        "no" => {
            false
        }
        "n" => {
            false
        }
        "2" => {
            false
        }
        _ => {
            false
        }
    }
}
