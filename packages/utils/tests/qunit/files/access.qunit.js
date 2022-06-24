

QUnit.test('JsonqlUtils unit test access.accessByPath', (assert) => {

  const testObject = {a: {b: 1}, x: {y: {z: 100}}}

  const { accessByPath } = JsonqlUtils

  const result1 = accessByPath(testObject, 'a')

  assert.deepEqual(result1, {b: 1}, 'acces with key')

  const result2 = accessByPath(testObject, 'x.y')

  assert.deepEqual(result2, {z: 100}, 'access with dot path')
})
