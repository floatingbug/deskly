module.exports = {
  apps: [{
	name: "deskly-api, port: 3104",
    script: "./main.js",
    watch: true,
    ignore_watch: ["node_modules", "public/space_images"],
  }]
};
