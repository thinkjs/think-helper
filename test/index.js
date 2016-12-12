import test from 'ava';
import {
  isBuffer,
  isArray,
  isFunction,
  isObject,
  isString,
  isRegExp,
  isExist,
  isFile,
  isDirectory,
  extend, 
  getFiles,
  promisify,
  defer,
  md5,
  mkdir
} from '../lib/index.js';
import fs from 'fs';

test('isBuffer', t => {
  t.is(isBuffer('www'), false)
})

test('isBuffer 2', t => {
  t.is(isBuffer(new Buffer('www')), true)
})

test('isArray', t => {
  t.is(isArray('www'), false);
})

test('isArray 2', t => {
  t.is(isArray([]), true);
})

test('isFunction', t => {
  t.is(isFunction('www'), false)
})

test('isFunction 2', t => {
  t.is(isFunction(function(){}), true)
})

test('isFunction 3', t => {
  t.is(isFunction(class {}), true)
})

test('isObject', t => {
  t.is(isObject(class {}), false)
})

test('isObject 2', t => {
  t.is(isObject({}), true)
})

test('isObject 3', t => {
  t.is(isObject(null), false)
})

test('isString', t => {
  t.is(isString(null), false)
})

test('isString 2', t => {
  t.is(isString('www'), true)
})

test('isRegExp', t => {
  t.is(isRegExp('www'), false)
})

test('isRegExp 2', t => {
  t.is(isRegExp(/\w+/), true)
})

test('isExist', t => {
  t.is(isExist('/www/fasdfasfasdfa'), false)
})


test('isExist 2', t => {
  t.is(isExist(__filename), true)
})

test('isExist 3', t => {
  t.is(isExist(__dirname), true)
})

test('isExist 4', t => {
  t.is(isExist('/root'), false)
})

test('isFile', t => {
  t.is(isFile('/root'), false)
})

test('isFile 2', t => {
  t.is(isFile(__filename), true)
})

test('isDirectory', t => {
  t.is(isDirectory(__filename), false)
})

test('isDirectory 2', t => {
  t.is(isDirectory(__dirname), true)
})



test('extend 1', t => {
  let data = extend({}, {name: 'test'});
  t.deepEqual(data, {name: 'test'});
});

test('extend 2', t => {
  let data = extend({
    name: 'xd'
  }, {name: ['1', '2']});
  t.deepEqual(data, {name: ['1', '2']});
});

test('extend 3', t => {
  let data = extend({
    name: 'xd'
  }, {name: {value: '1'}});
  t.deepEqual(data, {name: {value: '1'}});
});

test('extend 4', t => {
  let data = extend({
    name: ['1']
  }, {name:['2']});
  t.deepEqual(data, {name: ['2']});
});


test('extend 5', t => {
  let data = extend({}, {name: 'welefen'}, {name: 'suredy'});
  t.deepEqual(data, {name: 'suredy'});
})

test('extend 6', t => {
  let data = extend({}, {name: 'welefen'}, {name2: 'suredy'});
  t.deepEqual(data, {name: 'welefen', name2: 'suredy'});
})

test('extend 7', t => {
  let data = extend(null, {name: 'welefen'}, {name2: 'suredy'});
  t.deepEqual(data, {name: 'welefen', name2: 'suredy'});
})



test('getFiles', t => {
  let files = getFiles('/wwwfasdf');
  t.deepEqual(files, [])
})

test('getFiles 2', t => {
  let files = getFiles(__dirname);
  t.deepEqual(files, ['index.js'])
})


test('promisify', async (t) => {
  let fn = promisify(fs.readFile, fs);
  let data = await fn(__filename);
  t.is(data.length > 0, true);
})

test('promisify 2', async (t) => {
  let fn = promisify(fs.readFile, fs);
  let data = await fn(__filename + '/dddd').catch(() => false);
  t.is(data, false);
}) 

test('defer', t => {
  let deferred = defer();
  t.is(isFunction(deferred.promise.then), true)
}) 

test('md5', t => {
  t.is(md5(''), 'd41d8cd98f00b204e9800998ecf8427e')
})

test('mkdir', t => {
  mkdir('welefen22');
  t.is(isDirectory('welefen22'), true);
  fs.rmdirSync('welefen22')
})


test('mkdir 2', t => {
  mkdir('welefen/suredy/www');
  t.is(isDirectory('welefen/suredy/www'), true);
  fs.rmdirSync('welefen/suredy/www')
  fs.rmdirSync('welefen/suredy')
  fs.rmdirSync('welefen')
})

test('mkdir 3', t => {
  mkdir('welefen44/suredy/www');
  mkdir('welefen44/suredy/www');
  t.is(isDirectory('welefen44/suredy/www'), true);
  fs.rmdirSync('welefen44/suredy/www')
  fs.rmdirSync('welefen44/suredy')
  fs.rmdirSync('welefen44')
})