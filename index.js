#!/usr/bin/env node

const { execSync } = require("child_process");
const { readFileSync } = require("fs");
// https://typespublisher.blob.core.windows.net/typespublisher/data/search-index-min.json
const types_source = require("./search-index-min.json");

// get package name
// npm_config_argv: '{"remain":[],"cooked":["add"],"original":["add","test","-D"]}',
const { npm_config_argv, npm_execpath } = process.env;
const { original } = JSON.parse(npm_config_argv);
const pkg_name = String(original[1] || "").toLowerCase();

(function () {
  if (!pkg_name) {
    return;
  }

  try {
    const key_obj = {};
    types_source.forEach(
      (ele) => (key_obj[String(ele.l).toLowerCase()] = ele.t)
    );
    const type_pkg_name = key_obj[pkg_name];

    if (type_pkg_name) {
      const prefix_name = `@types/${type_pkg_name}`;
      // is package.json has installed
      if (isPkgHave(prefix_name)) {
        console.log(`${prefix_name} exists. Nothing is installed.`);
        return;
      }

      if (npm_execpath.indexOf("npm") > -1) {
        // npm has too many problem than i can't solve now
        // so, ban it temporarily(maybe)
        // console.log(`npm install ${prefix_name} -D`);
        // execSync(`npm install ${prefix_name} -D --ignore-scripts`);
      } else {
        console.log(`executing yarn add ${prefix_name} -D`);
        execSync(`yarn add ${prefix_name} -D`);
      }
      console.log(`${prefix_name} has been installed.`);
    }
  } catch (e) {
    console.error(`error: ${e.message}`);
  }
})();

// is package.json has installed
function isPkgHave(name) {
  const file_path = process.argv[1].split("node_modules")[0] + "package.json";
  const pkgStr = readFileSync(file_path, { encoding: "utf-8" });
  const pkgObj = JSON.parse(pkgStr);
  return pkgObj["devDependencies"] && pkgObj["devDependencies"][name];
}
