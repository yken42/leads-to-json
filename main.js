import fs from "fs/promises";

console.time("myTimmer");
const users = [];

fs.readdir("./LEADS", "utf-8").then((file_names) => {
  const pending = file_names.map((file_name) => {
    return fs.readFile(`LEADS/${file_name}`);
  });
  Promise.all(pending)
    .then((content_array) => {
      const content = content_array.join("\r\n").split("\r\n");
      for (let line of content) {
        let [fb_id, full_name, email] = line.split(",");
        full_name = full_name.slice(1, -1);
        if (!users.some((user) => user.fb_id === fb_id)) {
          let user = { fb_id, full_name, email };
          users.push(user);
        }
      }
    })
    .then(() => {
      fs.writeFile("json.json", JSON.stringify(users, null, 2));
      console.log(users.length);
      console.timeEnd("myTimmer");
    });
});
