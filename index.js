#!/usr/bin/env node

const https = require("https");
const gzip = require("zlib").createGunzip();
const { execSync } = require("child_process");
const { readFileSync } = require("fs");
const types_source = require("./search-index-min.json");

// get package name
// npm_config_argv: '{"remain":[],"cooked":["add"],"original":["add","test","-D"]}',
// create .hooks/postinstall file
const { npm_config_argv, npm_execpath } = process.env;
const { original } = JSON.parse(npm_config_argv);
const pkg_name = String(original[1] || "").toLowerCase();
// types search url
// see https://github.com/microsoft/DefinitelyTyped-tools/tree/d9f558da52e5d9e383cd4ba39dccc239e5d1bc23/packages/publisher#create-a-search-index
// const types_url = 'https://typespublisher.blob.core.windows.net/typespublisher/data/search-index-min.json';

(function () {
  if (!pkg_name) {
    return;
  }

  try {
    const keyObj = {};
    types_source.forEach(
      (ele) => (keyObj[String(ele.l).toLowerCase()] = ele.t)
    );
    const type_pkg_name = keyObj[pkg_name];

    if (type_pkg_name) {
      const prefix_name = `@types/${type_pkg_name}`;
      // if package.json has installed
      if (ifPkgHasInstalled(prefix_name)) {
        console.log(`${prefix_name} exists. Nothing is installed.`);
        return;
      }

      if (npm_execpath.indexOf("npm") > -1) {
        console.log(`npm install ${prefix_name} -D`);
        execSync(`npm install ${prefix_name} -D --ignore-scripts`);
      } else {
        console.log(`yarn add ${prefix_name} -D`);
        execSync(`yarn add ${prefix_name} -D`);
      }
      console.log(`${prefix_name} has been installed.`);
    }
  } catch (e) {
    console.error(`error: ${e.message}`);
  }
})();

// if package.json has installed
function ifPkgHasInstalled(name) {
  const file_path = process.argv[1].split("node_modules")[0] + "package.json";
  const pkgStr = readFileSync(file_path, { encoding: "utf-8" });
  const pkgObj = JSON.parse(pkgStr);
  return pkgObj["devDependencies"] && pkgObj["devDependencies"][name];
}
