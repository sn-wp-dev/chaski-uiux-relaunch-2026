const assert = require('node:assert/strict');
const vm = require('node:vm');
const code = require('node:fs').readFileSync('js/auth.js', 'utf8');
function run(answer, stored) {
  let prompts = 0, output = '', stopped = false;
  const storage = { getItem: () => stored, setItem: (_, value) => { stored = value; } };
  const document = { open() {}, write(value) { output = value; }, close() {} };
  vm.runInNewContext(code, { sessionStorage: storage, document, window: { prompt() { prompts++; return answer; }, stop() { stopped = true; } } });
  return { stored, prompts, output, stopped };
}
assert.equal(run('Kunde2026!').stored, 'ok');
assert.equal(run(null, 'ok').prompts, 0);
for (const input of ['wrong', null]) {
  const result = run(input);
  assert.equal(result.stored, undefined);
  assert.match(result.output, /Zugriff verweigert/);
  assert.equal(result.stopped, true);
}
console.log('Authentication checks passed');
