#! /usr/bin/env node

const fs = require("fs");
const path = require("path");

const nameProject = process.argv[2];

if (!nameProject || nameProject.trim().length == 0) {
  console.error("Insert the project name");
  process.exit(1); //an error occurred
}

if (!fs.existsSync(nameProject)) {
  fs.mkdirSync(nameProject);
}

function pushNameProject(filepath) {
  const data = fs.readFileSync(filepath, "utf-8");
  const value = data.replace("[PROJECT_NAME]", nameProject);
  fs.writeFileSync(filepath, value, "utf-8");
}

function copyFiles() {
  const current = path.join(process.cwd(), nameProject);
  const pathFolderFiles = path.join(__dirname, "files");

  fs.readdirSync(pathFolderFiles).forEach((file) => {
    if (file != "src") {
      const filepath = path.join(current, file);

      fs.copyFileSync(path.join(pathFolderFiles, file), filepath);
      pushNameProject(filepath);
    } else {
      const sourceFolder = path.join(current, "src");

      fs.mkdirSync(sourceFolder);

      fs.copyFileSync(
        path.join(pathFolderFiles, "src", "index.ts"),
        path.join(sourceFolder, "index.ts")
      );
    }
  });
}

copyFiles();
