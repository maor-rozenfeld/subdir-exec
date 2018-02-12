#!/usr/bin/env node

const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const exec = require('sync-exec');
const { spawn } = require('child_process');

const source = process.cwd();
const isDirectory = source => lstatSync(source).isDirectory();
const dirs = readdirSync(source).map(name => join(source, name)).filter(isDirectory);
haha(0);

function haha(i) {
	if (i >= dirs.length)
		return;

	var allArgs = process.argv.slice(2);
	var cmd = allArgs[0];
	var args = [];
	if (allArgs.length > 1)
		args = allArgs.slice(1);
	console.log(dirs[i] + ' ' + cmd + ' ' + args.join(' '));
	args.unshift(cmd);
    args.unshift('/C');
	var ls = spawn('cmd', args, { cwd: dirs[i] });
	ls.stdout.on('data', (data) => {
		console.log(data.toString());
	});

	ls.stderr.on('data', (data) => {
		console.log(data.toString());
	});

	ls.on('close', (code) => {
		if (code != 0)
			console.log(`exited with code ${code}`);	
		haha(i+1);
	});
}