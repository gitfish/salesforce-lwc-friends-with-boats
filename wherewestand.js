var arch = process.arch,
	platform = process.platform,
	nodeV = /[0-9]+\.[0-9]+/.exec(process.versions.node)[0],
    nodeVM = /[0-9]+/.exec(process.versions.node)[0];
    
var modPath = platform + '-' + arch + '-node-' + nodeV;
console.log("-- Mod Path: " + modPath);

modPath = platform + '-' + arch + '-node-' + nodeVM;
console.log("-- Mod Path Major: " + modPath);